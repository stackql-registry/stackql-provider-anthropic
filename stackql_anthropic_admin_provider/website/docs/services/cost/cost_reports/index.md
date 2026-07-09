---
title: cost_reports
hide_title: false
hide_table_of_contents: false
keywords:
  - cost_reports
  - cost
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

Creates, updates, deletes, gets or lists a <code>cost_reports</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cost_reports" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.cost.cost_reports" /></td></tr>
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
    "name": "ending_at",
    "type": "string",
    "description": "End of the time bucket (exclusive) in RFC 3339 format."
  },
  {
    "name": "results",
    "type": "array",
    "description": "List of cost items for this time bucket; multiple items when one or more `group_by[]` parameters are specified.",
    "children": [
      {
        "name": "amount",
        "type": "string",
        "description": "Cost amount in lowest currency units (cents) as a decimal string. For example `123.45` in USD represents $1.23."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency code for the cost amount. Currently always `USD`."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Description of the cost item. Null unless grouping by description."
      },
      {
        "name": "cost_type",
        "type": "string",
        "description": "Type of cost - `code_execution`, `session_usage`, `tokens` or `web_search`. Null unless grouping by description."
      },
      {
        "name": "token_type",
        "type": "string",
        "description": "Type of token - `uncached_input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation.ephemeral_5m_input_tokens` or `cache_creation.ephemeral_1h_input_tokens`. Null unless grouping by description or for non-token costs."
      },
      {
        "name": "context_window",
        "type": "string",
        "description": "Input context window used, `0-200k` or `200k-1M`. Null unless grouping by description or for non-token costs."
      },
      {
        "name": "model",
        "type": "string",
        "description": "Model name used. Null unless grouping by description or for non-token costs."
      },
      {
        "name": "service_tier",
        "type": "string",
        "description": "Service tier used, `batch` or `standard`. Null unless grouping by description or for non-token costs."
      },
      {
        "name": "inference_geo",
        "type": "string",
        "description": "Inference geo used. Null unless grouping by description."
      },
      {
        "name": "workspace_id",
        "type": "string",
        "description": "ID of the Workspace this cost is associated with. Null unless grouping by workspace, and for the default workspace."
      }
    ]
  },
  {
    "name": "starting_at",
    "type": "string",
    "description": "Start of the time bucket (inclusive) in RFC 3339 format."
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
    <td><a href="#parameter-ending_at"><code>ending_at</code></a>, <a href="#parameter-bucket_width"><code>bucket_width</code></a>, <a href="#parameter-group_by[]"><code>group_by[]</code></a></td>
    <td>Get a cost report bucketed by day, optionally grouped by `workspace_id` and/or `description`. Costs are USD decimal strings in lowest currency units (cents).</td>
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
    <td>Time buckets that start on or after this RFC 3339 timestamp will be returned. Snapped to the start of the day in UTC.</td>
</tr>
<tr id="parameter-bucket_width">
    <td><CopyableCode code="bucket_width" /></td>
    <td><code>string</code></td>
    <td>Time granularity of the response data. Only `1d` is supported.</td>
</tr>
<tr id="parameter-ending_at">
    <td><CopyableCode code="ending_at" /></td>
    <td><code>string</code></td>
    <td>Time buckets that end before this RFC 3339 timestamp will be returned.</td>
</tr>
<tr id="parameter-group_by[]">
    <td><CopyableCode code="group_by[]" /></td>
    <td><code>array</code></td>
    <td>Group by any subset of `description` and `workspace_id`. When grouping by `description`, responses include parsed fields like `model` and `cost_type`.</td>
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

Get a cost report bucketed by day, optionally grouped by `workspace_id` and/or `description`. Costs are USD decimal strings in lowest currency units (cents).

```sql
SELECT
ending_at,
results,
starting_at
FROM anthropic_admin.cost.cost_reports
WHERE starting_at = '{{ starting_at }}' -- required
AND ending_at = '{{ ending_at }}'
AND bucket_width = '{{ bucket_width }}'
AND "group_by[]" = '{{ group_by[] }}'
;
```
</TabItem>
</Tabs>
