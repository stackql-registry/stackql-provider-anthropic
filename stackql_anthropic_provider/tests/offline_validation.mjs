#!/usr/bin/env node

// Quick offline validation of the generated `anthropic` provider against
// the local file registry - no network, no server, no credentials. Runs
// SHOW SERVICES / SHOW RESOURCES / SHOW METHODS and DESCRIBE EXTENDED over
// representative resources and asserts the expected surface (12 services,
// 27 resources + 1 view), the verb mappings the CSV pins, and a structural
// pass over the generated documents (cursor pagination, LIMIT pushdown,
// header defaults, the auth block).
// Exit 1 on any failure.
//
// Usage: node stackql_anthropic_provider/tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe) in the repo root, then PATH.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const providerDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(providerDir, '..');
const regPath = path.join(providerDir, 'provider-dev', 'openapi').replace(/\\/g, '/');
const providerRoot = path.join(providerDir, 'provider-dev', 'openapi', 'src', 'anthropic', 'v00.00.00000');
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

const EXPECTED_SERVICES = [
  'agents', 'deployments', 'dreams', 'environments', 'files', 'memory_stores', 'messages', 'models',
  'sessions', 'skills', 'user_profiles', 'vaults',
];
// 27 API-derived resources + the vw_model_capabilities view
const EXPECTED_RESOURCES = {
  messages: ['batches', 'messages', 'token_counts'],
  models: ['models', 'vw_model_capabilities'],
  agents: ['agents', 'versions'],
  deployments: ['deployment_runs', 'deployments'],
  dreams: ['dreams'],
  environments: ['environments', 'work_items', 'work_stats'],
  files: ['files'],
  memory_stores: ['memories', 'memory_stores', 'memory_versions'],
  sessions: ['events', 'resources', 'sessions', 'thread_events', 'threads'],
  skills: ['skills', 'versions'],
  user_profiles: ['user_profiles'],
  vaults: ['credentials', 'vaults'],
};

console.log(`stackql: ${bin}`);
let r = await runSql('SHOW SERVICES IN anthropic');
check(`SHOW SERVICES (${EXPECTED_SERVICES.length})`, r.rows.length === EXPECTED_SERVICES.length && EXPECTED_SERVICES.every((s) => r.rows.some((x) => x.name === s)), r.stderr || JSON.stringify(r.rows.map((x) => x.name)));

for (const [svc, expected] of Object.entries(EXPECTED_RESOURCES)) {
  r = await runSql(`SHOW RESOURCES IN anthropic.${svc}`);
  const names = r.rows.map((x) => x.name).sort();
  check(`SHOW RESOURCES IN anthropic.${svc} (${expected.length})`, JSON.stringify(names) === JSON.stringify(expected), r.stderr || JSON.stringify(names));
}

const methodsOf = async (res) => {
  const q = await runSql(`SHOW METHODS IN anthropic.${res}`);
  return { rows: q.rows, byName: Object.fromEntries(q.rows.map((m) => [m.MethodName, m])), stderr: q.stderr };
};
const verb = (m) => (m ? m.SQLVerb : undefined);

// messages: inference is a SELECT over a POST; batches carry the lifecycle
let m = await methodsOf('messages.messages');
check('messages.messages.create is a SELECT over POST /v1/messages', m.rows.length === 1 && verb(m.byName.create) === 'SELECT', JSON.stringify(m.byName));
check('messages.messages.create requires the body fields (model, messages, max_tokens)', ['model', 'messages', 'max_tokens'].every((p) => String(m.byName.create?.RequiredParams || '').includes(p)), JSON.stringify(m.byName.create));
m = await methodsOf('messages.token_counts');
check('messages.token_counts.count_tokens is a SELECT (divergent shape split)', verb(m.byName.count_tokens) === 'SELECT', JSON.stringify(m.byName));
m = await methodsOf('messages.batches');
check('messages.batches verbs: list/get SELECT, create INSERT, delete DELETE, cancel/results EXEC', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.delete) === 'DELETE' && verb(m.byName.cancel) === 'EXEC' && verb(m.byName.results) === 'EXEC', JSON.stringify(m.byName));
check('messages.batches.list has no required params (headers are optional, defaults injected)', m.byName.list && !String(m.byName.list.RequiredParams || '').trim(), JSON.stringify(m.byName.list));

