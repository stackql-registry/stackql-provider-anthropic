#!/usr/bin/env node
// Wire-contract-enforcing mock of api.anthropic.com for the smoke suite.
//
// It REJECTS wire-contract violations rather than being permissive:
//   - missing `x-api-key` header                        → 401
//   - missing `anthropic-version` header                → 400
//   - beta path (`beta=true` query) without a correct
//     `anthropic-beta` header                           → 400
//
// It also serves a 2-page cursor list on /v1/agents (page/next_page) to
// prove stackql's auto-pagination walks, an after_id-style single page on
// /v1/messages/batches and /v1/models, and a stateful agents store for the
// INSERT/SELECT/UPDATE/EXEC-archive lifecycle.
//
// Admin endpoints (/v1/organizations/*) enforce the same contract for the
// anthropic_admin provider and additionally answer the four "admin open
// questions" empirically (report row shape, array query params, ending_at,
// fast-mode header).
//
//   node mock-server.cjs [port]     (default 8990)
//
// GET /__requests returns the request journal (method, path, headers subset,
// parsed query) so tests can assert on what actually hit the wire.

const http = require('http');
const { URL } = require('url');

const port = Number(process.argv[2] || 8990);

const BETA_FLAGS = {
  '/v1/agents': 'managed-agents-2026-04-01',
  '/v1/deployment_runs': 'managed-agents-2026-04-01',
  '/v1/deployments': 'managed-agents-2026-04-01',
  '/v1/environments': 'managed-agents-2026-04-01',
  '/v1/sessions': 'managed-agents-2026-04-01',
  '/v1/vaults': 'managed-agents-2026-04-01',
  '/v1/files': 'files-api-2025-04-14',
  '/v1/memory_stores': 'agent-memory-2026-07-22',
  '/v1/skills': 'skills-2025-10-02',
  '/v1/user_profiles': 'user-profiles-2026-03-24',
};

// ---- state ------------------------------------------------------------------
let agentSeq = 0;
const agents = new Map();
function seedAgent(name) {
  agentSeq += 1;
  const id = `agent_${String(agentSeq).padStart(2, '0')}`;
  const now = '2026-07-01T00:00:00Z';
  agents.set(id, {
    type: 'agent', id, version: 1, name, description: null,
    model: 'claude-sonnet-5', system: null, tools: [], mcp_servers: [],
    skills: [], metadata: {}, created_at: now, updated_at: now,
    archived_at: null, multiagent: null,
  });
  return agents.get(id);
}
for (let i = 1; i <= 5; i++) seedAgent(`seed-agent-${i}`);

const requests = [];

// ---- helpers ------------------------------------------------------------------
const err = (res, code, type, message) => {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ type: 'error', error: { type, message } }));
};
const ok = (res, obj, code = 200) => {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
};

