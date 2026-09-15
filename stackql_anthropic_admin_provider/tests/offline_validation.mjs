#!/usr/bin/env node

// Quick offline validation of the generated `anthropic_admin` provider
// against the local file registry - no network, no server, no credentials.
// Runs SHOW SERVICES / SHOW RESOURCES / SHOW METHODS and DESCRIBE EXTENDED
// over the admin surface and asserts the expected shape (6 services, 11
// resources, 27 methods), the verb policy (api_keys list/get/update only),
// the report row shape ($.data buckets), and a structural pass over the
// generated documents (cursor pagination on reports and rate limits only,
// LIMIT pushdown, optional headers, the auth block).
// Exit 1 on any failure.
//
// Usage: node stackql_anthropic_admin_provider/tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe) in the repo root, then PATH.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const providerDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(providerDir, '..');
const regPath = path.join(providerDir, 'provider-dev', 'openapi').replace(/\\/g, '/');
const providerRoot = path.join(providerDir, 'provider-dev', 'openapi', 'src', 'anthropic_admin', 'v00.00.00000');
const servicesDir = path.join(providerRoot, 'services');
const registry = JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });

function findBinary() {
  if (process.env.STACKQL && fs.existsSync(process.env.STACKQL)) return process.env.STACKQL;
  for (const name of ['stackql', 'stackql.exe']) {
    const local = path.join(repoRoot, name);
    if (fs.existsSync(local)) return local;
  }
  return 'stackql'; // PATH
}
const bin = findBinary();

function runSql(sql) {
  return new Promise((resolve) => {
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env: process.env });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      let rows = [];
      try { rows = JSON.parse(stdout) ?? []; } catch { rows = []; }
      resolve({ code, rows, stdout, stderr });
    });
    child.on('error', (err) => resolve({ code: -1, rows: [], stdout: '', stderr: String(err) }));
  });
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  [${String(note).slice(0, 200)}]`}`);
}

const EXPECTED_SERVICES = ['api_keys', 'cost', 'organization', 'rate_limits', 'usage', 'workspaces'];
const EXPECTED_RESOURCES = {
  organization: ['invites', 'organization', 'users'],
  workspaces: ['members', 'rate_limits', 'workspaces'],
  api_keys: ['api_keys'],
  usage: ['claude_code_reports', 'usage_reports'],
  cost: ['cost_reports'],
  rate_limits: ['rate_limits'],
};

console.log(`stackql: ${bin}`);
let r = await runSql('SHOW SERVICES IN anthropic_admin');
check(`SHOW SERVICES (${EXPECTED_SERVICES.length})`, r.rows.length === EXPECTED_SERVICES.length && EXPECTED_SERVICES.every((s) => r.rows.some((x) => x.name === s)), r.stderr || JSON.stringify(r.rows.map((x) => x.name)));

for (const [svc, expected] of Object.entries(EXPECTED_RESOURCES)) {
  r = await runSql(`SHOW RESOURCES IN anthropic_admin.${svc}`);
  const names = r.rows.map((x) => x.name).sort();
  check(`SHOW RESOURCES IN anthropic_admin.${svc} (${expected.length})`, JSON.stringify(names) === JSON.stringify(expected), r.stderr || JSON.stringify(names));
}

const methodsOf = async (res) => {
  const q = await runSql(`SHOW METHODS IN anthropic_admin.${res}`);
  return { rows: q.rows, byName: Object.fromEntries(q.rows.map((m) => [m.MethodName, m])), stderr: q.stderr };
};
const verb = (m) => (m ? m.SQLVerb : undefined);

let m = await methodsOf('organization.organization');
check('organization.organization.get is the single SELECT over /v1/organizations/me', m.rows.length === 1 && verb(m.byName.get) === 'SELECT' && !String(m.byName.get.RequiredParams || '').trim(), JSON.stringify(m.byName));
m = await methodsOf('organization.users');
check('organization.users verbs: list/get SELECT, update UPDATE, delete DELETE', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.update) === 'UPDATE' && verb(m.byName.delete) === 'DELETE', JSON.stringify(m.byName));
m = await methodsOf('organization.invites');
check('organization.invites verbs: list/get SELECT, create INSERT, delete DELETE', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.delete) === 'DELETE', JSON.stringify(m.byName));
m = await methodsOf('workspaces.workspaces');
check('workspaces.workspaces verbs: list/get SELECT, create INSERT, update UPDATE, archive EXEC', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.update) === 'UPDATE' && verb(m.byName.archive) === 'EXEC', JSON.stringify(m.byName));
m = await methodsOf('workspaces.members');
check('workspaces.members verbs: list/get SELECT, create INSERT, update UPDATE, delete DELETE', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.update) === 'UPDATE' && verb(m.byName.delete) === 'DELETE', JSON.stringify(m.byName));
m = await methodsOf('api_keys.api_keys');
check('api_keys.api_keys: list/get SELECT + update UPDATE ONLY (the API forbids create/delete)', m.rows.length === 3 && verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.update) === 'UPDATE', JSON.stringify(m.byName));
m = await methodsOf('usage.usage_reports');
check('usage.usage_reports.list is a SELECT requiring starting_at only (ending_at optional)', verb(m.byName.list) === 'SELECT' && String(m.byName.list?.RequiredParams || '').trim() === 'starting_at', JSON.stringify(m.byName.list));
m = await methodsOf('cost.cost_reports');
check('cost.cost_reports.list is a SELECT requiring starting_at only', verb(m.byName.list) === 'SELECT' && String(m.byName.list?.RequiredParams || '').trim() === 'starting_at', JSON.stringify(m.byName.list));
m = await methodsOf('rate_limits.rate_limits');
check('rate_limits.rate_limits.list is a SELECT with no required params', verb(m.byName.list) === 'SELECT' && !String(m.byName.list?.RequiredParams || '').trim(), JSON.stringify(m.byName));

