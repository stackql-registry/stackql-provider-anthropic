#!/usr/bin/env node
// Post-docgen scrub for the generated microsite docs.
//
//   node factory/scrub-docs.mjs --docs-dir DIR
//
// Two concerns, both in the generated SQL samples:
//   1. The auto-injected header params (`anthropic-version`,
//      `anthropic-beta`) are sent by stackql automatically (optional header
//      with schema.default — wire-verified) — remove their WHERE/AND lines
//      from every SQL sample so samples show only meaningful inputs
//      (re-chaining WHERE/AND when the first condition is removed).
//   2. Remaining identifiers that stackql's parser cannot take bare —
//      hyphenated (`anthropic-user-profile-id`) or bracketed
//      (`created_at[gte]`, `group_by[]`) — are DOUBLE-QUOTED.
//      (Empirical: backtick-quoting is a stackql parser error for BOTH
//      shapes on v0.10.542 — double quotes are the only working form.)

import fs from 'node:fs';
import path from 'node:path';

function argOf(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
const docsDir = argOf('--docs-dir');
if (!docsDir) {
  console.error('usage: scrub-docs.mjs --docs-dir DIR');
  process.exit(1);
}

const AUTO_INJECTED = ['anthropic-version', 'anthropic-beta'];

// A WHERE/AND condition line for a given param, e.g.
//   "WHERE anthropic-version = '{{ anthropic-version }}'" or
//   "AND anthropic-beta = '{{ anthropic-beta }}' -- required"
function isAutoInjectedCond(line) {
  const m = /^(WHERE|AND)\s+(\S+)\s*=/.exec(line.trim());
  return m ? AUTO_INJECTED.includes(m[2].replace(/^"|"$/g, '')) : false;
}

function quoteIdentifier(name) {
  if (/^".*"$/.test(name)) return name;
  if (/[-[\]]/.test(name)) return `"${name}"`;
  return name;
}

function scrubSqlBlock(lines) {
  // drop auto-injected conditions
  let kept = lines.filter((l) => !isAutoInjectedCond(l));
  // re-chain: ensure the first surviving condition uses WHERE
  const isCond = (l) => /^(WHERE|AND)\s+\S+\s*=/.test(l.trim());
  let seenFirst = false;
  kept = kept.map((l) => {
    if (!isCond(l)) return l;
    const t = l.trim();
    const rest = t.replace(/^(WHERE|AND)\s+/, '');
    const out = (seenFirst ? 'AND ' : 'WHERE ') + rest;
    seenFirst = true;
    return out;
  });
  // drop a dangling WHERE with no conditions (nothing survived)
  // then double-quote awkward identifiers in surviving conditions
  kept = kept.map((l) => {
    const m = /^(WHERE|AND)\s+(\S+)(\s*=.*)$/.exec(l);
    if (!m) return l;
    return `${m[1]} ${quoteIdentifier(m[2])}${m[3]}`;
  });
  return kept;
}

let filesChanged = 0;
const stack = [docsDir];
while (stack.length) {
  const d = stack.pop();
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { stack.push(p); continue; }
    if (!/\.mdx?$/.test(e.name)) continue;
    const text = fs.readFileSync(p, 'utf8');
    const lines = text.split('\n');
    const out = [];
    let inSql = false, block = [];
    for (const line of lines) {
      if (!inSql && /^```sql\s*$/.test(line)) { inSql = true; out.push(line); block = []; continue; }
      if (inSql && /^```\s*$/.test(line)) { out.push(...scrubSqlBlock(block)); out.push(line); inSql = false; continue; }
      if (inSql) block.push(line);
      else out.push(line);
    }
    const next = out.join('\n');
    if (next !== text) { fs.writeFileSync(p, next); filesChanged++; }
  }
}
console.log(`scrub-docs: rewrote SQL samples in ${filesChanged} file(s) under ${docsDir}`);