function betaFlagFor(pathname) {
  for (const [prefix, flag] of Object.entries(BETA_FLAGS)) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return flag;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, `http://localhost:${port}`);
  const pathname = u.pathname;

  if (pathname === '/__requests') return ok(res, requests);
  if (pathname === '/__reset') { requests.length = 0; return ok(res, { ok: true }); }

  requests.push({
    method: req.method, path: pathname,
    query: Object.fromEntries(u.searchParams),
    rawQuery: u.search,
    apiKey: req.headers['x-api-key'] || null,
    version: req.headers['anthropic-version'] || null,
    beta: req.headers['anthropic-beta'] || null,
  });

  // ---- wire contract ----------------------------------------------------------
  if (!req.headers['x-api-key']) {
    return err(res, 401, 'authentication_error', 'missing x-api-key header');
  }
  if (!req.headers['anthropic-version']) {
    return err(res, 400, 'invalid_request_error', 'missing anthropic-version header');
  }
  if (u.searchParams.get('beta') === 'true') {
    const wanted = betaFlagFor(pathname);
    const got = req.headers['anthropic-beta'];
    if (!got || (wanted && !String(got).split(',').includes(wanted))) {
      return err(res, 400, 'invalid_request_error',
        `beta path requires anthropic-beta: ${wanted}; got: ${got || '(none)'}`);
    }
  }

  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    let parsed = {};
    try { parsed = body ? JSON.parse(body) : {}; } catch { /* multipart etc. */ }

    // ---- messages -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/v1/messages') {
      if (!parsed.model || !parsed.messages || !parsed.max_tokens) {
        return err(res, 400, 'invalid_request_error', 'model, messages, max_tokens are required');
      }
      if (!Array.isArray(parsed.messages)) {
        return err(res, 400, 'invalid_request_error', 'messages must be a JSON array (naive translate must fan out)');
      }
      return ok(res, {
        id: 'msg_mock0001', type: 'message', role: 'assistant', model: parsed.model,
        content: [{ type: 'text', text: 'mock completion' }],
        stop_reason: 'end_turn', stop_sequence: null, stop_details: null, container: null,
        usage: { input_tokens: 12, output_tokens: 4 },
      });
    }
    if (req.method === 'POST' && pathname === '/v1/messages/count_tokens') {
      if (!parsed.model || !Array.isArray(parsed.messages)) {
        return err(res, 400, 'invalid_request_error', 'model and messages[] are required');
      }
      return ok(res, { input_tokens: 37 });
    }
    if (req.method === 'GET' && pathname === '/v1/messages/batches') {
      // after_id-style list: last_id STAYS POPULATED on the final page — if
      // pagination config were (wrongly) present, stackql would loop.
      return ok(res, {
        data: [
          { id: 'msgbatch_01', type: 'message_batch', processing_status: 'ended', request_counts: { processing: 0, succeeded: 1, errored: 0, canceled: 0, expired: 0 }, ended_at: null, created_at: '2026-07-01T00:00:00Z', expires_at: '2026-07-02T00:00:00Z', archived_at: null, cancel_initiated_at: null, results_url: null },
          { id: 'msgbatch_02', type: 'message_batch', processing_status: 'in_progress', request_counts: { processing: 1, succeeded: 0, errored: 0, canceled: 0, expired: 0 }, ended_at: null, created_at: '2026-07-01T01:00:00Z', expires_at: '2026-07-02T01:00:00Z', archived_at: null, cancel_initiated_at: null, results_url: null },
        ],
        has_more: false, first_id: 'msgbatch_01', last_id: 'msgbatch_02',
      });
    }

    // ---- models ---------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/v1/models') {
      return ok(res, {
        data: [
          { type: 'model', id: 'claude-sonnet-5', display_name: 'Claude Sonnet 5', created_at: '2026-01-01T00:00:00Z' },
          { type: 'model', id: 'claude-opus-4-8', display_name: 'Claude Opus 4.8', created_at: '2026-02-01T00:00:00Z' },
        ],
        has_more: false, first_id: 'claude-sonnet-5', last_id: 'claude-opus-4-8',
      });
    }
    if (req.method === 'GET' && pathname.startsWith('/v1/models/')) {
      const id = pathname.split('/').pop();
      return ok(res, { type: 'model', id, display_name: id, created_at: '2026-01-01T00:00:00Z' });
    }

    // ---- agents (beta; stateful lifecycle + 2-page cursor list) --------------
    if (pathname === '/v1/agents' && req.method === 'GET') {
      const all = [...agents.values()].filter((a) => !a.archived_at);
      const pageSize = 3;
      const page = u.searchParams.get('page');
      const start = page ? Number(Buffer.from(page, 'base64url').toString()) : 0;
      const slice = all.slice(start, start + pageSize);
      const nextStart = start + pageSize;
      const next_page = nextStart < all.length
        ? Buffer.from(String(nextStart)).toString('base64url') : null;
      return ok(res, { data: slice, next_page });
    }
    if (pathname === '/v1/agents' && req.method === 'POST') {
      if (!parsed.name || !parsed.model) {
        return err(res, 400, 'invalid_request_error', 'name and model are required');
      }
      const a = seedAgent(parsed.name);
      Object.assign(a, { model: parsed.model, description: parsed.description ?? null });
      return ok(res, a);
    }
    const agentMatch = pathname.match(/^\/v1\/agents\/([^/]+)(\/archive)?$/);
    if (agentMatch) {
      const a = agents.get(agentMatch[1]);
      if (!a) return err(res, 404, 'not_found_error', `no agent ${agentMatch[1]}`);
      if (agentMatch[2] && req.method === 'POST') { // archive
        a.archived_at = '2026-07-08T00:00:00Z';
        a.updated_at = a.archived_at;
        return ok(res, a);
      }
      if (req.method === 'GET') return ok(res, a);
      if (req.method === 'POST') { // update
        if (parsed.version === undefined) {
          return err(res, 400, 'invalid_request_error', 'version is required');
        }
        for (const k of ['name', 'description', 'model', 'system']) {
          if (parsed[k] !== undefined) a[k] = parsed[k];
        }
        a.version += 1;
        a.updated_at = '2026-07-08T00:00:00Z';
        return ok(res, a);
      }
    }

    // ---- admin API (/v1/organizations/*) — used by the anthropic_admin suite --
    if (pathname.startsWith('/v1/organizations/')) {
      return handleAdmin(req, res, u, pathname, parsed);
    }

    return err(res, 404, 'not_found_error', `mock has no route for ${req.method} ${pathname}`);
  });
});