// DESCRIBE EXTENDED
r = await runSql('DESCRIBE EXTENDED anthropic_admin.usage.usage_reports');
let cols = r.rows.map((c) => c.name);
check('DESCRIBE usage.usage_reports: row per bucket (starting_at, ending_at, results JSON)', ['starting_at', 'ending_at', 'results'].every((c) => cols.includes(c)) && !cols.includes('data'), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic_admin.cost.cost_reports');
cols = r.rows.map((c) => c.name);
check('DESCRIBE cost.cost_reports: row per bucket', ['starting_at', 'ending_at', 'results'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic_admin.usage.claude_code_reports');
cols = r.rows.map((c) => c.name);
check('DESCRIBE usage.claude_code_reports: flat records (date, actor, core_metrics)', ['date', 'actor', 'core_metrics', 'terminal_type'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic_admin.api_keys.api_keys');
cols = r.rows.map((c) => c.name);
check('DESCRIBE api_keys.api_keys columns', ['id', 'name', 'workspace_id', 'status', 'partial_key_hint', 'created_by'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic_admin.workspaces.workspaces');
cols = r.rows.map((c) => c.name);
check('DESCRIBE workspaces.workspaces columns', ['id', 'name', 'archived_at', 'created_at', 'display_color'].every((c) => cols.includes(c)), JSON.stringify(cols));

// structural pass over the generated documents
const docs = Object.fromEntries(fs.readdirSync(servicesDir).filter((f) => f.endsWith('.yaml')).map((f) => [f, yaml.load(fs.readFileSync(path.join(servicesDir, f), 'utf8'))]));
const methods = (f, res) => docs[f].components['x-stackQL-resources'][res].methods;
const paginatedNames = [];
let pushdowns = 0;
for (const [f, d] of Object.entries(docs)) for (const [rn, res] of Object.entries(d.components['x-stackQL-resources'])) for (const [mn, mm] of Object.entries(res.methods)) {
  if (mm.config?.pagination) paginatedNames.push(`${f.replace('.yaml', '')}.${rn}.${mn}`);
  if (mm.config?.queryParamPushdown?.top) pushdowns++;
}
check('cursor pagination on the 5 report / rate-limit methods only', JSON.stringify(paginatedNames.sort()) === JSON.stringify(['cost.cost_reports.list', 'rate_limits.rate_limits.list', 'usage.claude_code_reports.list', 'usage.usage_reports.list', 'workspaces.rate_limits.list']), JSON.stringify(paginatedNames));
check('entity lists (users/invites/workspaces/members/api_keys) have NO pagination config (after_id lists)', !methods('organization.yaml', 'users').list.config?.pagination && !methods('workspaces.yaml', 'workspaces').list.config?.pagination && !methods('api_keys.yaml', 'api_keys').list.config?.pagination);
check('8 LIMIT (top) pushdowns', pushdowns === 8, `got ${pushdowns}`);
check('usage_reports objectKey $.data (row per bucket)', methods('usage.yaml', 'usage_reports').list.response?.objectKey === '$.data');
let requiredHeaders = 0, fastModeDefault = false;
for (const d of Object.values(docs)) {
  for (const p of Object.values(d.components?.parameters || {})) if (p.in === 'header' && p.required) requiredHeaders++;
  for (const item of Object.values(d.paths)) for (const v of ['get', 'post', 'put', 'patch', 'delete']) for (const p of item[v]?.parameters || []) {
    if (p.in === 'header' && p.required) requiredHeaders++;
    if (p.in === 'header' && p.name === 'anthropic-beta' && p.schema?.default) fastModeDefault = true;
  }
}
check('no required header parameters', requiredHeaders === 0, `got ${requiredHeaders}`);
check('fast-mode anthropic-beta header is optional with NO default (resolved admin question d)', !fastModeDefault);
check('every service document has a fixed api.anthropic.com server', Object.values(docs).every((d) => d.servers?.[0]?.url === 'https://api.anthropic.com' && !d.servers[0].variables));
check('no anyOf/oneOf/allOf/additionalProperties in any service document', Object.keys(docs).every((f) => !/(anyOf|oneOf|allOf|additionalProperties):/.test(fs.readFileSync(path.join(servicesDir, f), 'utf8'))));
const provider = yaml.load(fs.readFileSync(path.join(providerRoot, 'provider.yaml'), 'utf8'));
check('provider auth: custom x-api-key header from ANTHROPIC_ADMIN_KEY', provider.config?.auth?.type === 'custom' && provider.config.auth.name === 'x-api-key' && provider.config.auth.credentialsenvvar === 'ANTHROPIC_ADMIN_KEY', JSON.stringify(provider.config));

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
