---
title: work_items
hide_title: false
hide_table_of_contents: false
keywords:
  - work_items
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

Creates, updates, deletes, gets or lists a <code>work_items</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="work_items" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.environments.work_items" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Work identifier (e.g., 'work_...')"
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": "Environment identifier this work belongs to (e.g., `env_...`)"
  },
  {
    "name": "acknowledged_at",
    "type": "string",
    "description": "RFC 3339 timestamp when the work item was acknowledged and assigned to a self-hosted sandbox"
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work was created"
  },
  {
    "name": "data",
    "type": "object",
    "description": "The actual work to be performed",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "Session identifier (e.g., 'session_...')"
      },
      {
        "name": "type",
        "type": "string",
        "description": "Type of work data (session)"
      }
    ]
  },
  {
    "name": "latest_heartbeat_at",
    "type": "string",
    "description": "RFC 3339 timestamp of the most recent heartbeat"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "User-provided metadata key-value pairs associated with this work item"
  },
  {
    "name": "started_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work execution started"
  },
  {
    "name": "state",
    "type": "string",
    "description": "Current state of the work item (queued, starting, active, stopping, stopped)"
  },
  {
    "name": "stop_requested_at",
    "type": "string",
    "description": "RFC 3339 timestamp when stop was requested"
  },
  {
    "name": "stopped_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work execution stopped"
  },
  {
    "name": "type",
    "type": "string",
    "description": "The type of object (always 'work') (work)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Work identifier (e.g., 'work_...')"
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": "Environment identifier this work belongs to (e.g., `env_...`)"
  },
  {
    "name": "acknowledged_at",
    "type": "string",
    "description": "RFC 3339 timestamp when the work item was acknowledged and assigned to a self-hosted sandbox"
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work was created"
  },
  {
    "name": "data",
    "type": "object",
    "description": "The actual work to be performed",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "Session identifier (e.g., 'session_...')"
      },
      {
        "name": "type",
        "type": "string",
        "description": "Type of work data (session)"
      }
    ]
  },
  {
    "name": "latest_heartbeat_at",
    "type": "string",
    "description": "RFC 3339 timestamp of the most recent heartbeat"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "User-provided metadata key-value pairs associated with this work item"
  },
  {
    "name": "started_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work execution started"
  },
  {
    "name": "state",
    "type": "string",
    "description": "Current state of the work item (queued, starting, active, stopping, stopped)"
  },
  {
    "name": "stop_requested_at",
    "type": "string",
    "description": "RFC 3339 timestamp when stop was requested"
  },
  {
    "name": "stopped_at",
    "type": "string",
    "description": "RFC 3339 timestamp when work execution stopped"
  },
  {
    "name": "type",
    "type": "string",
    "description": "The type of object (always 'work') (work)"
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-work_id"><code>work_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Retrieve detailed information about a specific work item.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-authorization"><code>authorization</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />List work items in an environment.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-work_id"><code>work_id</code></a>, <a href="#parameter-metadata"><code>metadata</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Update work item metadata with merge semantics.</td>
</tr>
<tr>
    <td><a href="#poll"><CopyableCode code="poll" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-block_ms"><code>block_ms</code></a>, <a href="#parameter-reclaim_older_than_ms"><code>reclaim_older_than_ms</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-Anthropic-Worker-ID"><code>Anthropic-Worker-ID</code></a>, <a href="#parameter-authorization"><code>authorization</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Long poll for work items in the queue.</td>
</tr>
<tr>
    <td><a href="#ack"><CopyableCode code="ack" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-work_id"><code>work_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-authorization"><code>authorization</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Acknowledge receipt of a work item, transitioning it from 'queued' to 'starting' and removing it from the queue.</td>
</tr>
<tr>
    <td><a href="#heartbeat"><CopyableCode code="heartbeat" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-work_id"><code>work_id</code></a></td>
    <td><a href="#parameter-desired_ttl_seconds"><code>desired_ttl_seconds</code></a>, <a href="#parameter-expected_last_heartbeat"><code>expected_last_heartbeat</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-authorization"><code>authorization</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Record a heartbeat for a work item to maintain the lease.</td>
</tr>
<tr>
    <td><a href="#stop"><CopyableCode code="stop" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-work_id"><code>work_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-authorization"><code>authorization</code></a></td>
    <td>Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Stop a work item, initiating graceful or forced shutdown.</td>
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
<tr id="parameter-work_id">
    <td><CopyableCode code="work_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-Anthropic-Worker-ID">
    <td><CopyableCode code="Anthropic-Worker-ID" /></td>
    <td><code>string</code></td>
    <td>Unique identifier for the specific worker polling, used to track aggregated environment-level work metrics in Console</td>
</tr>
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
<tr id="parameter-authorization">
    <td><CopyableCode code="authorization" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-block_ms">
    <td><CopyableCode code="block_ms" /></td>
    <td><code>integer</code></td>
    <td>How long to wait for work to arrive before returning. Must be 1-999 in milliseconds. Defaults to non-blocking (returns immediately if no work is available).</td>
</tr>
<tr id="parameter-desired_ttl_seconds">
    <td><CopyableCode code="desired_ttl_seconds" /></td>
    <td><code>integer</code></td>
    <td>Desired TTL in seconds</td>
</tr>
<tr id="parameter-expected_last_heartbeat">
    <td><CopyableCode code="expected_last_heartbeat" /></td>
    <td><code>string</code></td>
    <td>Expected last_heartbeat for conditional update (optimistic concurrency). Use literal 'NO_HEARTBEAT' to claim an unclaimed lease (first heartbeat). For subsequent heartbeats, echo the server's previous last_heartbeat value exactly. Returns 412 Precondition Failed if the actual value doesn't match.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of work items to return</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque cursor from previous response for pagination</td>
</tr>
<tr id="parameter-reclaim_older_than_ms">
    <td><CopyableCode code="reclaim_older_than_ms" /></td>
    <td><code>integer</code></td>
    <td>Reclaim unacknowledged work items older than this many milliseconds. If omitted, uses the default (5000ms).</td>
</tr>
<tr id="parameter-x-api-key">
    <td><CopyableCode code="x-api-key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Retrieve detailed information about a specific work item.

```sql
SELECT
id,
environment_id,
acknowledged_at,
created_at,
data,
latest_heartbeat_at,
metadata,
started_at,
state,
stop_requested_at,
stopped_at,
type
FROM anthropic.environments.work_items
WHERE environment_id = '{{ environment_id }}' -- required
AND work_id = '{{ work_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />List work items in an environment.

```sql
SELECT
id,
environment_id,
acknowledged_at,
created_at,
data,
latest_heartbeat_at,
metadata,
started_at,
state,
stop_requested_at,
stopped_at,
type
FROM anthropic.environments.work_items
WHERE environment_id = '{{ environment_id }}' -- required
AND limit = '{{ limit }}'
AND page = '{{ page }}'
AND authorization = '{{ authorization }}'
;
```
</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Update work item metadata with merge semantics.

```sql
UPDATE anthropic.environments.work_items
SET 
metadata = '{{ metadata }}'
WHERE 
environment_id = '{{ environment_id }}' --required
WHERE work_id = '{{ work_id }}' --required
AND metadata = '{{ metadata }}' --required
RETURNING
id,
environment_id,
acknowledged_at,
created_at,
data,
latest_heartbeat_at,
metadata,
started_at,
state,
stop_requested_at,
stopped_at,
type;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="poll"
    values={[
        { label: 'poll', value: 'poll' },
        { label: 'ack', value: 'ack' },
        { label: 'heartbeat', value: 'heartbeat' },
        { label: 'stop', value: 'stop' }
    ]}
>
<TabItem value="poll">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Long poll for work items in the queue.

```sql
EXEC anthropic.environments.work_items.poll 
@environment_id='{{ environment_id }}' --required, 
@block_ms='{{ block_ms }}', 
@reclaim_older_than_ms='{{ reclaim_older_than_ms }}', 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}', 
@Anthropic-Worker-ID='{{ Anthropic-Worker-ID }}', 
@authorization='{{ authorization }}'
;
```
</TabItem>
<TabItem value="ack">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Acknowledge receipt of a work item, transitioning it from 'queued' to 'starting' and removing it from the queue.

```sql
EXEC anthropic.environments.work_items.ack 
@environment_id='{{ environment_id }}' --required, 
@work_id='{{ work_id }}' --required, 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}', 
@authorization='{{ authorization }}'
;
```
</TabItem>
<TabItem value="heartbeat">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Record a heartbeat for a work item to maintain the lease.

```sql
EXEC anthropic.environments.work_items.heartbeat 
@environment_id='{{ environment_id }}' --required, 
@work_id='{{ work_id }}' --required, 
@desired_ttl_seconds='{{ desired_ttl_seconds }}', 
@expected_last_heartbeat='{{ expected_last_heartbeat }}', 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}', 
@authorization='{{ authorization }}'
;
```
</TabItem>
<TabItem value="stop">

Note: these endpoints are called automatically by the pre-built environment worker provided in the SDKs and CLI, for orchestrating sessions with self-hosted sandbox environments. They are included here as a reference; you do not need to invoke them directly.<br /><br />Stop a work item, initiating graceful or forced shutdown.

```sql
EXEC anthropic.environments.work_items.stop 
@environment_id='{{ environment_id }}' --required, 
@work_id='{{ work_id }}' --required, 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}', 
@authorization='{{ authorization }}' 
@@json=
'{
"force": {{ force }}
}'
;
```
</TabItem>
</Tabs>