// ---- admin surface ------------------------------------------------------------
let inviteSeq = 0;
const invites = new Map();
let workspaceSeq = 0;
const workspaces = new Map();
function seedWorkspace(name) {
  workspaceSeq += 1;
  const id = `wrkspc_${String(workspaceSeq).padStart(2, '0')}`;
  workspaces.set(id, {
    id, type: 'workspace', name, created_at: '2026-07-01T00:00:00Z',
    archived_at: null, display_color: '#6C5BB9',
  });
  return workspaces.get(id);
}
seedWorkspace('default-workspace');

function handleAdmin(req, res, u, pathname, parsed) {
  // admin keys are sk-ant-admin...; the mock enforces the disjoint key space
  const key = req.headers['x-api-key'] || '';
  if (!key.startsWith('sk-ant-admin')) {
    return err(res, 401, 'authentication_error', 'admin endpoints require an sk-ant-admin key');
  }

  // ---- users ----
  if (req.method === 'GET' && pathname === '/v1/organizations/users') {
    return ok(res, {
      data: [
        { id: 'user_01', type: 'user', email: 'jo@example.com', name: 'Jo', role: 'admin', added_at: '2026-01-01T00:00:00Z' },
        { id: 'user_02', type: 'user', email: 'sam@example.com', name: 'Sam', role: 'developer', added_at: '2026-02-01T00:00:00Z' },
      ],
      has_more: false, first_id: 'user_01', last_id: 'user_02',
    });
  }
  const userMatch = pathname.match(/^\/v1\/organizations\/users\/([^/]+)$/);
  if (userMatch) {
    const base = { id: userMatch[1], type: 'user', email: 'jo@example.com', name: 'Jo', role: 'admin', added_at: '2026-01-01T00:00:00Z' };
    if (req.method === 'GET') return ok(res, base);
    if (req.method === 'POST') return ok(res, { ...base, role: parsed.role || base.role });
    if (req.method === 'DELETE') return ok(res, { id: userMatch[1], type: 'user_deleted' });
  }

  // ---- invites ----
  if (req.method === 'GET' && pathname === '/v1/organizations/invites') {
    return ok(res, { data: [...invites.values()], has_more: false, first_id: null, last_id: [...invites.keys()].pop() || null });
  }
  if (req.method === 'POST' && pathname === '/v1/organizations/invites') {
    if (!parsed.email || !parsed.role) return err(res, 400, 'invalid_request_error', 'email and role are required');
    inviteSeq += 1;
    const id = `invite_${String(inviteSeq).padStart(2, '0')}`;
    invites.set(id, { id, type: 'invite', email: parsed.email, role: parsed.role, invited_at: '2026-07-08T00:00:00Z', expires_at: '2026-07-29T00:00:00Z', status: 'pending' });
    return ok(res, invites.get(id));
  }
  const inviteMatch = pathname.match(/^\/v1\/organizations\/invites\/([^/]+)$/);
  if (inviteMatch) {
    const inv = invites.get(inviteMatch[1]);
    if (!inv) return err(res, 404, 'not_found_error', 'no such invite');
    if (req.method === 'GET') return ok(res, inv);
    if (req.method === 'DELETE') { invites.delete(inv.id); return ok(res, { id: inv.id, type: 'invite_deleted' }); }
  }

  // ---- workspaces ----
  if (req.method === 'GET' && pathname === '/v1/organizations/workspaces') {
    const data = [...workspaces.values()];
    return ok(res, { data, has_more: false, first_id: data[0]?.id || null, last_id: data[data.length - 1]?.id || null });
  }
  if (req.method === 'POST' && pathname === '/v1/organizations/workspaces') {
    if (!parsed.name) return err(res, 400, 'invalid_request_error', 'name is required');
    return ok(res, seedWorkspace(parsed.name));
  }
  const wsMatch = pathname.match(/^\/v1\/organizations\/workspaces\/([^/]+)(\/archive)?$/);
  if (wsMatch && !pathname.includes('/members') && !pathname.includes('/api_keys')) {
    const ws = workspaces.get(wsMatch[1]);
    if (!ws) return err(res, 404, 'not_found_error', 'no such workspace');
    if (wsMatch[2] && req.method === 'POST') { ws.archived_at = '2026-07-08T00:00:00Z'; return ok(res, ws); }
    if (req.method === 'GET') return ok(res, ws);
    if (req.method === 'POST') { if (parsed.name) ws.name = parsed.name; return ok(res, ws); }
  }

  // ---- workspace members ----
  const memberList = pathname.match(/^\/v1\/organizations\/workspaces\/([^/]+)\/members$/);
  if (memberList) {
    if (req.method === 'GET') {
      return ok(res, {
        data: [{ type: 'workspace_member', user_id: 'user_01', workspace_id: memberList[1], workspace_role: 'workspace_admin' }],
        has_more: false, first_id: 'user_01', last_id: 'user_01',
      });
    }
    if (req.method === 'POST') {
      if (!parsed.user_id || !parsed.workspace_role) return err(res, 400, 'invalid_request_error', 'user_id and workspace_role required');
      return ok(res, { type: 'workspace_member', user_id: parsed.user_id, workspace_id: memberList[1], workspace_role: parsed.workspace_role });
    }
  }
  const memberOne = pathname.match(/^\/v1\/organizations\/workspaces\/([^/]+)\/members\/([^/]+)$/);
  if (memberOne) {
    if (req.method === 'GET' || req.method === 'POST') {
      return ok(res, { type: 'workspace_member', user_id: memberOne[2], workspace_id: memberOne[1], workspace_role: parsed.workspace_role || 'workspace_developer' });
    }
    if (req.method === 'DELETE') return ok(res, { user_id: memberOne[2], workspace_id: memberOne[1], type: 'workspace_member_deleted' });
  }

  // ---- api keys (list/get/update ONLY) ----
  if (req.method === 'GET' && pathname === '/v1/organizations/api_keys') {
    return ok(res, {
      data: [
        { id: 'apikey_01', type: 'api_key', name: 'ci-key', workspace_id: 'wrkspc_01', created_at: '2026-01-01T00:00:00Z', created_by: { id: 'user_01', type: 'user' }, partial_key_hint: 'sk-ant-api03-R2D...igAA', status: 'active' },
      ],
      has_more: false, first_id: 'apikey_01', last_id: 'apikey_01',
    });
  }
  const keyMatch = pathname.match(/^\/v1\/organizations\/api_keys\/([^/]+)$/);
  if (keyMatch) {
    const base = { id: keyMatch[1], type: 'api_key', name: 'ci-key', workspace_id: 'wrkspc_01', created_at: '2026-01-01T00:00:00Z', created_by: { id: 'user_01', type: 'user' }, partial_key_hint: 'sk-ant-api03-R2D...igAA', status: 'active' };
    if (req.method === 'GET') return ok(res, base);
    if (req.method === 'POST') return ok(res, { ...base, name: parsed.name ?? base.name, status: parsed.status ?? base.status });
    if (req.method === 'DELETE' || req.method === 'PUT') {
      return err(res, 405, 'invalid_request_error', 'the Admin API forbids api key create/delete');
    }
  }

  // ---- usage / cost reports (2-page cursor on page param) ----
  const reportMatch = pathname.match(/^\/v1\/organizations\/usage_report\/(messages|claude_code)$/);
  const isCost = pathname === '/v1/organizations/cost_report';
  if ((reportMatch || isCost) && req.method === 'GET') {
    if (!u.searchParams.get('starting_at')) {
      return err(res, 400, 'invalid_request_error', 'starting_at is required');
    }
    // answers admin open question (b): array params arrive as repeated
    // `group_by[]=` keys; journal captures rawQuery for assertions.
    const page = u.searchParams.get('page');
    const mk = (t, rows) => ({
      data: [{ starting_at: t, ending_at: t.replace('T00', 'T01'), results: rows }],
      has_more: !page, next_page: page ? null : 'page_02',
    });
    if (reportMatch && reportMatch[1] === 'messages') {
      return ok(res, mk(page ? '2026-07-02T00:00:00Z' : '2026-07-01T00:00:00Z', [
        { uncached_input_tokens: 100, cache_creation: { ephemeral_5m_input_tokens: 0, ephemeral_1h_input_tokens: 0 }, cache_read_input_tokens: 0, output_tokens: 50, server_tool_use: { web_search_requests: 0 }, api_key_id: null, workspace_id: null, model: 'claude-sonnet-5', service_tier: 'standard', context_window: '0-200k' },
      ]));
    }
    if (reportMatch && reportMatch[1] === 'claude_code') {
      // claude_code records are FLAT under data (no bucket/results nesting)
      return ok(res, {
        data: [
          { date: page ? '2026-07-02T00:00:00Z' : '2026-07-01T00:00:00Z', actor: { email_address: 'jo@example.com', type: 'user_actor' }, organization_id: 'org_01', customer_type: 'api', terminal_type: 'vscode', core_metrics: { num_sessions: 3, lines_of_code: { added: 100, removed: 20 }, commits_by_claude_code: 2, pull_requests_by_claude_code: 1 }, tool_actions: { edit_tool: { accepted: 5, rejected: 1 } }, model_breakdown: [{ model: 'claude-sonnet-5', tokens: { input: 1000, output: 200, cache_read: 0, cache_creation: 0 }, estimated_cost: { currency: 'USD', amount: 42 } }] },
        ],
        has_more: !page,
        next_page: page ? null : 'page_02',
      });
    }
    return ok(res, mk(page ? '2026-07-02T00:00:00Z' : '2026-07-01T00:00:00Z', [
      { currency: 'USD', amount: '12.34', workspace_id: null, description: 'Claude Sonnet 5 Usage', cost_type: 'tokens', context_window: '0-200k', model: 'claude-sonnet-5', service_tier: 'standard', token_type: 'uncached_input_tokens' },
    ]));
  }

  // ---- rate limits (org-level; entries per group, limits as {type,value}) ----
  if (req.method === 'GET' && pathname === '/v1/organizations/rate_limits') {
    const model = u.searchParams.get('model');
    const groupType = u.searchParams.get('group_type');
    let data = [
      { type: 'rate_limit', group_type: 'model_group', models: ['claude-sonnet-5', 'claude-sonnet-5-20260115'], limits: [{ type: 'requests_per_minute', value: 4000 }, { type: 'input_tokens_per_minute', value: 2000000 }, { type: 'output_tokens_per_minute', value: 400000 }] },
      { type: 'rate_limit', group_type: 'model_group', models: ['claude-opus-4-8', 'claude-opus-4-8-20260210'], limits: [{ type: 'requests_per_minute', value: 4000 }, { type: 'input_tokens_per_minute', value: 2000000 }, { type: 'output_tokens_per_minute', value: 400000 }] },
      { type: 'rate_limit', group_type: 'batch', models: null, limits: [{ type: 'enqueued_batch_requests', value: 500000 }] },
    ];
    if (model) {
      data = data.filter((r) => (r.models || []).includes(model));
      if (!data.length) return err(res, 404, 'not_found_error', `no rate limit group contains model ${model}`);
    }
    if (groupType) data = data.filter((r) => r.group_type === groupType);
    return ok(res, { data, next_page: null });
  }

  // ---- workspace rate limits (overrides only; limits carry org_limit) ----
  const wsRl = pathname.match(/^\/v1\/organizations\/workspaces\/([^/]+)\/rate_limits$/);
  if (wsRl && req.method === 'GET') {
    if (!workspaces.get(wsRl[1])) return err(res, 404, 'not_found_error', 'no such workspace');
    return ok(res, {
      data: [
        { type: 'workspace_rate_limit', group_type: 'model_group', models: ['claude-sonnet-5', 'claude-sonnet-5-20260115'], limits: [{ type: 'requests_per_minute', value: 1000, org_limit: 4000 }] },
      ],
      next_page: null,
    });
  }

  // ---- organization info ----
  if (req.method === 'GET' && pathname === '/v1/organizations/me') {
    return ok(res, { id: 'org_01', type: 'organization', name: 'Mock Org', settings: { claude_code_data_sharing_enabled: false } });
  }

  return err(res, 404, 'not_found_error', `mock has no admin route for ${req.method} ${pathname}`);
}

server.listen(port, () => console.log(`anthropic mock listening on :${port}`));
