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
