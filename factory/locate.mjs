#!/usr/bin/env node
// Locate the canonical Anthropic OpenAPI spec and check it against the pin.
//
// The spec is bundled in anthropics/anthropic-sdk-python as
// scripts/mock-spec.json.gz (see factory/lib/bundled-spec.mjs for why the
// Stainless-hosted URL in .stats.yml is no longer available). This script
// downloads the archive, decompresses it, hashes the JSON, reports the
// document's shape (openapi version, path and operation counts) plus
// `configured_endpoints` from .stats.yml, and compares the hash against the
// committed snapshot (factory/spec-snapshot.json).
//
//   node factory/locate.mjs            # report; exit 3 on drift
//   node factory/locate.mjs --pin      # record upstream HEAD in the snapshot
//
// Exit codes: 0 no drift, 2 upstream unreachable, 3 drift (or a snapshot
// that predates the bundled-spec pin, or no snapshot at all).
//
// Guard 5 (upstream drift) runs this in CI without --pin: a changed upstream
// spec fails the build until someone consciously bumps the snapshot
// (--pin), re-vendors it (download.mjs), reviews the diff and regenerates.

import fs from 'node:fs';
import {
  BUNDLED_SPEC_URL, SDK_REPO, FetchError, fetchBundledSpec, fetchStats, loadSnapshot, snapshotPath,
} from './lib/bundled-spec.mjs';

let upstream, stats;
try {
  [upstream, { stats }] = await Promise.all([fetchBundledSpec(), fetchStats()]);
} catch (e) {
  if (e instanceof FetchError) {
    console.error(`locate: ${e.message}`);
    process.exit(2);
  }
  throw e;
}

const configuredEndpoints = Number(stats.configured_endpoints);
console.log(`spec source:   ${SDK_REPO} scripts/mock-spec.json.gz`);
console.log(`spec url:      ${BUNDLED_SPEC_URL}`);
console.log(`spec sha256:   ${upstream.sha256}  (decompressed JSON, ${upstream.json.length} bytes)`);
console.log(`spec shape:    openapi ${upstream.openapi}, ${upstream.paths} paths, ${upstream.operations} operations`);
console.log(`sdk endpoints: ${Number.isFinite(configuredEndpoints) ? configuredEndpoints : '(missing from .stats.yml)'}`);

if (process.argv.includes('--pin')) {
  const previous = loadSnapshot() || {};
  const snapshot = {
    source: `${SDK_REPO}:scripts/mock-spec.json.gz`,
    bundled_spec_url: BUNDLED_SPEC_URL,
    bundled_spec_sha256: upstream.sha256,
    openapi: upstream.openapi,
    paths: upstream.paths,
    operations: upstream.operations,
    configured_endpoints: Number.isFinite(configuredEndpoints) ? configuredEndpoints : null,
    pinned: new Date().toISOString().slice(0, 10),
  };
  // Provenance of the pre-2026-09 pin (the Stainless-hosted spec that
  // .stats.yml used to point at). Carried forward untouched.
  if (previous.superseded) snapshot.superseded = previous.superseded;
  else if (previous.openapi_spec_url || previous.openapi_spec_hash) {
    snapshot.superseded = {
      note: 'Stainless-hosted spec that .stats.yml pointed at before anthropic-sdk-python f9b0cf2 (2026-09-03); historical provenance only',
      openapi_spec_url: previous.openapi_spec_url,
      openapi_spec_hash: previous.openapi_spec_hash,
      configured_endpoints: previous.configured_endpoints,
    };
  }
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`pinned snapshot -> ${snapshotPath}`);
  process.exit(0);
}

const snap = loadSnapshot();
if (!snap) {
  console.error(`locate: no snapshot at ${snapshotPath}; run with --pin to bootstrap`);
  process.exit(3);
}
if (!snap.bundled_spec_sha256) {
  console.error(
    'locate: UPSTREAM SPEC DRIFT - the snapshot predates the bundled-spec pin (no bundled_spec_sha256; ' +
    `it still pins the Stainless URL hash ${snap.openapi_spec_hash || '(none)'}).\n` +
    'Consciously bump: node factory/locate.mjs --pin && node factory/download.mjs, review the diff, regen.'
  );
  process.exit(3);
}
if (snap.bundled_spec_sha256 !== upstream.sha256) {
  console.error(
    `locate: UPSTREAM SPEC DRIFT - snapshot sha256 ${snap.bundled_spec_sha256} != upstream ${upstream.sha256} ` +
    `(pinned ${snap.pinned || 'unknown'}: ${snap.paths} paths / ${snap.operations} ops; ` +
    `upstream: ${upstream.paths} paths / ${upstream.operations} ops).\n` +
    'Consciously bump: node factory/locate.mjs --pin && node factory/download.mjs, review the diff, regen.'
  );
  process.exit(3);
}
if (Number.isFinite(configuredEndpoints) && snap.configured_endpoints !== configuredEndpoints) {
  // The spec is what we build from; the SDK endpoint count is informational,
  // but a change means the SDKs consumed a spec the pin does not reflect.
  console.error(
    `locate: .stats.yml configured_endpoints ${configuredEndpoints} != snapshot ${snap.configured_endpoints} ` +
    'while the bundled spec is unchanged - re-pin to refresh the recorded count.'
  );
  process.exit(3);
}
console.log('snapshot matches upstream - no drift');
