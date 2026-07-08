---
title: anthropic_admin
hide_title: false
hide_table_of_contents: false
keywords:
  - anthropic
  - anthropic_admin
  - claude
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Manage your Anthropic (Claude) organization using SQL
custom_edit_url: null
image: /img/stackql-cover.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Manage Anthropic organization members, invites, workspaces, workspace members, API keys, usage and cost reports, Claude Code analytics and rate limits using SQL.

:::info

For the user/inference surface (messages, models, batches, files, agents, sessions, skills, memory stores, vaults) use the [__`anthropic`__](https://anthropic-provider.stackql.io/) provider — it authenticates with a separate, workspace-scoped API key.

:::


:::info[Provider Summary]

total services: __6__
total resources: __17__

:::

See also:    [[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)   

* * *   

## Installation 

```bash 
REGISTRY PULL anthropic_admin; 
```  

## Authentication  

The `anthropic_admin` provider authenticates with an org-scoped Admin API key (`sk-ant-admin01-...`) sent in the `x-api-key` header. Set the following environment variable:

- <CopyableCode code="ANTHROPIC_ADMIN_KEY" /> - an Admin API key, created in [Claude Console > Settings > Admin keys](https://platform.claude.com/settings/admin-keys)

Only organization members with the **admin** role can provision Admin API keys, and the Admin API is unavailable for individual (non-organization) accounts. Admin keys and regular Claude API keys are disjoint: neither can call the other's endpoints. The required `anthropic-version` header is sent automatically (default `2023-06-01`).

:::note

On the Claude Platform on AWS only the workspace endpoints (create, get, list, update, archive) are available; organization members, invites, API keys, reports and rate limits are not.

:::

## Coverage

The full Admin API surface is exposed, except the following documented exclusions:

- Workload Identity Federation endpoints (service accounts, federation issuers, federation rules) — these reject Admin API keys and require an `org:admin` OAuth token
- Compliance API, Spend Limits API and Claude Enterprise Analytics — these use a third key type (`sk-ant-api01-...`, Claude Enterprise) and belong in a future `anthropic_enterprise` provider


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/api_keys/">api_keys</a><br />
<a href="/services/cost/">cost</a><br />
<a href="/services/organization/">organization</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/rate_limits/">rate_limits</a><br />
<a href="/services/usage/">usage</a><br />
<a href="/services/workspaces/">workspaces</a><br />
</div>
</div>
