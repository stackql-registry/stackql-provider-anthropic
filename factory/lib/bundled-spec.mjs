// Shared access to the upstream Anthropic OpenAPI spec.
//
// Since anthropic-sdk-python f9b0cf2 (2026-09-03, "bundle the mock server
// spec and update dev tooling") the Stainless-generated SDK repos no longer
// publish `openapi_spec_url` / `openapi_spec_hash` in `.stats.yml` (the
// file now carries only `configured_endpoints`). The spec itself ships
// INSIDE the SDK repo as `scripts/mock-spec.json.gz`: a gzipped OpenAPI
// 3.1.0 JSON document. That bundled file is the canonical upstream for this
// factory; `.stats.yml` is still read for the endpoint count.
//
// The pin is the sha256 of the DECOMPRESSED JSON (gzip output embeds a
// timestamp, so the archive bytes are not a stable identity).

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

export const SDK_REPO = 'anthropics/anthropic-sdk-python';
export const SDK_REF = 'main';
export const STATS_URL = `https://raw.githubusercontent.com/${SDK_REPO}/${SDK_REF}/.stats.yml`;
export const BUNDLED_SPEC_URL = `https://raw.githubusercontent.com/${SDK_REPO}/${SDK_REF}/scripts/mock-spec.json.gz`;

const here = path.dirname(fileURLToPath(import.meta.url));
export const factoryDir = path.dirname(here);
export const repoRoot = path.dirname(factoryDir);
export const snapshotPath = path.join(factoryDir, 'spec-snapshot.json');
export const vendoredSpecPath = path.join(
  repoRoot, 'stackql_anthropic_provider', 'provider-dev', 'downloaded', 'anthropic-openapi.yml');

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];

export class FetchError extends Error {}

async function fetchBytes(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    throw new FetchError(`failed to fetch ${url}: ${e.message}`);
  }
  if (!res.ok) throw new FetchError(`failed to fetch ${url}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// `.stats.yml` is flat `key: value` YAML; parsed without a YAML dependency.
export async function fetchStats() {
  const text = (await fetchBytes(STATS_URL)).toString('utf8');
  const stats = {};
  for (const line of text.split('\n')) {
    const m = /^([A-Za-z0-9_]+):\s*(.+?)\s*$/.exec(line);
    if (m) stats[m[1]] = m[2];
  }
  return { raw: text, stats };
}

export function describeSpec(spec) {
  const paths = Object.keys(spec.paths || {});
  let operations = 0;
  for (const p of paths) for (const m of HTTP_METHODS) if (spec.paths[p][m]) operations++;
  return { openapi: spec.openapi, paths: paths.length, operations };
}

// Downloads and decompresses the bundled spec. Returns the decompressed
// JSON bytes, their sha256, the parsed document and its summary.
export async function fetchBundledSpec() {
  const gz = await fetchBytes(BUNDLED_SPEC_URL);
  let json;
  try {
    json = zlib.gunzipSync(gz);
  } catch (e) {
    throw new FetchError(`bundled spec at ${BUNDLED_SPEC_URL} is not a gzip archive: ${e.message}`);
  }
  const sha256 = crypto.createHash('sha256').update(json).digest('hex');
  const spec = JSON.parse(json.toString('utf8'));
  return { gzBytes: gz.length, json, sha256, spec, ...describeSpec(spec) };
}

export function loadSnapshot() {
  if (!fs.existsSync(snapshotPath)) return null;
  return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
}
