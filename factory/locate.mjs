#!/usr/bin/env node
// Locate the canonical Anthropic OpenAPI spec.
//
// Reads .stats.yml from anthropics/anthropic-sdk-python HEAD (the SDKs are
// Stainless-generated from this spec; .stats.yml is the only thing we take
// from the SDK repo). Prints the spec URL, and compares openapi_spec_hash
// against the committed snapshot (factory/spec-snapshot.json).
//
//   node factory/locate.mjs            # report; exit 3 on hash drift
//   node factory/locate.mjs --pin      # update the snapshot to upstream HEAD
//
// Guard 5 (.stats.yml drift) runs this in CI without --pin: a changed
// upstream hash fails the build until someone consciously bumps the
// snapshot and re-vendors the spec.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STATS_URL = 'https://raw.githubusercontent.com/anthropics/anthropic-sdk-python/main/.stats.yml';
const here = path.dirname(fileURLToPath(import.meta.url));
const snapshotPath = path.join(here, 'spec-snapshot.json');

const res = await fetch(STATS_URL);
if (!res.ok) {
  console.error(`locate: failed to fetch ${STATS_URL}: HTTP ${res.status}`);
  process.exit(2);
}
const text = await res.text();

// .stats.yml is flat `key: value` YAML; parse without a YAML dependency.
const stats = {};
for (const line of text.split('\n')) {
  const m = /^([A-Za-z0-9_]+):\s*(.+?)\s*$/.exec(line);
  if (m) stats[m[1]] = m[2];
}

const { openapi_spec_url: specUrl, openapi_spec_hash: specHash, configured_endpoints: endpoints } = stats;
if (!specUrl || !specHash) {
  console.error('locate: .stats.yml missing openapi_spec_url or openapi_spec_hash:\n' + text);
  process.exit(2);
}

console.log(`spec url:  ${specUrl}`);
console.log(`spec hash: ${specHash}`);
console.log(`sdk endpoints: ${endpoints}`);

if (process.argv.includes('--pin')) {
  fs.writeFileSync(snapshotPath, JSON.stringify({
    openapi_spec_url: specUrl,
    openapi_spec_hash: specHash,
    configured_endpoints: Number(endpoints),
  }, null, 2) + '\n');
  console.log(`pinned snapshot → ${snapshotPath}`);
  process.exit(0);
}

if (!fs.existsSync(snapshotPath)) {
  console.error(`locate: no snapshot at ${snapshotPath}; run with --pin to bootstrap`);
  process.exit(3);
}
const snap = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
if (snap.openapi_spec_hash !== specHash) {
  console.error(
    `locate: UPSTREAM SPEC DRIFT — snapshot hash ${snap.openapi_spec_hash} != upstream ${specHash}.\n` +
    'Consciously bump: node factory/locate.mjs --pin && node factory/download.mjs, review the diff, regen.'
  );
  process.exit(3);
}
console.log('snapshot matches upstream — no drift');
