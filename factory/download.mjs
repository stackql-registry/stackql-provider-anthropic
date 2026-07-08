#!/usr/bin/env node
// Download the pinned Anthropic OpenAPI spec into the vendored location
// (stackql_anthropic_provider/provider-dev/downloaded/). Reads the URL from
// factory/spec-snapshot.json (written by locate.mjs --pin) so the vendored
// artifact always corresponds to the committed hash.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.dirname(here);
const snapshotPath = path.join(here, 'spec-snapshot.json');
const outPath = path.join(
  repoRoot, 'stackql_anthropic_provider', 'provider-dev', 'downloaded', 'anthropic-openapi.yml'
);

const snap = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const res = await fetch(snap.openapi_spec_url);
if (!res.ok) {
  console.error(`download: HTTP ${res.status} for ${snap.openapi_spec_url}`);
  process.exit(2);
}
const body = await res.text();
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, body);
console.log(`wrote ${outPath} (${body.length} bytes)`);
