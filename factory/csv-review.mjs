#!/usr/bin/env node
// Mapping review for the `anthropic` provider's durable mapping table
// (stackql_anthropic_provider/provider-dev/config/all_services.csv).
//
//   node factory/csv-review.mjs            # apply the review, rewrite the CSV
//   node factory/csv-review.mjs --check    # fail if the committed CSV is not
//                                          # the reviewed state (CI)
//
// provider-utils `analyze` appends a row with DERIVED defaults for every op
// it has not seen before (keyed filename::operationId) and never touches
// existing rows. The human review of those defaults is encoded here as
// rules, keyed filename::path::httpVerb, so the CSV stays reproducible from
// analyze + this script and no artifact is hand-edited. The original
// 2026-07 bootstrap review lives in csv-review-bootstrap.mjs (already
// applied; its rows are untouched here) - this file carries every review
// since, one block per spec refresh, append-only.
//
// --check (the `check-mappings` target) fails when:
//   - a row is unreviewed (an op analyze appended that no rule covers and
//     whose derived mapping is incomplete);
//   - applying the rules would change a row (the CSV on disk is not the
//     reviewed state, e.g. analyze appended rows that were not reviewed);
//   - a row's (resource, method, verb) differs from what the rules pin, i.e.
//     a previously mapped operation changed its SQL surface.
// It never rewrites the file.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(
  path.dirname(here), 'stackql_anthropic_provider', 'provider-dev', 'config', 'all_services.csv');
const checkMode = process.argv.includes('--check');

// filename::path::httpverb -> [resource, method, sqlVerb, objectKey]
const REVIEW = {
  // ---- 2026-09 refresh (spec 96aef986..., 244 ops) ------------------------
  // files and skills went GA: the non-beta paths take over the mappings the
  // beta twins carried (same resources, methods and verbs); the beta twins
  // are excluded (factory/exclusions.yaml). Multipart uploads and binary
  // downloads stay EXEC (CLAUDE.md rule 8).
  'files.yaml::/v1/files::get': ['files', 'list', 'select', '$.data'],
  'files.yaml::/v1/files::post': ['files', 'upload', 'exec', ''],
  'files.yaml::/v1/files/{file_id}::get': ['files', 'get', 'select', ''],
  'files.yaml::/v1/files/{file_id}::delete': ['files', 'delete', 'delete', ''],
  'files.yaml::/v1/files/{file_id}/content::get': ['files', 'download', 'exec', ''],
  'skills.yaml::/v1/skills::get': ['skills', 'list', 'select', '$.data'],
  'skills.yaml::/v1/skills::post': ['skills', 'create', 'exec', ''],
  'skills.yaml::/v1/skills/{skill_id}::get': ['skills', 'get', 'select', ''],
  'skills.yaml::/v1/skills/{skill_id}::delete': ['skills', 'delete', 'delete', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions::get': ['versions', 'list', 'select', '$.data'],
  'skills.yaml::/v1/skills/{skill_id}/versions::post': ['versions', 'create', 'exec', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions/{version}::get': ['versions', 'get', 'select', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions/{version}::delete': ['versions', 'delete', 'delete', ''],
  // (the beta-only skill version content download keeps its bootstrap row:
  //  versions.download, exec)

  // dreams (new research-preview service; one resource): list/get SELECT,
  // create INSERT, cancel/archive lifecycle -> EXEC.
  'dreams.yaml::/v1/dreams?beta=true::get': ['dreams', 'list', 'select', '$.data'],
  'dreams.yaml::/v1/dreams?beta=true::post': ['dreams', 'create', 'insert', ''],
  'dreams.yaml::/v1/dreams/{dream_id}?beta=true::get': ['dreams', 'get', 'select', ''],
  'dreams.yaml::/v1/dreams/{dream_id}/cancel?beta=true::post': ['dreams', 'cancel', 'exec', ''],
  'dreams.yaml::/v1/dreams/{dream_id}/archive?beta=true::post': ['dreams', 'archive', 'exec', ''],
};

// The CSV is comma-separated with no quoted fields in this repo (op
// descriptions are single words or short phrases without commas); guard
// that assumption so a quoted field never gets split silently.
const text = fs.readFileSync(csvPath, 'utf8');
const lines = text.split('\n');
const header = lines[0];
const HEADER = 'filename,path,operationId,formatted_op_id,verb,response_object,tags,formatted_tags,stackql_resource_name,stackql_method_name,stackql_verb,stackql_object_key,op_description';
if (header !== HEADER) {
  console.error(`csv-review: unexpected CSV header:\n${header}`);
  process.exit(1);
}

const problems = [];
let changed = 0, reviewed = 0, unreviewed = 0;
const seen = new Set();
const out = lines.map((line, idx) => {
  if (idx === 0 || !line.trim()) return line;
  if (line.includes('"')) {
    problems.push(`row ${idx + 1} contains a quoted field; csv-review only handles bare comma-separated rows`);
    return line;
  }
  const c = line.split(',');
  if (c.length !== 13) {
    problems.push(`row ${idx + 1} has ${c.length} columns, expected 13: ${line}`);
    return line;
  }
  const key = `${c[0]}::${c[1]}::${c[4]}`;
  const rule = REVIEW[key];
  if (rule) {
    seen.add(key);
    reviewed++;
    const next = [...c];
    next[8] = rule[0]; next[9] = rule[1]; next[10] = rule[2]; next[11] = rule[3];
    const nextLine = next.join(',');
    if (nextLine !== line) {
      changed++;
      if (checkMode) problems.push(`row ${idx + 1} (${key}) is not the reviewed mapping: have ${c[8]}.${c[9]}/${c[10]}/${c[11] || '-'}, rules pin ${rule[0]}.${rule[1]}/${rule[2]}/${rule[3] || '-'}`);
    }
    return nextLine;
  }
  // rows outside this file's rules must already be complete (bootstrap
  // review, or skip_this_resource)
  if (!c[8] || !c[9] || !c[10]) {
    unreviewed++;
    problems.push(`row ${idx + 1} (${key}) has an incomplete mapping and no review rule - add one to factory/csv-review.mjs`);
  }
  return line;
});
for (const key of Object.keys(REVIEW)) {
  if (!seen.has(key)) problems.push(`review rule matched no CSV row: ${key} (run analyze first?)`);
}

if (problems.length) {
  console.error(`csv-review: ${problems.length} problem(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
if (checkMode) {
  console.log(`csv-review --check: ${lines.filter((l, i) => i && l.trim()).length} rows, ${reviewed} under 2026-09 rules, all reviewed, no drift`);
  process.exit(0);
}
if (changed) fs.writeFileSync(csvPath, out.join('\n'));
console.log(`csv-review: ${reviewed} rows under rules, ${changed} rewritten, ${unreviewed} unreviewed`);