// models
m = await methodsOf('models.models');
check('models.models list/get are SELECT', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && String(m.byName.get?.RequiredParams || '').includes('model_id'), JSON.stringify(m.byName));

// files (GA since the 2026-09 spec): multipart upload and binary download are EXEC
m = await methodsOf('files.files');
check('files.files verbs: list/get SELECT, delete DELETE, upload/download EXEC', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.delete) === 'DELETE' && verb(m.byName.upload) === 'EXEC' && verb(m.byName.download) === 'EXEC', JSON.stringify(m.byName));

// skills (GA): multipart creates are exec-only in the documents (absent from
// every sqlVerbs list); the beta-only content download survives as
// versions.download. NOTE: stackql v0.11.669 reports a `create`-named method
// that is in no sqlVerbs list as INSERT in SHOW METHODS (name-based
// inference; v0.10.542 said EXEC) - the document is asserted structurally
// below, SHOW METHODS accepts either spelling.
m = await methodsOf('skills.skills');
check('skills.skills verbs: list/get SELECT, delete DELETE, create not SELECT/UPDATE/DELETE (multipart, exec-only)', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.delete) === 'DELETE' && ['EXEC', 'INSERT'].includes(verb(m.byName.create)), JSON.stringify(m.byName));
m = await methodsOf('skills.versions');
check('skills.versions verbs: list/get SELECT, delete DELETE, download EXEC, create exec-only', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.delete) === 'DELETE' && verb(m.byName.download) === 'EXEC' && ['EXEC', 'INSERT'].includes(verb(m.byName.create)), JSON.stringify(m.byName));

// agents lifecycle
m = await methodsOf('agents.agents');
check('agents.agents verbs: list/get SELECT, create INSERT, update UPDATE, archive EXEC', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.update) === 'UPDATE' && verb(m.byName.archive) === 'EXEC', JSON.stringify(m.byName));

// dreams (new 2026-09 research-preview service)
m = await methodsOf('dreams.dreams');
check('dreams.dreams verbs: list/get SELECT, create INSERT, cancel/archive EXEC', m.rows.length === 5 && verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.create) === 'INSERT' && verb(m.byName.cancel) === 'EXEC' && verb(m.byName.archive) === 'EXEC', JSON.stringify(m.byName));

// environments: reserved-word rename and signature relocation
m = await methodsOf('environments.work_items');
check('environments.work_items (reserved word `work` renamed) list/get/update + poll/ack/heartbeat/stop EXEC', verb(m.byName.list) === 'SELECT' && verb(m.byName.get) === 'SELECT' && verb(m.byName.update) === 'UPDATE' && ['poll', 'ack', 'heartbeat', 'stop'].every((x) => verb(m.byName[x]) === 'EXEC'), JSON.stringify(m.byName));
m = await methodsOf('environments.work_stats');
check('environments.work_stats.get relocated out of work_items (signature clash)', m.rows.length === 1 && verb(m.byName.get) === 'SELECT', JSON.stringify(m.byName));

