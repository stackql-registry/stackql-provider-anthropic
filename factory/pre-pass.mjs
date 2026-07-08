#!/usr/bin/env node
// Pre-pass for the `anthropic` provider spec, run BEFORE split/normalize.
//
//   node factory/pre-pass.mjs [--in FILE] [--out FILE]
//
// Steps (order matters):
//   1. drop excluded ops (factory/exclusions.yaml) — SSE streams, tunnels,
//      beta duplicates of GA messages/batches/models
//   2. downlevel OpenAPI 3.1 → 3.0 constructs:
//        - strip `{type: 'null'}` members from anyOf/oneOf (3.1 null union)
//        - `const: X` → `enum: [X]`
//        - numeric exclusiveMinimum/Maximum → minimum/maximum
//        - stamp `openapi: 3.0.3`
//   3. stamp header defaults (auto-injected by stackql when the header is
//      required:false and carries schema.default — wire-verified):
//        - anthropic-version: default '2023-06-01' on every op
//        - anthropic-beta: per-endpoint flag default from beta-flags.yaml
//          on every beta (`?beta=true`) op

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.dirname(here);

function argOf(flag, dflt) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : dflt;
}

const inPath = argOf('--in', path.join(
  repoRoot, 'stackql_anthropic_provider', 'provider-dev', 'downloaded', 'anthropic-openapi.yml'));
const outPath = argOf('--out', path.join(
  repoRoot, 'stackql_anthropic_provider', 'provider-dev', 'source', 'anthropic-prepassed.yaml'));

const spec = YAML.parse(fs.readFileSync(inPath, 'utf8'));

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']);

// ---- 1. drop excluded ops ---------------------------------------------------
const exclusionsDoc = YAML.parse(fs.readFileSync(path.join(here, 'exclusions.yaml'), 'utf8'));
const excluded = new Set(
  Object.values(exclusionsDoc).flatMap((group) => group.map((e) => e.op))
);

let dropped = 0;
for (const [pathKey, item] of Object.entries(spec.paths)) {
  for (const method of Object.keys(item)) {
    if (!HTTP_METHODS.has(method)) continue;
    if (excluded.has(`${method.toUpperCase()} ${pathKey}`)) {
      delete item[method];
      dropped++;
    }
  }
  if (!Object.keys(item).some((k) => HTTP_METHODS.has(k))) {
    delete spec.paths[pathKey];
  }
}
if (dropped !== excluded.size) {
  console.error(`pre-pass: exclusion mismatch — table lists ${excluded.size} ops but only ${dropped} matched the spec. ` +
    'The vendored spec has drifted; reconcile factory/exclusions.yaml.');
  process.exit(1);
}

// ---- 2. downlevel 3.1 → 3.0 -------------------------------------------------
const stats = { nullMembers: 0, consts: 0, exclusives: 0 };

function isNullSchema(s) {
  return s && typeof s === 'object' && !Array.isArray(s) && s.type === 'null';
}

function downlevel(node) {
  if (Array.isArray(node)) {
    for (const v of node) downlevel(v);
    return;
  }
  if (node === null || typeof node !== 'object') return;

  for (const key of ['anyOf', 'oneOf']) {
    if (Array.isArray(node[key])) {
      const kept = node[key].filter((m) => !isNullSchema(m));
      if (kept.length !== node[key].length) {
        stats.nullMembers += node[key].length - kept.length;
        node.nullable = true;
        if (kept.length === 0) {
          // pure-null union → opaque string column
          delete node[key];
          node.type = 'string';
        } else {
          node[key] = kept;
        }
      }
    }
  }
  if ('const' in node) {
    node.enum = [node.const];
    delete node.const;
    stats.consts++;
  }
  if (typeof node.exclusiveMinimum === 'number') {
    node.minimum = node.exclusiveMinimum;
    delete node.exclusiveMinimum;
    stats.exclusives++;
  }
  if (typeof node.exclusiveMaximum === 'number') {
    node.maximum = node.exclusiveMaximum;
    delete node.exclusiveMaximum;
    stats.exclusives++;
  }
  for (const v of Object.values(node)) downlevel(v);
}
downlevel(spec);
spec.openapi = '3.0.3';

// ---- 3. header defaults -----------------------------------------------------
const betaFlagsDoc = YAML.parse(fs.readFileSync(path.join(here, 'beta-flags.yaml'), 'utf8'));
const betaFlags = Object.entries(betaFlagsDoc.flags);

function betaFlagFor(pathKey) {
  for (const [prefix, flag] of betaFlags) {
    if (pathKey === prefix || pathKey.startsWith(`${prefix}/`) || pathKey.startsWith(`${prefix}?`)) {
      return flag;
    }
  }
  return null;
}

let versionStamped = 0, betaStamped = 0;
const betaMisses = [];
for (const [pathKey, item] of Object.entries(spec.paths)) {
  for (const [method, op] of Object.entries(item)) {
    if (!HTTP_METHODS.has(method)) continue;
    const params = op.parameters || [];

    const ver = params.find((p) => p.name === 'anthropic-version' && p.in === 'header');
    if (!ver) {
      console.error(`pre-pass: ${method.toUpperCase()} ${pathKey} has no anthropic-version param`);
      process.exit(1);
    }
    ver.required = false;
    ver.schema = ver.schema || { type: 'string' };
    ver.schema.default = '2023-06-01';
    versionStamped++;

    if (pathKey.includes('beta=true')) {
      const beta = params.find((p) => p.name === 'anthropic-beta' && p.in === 'header');
      const flag = betaFlagFor(pathKey);
      if (!beta || !flag) {
        betaMisses.push(`${method.toUpperCase()} ${pathKey} (param:${!!beta} flag:${flag})`);
        continue;
      }
      beta.required = false;
      beta.schema = beta.schema || { type: 'string' };
      // The spec models this schema as `type: string` with a stray `items`
      // member (Stainless artifact); drop it so 3.0 validators stay happy.
      delete beta.schema.items;
      beta.schema.default = flag;
      betaStamped++;
    }
  }
}
if (betaMisses.length) {
  console.error('pre-pass: beta ops with no flag default:\n  ' + betaMisses.join('\n  '));
  process.exit(1);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(spec, null, 1));

const opCount = Object.values(spec.paths).reduce(
  (n, item) => n + Object.keys(item).filter((k) => HTTP_METHODS.has(k)).length, 0);
console.log(`pre-pass: dropped ${dropped} excluded ops; ${opCount} ops remain`);
console.log(`pre-pass: downlevel — ${stats.nullMembers} null union members stripped, ` +
  `${stats.consts} const→enum, ${stats.exclusives} exclusive bounds converted`);
console.log(`pre-pass: stamped anthropic-version default on ${versionStamped} ops, ` +
  `anthropic-beta defaults on ${betaStamped} beta ops`);
console.log(`wrote ${outPath}`);
