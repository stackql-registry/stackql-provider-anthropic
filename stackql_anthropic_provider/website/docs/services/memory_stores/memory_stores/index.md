---
title: memory_stores
hide_title: false
hide_table_of_contents: false
keywords:
  - memory_stores
  - memory_stores
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

Creates, updates, deletes, gets or lists a <code>memory_stores</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="memory_stores" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.memory_stores.memory_stores" /></td></tr>
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
    "description": "Unique identifier for the memory store (a `memstore_...` tagged ID). Use this when attaching the store to a session, or in the `&#123;memory_store_id&#125;` path parameter of subsequent calls."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name for the store. 1–255 characters. The store's mount-path slug under `/mnt/memory/` is derived from this name."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store was archived, or `null` if active. Set once and never cleared; archiving is one-way. Archived stores are read-only and cannot be attached to new sessions."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Free-text description of what the store contains, up to 1024 characters. Included in the agent's system prompt when the store is attached, so word it to be useful to the agent. Empty string when unset."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value tags for your own bookkeeping (such as the end user a store belongs to). Up to 16 pairs; keys 1–64 characters; values up to 512 characters. Returned on retrieve/list but not filterable."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory_store)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store's `name`, `description`, or `metadata` was last modified. Memory writes inside the store do not advance this."
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for the memory store (a `memstore_...` tagged ID). Use this when attaching the store to a session, or in the `&#123;memory_store_id&#125;` path parameter of subsequent calls."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name for the store. 1–255 characters. The store's mount-path slug under `/mnt/memory/` is derived from this name."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store was archived, or `null` if active. Set once and never cleared; archiving is one-way. Archived stores are read-only and cannot be attached to new sessions."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Free-text description of what the store contains, up to 1024 characters. Included in the agent's system prompt when the store is attached, so word it to be useful to the agent. Empty string when unset."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value tags for your own bookkeeping (such as the end user a store belongs to). Up to 16 pairs; keys 1–64 characters; values up to 512 characters. Returned on retrieve/list but not filterable."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory_store)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "Timestamp when the store's `name`, `description`, or `metadata` was last modified. Memory writes inside the store do not advance this."
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
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td></td>
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
<tr id="parameter-memory_store_id">
    <td><CopyableCode code="memory_store_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter memory_store_id</td>
</tr>
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return only stores whose `created_at` is at or after this time (inclusive). Sent on the wire as `created_at[gte]`.</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return only stores whose `created_at` is at or before this time (inclusive). Sent on the wire as `created_at[lte]`.</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>When `true`, archived stores are included in the results. Defaults to `false` (archived stores are excluded).</td>
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
archived_at,
created_at,
description,
metadata,
type,
updated_at
FROM anthropic.memory_stores.memory_stores
WHERE memory_store_id = '{{ memory_store_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
name,
archived_at,
created_at,
description,
metadata,
type,
updated_at
FROM anthropic.memory_stores.memory_stores
WHERE include_archived = '{{ include_archived }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

No description available.

```sql
INSERT INTO anthropic.memory_stores.memory_stores (
name,
description,
metadata
)
SELECT 
'{{ name }}' /* required */,
'{{ description }}',
'{{ metadata }}'
RETURNING
id,
name,
archived_at,
created_at,
description,
metadata,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: memory_stores
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Human-readable name for the store. Required; 1–255 characters; no control characters. The mount-path slug under \`/mnt/memory/\` is derived from this name (lowercased, non-alphanumeric runs collapsed to a hyphen). Names need not be unique within a workspace.
    - name: description
      value: "{{ description }}"
      description: |
        Free-text description of what the store contains, up to 1024 characters. Included in the agent's system prompt when the store is attached, so word it to be useful to the agent.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value tags for your own bookkeeping (such as the end user a store belongs to). Up to 16 pairs; keys 1–64 characters; values up to 512 characters. Not visible to the agent.
`}</CodeBlock>

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
UPDATE anthropic.memory_stores.memory_stores
SET 
name = '{{ name }}',
description = '{{ description }}',
metadata = '{{ metadata }}'
WHERE 
memory_store_id = '{{ memory_store_id }}' --required
RETURNING
id,
name,
archived_at,
created_at,
description,
metadata,
type,
updated_at;
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
DELETE FROM anthropic.memory_stores.memory_stores
WHERE memory_store_id = '{{ memory_store_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="archive"
    values={[
        { label: 'archive', value: 'archive' }
    ]}
>
<TabItem value="archive">

Successful response (OK)

```sql
EXEC anthropic.memory_stores.memory_stores.archive 
@memory_store_id='{{ memory_store_id }}' --required
;
```
</TabItem>
</Tabs>
