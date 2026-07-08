---
title: rate_limits
hide_title: false
hide_table_of_contents: false
keywords:
  - rate_limits
  - rate_limits
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
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.rate_limits.rate_limits" /></td></tr>
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
    "description": "The kind of rate-limit group this entry represents. `model_group` entries apply to a family of models (listed in `models`); other values apply to an API-surface category and have `models` set to null. (batch, files, model_group, skills, token_count, web_search)"
  },
  {
    "name": "limits",
    "type": "array",
    "description": "The limiter values that apply to this group. Each item carries `type` (for example `requests_per_minute` or `input_tokens_per_minute`) and `value`.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": "The limiter type."
      },
      {
        "name": "value",
        "type": "number",
        "description": "The configured limit value for this limiter type."
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
    "description": "Object type. Always `rate_limit` for organization rate-limit entries. (rate_limit)"
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
    <td></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-group_type"><code>group_type</code></a>, <a href="#parameter-model"><code>model</code></a>, <a href="#parameter-page"><code>page</code></a></td>
    <td>List Messages API rate limits for the organization. Each entry corresponds to one rate-limit group - a model family or an API-surface category such as the Files API or Message Batches - and carries the set of limiter values that apply to it.</td>
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
<tr id="parameter-anthropic-version">
    <td><CopyableCode code="anthropic-version" /></td>
    <td><code>string</code></td>
    <td>The version of the Claude API you want to use.</td>
</tr>
<tr id="parameter-group_type">
    <td><CopyableCode code="group_type" /></td>
    <td><code>string</code></td>
    <td>Filter by group type.</td>
</tr>
<tr id="parameter-model">
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>Filter to the single entry containing this model. Accepts full model names and aliases. Returns 404 if the model is not found or has no rate limits for this organization.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque cursor from a previous response's `next_page`.</td>
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

List Messages API rate limits for the organization. Each entry corresponds to one rate-limit group - a model family or an API-surface category such as the Files API or Message Batches - and carries the set of limiter values that apply to it.

```sql
SELECT
group_type,
limits,
models,
type
FROM anthropic_admin.rate_limits.rate_limits
WHERE group_type = '{{ group_type }}'
AND model = '{{ model }}'
AND page = '{{ page }}'
;
```
</TabItem>
</Tabs>
