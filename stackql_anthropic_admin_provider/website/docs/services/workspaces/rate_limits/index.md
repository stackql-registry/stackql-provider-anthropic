---
title: rate_limits
hide_title: false
hide_table_of_contents: false
keywords:
  - rate_limits
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>rate_limits</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="rate_limits" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.workspaces.rate_limits" /></td></tr>
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
    "name": "group_type",
    "type": "string",
    "description": "The kind of rate-limit group this entry represents. `model_group` entries apply to a family of models; other values apply to an API-surface category and have `models` set to null. (batch, files, model_group, skills, token_count, web_search)"
  },
  {
    "name": "limits",
    "type": "array",
    "description": "The limiter values overridden for this group in this workspace. Each item carries `type`, `value` and `org_limit` (the organization-level value for the same limiter, or null).",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": "The limiter type (for example `requests_per_minute` or `input_tokens_per_minute`)."
      },
      {
        "name": "value",
        "type": "number",
        "description": "The configured limit value for this limiter type."
      },
      {
        "name": "org_limit",
        "type": "number",
        "description": "The organization-level value for the same limiter type, or null if the organization has no configured limit for it."
      }
    ]
  },
  {
    "name": "models",
    "type": "array",
    "description": "Model names this entry's limits apply to, including aliases. Null when `group_type` is not `model_group`."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `workspace_rate_limit`. (workspace_rate_limit)"
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-group_type"><code>group_type</code></a></td>
    <td>List rate-limit overrides configured for a workspace. Only groups and limiter types with a workspace-level override are returned; everything else inherits the organization limits.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td>ID of the Workspace.</td>
</tr>
<tr id="parameter-group_type">
    <td><CopyableCode code="group_type" /></td>
    <td><code>string</code></td>
    <td>Filter by group type.</td>
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

List rate-limit overrides configured for a workspace. Only groups and limiter types with a workspace-level override are returned; everything else inherits the organization limits.

```sql
SELECT
group_type,
limits,
models,
type
FROM anthropic_admin.workspaces.rate_limits
WHERE workspace_id = '{{ workspace_id }}' -- required
AND group_type = '{{ group_type }}'
;
```
</TabItem>
</Tabs>
