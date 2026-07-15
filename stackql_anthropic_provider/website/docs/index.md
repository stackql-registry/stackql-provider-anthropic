---
title: anthropic
hide_title: false
hide_table_of_contents: false
keywords:
  - anthropic
  - claude
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query and interact with Anthropic (Claude) resources using SQL
custom_edit_url: null
image: /img/stackql-cover.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Run Claude inference, count tokens, and manage models, batches, files, agents, deployments, environments, sessions, skills, memory stores, user profiles and vaults on the Anthropic API using SQL.

:::info

For organization administration (users, invites, workspaces, API keys, usage/cost reports, rate limits, Claude Code analytics) use the [__`anthropic_admin`__](https://anthropic-admin-provider.stackql.io/) provider — it authenticates with a separate, org-scoped Admin key.

:::


:::info[Provider Summary]

total services: __11__
total resources: __37__

:::

See also:    [[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)   

* * *   

## Installation 

```bash 
REGISTRY PULL anthropic; 
```  

## Authentication  

The `anthropic` provider authenticates with a workspace-scoped Claude API key (`sk-ant-api...`) sent in the `x-api-key` header. Set the following environment variable:

- <CopyableCode code="ANTHROPIC_API_KEY" /> - a Claude API key, created in the [Claude Console](https://platform.claude.com/settings/keys)

The required `anthropic-version` header is sent automatically (default `2023-06-01`); beta endpoints automatically send the per-endpoint `anthropic-beta` flag. Either can be overridden per query by supplying the header as a `WHERE` clause parameter.

## Inference as a result set

Asking Claude a question is a `SELECT`. The reply comes back as a row, with the text in the `content` array and the token spend in `usage`:

```sql
SELECT
  JSON_EXTRACT(content, '$[0].text')     AS reply,
  JSON_EXTRACT(usage, '$.input_tokens')  AS input_tokens,
  JSON_EXTRACT(usage, '$.output_tokens') AS output_tokens,
  stop_reason
FROM anthropic.messages.messages
WHERE model = 'claude-sonnet-5'
AND max_tokens = 256
AND thinking = '{"type": "disabled"}'
AND messages = '[{"role": "user", "content": "Name the four Galilean moons of Jupiter, comma separated."}]';
```

Token counting is free of charge, so a prompt can be priced before it is sent:

```sql
SELECT input_tokens
FROM anthropic.messages.token_counts
WHERE model = 'claude-sonnet-5'
AND messages = '[{"role": "user", "content": "Name the four Galilean moons of Jupiter, comma separated."}]';
```

## Which model can do what

The `vw_model_capabilities` view fans each model's capability flags out into columns, so picking a model for a workload is a `WHERE` clause:

```sql
SELECT id, display_name, thinking, image_input, pdf_input, batch, structured_outputs
FROM anthropic.models.vw_model_capabilities
ORDER BY created_at DESC;
```

## Batch progress and triage

Message batches, newest first, with their per-request tallies:

```sql
SELECT
  id,
  processing_status,
  JSON_EXTRACT(request_counts, '$.processing') AS processing,
  JSON_EXTRACT(request_counts, '$.succeeded')  AS succeeded,
  JSON_EXTRACT(request_counts, '$.errored')    AS errored,
  created_at,
  ended_at
FROM anthropic.messages.batches
ORDER BY created_at DESC;
```

## Agent inventory

What agents exist, on which models, and how much tooling they carry:

```sql
SELECT
  id,
  name,
  model,
  version,
  JSON_ARRAY_LENGTH(tools)  AS tool_count,
  JSON_ARRAY_LENGTH(skills) AS skill_count,
  updated_at
FROM anthropic.agents.agents
ORDER BY updated_at DESC;
```

## Agent lifecycle

Agents are created, read and archived with the corresponding SQL verbs:

```sql
-- create
INSERT INTO anthropic.agents.agents (name, model)
SELECT 'release-notes-writer', 'claude-sonnet-5'
RETURNING id, name;

-- read
SELECT id, name, model, version, updated_at
FROM anthropic.agents.agents
WHERE agent_id = 'agent_01';

-- archive
EXEC anthropic.agents.agents.archive @agent_id = 'agent_01';
```

## Coverage

Every operation in Anthropic's official OpenAPI specification is exposed, except the following documented exclusions:

- 2 server-sent-event stream endpoints (`sessions/{session_id}/events/stream`, `sessions/{session_id}/threads/{thread_id}/stream`) — SSE streams are not SQL result sets
- 10 tunnels endpoints — managed via `workspace:manage_tunnels` OAuth, not API keys (excluded from the official SDKs for the same reason)
- 10 beta duplicates of the GA messages/batches/models operations — folded into the GA surface


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/agents/">agents</a><br />
<a href="/services/deployments/">deployments</a><br />
<a href="/services/environments/">environments</a><br />
<a href="/services/files/">files</a><br />
<a href="/services/memory_stores/">memory_stores</a><br />
<a href="/services/messages/">messages</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/models/">models</a><br />
<a href="/services/sessions/">sessions</a><br />
<a href="/services/skills/">skills</a><br />
<a href="/services/user_profiles/">user_profiles</a><br />
<a href="/services/vaults/">vaults</a><br />
</div>
</div>
