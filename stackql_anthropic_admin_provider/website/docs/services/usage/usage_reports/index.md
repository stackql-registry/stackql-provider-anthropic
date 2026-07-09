---
title: usage_reports
hide_title: false
hide_table_of_contents: false
keywords:
  - usage_reports
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

Creates, updates, deletes, gets or lists a <code>usage_reports</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="usage_reports" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.usage.usage_reports" /></td></tr>
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
    "description": "List of usage items for this time bucket; multiple items when one or more `group_by[]` parameters are specified. Each item carries uncached_input_tokens, cache_creation, cache_read_input_tokens, output_tokens, server_tool_use, and the grouping dimensions (account_id, api_key_id, workspace_id, model, service_tier, service_account_id, context_window, inference_geo) which are null unless grouped by.",
    "children": [
      {
        "name": "uncached_input_tokens",
        "type": "number",
        "description": "The number of uncached input tokens processed."
      },
      {
        "name": "cache_creation",
        "type": "string",
        "description": "The number of input tokens used for cache creation, split by TTL (`ephemeral_5m_input_tokens`, `ephemeral_1h_input_tokens`). (opaque JSON object)"
      },
      {
        "name": "cache_read_input_tokens",
        "type": "number",
        "description": "The number of input tokens read from the cache."
      },
      {
        "name": "output_tokens",
        "type": "number",
        "description": "The number of output tokens generated."
      },
      {
        "name": "server_tool_use",
        "type": "string",
        "description": "Server-side tool usage metrics (`web_search_requests`). (opaque JSON object)"
      },
      {
        "name": "account_id",
        "type": "string",
        "description": "ID of the user account that made the request. Null unless grouping by account."
      },
      {
        "name": "api_key_id",
        "type": "string",
        "description": "ID of the API key used. Null unless grouping by API key, and for Console usage."
      },
      {
        "name": "workspace_id",
        "type": "string",
        "description": "ID of the Workspace used. Null unless grouping by workspace, and for the default workspace."
      },
      {
        "name": "model",
        "type": "string",
        "description": "Model used. Null unless grouping by model."
      },
      {
        "name": "service_account_id",
        "type": "string",
        "description": "ID of the service account that made the request. Null unless grouping by service account."
      },
      {
        "name": "service_tier",
        "type": "string",
        "description": "Service tier used. Null unless grouping by service tier."
      },
      {
        "name": "context_window",
        "type": "string",
        "description": "Context window used. Null unless grouping by context window."
      },
      {
        "name": "inference_geo",
        "type": "string",
        "description": "Inference geo used. Null unless grouping by inference geo."
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
    <td><a href="#parameter-ending_at"><code>ending_at</code></a>, <a href="#parameter-bucket_width"><code>bucket_width</code></a>, <a href="#parameter-group_by[]"><code>group_by[]</code></a>, <a href="#parameter-account_ids[]"><code>account_ids[]</code></a>, <a href="#parameter-api_key_ids[]"><code>api_key_ids[]</code></a>, <a href="#parameter-workspace_ids[]"><code>workspace_ids[]</code></a>, <a href="#parameter-models[]"><code>models[]</code></a>, <a href="#parameter-service_tiers[]"><code>service_tiers[]</code></a>, <a href="#parameter-service_account_ids[]"><code>service_account_ids[]</code></a>, <a href="#parameter-context_window[]"><code>context_window[]</code></a>, <a href="#parameter-inference_geos[]"><code>inference_geos[]</code></a>, <a href="#parameter-speeds[]"><code>speeds[]</code></a></td>
    <td>Get a Messages API usage report bucketed by time, optionally grouped and filtered. Each row is a time bucket carrying a `results` array with one item per group combination.</td>
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
    <td>Time buckets that start on or after this RFC 3339 timestamp will be returned. Snapped to the start of the minute/hour/day in UTC.</td>
</tr>
<tr id="parameter-account_ids[]">
    <td><CopyableCode code="account_ids[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified user account ID(s).</td>
</tr>
<tr id="parameter-api_key_ids[]">
    <td><CopyableCode code="api_key_ids[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified API key ID(s).</td>
</tr>
<tr id="parameter-bucket_width">
    <td><CopyableCode code="bucket_width" /></td>
    <td><code>string</code></td>
    <td>Time granularity of the response data.</td>
</tr>
<tr id="parameter-context_window[]">
    <td><CopyableCode code="context_window[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified context window(s) - `0-200k` or `200k-1M`.</td>
</tr>
<tr id="parameter-ending_at">
    <td><CopyableCode code="ending_at" /></td>
    <td><code>string</code></td>
    <td>Time buckets that end before this RFC 3339 timestamp will be returned.</td>
</tr>
<tr id="parameter-group_by[]">
    <td><CopyableCode code="group_by[]" /></td>
    <td><code>array</code></td>
    <td>Group by any subset of `account_id`, `api_key_id`, `context_window`, `inference_geo`, `model`, `service_account_id`, `service_tier`, `speed`, `workspace_id`. Grouping by `speed` requires the `fast-mode-2026-02-01` beta header.</td>
</tr>
<tr id="parameter-inference_geos[]">
    <td><CopyableCode code="inference_geos[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified inference geo(s) - `global`, `us`, or `not_available`.</td>
</tr>
<tr id="parameter-models[]">
    <td><CopyableCode code="models[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified model(s).</td>
</tr>
<tr id="parameter-service_account_ids[]">
    <td><CopyableCode code="service_account_ids[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified service account ID(s).</td>
</tr>
<tr id="parameter-service_tiers[]">
    <td><CopyableCode code="service_tiers[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified service tier(s) - `batch`, `flex`, `flex_discount`, `priority`, `priority_on_demand`, `standard`.</td>
</tr>
<tr id="parameter-speeds[]">
    <td><CopyableCode code="speeds[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified speed(s), `fast` or `standard` (Claude Code research preview). Requires the `fast-mode-2026-02-01` beta header.</td>
</tr>
<tr id="parameter-workspace_ids[]">
    <td><CopyableCode code="workspace_ids[]" /></td>
    <td><code>array</code></td>
    <td>Restrict usage returned to the specified workspace ID(s).</td>
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

Get a Messages API usage report bucketed by time, optionally grouped and filtered. Each row is a time bucket carrying a `results` array with one item per group combination.

```sql
SELECT
ending_at,
results,
starting_at
FROM anthropic_admin.usage.usage_reports
WHERE starting_at = '{{ starting_at }}' -- required
AND ending_at = '{{ ending_at }}'
AND bucket_width = '{{ bucket_width }}'
AND "group_by[]" = '{{ group_by[] }}'
AND "account_ids[]" = '{{ account_ids[] }}'
AND "api_key_ids[]" = '{{ api_key_ids[] }}'
AND "workspace_ids[]" = '{{ workspace_ids[] }}'
AND "models[]" = '{{ models[] }}'
AND "service_tiers[]" = '{{ service_tiers[] }}'
AND "service_account_ids[]" = '{{ service_account_ids[] }}'
AND "context_window[]" = '{{ context_window[] }}'
AND "inference_geos[]" = '{{ inference_geos[] }}'
AND "speeds[]" = '{{ speeds[] }}'
;
```
</TabItem>
</Tabs>
