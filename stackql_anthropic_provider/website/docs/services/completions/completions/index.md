---
title: completions
hide_title: false
hide_table_of_contents: false
keywords:
  - completions
  - completions
  - anthropic
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage anthropic resources using SQL
custom_edit_url: null
image: /img/stackql-anthropic-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SchemaTable from '@site/src/components/SchemaTable/SchemaTable';

Creates, updates, deletes, gets or lists a <code>completions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="completions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.completions.completions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' }
    ]}
>
<TabItem value="create">

Text Completion object.

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique object identifier.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "completion",
    "type": "string",
    "description": "The resulting completion up to and excluding the stop sequences."
  },
  {
    "name": "model",
    "type": "string",
    "description": "The model that will complete your prompt.<br /><br />See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options. (claude-sonnet-5)"
  },
  {
    "name": "stop_reason",
    "type": "string",
    "description": "The reason that we stopped.<br /><br />This may be one the following values:<br />* `\"stop_sequence\"`: we reached a stop sequence — either provided by you via the `stop_sequences` parameter, or a stop sequence built into the model<br />* `\"max_tokens\"`: we exceeded `max_tokens_to_sample` or the model's maximum"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Text Completions, this is always `\"completion\"`. (completion)"
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
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-max_tokens_to_sample"><code>max_tokens_to_sample</code></a>, <a href="#parameter-model"><code>model</code></a>, <a href="#parameter-prompt"><code>prompt</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td>[Legacy] Create a Text Completion.<br /><br />The Text Completions API is a legacy API. We recommend using the [Messages API](https://platform.claude.com/docs/en/api/messages) going forward.<br /><br />Future models and features will not be compatible with Text Completions. See our [migration guide](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) for guidance in migrating from Text Completions to Messages.</td>
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
<tr id="parameter-anthropic-beta">
    <td><CopyableCode code="anthropic-beta" /></td>
    <td><code>string</code></td>
    <td>Optional header to specify the beta version(s) you want to use.  To use multiple betas, use a comma separated list like `beta1,beta2` or specify the header multiple times for each beta.</td>
</tr>
<tr id="parameter-anthropic-version">
    <td><CopyableCode code="anthropic-version" /></td>
    <td><code>string</code></td>
    <td>The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' }
    ]}
>
<TabItem value="create">

[Legacy] Create a Text Completion.<br /><br />The Text Completions API is a legacy API. We recommend using the [Messages API](https://platform.claude.com/docs/en/api/messages) going forward.<br /><br />Future models and features will not be compatible with Text Completions. See our [migration guide](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) for guidance in migrating from Text Completions to Messages.

```sql
SELECT
id,
completion,
model,
stop_reason,
type
FROM anthropic.completions.completions
WHERE max_tokens_to_sample = '{{ max_tokens_to_sample }}' -- required
AND model = '{{ model }}' -- required
AND prompt = '{{ prompt }}' -- required
;
```
</TabItem>
</Tabs>
