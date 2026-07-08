---
title: memory_versions
hide_title: false
hide_table_of_contents: false
keywords:
  - memory_versions
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

Creates, updates, deletes, gets or lists a <code>memory_versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="memory_versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.memory_stores.memory_versions" /></td></tr>
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
    "description": "Unique identifier for this version (a `memver_...` value)."
  },
  {
    "name": "memory_id",
    "type": "string",
    "description": "ID of the memory this version snapshots (a `mem_...` value). Remains valid after the memory is deleted; pass it as `memory_id` to [List memory versions](/en/api/beta/memory_stores/memory_versions/list) to retrieve the full lineage including the `deleted` row."
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "ID of the memory store this version belongs to (a `memstore_...` value)."
  },
  {
    "name": "content",
    "type": "string",
    "description": "The memory's UTF-8 text content as of this version. `null` when `view=basic`, when `operation` is `deleted`, or when `redacted_at` is set."
  },
  {
    "name": "content_sha256",
    "type": "string",
    "description": "Lowercase hex SHA-256 digest of `content` as of this version (64 characters). `null` when `redacted_at` is set or `operation` is `deleted`. Populated regardless of `view` otherwise."
  },
  {
    "name": "content_size_bytes",
    "type": "integer (int32)",
    "description": "Size of `content` in bytes as of this version. `null` when `redacted_at` is set or `operation` is `deleted`. Populated regardless of `view` otherwise."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this version was written, in RFC 3339 format."
  },
  {
    "name": "created_by",
    "type": "object",
    "description": "Who performed this write: a `session_actor`, `api_actor`, or `user_actor`. Captured at write time and preserved through redaction.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (session_actor)"
      },
      {
        "name": "session_id",
        "type": "string",
        "description": "ID of the session that performed the write (a `sesn_...` value). Look up the session via [Retrieve a session](/en/api/sessions-retrieve) for further provenance."
      },
      {
        "name": "api_key_id",
        "type": "string",
        "description": "ID of the API key that performed the write. This identifies the key, not the secret."
      },
      {
        "name": "user_id",
        "type": "string",
        "description": "ID of the user who performed the write (a `user_...` value)."
      }
    ]
  },
  {
    "name": "operation",
    "type": "string",
    "description": "The kind of mutation this version records: `created`, `modified`, or `deleted`. (created, modified, deleted)"
  },
  {
    "name": "path",
    "type": "string",
    "description": "The memory's path at the time of this write. `null` if and only if `redacted_at` is set."
  },
  {
    "name": "redacted_at",
    "type": "string (date-time)",
    "description": "When this version was redacted, in RFC 3339 format, or `null` if it has not been redacted. When set, `content`, `path`, `content_size_bytes`, and `content_sha256` are all `null`. See [Redact a memory version](/en/api/beta/memory_stores/memory_versions/redact)."
  },
  {
    "name": "redacted_by",
    "type": "object",
    "description": "Who redacted this version, or `null` if it has not been redacted. In practice always an `api_actor` or `user_actor` (agents do not have a redact capability).",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (session_actor)"
      },
      {
        "name": "session_id",
        "type": "string",
        "description": "ID of the session that performed the write (a `sesn_...` value). Look up the session via [Retrieve a session](/en/api/sessions-retrieve) for further provenance."
      },
      {
        "name": "api_key_id",
        "type": "string",
        "description": "ID of the API key that performed the write. This identifies the key, not the secret."
      },
      {
        "name": "user_id",
        "type": "string",
        "description": "ID of the user who performed the write (a `user_...` value)."
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory_version)"
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this version (a `memver_...` value)."
  },
  {
    "name": "memory_id",
    "type": "string",
    "description": "ID of the memory this version snapshots (a `mem_...` value). Remains valid after the memory is deleted; pass it as `memory_id` to [List memory versions](/en/api/beta/memory_stores/memory_versions/list) to retrieve the full lineage including the `deleted` row."
  },
  {
    "name": "memory_store_id",
    "type": "string",
    "description": "ID of the memory store this version belongs to (a `memstore_...` value)."
  },
  {
    "name": "content",
    "type": "string",
    "description": "The memory's UTF-8 text content as of this version. `null` when `view=basic`, when `operation` is `deleted`, or when `redacted_at` is set."
  },
  {
    "name": "content_sha256",
    "type": "string",
    "description": "Lowercase hex SHA-256 digest of `content` as of this version (64 characters). `null` when `redacted_at` is set or `operation` is `deleted`. Populated regardless of `view` otherwise."
  },
  {
    "name": "content_size_bytes",
    "type": "integer (int32)",
    "description": "Size of `content` in bytes as of this version. `null` when `redacted_at` is set or `operation` is `deleted`. Populated regardless of `view` otherwise."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this version was written, in RFC 3339 format."
  },
  {
    "name": "created_by",
    "type": "object",
    "description": "Who performed this write: a `session_actor`, `api_actor`, or `user_actor`. Captured at write time and preserved through redaction.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (session_actor)"
      },
      {
        "name": "session_id",
        "type": "string",
        "description": "ID of the session that performed the write (a `sesn_...` value). Look up the session via [Retrieve a session](/en/api/sessions-retrieve) for further provenance."
      },
      {
        "name": "api_key_id",
        "type": "string",
        "description": "ID of the API key that performed the write. This identifies the key, not the secret."
      },
      {
        "name": "user_id",
        "type": "string",
        "description": "ID of the user who performed the write (a `user_...` value)."
      }
    ]
  },
  {
    "name": "operation",
    "type": "string",
    "description": "The kind of mutation this version records: `created`, `modified`, or `deleted`. (created, modified, deleted)"
  },
  {
    "name": "path",
    "type": "string",
    "description": "The memory's path at the time of this write. `null` if and only if `redacted_at` is set."
  },
  {
    "name": "redacted_at",
    "type": "string (date-time)",
    "description": "When this version was redacted, in RFC 3339 format, or `null` if it has not been redacted. When set, `content`, `path`, `content_size_bytes`, and `content_sha256` are all `null`. See [Redact a memory version](/en/api/beta/memory_stores/memory_versions/redact)."
  },
  {
    "name": "redacted_by",
    "type": "object",
    "description": "Who redacted this version, or `null` if it has not been redacted. In practice always an `api_actor` or `user_actor` (agents do not have a redact capability).",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (session_actor)"
      },
      {
        "name": "session_id",
        "type": "string",
        "description": "ID of the session that performed the write (a `sesn_...` value). Look up the session via [Retrieve a session](/en/api/sessions-retrieve) for further provenance."
      },
      {
        "name": "api_key_id",
        "type": "string",
        "description": "ID of the API key that performed the write. This identifies the key, not the secret."
      },
      {
        "name": "user_id",
        "type": "string",
        "description": "ID of the user who performed the write (a `user_...` value)."
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (memory_version)"
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
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-memory_version_id"><code>memory_version_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-memory_id"><code>memory_id</code></a>, <a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-api_key_id"><code>api_key_id</code></a>, <a href="#parameter-operation"><code>operation</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-view"><code>view</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#redact"><CopyableCode code="redact" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-memory_version_id"><code>memory_version_id</code></a></td>
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
<tr id="parameter-memory_store_id">
    <td><CopyableCode code="memory_store_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter memory_store_id</td>
</tr>
<tr id="parameter-memory_version_id">
    <td><CopyableCode code="memory_version_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter memory_version_id</td>
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
<tr id="parameter-api_key_id">
    <td><CopyableCode code="api_key_id" /></td>
    <td><code>string</code></td>
    <td>Query parameter for api_key_id</td>
</tr>
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return versions created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return versions created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>Query parameter for limit</td>
</tr>
<tr id="parameter-memory_id">
    <td><CopyableCode code="memory_id" /></td>
    <td><code>string</code></td>
    <td>Query parameter for memory_id</td>
</tr>
<tr id="parameter-operation">
    <td><CopyableCode code="operation" /></td>
    <td><code>string</code></td>
    <td>Query parameter for operation</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Query parameter for page</td>
</tr>
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>Query parameter for session_id</td>
</tr>
<tr id="parameter-view">
    <td><CopyableCode code="view" /></td>
    <td><code>string</code></td>
    <td>Query parameter for view</td>
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
memory_id,
memory_store_id,
content,
content_sha256,
content_size_bytes,
created_at,
created_by,
operation,
path,
redacted_at,
redacted_by,
type
FROM anthropic.memory_stores.memory_versions
WHERE memory_store_id = '{{ memory_store_id }}' -- required
AND memory_version_id = '{{ memory_version_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
AND view = '{{ view }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
memory_id,
memory_store_id,
content,
content_sha256,
content_size_bytes,
created_at,
created_by,
operation,
path,
redacted_at,
redacted_by,
type
FROM anthropic.memory_stores.memory_versions
WHERE memory_store_id = '{{ memory_store_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
AND memory_id = '{{ memory_id }}'
AND session_id = '{{ session_id }}'
AND api_key_id = '{{ api_key_id }}'
AND operation = '{{ operation }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
AND limit = '{{ limit }}'
AND page = '{{ page }}'
AND view = '{{ view }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="redact"
    values={[
        { label: 'redact', value: 'redact' }
    ]}
>
<TabItem value="redact">

Successful response (OK)

```sql
EXEC anthropic.memory_stores.memory_versions.redact 
@memory_store_id='{{ memory_store_id }}' --required, 
@memory_version_id='{{ memory_version_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
</Tabs>
