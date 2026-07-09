---
title: token_counts
hide_title: false
hide_table_of_contents: false
keywords:
  - token_counts
  - messages
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

Creates, updates, deletes, gets or lists a <code>token_counts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="token_counts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.messages.token_counts" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="count_tokens"
    values={[
        { label: 'count_tokens', value: 'count_tokens' }
    ]}
>
<TabItem value="count_tokens">

<SchemaTable fields={[
  {
    "name": "input_tokens",
    "type": "integer",
    "description": "The total number of tokens across the provided list of messages, system prompt, and tools."
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
    <td><a href="#count_tokens"><CopyableCode code="count_tokens" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-messages"><code>messages</code></a>, <a href="#parameter-model"><code>model</code></a></td>
    <td><a href="#parameter-cache_control"><code>cache_control</code></a>, <a href="#parameter-output_config"><code>output_config</code></a>, <a href="#parameter-system"><code>system</code></a>, <a href="#parameter-thinking"><code>thinking</code></a>, <a href="#parameter-tool_choice"><code>tool_choice</code></a>, <a href="#parameter-tools"><code>tools</code></a></td>
    <td>Count the number of tokens in a Message.<br /><br />The Token Count API can be used to count the number of tokens in a Message, including tools, images, and documents, without creating it.<br /><br />Learn more about token counting in our [user guide](https://platform.claude.com/docs/en/build-with-claude/token-counting)</td>
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
<tr id="parameter-cache_control">
    <td><CopyableCode code="cache_control" /></td>
    <td><code>string</code></td>
    <td>Top-level cache control automatically applies a cache_control marker to the last cacheable block in the request.</td>
</tr>
<tr id="parameter-messages">
    <td><CopyableCode code="messages" /></td>
    <td><code>array</code></td>
    <td>Input messages.</td>
</tr>
<tr id="parameter-model">
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>The model that will complete your prompt.</td>
</tr>
<tr id="parameter-output_config">
    <td><CopyableCode code="output_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-system">
    <td><CopyableCode code="system" /></td>
    <td><code>string</code></td>
    <td>System prompt.</td>
</tr>
<tr id="parameter-thinking">
    <td><CopyableCode code="thinking" /></td>
    <td><code>object</code></td>
    <td>Configuration for enabling Claude's extended thinking.</td>
</tr>
<tr id="parameter-tool_choice">
    <td><CopyableCode code="tool_choice" /></td>
    <td><code>object</code></td>
    <td>How the model should use the provided tools. The model can use a specific tool, any available tool, decide by itself, or not use tools at all.</td>
</tr>
<tr id="parameter-tools">
    <td><CopyableCode code="tools" /></td>
    <td><code>array</code></td>
    <td>Definitions of tools that the model may use.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="count_tokens"
    values={[
        { label: 'count_tokens', value: 'count_tokens' }
    ]}
>
<TabItem value="count_tokens">

Count the number of tokens in a Message.<br /><br />The Token Count API can be used to count the number of tokens in a Message, including tools, images, and documents, without creating it.<br /><br />Learn more about token counting in our [user guide](https://platform.claude.com/docs/en/build-with-claude/token-counting)

<Tabs
    defaultValue="shape"
    values={[
        { label: 'Query Shape', value: 'shape' },
        { label: 'Query Example', value: 'example' }
    ]}
>
<TabItem value="shape">

```sql
SELECT
input_tokens
FROM anthropic.messages.token_counts
WHERE messages = '{{ messages }}' -- required
AND model = '{{ model }}' -- required
AND cache_control = '{{ cache_control }}'
AND output_config = '{{ output_config }}'
AND system = '{{ system }}'
AND thinking = '{{ thinking }}'
AND tool_choice = '{{ tool_choice }}'
AND tools = '{{ tools }}'
;
```
</TabItem>
<TabItem value="example">

```sql
SELECT
input_tokens
FROM anthropic.messages.token_counts
WHERE model = 'claude-sonnet-5'
AND messages = '[
  {
    "role": "user",
    "content": "how does stackql work?"
  }
]'
AND system = 'You are a technical assistant. Answer concisely.'
;
```
</TabItem>
</Tabs>
</TabItem>
</Tabs>