// DESCRIBE EXTENDED on representative resources
r = await runSql('DESCRIBE EXTENDED anthropic.messages.messages');
let cols = r.rows.map((c) => c.name);
check('DESCRIBE messages.messages columns', ['id', 'model', 'role', 'content', 'stop_reason', 'usage'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic.messages.token_counts');
cols = r.rows.map((c) => c.name);
check('DESCRIBE messages.token_counts projects input_tokens', cols.includes('input_tokens'), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic.files.files');
cols = r.rows.map((c) => c.name);
check('DESCRIBE files.files columns (GA FileMetadataSchema)', ['id', 'filename', 'mime_type', 'size_bytes', 'created_at', 'downloadable'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic.dreams.dreams');
cols = r.rows.map((c) => c.name);
check('DESCRIBE dreams.dreams columns', ['id', 'status', 'inputs', 'outputs', 'model', 'created_at', 'ended_at', 'archived_at'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic.agents.agents');
cols = r.rows.map((c) => c.name);
check('DESCRIBE agents.agents columns', ['id', 'name', 'model', 'version', 'tools', 'updated_at'].every((c) => cols.includes(c)), JSON.stringify(cols));
r = await runSql('DESCRIBE EXTENDED anthropic.models.vw_model_capabilities');
cols = r.rows.map((c) => c.name);
check('DESCRIBE models.vw_model_capabilities (view) fans capability flags out', ['id', 'display_name', 'thinking', 'image_input', 'batch'].every((c) => cols.includes(c)), JSON.stringify(cols));

// structural pass over the generated documents
const docs = Object.fromEntries(fs.readdirSync(servicesDir).filter((f) => f.endsWith('.yaml')).map((f) => [f, yaml.load(fs.readFileSync(path.join(servicesDir, f), 'utf8'))]));
const methods = (f, res) => docs[f].components['x-stackQL-resources'][res].methods;
const opOf = (f, ref) => {
  const parts = ref.replace(/^#\/paths\//, '').split('/');
  const v = parts.pop();
  return docs[f].paths[parts.join('/').replace(/~1/g, '/')][v];
};
const paramsOf = (f, op) => (op.parameters || []).map((p) => (p.$ref ? docs[f].components.parameters[p.$ref.split('/').pop()] : p));

check('agents.agents.list carries cursor pagination (page / $.next_page)', methods('agents.yaml', 'agents').list.config?.pagination?.requestToken?.key === 'page' && methods('agents.yaml', 'agents').list.config.pagination.responseToken.key === '$.next_page');
check('files.files.list carries cursor pagination (GA files list moved to page / next_page)', methods('files.yaml', 'files').list.config?.pagination?.requestToken?.key === 'page');
check('models.models.list has NO pagination config (after_id list)', !methods('models.yaml', 'models').list.config?.pagination);
check('messages.batches.list has NO pagination config (after_id list)', !methods('messages.yaml', 'batches').list.config?.pagination);
let paginated = 0, pushdowns = 0, bodyBound = 0;
// (views such as vw_model_capabilities have no methods)
for (const d of Object.values(docs)) for (const res of Object.values(d.components['x-stackQL-resources'])) for (const mm of Object.values(res.methods || {})) {
  if (mm.config?.pagination) paginated++;
  if (mm.config?.queryParamPushdown?.top) pushdowns++;
  if (mm.config?.requestBodyTranslate?.algorithm === 'naive' && mm.request?.mediaType) bodyBound++;
}
const sqlVerbNames = (f, res) => Object.values(docs[f].components['x-stackQL-resources'][res].sqlVerbs || {}).flat().map((x) => x.$ref.split('/').pop());
check('multipart uploads/creates are exec-only in the documents (files.upload, skills.create, skills.versions.create in no sqlVerbs list)', !sqlVerbNames('files.yaml', 'files').includes('upload') && !sqlVerbNames('skills.yaml', 'skills').includes('create') && !sqlVerbNames('skills.yaml', 'versions').includes('create'));
check('dreams.dreams sqlVerbs: select get/list, insert create; cancel/archive exec-only', JSON.stringify(sqlVerbNames('dreams.yaml', 'dreams').sort()) === JSON.stringify(['create', 'get', 'list']));
check('21 cursor-paginated list methods', paginated === 21, `got ${paginated}`);
check('23 LIMIT (top) pushdowns', pushdowns === 23, `got ${pushdowns}`);
check('30 body-bearing methods bound (naive translate + request.mediaType)', bodyBound === 30, `got ${bodyBound}`);
check('messages.messages.create is bound to application/json with naive translate', methods('messages.yaml', 'messages').create.request?.mediaType === 'application/json' && methods('messages.yaml', 'messages').create.config?.requestBodyTranslate?.algorithm === 'naive');

// header parameter policy
let requiredHeaders = 0, versionDefaults = 0, opsTotal = 0;
for (const [f, d] of Object.entries(docs)) {
  for (const item of Object.values(d.paths)) for (const v of ['get', 'post', 'put', 'patch', 'delete']) {
    if (!item[v]) continue;
    opsTotal++;
    const ps = paramsOf(f, item[v]);
    for (const p of ps) if (p.in === 'header' && p.required) requiredHeaders++;
    if (ps.some((p) => p.in === 'header' && p.name === 'anthropic-version' && p.schema?.default === '2023-06-01')) versionDefaults++;
  }
}
check('no required header parameters', requiredHeaders === 0, `got ${requiredHeaders}`);
check(`anthropic-version default 2023-06-01 on every op (${opsTotal})`, versionDefaults === opsTotal, `${versionDefaults}/${opsTotal}`);
const betaOf = (f, ref) => paramsOf(f, opOf(f, ref)).find((p) => p.in === 'header' && p.name === 'anthropic-beta');
check('agents list: anthropic-beta default managed-agents-2026-04-01', betaOf('agents.yaml', methods('agents.yaml', 'agents').list.operation.$ref)?.schema?.default === 'managed-agents-2026-04-01');
check('dreams list: anthropic-beta default dreaming-2026-04-21', betaOf('dreams.yaml', methods('dreams.yaml', 'dreams').list.operation.$ref)?.schema?.default === 'dreaming-2026-04-21');
check('user_profiles list: anthropic-beta default user-profiles-2026-08-18', betaOf('user_profiles.yaml', methods('user_profiles.yaml', 'user_profiles').list.operation.$ref)?.schema?.default === 'user-profiles-2026-08-18');
const skillDl = betaOf('skills.yaml', methods('skills.yaml', 'versions').download.operation.$ref);
check('skills.versions.download (beta-keyed, no SDK flag): anthropic-beta optional with NO default', skillDl && skillDl.required === false && skillDl.schema?.default === undefined, JSON.stringify(skillDl));
check('files list (GA path): no anthropic-beta param', !betaOf('files.yaml', methods('files.yaml', 'files').list.operation.$ref));
const wsParam = paramsOf('models.yaml', opOf('models.yaml', methods('models.yaml', 'models').list.operation.$ref)).find((p) => p.name === 'anthropic-workspace-id');
check('anthropic-workspace-id is an optional header param on models list', wsParam && wsParam.in === 'header' && wsParam.required === false, JSON.stringify(wsParam));
check('no anyOf/oneOf/allOf/additionalProperties in any service document', Object.entries(docs).every(([f]) => !/(anyOf|oneOf|allOf|additionalProperties):/.test(fs.readFileSync(path.join(servicesDir, f), 'utf8'))));
check('every service document has a fixed api.anthropic.com server', Object.values(docs).every((d) => d.servers?.[0]?.url === 'https://api.anthropic.com' && !d.servers[0].variables));
const provider = yaml.load(fs.readFileSync(path.join(providerRoot, 'provider.yaml'), 'utf8'));
check('provider auth: custom x-api-key header from ANTHROPIC_API_KEY', provider.config?.auth?.type === 'custom' && provider.config.auth.location === 'header' && provider.config.auth.name === 'x-api-key' && provider.config.auth.credentialsenvvar === 'ANTHROPIC_API_KEY', JSON.stringify(provider.config));
check(`provider.yaml lists the ${EXPECTED_SERVICES.length} services`, JSON.stringify(Object.keys(provider.providerServices).sort()) === JSON.stringify([...EXPECTED_SERVICES].sort()), JSON.stringify(Object.keys(provider.providerServices)));

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
