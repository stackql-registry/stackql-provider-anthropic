---
title: claude_code_reports
hide_title: false
hide_table_of_contents: false
keywords:
  - claude_code_reports
  - usage
  - anthropic_admin
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage anthropic_admin resources using SQL
custom_edit_url: null
image: /img/stackql-anthropic_admin-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SchemaTable from '@site/src/components/SchemaTable/SchemaTable';

Creates, updates, deletes, gets or lists a <code>claude_code_reports</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="claude_code_reports" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.usage.claude_code_reports" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "organization_id",
    "type": "string",
    "description": "Organization UUID."
  },
  {
    "name": "actor",
    "type": "string",
    "description": "The user or API key that performed the Claude Code actions - either a `user_actor` with `email_address` or an `api_actor` with `api_key_name`. (opaque JSON object)"
  },
  {
    "name": "core_metrics",
    "type": "string",
    "description": "Productivity metrics - `num_sessions`, `lines_of_code` (`added`/`removed`), `commits_by_claude_code`, `pull_requests_by_claude_code`. (opaque JSON object)"
  },
  {
    "name": "customer_type",
    "type": "string",
    "description": "Type of customer account - `api` for API customers, `subscription` for Pro/Team customers."
  },
  {
    "name": "date",
    "type": "string",
    "description": "Date in RFC 3339 format (UTC timestamp)."
  },
  {
    "name": "model_breakdown",
    "type": "array",
    "description": "Per-model token counts and estimated costs. Each item carries `model`, `tokens` (input/output/cache_read/cache_creation) and `estimated_cost` (amount in cents USD, currency)."
  },
  {
    "name": "terminal_type",
    "type": "string",
    "description": "Type of terminal or environment where Claude Code was used (for example `vscode`, `iTerm.app`, `tmux`)."
  },
  {
    "name": "tool_actions",
    "type": "string",
    "description": "Tool action acceptance/rejection counts by tool type (`edit_tool`, `multi_edit_tool`, `write_tool`, `notebook_edit_tool`). (opaque JSON object)"
  }
]} />
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-starting_at"><code>starting_at</code></a></td>
    <td></td>
    <td>Get daily aggregated Claude Code usage analytics. Each record represents one actor's activity for the single UTC day specified by `starting_at`.</td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-starting_at">
    <td><CopyableCode code="starting_at" /></td>
    <td><code>string</code></td>
    <td>UTC date in YYYY-MM-DD format; returns metrics for this single day only.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Get daily aggregated Claude Code usage analytics. Each record represents one actor's activity for the single UTC day specified by `starting_at`.

```sql
SELECT
organization_id,
actor,
core_metrics,
customer_type,
date,
model_breakdown,
terminal_type,
tool_actions
FROM anthropic_admin.usage.claude_code_reports
WHERE starting_at = '{{ starting_at }}' -- required
;
```
</TabItem>
</Tabs>
