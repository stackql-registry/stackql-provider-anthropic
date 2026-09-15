#!/usr/bin/env node
// Stage the hand-authored anthropic_admin source specs for the shared
// normalize -> analyze -> generate chain.
//
//   node factory/admin-split.mjs
//
// The admin provider is docs-driven: provider-dev/source/*.yaml are the
// transcribed reference pages, one file per service, so "split" is a copy
// into provider-dev/source/split/ (the directory the chain consumes and
// normalize rewrites in place). Done in node rather than a shell one-liner
// so the npm script runs the same on Windows, WSL and CI.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(path.dirname(here), 'stackql_anthropic_admin_provider', 'provider-dev', 'source');
const splitDir = path.join(sourceDir, 'split');

fs.rmSync(splitDir, { recursive: true, force: true });
fs.mkdirSync(splitDir, { recursive: true });
const files = fs.readdirSync(sourceDir).filter((f) => /\.ya?ml$/.test(f)).sort();
for (const f of files) fs.copyFileSync(path.join(sourceDir, f), path.join(splitDir, f));
console.log(`admin-split: staged ${files.length} service specs into ${splitDir}`);
