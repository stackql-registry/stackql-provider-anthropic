#!/usr/bin/env node
// ONE-TIME bootstrap review of all_services.csv for the `anthropic`
// provider. This encodes the human mapping review (CLAUDE.md few-shots):
// resource splits for divergent select shapes, reserved-word renames,
// signature-clash relocations, exec routing for lifecycle/multipart/JSONL
// ops, SELECT routing for inference ops.
//
// After this runs once and the result is committed, the CSV is APPEND-ONLY:
// provider-utils analyze appends new upstream ops with derived defaults and
// the review happens as a CSV edit in the PR, not by re-running this.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(
  path.dirname(here), 'stackql_anthropic_provider', 'provider-dev', 'config', 'all_services.csv');

// filename::path::httpverb → [resource, method, sqlVerb, objectKey]
const REVIEW = {
  // ---- messages (3 resources: messages, token_counts, batches) ----
  'messages.yaml::/v1/messages::post': ['messages', 'create', 'select', ''],
  'messages.yaml::/v1/messages/count_tokens::post': ['token_counts', 'count_tokens', 'select', ''],
  'messages.yaml::/v1/messages/batches::post': ['batches', 'create', 'insert', ''],
  'messages.yaml::/v1/messages/batches::get': ['batches', 'list', 'select', '$.data'],
  'messages.yaml::/v1/messages/batches/{message_batch_id}::get': ['batches', 'get', 'select', ''],
  'messages.yaml::/v1/messages/batches/{message_batch_id}::delete': ['batches', 'delete', 'delete', ''],
  'messages.yaml::/v1/messages/batches/{message_batch_id}/cancel::post': ['batches', 'cancel', 'exec', ''],
  'messages.yaml::/v1/messages/batches/{message_batch_id}/results::get': ['batches', 'results', 'exec', ''], // JSONL stream

  // ---- models ----
  'models.yaml::/v1/models::get': ['models', 'list', 'select', '$.data'],
  'models.yaml::/v1/models/{model_id}::get': ['models', 'get', 'select', ''],

  // ---- completions (legacy /v1/complete — inference → SELECT) ----
  'completions.yaml::/v1/complete::post': ['completions', 'create', 'select', ''],

  // ---- agents (agents, versions) ----
  'agents.yaml::/v1/agents?beta=true::get': ['agents', 'list', 'select', '$.data'],
  'agents.yaml::/v1/agents?beta=true::post': ['agents', 'create', 'insert', ''],
  'agents.yaml::/v1/agents/{agent_id}?beta=true::get': ['agents', 'get', 'select', ''],
  'agents.yaml::/v1/agents/{agent_id}?beta=true::post': ['agents', 'update', 'update', ''],
  'agents.yaml::/v1/agents/{agent_id}/archive?beta=true::post': ['agents', 'archive', 'exec', ''],
  'agents.yaml::/v1/agents/{agent_id}/versions?beta=true::get': ['versions', 'list', 'select', '$.data'],

  // ---- deployments (deployments, deployment_runs) ----
  'deployments.yaml::/v1/deployments?beta=true::get': ['deployments', 'list', 'select', '$.data'],
  'deployments.yaml::/v1/deployments?beta=true::post': ['deployments', 'create', 'insert', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}?beta=true::get': ['deployments', 'get', 'select', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}?beta=true::post': ['deployments', 'update', 'update', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}/archive?beta=true::post': ['deployments', 'archive', 'exec', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}/pause?beta=true::post': ['deployments', 'pause', 'exec', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}/unpause?beta=true::post': ['deployments', 'unpause', 'exec', ''],
  'deployments.yaml::/v1/deployments/{deployment_id}/run?beta=true::post': ['deployments', 'run', 'exec', ''],
  'deployments.yaml::/v1/deployment_runs?beta=true::get': ['deployment_runs', 'list', 'select', '$.data'],
  'deployments.yaml::/v1/deployment_runs/{deployment_run_id}?beta=true::get': ['deployment_runs', 'get', 'select', ''],

  // ---- environments (environments, work_items [reserved-word rename], work_stats [signature relocation]) ----
  'environments.yaml::/v1/environments?beta=true::get': ['environments', 'list', 'select', '$.data'],
  'environments.yaml::/v1/environments?beta=true::post': ['environments', 'create', 'insert', ''],
  'environments.yaml::/v1/environments/{environment_id}?beta=true::get': ['environments', 'get', 'select', ''],
  'environments.yaml::/v1/environments/{environment_id}?beta=true::post': ['environments', 'update', 'update', ''],
  'environments.yaml::/v1/environments/{environment_id}?beta=true::delete': ['environments', 'delete', 'delete', ''],
  'environments.yaml::/v1/environments/{environment_id}/archive?beta=true::post': ['environments', 'archive', 'exec', ''],
  'environments.yaml::/v1/environments/{environment_id}/work?beta=true::get': ['work_items', 'list', 'select', '$.data'],
  'environments.yaml::/v1/environments/{environment_id}/work/{work_id}?beta=true::get': ['work_items', 'get', 'select', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/{work_id}?beta=true::post': ['work_items', 'update', 'update', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/poll?beta=true::get': ['work_items', 'poll', 'exec', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/{work_id}/ack?beta=true::post': ['work_items', 'ack', 'exec', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/{work_id}/heartbeat?beta=true::post': ['work_items', 'heartbeat', 'exec', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/{work_id}/stop?beta=true::post': ['work_items', 'stop', 'exec', ''],
  'environments.yaml::/v1/environments/{environment_id}/work/stats?beta=true::get': ['work_stats', 'get', 'select', ''],

  // ---- files (multipart upload + binary download → exec) ----
  'files.yaml::/v1/files?beta=true::get': ['files', 'list', 'select', '$.data'],
  'files.yaml::/v1/files?beta=true::post': ['files', 'upload', 'exec', ''],
  'files.yaml::/v1/files/{file_id}?beta=true::get': ['files', 'get', 'select', ''],
  'files.yaml::/v1/files/{file_id}?beta=true::delete': ['files', 'delete', 'delete', ''],
  'files.yaml::/v1/files/{file_id}/content?beta=true::get': ['files', 'download', 'exec', ''],

  // ---- memory_stores (memory_stores, memories, memory_versions) ----
  'memory_stores.yaml::/v1/memory_stores?beta=true::get': ['memory_stores', 'list', 'select', '$.data'],
  'memory_stores.yaml::/v1/memory_stores?beta=true::post': ['memory_stores', 'create', 'insert', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}?beta=true::get': ['memory_stores', 'get', 'select', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}?beta=true::post': ['memory_stores', 'update', 'update', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}?beta=true::delete': ['memory_stores', 'delete', 'delete', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/archive?beta=true::post': ['memory_stores', 'archive', 'exec', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memories?beta=true::get': ['memories', 'list', 'select', '$.data'],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memories?beta=true::post': ['memories', 'create', 'insert', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memories/{memory_id}?beta=true::get': ['memories', 'get', 'select', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memories/{memory_id}?beta=true::post': ['memories', 'update', 'update', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memories/{memory_id}?beta=true::delete': ['memories', 'delete', 'delete', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memory_versions?beta=true::get': ['memory_versions', 'list', 'select', '$.data'],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memory_versions/{memory_version_id}?beta=true::get': ['memory_versions', 'get', 'select', ''],
  'memory_stores.yaml::/v1/memory_stores/{memory_store_id}/memory_versions/{memory_version_id}/redact?beta=true::post': ['memory_versions', 'redact', 'exec', ''],

  // ---- sessions (sessions, events, resources, threads, thread_events) ----
  'sessions.yaml::/v1/sessions?beta=true::get': ['sessions', 'list', 'select', '$.data'],
  'sessions.yaml::/v1/sessions?beta=true::post': ['sessions', 'create', 'insert', ''],
  'sessions.yaml::/v1/sessions/{session_id}?beta=true::get': ['sessions', 'get', 'select', ''],
  'sessions.yaml::/v1/sessions/{session_id}?beta=true::post': ['sessions', 'update', 'update', ''],
  'sessions.yaml::/v1/sessions/{session_id}?beta=true::delete': ['sessions', 'delete', 'delete', ''],
  'sessions.yaml::/v1/sessions/{session_id}/archive?beta=true::post': ['sessions', 'archive', 'exec', ''],
  'sessions.yaml::/v1/sessions/{session_id}/events?beta=true::get': ['events', 'list', 'select', '$.data'],
  'sessions.yaml::/v1/sessions/{session_id}/events?beta=true::post': ['events', 'send', 'exec', ''],
  'sessions.yaml::/v1/sessions/{session_id}/resources?beta=true::get': ['resources', 'list', 'select', '$.data'],
  'sessions.yaml::/v1/sessions/{session_id}/resources?beta=true::post': ['resources', 'add', 'exec', ''],
  'sessions.yaml::/v1/sessions/{session_id}/resources/{resource_id}?beta=true::get': ['resources', 'get', 'select', ''],
  'sessions.yaml::/v1/sessions/{session_id}/resources/{resource_id}?beta=true::post': ['resources', 'update', 'update', ''],
  'sessions.yaml::/v1/sessions/{session_id}/resources/{resource_id}?beta=true::delete': ['resources', 'delete', 'delete', ''],
  'sessions.yaml::/v1/sessions/{session_id}/threads?beta=true::get': ['threads', 'list', 'select', '$.data'],
  'sessions.yaml::/v1/sessions/{session_id}/threads/{thread_id}?beta=true::get': ['threads', 'get', 'select', ''],
  'sessions.yaml::/v1/sessions/{session_id}/threads/{thread_id}/archive?beta=true::post': ['threads', 'archive', 'exec', ''],
  'sessions.yaml::/v1/sessions/{session_id}/threads/{thread_id}/events?beta=true::get': ['thread_events', 'list', 'select', '$.data'],

  // ---- skills (skills, versions) ----
  'skills.yaml::/v1/skills?beta=true::get': ['skills', 'list', 'select', '$.data'],
  'skills.yaml::/v1/skills?beta=true::post': ['skills', 'create', 'insert', ''],
  'skills.yaml::/v1/skills/{skill_id}?beta=true::get': ['skills', 'get', 'select', ''],
  'skills.yaml::/v1/skills/{skill_id}?beta=true::delete': ['skills', 'delete', 'delete', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions?beta=true::get': ['versions', 'list', 'select', '$.data'],
  'skills.yaml::/v1/skills/{skill_id}/versions?beta=true::post': ['versions', 'create', 'insert', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions/{version}?beta=true::get': ['versions', 'get', 'select', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions/{version}?beta=true::delete': ['versions', 'delete', 'delete', ''],
  'skills.yaml::/v1/skills/{skill_id}/versions/{version}/content?beta=true::get': ['versions', 'download', 'exec', ''],

  // ---- user_profiles ----
  'user_profiles.yaml::/v1/user_profiles?beta=true::get': ['user_profiles', 'list', 'select', '$.data'],
  'user_profiles.yaml::/v1/user_profiles?beta=true::post': ['user_profiles', 'create', 'insert', ''],
  'user_profiles.yaml::/v1/user_profiles/{user_profile_id}?beta=true::get': ['user_profiles', 'get', 'select', ''],
  'user_profiles.yaml::/v1/user_profiles/{user_profile_id}?beta=true::post': ['user_profiles', 'update', 'update', ''],
  'user_profiles.yaml::/v1/user_profiles/{user_profile_id}/enrollment_url?beta=true::post': ['user_profiles', 'create_enrollment_url', 'exec', ''],

  // ---- vaults (vaults, credentials) ----
  'vaults.yaml::/v1/vaults?beta=true::get': ['vaults', 'list', 'select', '$.data'],
  'vaults.yaml::/v1/vaults?beta=true::post': ['vaults', 'create', 'insert', ''],
  'vaults.yaml::/v1/vaults/{vault_id}?beta=true::get': ['vaults', 'get', 'select', ''],
  'vaults.yaml::/v1/vaults/{vault_id}?beta=true::post': ['vaults', 'update', 'update', ''],
  'vaults.yaml::/v1/vaults/{vault_id}?beta=true::delete': ['vaults', 'delete', 'delete', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/archive?beta=true::post': ['vaults', 'archive', 'exec', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials?beta=true::get': ['credentials', 'list', 'select', '$.data'],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials?beta=true::post': ['credentials', 'create', 'insert', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials/{credential_id}?beta=true::get': ['credentials', 'get', 'select', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials/{credential_id}?beta=true::post': ['credentials', 'update', 'update', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials/{credential_id}?beta=true::delete': ['credentials', 'delete', 'delete', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials/{credential_id}/archive?beta=true::post': ['credentials', 'archive', 'exec', ''],
  'vaults.yaml::/v1/vaults/{vault_id}/credentials/{credential_id}/mcp_oauth_validate?beta=true::post': ['credentials', 'mcp_oauth_validate', 'exec', ''],
};

const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
const seen = new Set();
const out = lines.map((line, idx) => {
  if (idx === 0 || !line.trim()) return line;
  const c = line.split(',');
  const key = `${c[0]}::${c[1]}::${c[4]}`;
  const r = REVIEW[key];
  if (!r) {
    console.error(`UNREVIEWED row: ${key}`);
    process.exitCode = 1;
    return line;
  }
  seen.add(key);
  c[8] = r[0]; c[9] = r[1]; c[10] = r[2]; c[11] = r[3];
  return c.join(',');
});
for (const key of Object.keys(REVIEW)) {
  if (!seen.has(key)) {
    console.error(`REVIEW entry matched no CSV row: ${key}`);
    process.exitCode = 1;
  }
}
if (process.exitCode) process.exit(process.exitCode);
fs.writeFileSync(csvPath, out.join('\n'));
console.log(`reviewed ${seen.size} rows`);
