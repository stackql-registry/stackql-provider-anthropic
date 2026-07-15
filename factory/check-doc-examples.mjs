#!/usr/bin/env node
// Guard: every SQL example published on a provider's docs index page must be a
// query the smoke suite actually runs.
//
// The index page is assembled from provider-dev/docgen/provider-data/<provider>/
// headerContent{1,2}.txt. Each ```sql block in headerContent2 is matched, after
// whitespace normalisation, against the .iql files under tests/queries. A block
// with no matching file fails the check.
//
// Blocks that are illustrative rather than runnable as-is (placeholder ids in
// the lifecycle snippets) are exempted by listing their file+heading in EXEMPT.
//
//   node factory/check-doc-examples.mjs

import fs from 'node:fs';
import path from 'node:path';

const PROVIDERS = [
  {
    name: 'anthropic',
    header: 'stackql_anthropic_provider/provider-dev/docgen/provider-data/anthropic/headerContent2.txt',
    queries: 'stackql_anthropic_provider/tests/queries',
  },
  {
    name: 'anthropic_admin',
    header: 'stackql_anthropic_admin_provider/provider-dev/docgen/provider-data/anthropic_admin/headerContent2.txt',
    queries: 'stackql_anthropic_admin_provider/tests/queries',
  },
];

// Heading -> reason. Blocks under these headings carry placeholder ids and are
// covered by the equivalent templated tests instead.
const EXEMPT = {
  'Agent lifecycle': 'snippets use a placeholder agent_id; covered by the agents_insert/agents_get/agents_archive tests',
};

const norm = (sql) => sql.replace(/\s+/g, ' ').trim().replace(/;$/, '');

function collectQueries(dir) {
  const out = new Map();
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.iql')) out.set(norm(fs.readFileSync(p, 'utf8')), p);
    }
  };
  walk(dir);
  return out;
}

// Returns [{ heading, sql }] for every ```sql fence in the header template.
function collectBlocks(file) {
  const text = fs.readFileSync(file, 'utf8');
  const blocks = [];
  let heading = '(top)';
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^##\s+(.*)$/);
    if (h) { heading = h[1].trim(); continue; }
    if (lines[i].trim() === '```sql') {
      const body = [];
      for (i++; i < lines.length && lines[i].trim() !== '```'; i++) body.push(lines[i]);
      blocks.push({ heading, sql: body.join('\n') });
    }
  }
  return blocks;
}

let failed = 0;
for (const p of PROVIDERS) {
  const queries = collectQueries(p.queries);
  const blocks = collectBlocks(p.header);
  let matched = 0;
  let exempt = 0;
  for (const b of blocks) {
    if (EXEMPT[b.heading]) { exempt++; continue; }
    const hit = queries.get(norm(b.sql));
    if (hit) { matched++; continue; }
    failed++;
    console.error(
      `\n[${p.name}] docs example under "## ${b.heading}" has no matching test query:\n` +
      b.sql.split('\n').map((l) => `    ${l}`).join('\n') +
      `\n  -> add it under ${p.queries}/examples/ and reference it from the smoke manifest,\n` +
      '     or add its heading to EXEMPT in factory/check-doc-examples.mjs with a reason.',
    );
  }
  console.log(`${p.name}: ${matched}/${blocks.length} docs examples tested (${exempt} exempt)`);
}

if (failed) {
  console.error(`\ncheck-doc-examples: ${failed} untested docs example(s)`);
  process.exit(1);
}
console.log('check-doc-examples: OK');
