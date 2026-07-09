---
title: deployment_runs
hide_title: false
hide_table_of_contents: false
keywords:
  - deployment_runs
  - deployments
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

Creates, updates, deletes, gets or lists a <code>deployment_runs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployment_runs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.deployments.deployment_runs" /></td></tr>
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

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this run (`drun_...`)."
  },
  {
    "name": "deployment_id",
    "type": "string",
    "description": "ID of the deployment that produced this run."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "Populated on success. Null on creation failure. Exactly one of session_id or error is non-null."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Snapshot of the agent at fire time. Always fully resolved — deployments pin agent + version.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (agent)"
      },
      {
        "name": "id",
        "type": "string",
        "description": ""
      },
      {
        "name": "version",
        "type": "integer (int32)",
        "description": ""
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Time this run record was persisted."
  },
  {
    "name": "error",
    "type": "object",
    "description": "Populated on creation failure. Null on success. Exactly one of session_id or error is non-null.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (environment_archived_error)"
      },
      {
        "name": "message",
        "type": "string",
        "description": "Human-readable error description."
      }
    ]
  },
  {
    "name": "trigger_context",
    "type": "object",
    "description": "What triggered this run and trigger-specific metadata.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (schedule)"
      },
      {
        "name": "scheduled_at",
        "type": "string (date-time)",
        "description": "The UTC instant at which the cron expression matched in the configured timezone, before jitter is applied. At most one run is recorded per (deployment_id, scheduled_at) pair."
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (deployment_run)"
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this run (`drun_...`)."
  },
  {
    "name": "deployment_id",
    "type": "string",
    "description": "ID of the deployment that produced this run."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "Populated on success. Null on creation failure. Exactly one of session_id or error is non-null."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Snapshot of the agent at fire time. Always fully resolved — deployments pin agent + version.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (agent)"
      },
      {
        "name": "id",
        "type": "string",
        "description": ""
      },
      {
        "name": "version",
        "type": "integer (int32)",
        "description": ""
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Time this run record was persisted."
  },
  {
    "name": "error",
    "type": "object",
    "description": "Populated on creation failure. Null on success. Exactly one of session_id or error is non-null.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (environment_archived_error)"
      },
      {
        "name": "message",
        "type": "string",
        "description": "Human-readable error description."
      }
    ]
  },
  {
    "name": "trigger_context",
    "type": "object",
    "description": "What triggered this run and trigger-specific metadata.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (schedule)"
      },
      {
        "name": "scheduled_at",
        "type": "string (date-time)",
        "description": "The UTC instant at which the cron expression matched in the configured timezone, before jitter is applied. At most one run is recorded per (deployment_id, scheduled_at) pair."
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (deployment_run)"
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
    <td><a href="#parameter-deployment_run_id"><code>deployment_run_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a>, <a href="#parameter-trigger_type"><code>trigger_type</code></a>, <a href="#parameter-has_error"><code>has_error</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-created_at[gt]"><code>created_at[gt]</code></a>, <a href="#parameter-created_at[lt]"><code>created_at[lt]</code></a></td>
    <td></td>
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
<tr id="parameter-deployment_run_id">
    <td><CopyableCode code="deployment_run_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter deployment_run_id</td>
</tr>
<tr id="parameter-created_at[gt]">
    <td><CopyableCode code="created_at[gt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return runs created strictly after this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return runs created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lt]">
    <td><CopyableCode code="created_at[lt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return runs created strictly before this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return runs created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-deployment_id">
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td>Filter to a specific deployment. Omit to list across all deployments in the workspace. Filtering by a non-existent deployment_id returns 200 with empty data.</td>
</tr>
<tr id="parameter-has_error">
    <td><CopyableCode code="has_error" /></td>
    <td><code>boolean</code></td>
    <td>Filter: true for runs with non-null error, false for runs with non-null session_id. Omit for all.</td>
</tr>
<tr id="parameter-trigger_type">
    <td><CopyableCode code="trigger_type" /></td>
    <td><code>string</code></td>
    <td>Filter runs by what triggered them. Omit to return all runs.</td>
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

Successful response (OK)

```sql
SELECT
id,
deployment_id,
session_id,
agent,
created_at,
error,
trigger_context,
type
FROM anthropic.deployments.deployment_runs
WHERE deployment_run_id = '{{ deployment_run_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
deployment_id,
session_id,
agent,
created_at,
error,
trigger_context,
type
FROM anthropic.deployments.deployment_runs
WHERE deployment_id = '{{ deployment_id }}'
AND trigger_type = '{{ trigger_type }}'
AND has_error = '{{ has_error }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
AND "created_at[gt]" = '{{ created_at[gt] }}'
AND "created_at[lt]" = '{{ created_at[lt] }}'
;
```
</TabItem>
</Tabs>
