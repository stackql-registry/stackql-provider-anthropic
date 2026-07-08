---
title: resources
hide_title: false
hide_table_of_contents: false
keywords:
  - resources
  - sessions
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

Creates, updates, deletes, gets or lists a <code>resources</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="resources" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.sessions.resources" /></td></tr>
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
    "description": ""
  },
  {
    "name": "name",
    "type": "string",
    "description": "Display name of the memory store, snapshotted at attach time. Later edits to the store's name do not propagate to this resource."
  },
  {
    "name": "file_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
  },
  {
    "name": "access",
    "type": "string",
    "description": "Access mode for the mounted store. Defaults to read_write. read_only mounts the store as a read-only filesystem. (read_write, read_only)"
  },
  {
    "name": "checkout",
    "type": "object",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (branch)"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Branch name to check out."
      },
      {
        "name": "sha",
        "type": "string",
        "description": "Full commit SHA to check out."
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the memory store, snapshotted at attach time. Rendered into the agent's system prompt. Empty string when the store has no description."
  },
  {
    "name": "instructions",
    "type": "string",
    "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
  },
  {
    "name": "mount_path",
    "type": "string",
    "description": ""
  },
  {
    "name": "type",
    "type": "string",
    "description": " (github_repository)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "url",
    "type": "string",
    "description": ""
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": ""
  },
  {
    "name": "name",
    "type": "string",
    "description": "Display name of the memory store, snapshotted at attach time. Later edits to the store's name do not propagate to this resource."
  },
  {
    "name": "file_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
  },
  {
    "name": "access",
    "type": "string",
    "description": "Access mode for the mounted store. Defaults to read_write. read_only mounts the store as a read-only filesystem. (read_write, read_only)"
  },
  {
    "name": "checkout",
    "type": "object",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (branch)"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Branch name to check out."
      },
      {
        "name": "sha",
        "type": "string",
        "description": "Full commit SHA to check out."
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the memory store, snapshotted at attach time. Rendered into the agent's system prompt. Empty string when the store has no description."
  },
  {
    "name": "instructions",
    "type": "string",
    "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
  },
  {
    "name": "mount_path",
    "type": "string",
    "description": ""
  },
  {
    "name": "type",
    "type": "string",
    "description": " (github_repository)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "url",
    "type": "string",
    "description": ""
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
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-resource_id"><code>resource_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-resource_id"><code>resource_id</code></a>, <a href="#parameter-authorization_token"><code>authorization_token</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-resource_id"><code>resource_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
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
<tr id="parameter-resource_id">
    <td><CopyableCode code="resource_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter resource_id (example: sesrsc_011CZkZBJq5dWxk9fVLNcPht)</td>
</tr>
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter session_id (example: sesn_011CZkZAtmR3yMPDzynEDxu7)</td>
</tr>
<tr id="parameter-anthropic-beta">
    <td><CopyableCode code="anthropic-beta" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-anthropic-version">
    <td><CopyableCode code="anthropic-version" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>Maximum number of resources to return per page (max 1000). If omitted, returns all resources.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque cursor from a previous response's next_page field.</td>
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

Successful response (OK)

```sql
SELECT
id,
name,
file_id,
memory_store_id,
access,
checkout,
created_at,
description,
instructions,
mount_path,
type,
updated_at,
url
FROM anthropic.sessions.resources
WHERE session_id = '{{ session_id }}' -- required
AND resource_id = '{{ resource_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
name,
file_id,
memory_store_id,
access,
checkout,
created_at,
description,
instructions,
mount_path,
type,
updated_at,
url
FROM anthropic.sessions.resources
WHERE session_id = '{{ session_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
AND limit = '{{ limit }}'
AND page = '{{ page }}'
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

No description available.

```sql
UPDATE anthropic.sessions.resources
SET 
authorization_token = '{{ authorization_token }}'
WHERE 
session_id = '{{ session_id }}' --required
WHERE resource_id = '{{ resource_id }}' --required
AND authorization_token = '{{ authorization_token }}' --required
RETURNING
id,
name,
file_id,
memory_store_id,
access,
checkout,
created_at,
description,
instructions,
mount_path,
type,
updated_at,
url;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

No description available.

```sql
DELETE FROM anthropic.sessions.resources
WHERE session_id = '{{ session_id }}' --required
AND resource_id = '{{ resource_id }}' --required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="add"
    values={[
        { label: 'add', value: 'add' }
    ]}
>
<TabItem value="add">

Successful response (OK)

```sql
EXEC anthropic.sessions.resources.add 
@session_id='{{ session_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}' 
@@json=
'{
"type": "{{ type }}", 
"file_id": "{{ file_id }}", 
"mount_path": "{{ mount_path }}"
}'
;
```
</TabItem>
</Tabs>
