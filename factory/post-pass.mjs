#!/usr/bin/env node
// Post-pass enrichment, run on a GENERATED provider tree
// (<openapi>/src/<provider>/v00.00.00000).
//
//   node factory/post-pass.mjs --provider-root DIR
//
// Steps:
//   1. every body-bearing method gets `config.requestBodyTranslate:
//      {algorithm: naive}` AND `request.mediaType: <the op's body content
//      key>` (generate only stamps the former, and only on post/put/patch —
//      the loader binds the body schema by exact content-key match, so a
//      missing request.mediaType silently unbinds required body fields).
//   2. cursor-style list methods (GET with a `page` query param and a
//      `next_page` property in the 200 response schema) get
//      `config.pagination` — request token `page` in query, response token
//      `$.next_page` in body. after_id/has_more lists get NOTHING (their
//      `last_id` stays populated on the final page → infinite loop risk;
//      wire-verified policy).
//   3. re-dump every YAML with YAML 1.1 keyword quoting (stackql's Go YAML
//      parser is YAML 1.1: bare `y`/`yes`/`no`/`on`/`off` strings would
//      silently become booleans).

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function argOf(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
const providerRoot = argOf('--provider-root');
if (!providerRoot) {
  console.error('usage: post-pass.mjs --provider-root <.../src/<provider>/v00.00.00000>');
  process.exit(1);
}
const servicesDir = path.join(providerRoot, 'services');

function resolveOp(spec, opRef) {
  const parts = opRef.replace(/^#\/paths\//, '').split('/');
  const httpVerb = parts.pop();
  const pathKey = parts.join('/').replace(/~1/g, '/').replace(/~0/g, '~');
  return { op: ((spec.paths || {})[pathKey] || {})[httpVerb], httpVerb, pathKey };
}

function schemaOf(spec, maybeRef) {
  if (!maybeRef) return null;
  if (maybeRef.$ref) {
    const name = maybeRef.$ref.split('/').pop();
    return (spec.components?.schemas || {})[name] || null;
  }
  return maybeRef;
}

function dump(obj) {
  return YAML.stringify(obj, { lineWidth: 0, aliasDuplicateObjects: false, version: '1.1' });
}

let bodyStamped = 0, paginationStamped = 0;
for (const f of fs.readdirSync(servicesDir).filter((x) => /\.ya?ml$/.test(x))) {
  const p = path.join(servicesDir, f);
  const spec = YAML.parse(fs.readFileSync(p, 'utf8'));
  const resources = spec.components?.['x-stackQL-resources'] || {};

  for (const resource of Object.values(resources)) {
    for (const [mName, method] of Object.entries(resource.methods || {})) {
      const { op, httpVerb } = resolveOp(spec, method.operation.$ref);
      if (!op) throw new Error(`${f}: dangling operation ref for method ${mName}`);

      // 1. body binding
      const content = op.requestBody?.content;
      if (content) {
        const contentKey = Object.keys(content)[0];
        method.config = method.config || {};
        method.config.requestBodyTranslate = { algorithm: 'naive' };
        method.request = { ...(method.request || {}), mediaType: contentKey };
        bodyStamped++;
      }

      // 2. cursor pagination
      if (httpVerb === 'get') {
        const hasPageParam = (op.parameters || []).some((x) => x.in === 'query' && x.name === 'page');
        const respSchema = schemaOf(spec, op.responses?.['200']?.content?.['application/json']?.schema);
        const hasNextPage = !!respSchema?.properties?.next_page;
        if (hasPageParam && hasNextPage) {
          method.config = method.config || {};
          method.config.pagination = {
            requestToken: { key: 'page', location: 'query' },
            responseToken: { key: '$.next_page', location: 'body' },
          };
          paginationStamped++;
        }
      }
    }
  }
  fs.writeFileSync(p, dump(spec));
}

// 3. provider.yaml re-dump for consistent YAML 1.1 output
const providerYamlPath = path.join(providerRoot, 'provider.yaml');
fs.writeFileSync(providerYamlPath, dump(YAML.parse(fs.readFileSync(providerYamlPath, 'utf8'))));

console.log(`post-pass: ${bodyStamped} body-bearing methods bound, ${paginationStamped} cursor lists paginated`);
