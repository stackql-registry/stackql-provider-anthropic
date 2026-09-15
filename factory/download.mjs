#!/usr/bin/env node
// Vendor the pinned Anthropic OpenAPI spec into
// stackql_anthropic_provider/provider-dev/downloaded/anthropic-openapi.yml.
//
// Fetches the bundled spec (anthropics/anthropic-sdk-python
// scripts/mock-spec.json.gz), decompresses it, verifies the sha256 of the
// decompressed JSON against factory/spec-snapshot.json (written by
// locate.mjs --pin), and converts it to YAML at the path the rest of the
// pipeline reads (pre-pass.mjs, guards.mjs). On a hash mismatch nothing is
// written: the vendored artifact always corresponds to the committed pin.
//
//   node factory/download.mjs
//
// Exit codes: 0 written, 1 hash mismatch / no pin, 2 upstream unreachable.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import {
  FetchError, fetchBundledSpec, loadSnapshot, snapshotPath, vendoredSpecPath,
} from './lib/bundled-spec.mjs';

const snap = loadSnapshot();
if (!snap || !snap.bundled_spec_sha256) {
  console.error(`download: ${snapshotPath} has no bundled_spec_sha256 pin; run node factory/locate.mjs --pin first`);
  process.exit(1);
}

let upstream;
try {
  upstream = await fetchBundledSpec();
} catch (e) {
  if (e instanceof FetchError) {
    console.error(`download: ${e.message}`);
    process.exit(2);
  }
  throw e;
}

if (upstream.sha256 !== snap.bundled_spec_sha256) {
  console.error(
    `download: sha256 mismatch, nothing written - pinned ${snap.bundled_spec_sha256}, fetched ${upstream.sha256}. ` +
    'Upstream moved since the pin; run node factory/locate.mjs (guard 5) and re-pin consciously.'
  );
  process.exit(1);
}

// Deterministic YAML: key order as in the JSON document, no anchors, no
// line folding (long descriptions stay on one line, as in the previous
// Stainless-hosted YAML).
const text = yaml.dump(upstream.spec, { lineWidth: -1, noRefs: true, noCompatMode: true });
fs.mkdirSync(path.dirname(vendoredSpecPath), { recursive: true });
fs.writeFileSync(vendoredSpecPath, text);
console.log(
  `wrote ${vendoredSpecPath} (${text.length} bytes YAML from ${upstream.json.length} bytes JSON; ` +
  `openapi ${upstream.openapi}, ${upstream.paths} paths, ${upstream.operations} operations; sha256 ${upstream.sha256})`
);
