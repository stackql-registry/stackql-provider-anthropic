---
title: work_stats
hide_title: false
hide_table_of_contents: false
keywords:
  - work_stats
  - environments
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

Creates, updates, deletes, gets or lists a <code>work_stats</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="work_stats" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.environments.work_stats" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

<SchemaTable fields={[
  {
    "name": "depth",
    "type": "integer",
    "description": "Number of work items waiting to be picked up (lag from consumer group)"
  },
  {
    "name": "oldest_queued_at",
    "type": "string",
    "description": "RFC 3339 timestamp of oldest item in the work stream (includes both queued and pending items), null if stream empty"
  },
  {
    "name": "pending",
    "type": "integer",
    "description": "Number of work items being processed (polled but not acknowledged)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "The type of object (work_queue_stats)"
  },
  {
    "name": "workers_polling",
    "type": "integer",
    "description": "Number of workers that have polled for work in the last 30 seconds. Requires worker_id to be sent with poll requests."
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Get statistics about the work queue for an environment.</td>
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
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td> (example: env_011CZkZ9X2dpNyB7HsEFoRfW)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Get statistics about the work queue for an environment.

```sql
SELECT
depth,
oldest_queued_at,
pending,
type,
workers_polling
FROM anthropic.environments.work_stats
WHERE environment_id = '{{ environment_id }}' -- required
;
```
</TabItem>
</Tabs>
