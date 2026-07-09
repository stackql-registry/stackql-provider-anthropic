---
title: memories
hide_title: false
hide_table_of_contents: false
keywords:
  - memories
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

Creates, updates, deletes, gets or lists a <code>memories</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="memories" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.memory_stores.memories" /></td></tr>
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
    "description": "Unique identifier for this memory (a `mem_...` value). Stable across renames; use this ID, not the path, to read, update, or delete the memory."
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "ID of the memory store this memory belongs to (a `memstore_...` value)."
  },
  {
    "name": "memory_version_id",
    "type": "string",
    "description": "ID of the `memory_version` representing this memory's current content (a `memver_...` value). This is the authoritative head pointer; `memory_version` objects do not carry an `is_latest` flag, so compare against this field instead. Enumerate the full history via [List memory versions](/en/api/beta/memory_stores/memory_versions/list)."
  },
  {
    "name": "content",
    "type": "string",
    "description": "The memory's UTF-8 text content. Populated when `view=full`; `null` when `view=basic`. Maximum 100 kB (102,400 bytes)."
  },
  {
    "name": "content_sha256",
    "type": "string",
    "description": "Lowercase hex SHA-256 digest of the UTF-8 `content` bytes (64 characters). The server applies no normalization, so clients can compute the same hash locally for staleness checks and as the value for a `content_sha256` precondition on update. Always populated, regardless of `view`."
  },
  {
    "name": "content_size_bytes",
    "type": "integer (int32)",
    "description": "Size of `content` in bytes (the UTF-8 plaintext length). Always populated, regardless of `view`."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this memory was created, in RFC 3339 format."
  },
  {
    "name": "path",
    "type": "string",
    "description": "Hierarchical path of the memory within the store, e.g. `/projects/foo/notes.md`. Always starts with `/`. Paths are case-sensitive and unique within a store. Maximum 1,024 bytes."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When this memory was last modified, in RFC 3339 format. Use this as a cheap freshness signal; for who made the change, look up the head version's `created_by` via [List memory versions](/en/api/beta/memory_stores/memory_versions/list)."
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this memory (a `mem_...` value). Stable across renames; use this ID, not the path, to read, update, or delete the memory."
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "ID of the memory store this memory belongs to (a `memstore_...` value)."
  },
  {
    "name": "memory_version_id",
    "type": "string",
    "description": "ID of the `memory_version` representing this memory's current content (a `memver_...` value). This is the authoritative head pointer; `memory_version` objects do not carry an `is_latest` flag, so compare against this field instead. Enumerate the full history via [List memory versions](/en/api/beta/memory_stores/memory_versions/list)."
  },
  {
    "name": "content",
    "type": "string",
    "description": "The memory's UTF-8 text content. Populated when `view=full`; `null` when `view=basic`. Maximum 100 kB (102,400 bytes)."
  },
  {
    "name": "content_sha256",
    "type": "string",
    "description": "Lowercase hex SHA-256 digest of the UTF-8 `content` bytes (64 characters). The server applies no normalization, so clients can compute the same hash locally for staleness checks and as the value for a `content_sha256` precondition on update. Always populated, regardless of `view`."
  },
  {
    "name": "content_size_bytes",
    "type": "integer (int32)",
    "description": "Size of `content` in bytes (the UTF-8 plaintext length). Always populated, regardless of `view`."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this memory was created, in RFC 3339 format."
  },
  {
    "name": "path",
    "type": "string",
    "description": "Hierarchical path of the memory within the store, e.g. `/projects/foo/notes.md`. Always starts with `/`. Paths are case-sensitive and unique within a store. Maximum 1,024 bytes."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When this memory was last modified, in RFC 3339 format. Use this as a cheap freshness signal; for who made the change, look up the head version's `created_by` via [List memory versions](/en/api/beta/memory_stores/memory_versions/list)."
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
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-memory_id"><code>memory_id</code></a></td>
    <td><a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td><a href="#parameter-path_prefix"><code>path_prefix</code></a>, <a href="#parameter-depth"><code>depth</code></a>, <a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-path"><code>path</code></a>, <a href="#parameter-content"><code>content</code></a></td>
    <td><a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-memory_id"><code>memory_id</code></a></td>
    <td><a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-memory_id"><code>memory_id</code></a></td>
    <td><a href="#parameter-expected_content_sha256"><code>expected_content_sha256</code></a></td>
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
<tr id="parameter-memory_id">
    <td><CopyableCode code="memory_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter memory_id</td>
</tr>
<tr id="parameter-memory_store_id">
    <td><CopyableCode code="memory_store_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter memory_store_id</td>
</tr>
<tr id="parameter-depth">
    <td><CopyableCode code="depth" /></td>
    <td><code>integer (int32)</code></td>
    <td>`0` (or omitted) returns all descendants below `path_prefix` (recursive). `1` returns immediate children only; deeper entries roll up as `memory_prefix` items. `depth=1` behaves like `ls`; omitting `depth` behaves like `find`.</td>
</tr>
<tr id="parameter-expected_content_sha256">
    <td><CopyableCode code="expected_content_sha256" /></td>
    <td><code>string</code></td>
    <td>Query parameter for expected_content_sha256</td>
</tr>
<tr id="parameter-path_prefix">
    <td><CopyableCode code="path_prefix" /></td>
    <td><code>string</code></td>
    <td>Optional path prefix filter. Must end with `/` (segment-aligned), e.g., `/notes/`. This value appears in request URLs. Do not include secrets or personally identifiable information.</td>
</tr>
<tr id="parameter-view">
    <td><CopyableCode code="view" /></td>
    <td><code>string</code></td>
    <td>Query parameter for view</td>
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
memory_store_id,
memory_version_id,
content,
content_sha256,
content_size_bytes,
created_at,
path,
type,
updated_at
FROM anthropic.memory_stores.memories
WHERE memory_store_id = '{{ memory_store_id }}' -- required
AND memory_id = '{{ memory_id }}' -- required
AND view = '{{ view }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
memory_store_id,
memory_version_id,
content,
content_sha256,
content_size_bytes,
created_at,
path,
type,
updated_at
FROM anthropic.memory_stores.memories
WHERE memory_store_id = '{{ memory_store_id }}' -- required
AND path_prefix = '{{ path_prefix }}'
AND depth = '{{ depth }}'
AND view = '{{ view }}'
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
INSERT INTO anthropic.memory_stores.memories (
path,
content,
memory_store_id,
view
)
SELECT 
'{{ path }}' /* required */,
'{{ content }}' /* required */,
'{{ memory_store_id }}',
'{{ view }}'
RETURNING
id,
memory_store_id,
memory_version_id,
content,
content_sha256,
content_size_bytes,
created_at,
path,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: memories
  props:
    - name: memory_store_id
      value: "{{ memory_store_id }}"
      description: Required parameter for the memories resource.
    - name: path
      value: "{{ path }}"
      description: |
        Hierarchical path for the new memory, e.g. \`/projects/foo/notes.md\`. Must start with \`/\`, contain at least one non-empty segment, and be at most 1,024 bytes. Must not contain empty segments, \`.\` or \`..\` segments, control or format characters, and must be NFC-normalized. Paths are case-sensitive.
    - name: content
      value: "{{ content }}"
      description: |
        UTF-8 text content for the new memory. Maximum 100 kB (102,400 bytes). Required; pass \`""\` explicitly to create an empty memory.
    - name: view
      value: "{{ view }}"
      description: Query parameter for view
      description: Query parameter for view
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
UPDATE anthropic.memory_stores.memories
SET 
content = '{{ content }}',
path = '{{ path }}',
precondition = '{{ precondition }}'
WHERE 
memory_store_id = '{{ memory_store_id }}' --required
WHERE memory_id = '{{ memory_id }}' --required
AND view = '{{ view}}'
RETURNING
id,
memory_store_id,
memory_version_id,
content,
content_sha256,
content_size_bytes,
created_at,
path,
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
DELETE FROM anthropic.memory_stores.memories
WHERE memory_store_id = '{{ memory_store_id }}' --required
AND memory_id = '{{ memory_id }}' --required
AND expected_content_sha256 = '{{ expected_content_sha256 }}'
;
```
</TabItem>
</Tabs>
