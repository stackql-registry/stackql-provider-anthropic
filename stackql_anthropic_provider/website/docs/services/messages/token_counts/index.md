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
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-user-profile-id"><code>anthropic-user-profile-id</code></a></td>
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
<tr id="parameter-anthropic-user-profile-id">
    <td><CopyableCode code="anthropic-user-profile-id" /></td>
    <td><code>string</code></td>
    <td>The user profile ID to attribute this request to. Use when acting on behalf of a party other than your organization. Requires the `user-profiles` beta header.</td>
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
    defaultValue="count_tokens"
    values={[
        { label: 'count_tokens', value: 'count_tokens' }
    ]}
>
<TabItem value="count_tokens">

Count the number of tokens in a Message.<br /><br />The Token Count API can be used to count the number of tokens in a Message, including tools, images, and documents, without creating it.<br /><br />Learn more about token counting in our [user guide](https://platform.claude.com/docs/en/build-with-claude/token-counting)

```sql
SELECT
input_tokens
FROM anthropic.messages.token_counts
WHERE messages = '{{ messages }}' -- required
AND model = '{{ model }}' -- required
AND "anthropic-user-profile-id" = '{{ anthropic-user-profile-id }}'
;
```
</TabItem>
</Tabs>
