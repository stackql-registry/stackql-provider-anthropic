---
title: files
hide_title: false
hide_table_of_contents: false
keywords:
  - files
  - files
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

Creates, updates, deletes, gets or lists a <code>files</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="files" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.files.files" /></td></tr>
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
    "description": "Unique object identifier.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing when the file was created."
  },
  {
    "name": "downloadable",
    "type": "boolean",
    "description": "Whether the file can be downloaded."
  },
  {
    "name": "filename",
    "type": "string",
    "description": "Original filename of the uploaded file."
  },
  {
    "name": "mime_type",
    "type": "string",
    "description": "MIME type of the file."
  },
  {
    "name": "scope",
    "type": "object",
    "description": "The scope of this file, indicating the context in which it was created (e.g., a session).",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The ID of the scoping resource (e.g., the session ID)."
      },
      {
        "name": "type",
        "type": "string",
        "description": "The type of scope (e.g., `\"session\"`). (session)"
      }
    ]
  },
  {
    "name": "size_bytes",
    "type": "integer",
    "description": "Size of the file in bytes."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For files, this is always `\"file\"`. (file)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique object identifier.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing when the file was created."
  },
  {
    "name": "downloadable",
    "type": "boolean",
    "description": "Whether the file can be downloaded."
  },
  {
    "name": "filename",
    "type": "string",
    "description": "Original filename of the uploaded file."
  },
  {
    "name": "mime_type",
    "type": "string",
    "description": "MIME type of the file."
  },
  {
    "name": "scope",
    "type": "object",
    "description": "The scope of this file, indicating the context in which it was created (e.g., a session).",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The ID of the scoping resource (e.g., the session ID)."
      },
      {
        "name": "type",
        "type": "string",
        "description": "The type of scope (e.g., `\"session\"`). (session)"
      }
    ]
  },
  {
    "name": "size_bytes",
    "type": "integer",
    "description": "Size of the file in bytes."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For files, this is always `\"file\"`. (file)"
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
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-scope_id"><code>scope_id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#upload"><CopyableCode code="upload" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-file"><code>file</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#download"><CopyableCode code="download" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
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
<tr id="parameter-file_id">
    <td><CopyableCode code="file_id" /></td>
    <td><code>string</code></td>
    <td>ID of the File.</td>
</tr>
<tr id="parameter-after_id">
    <td><CopyableCode code="after_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately after this object.</td>
</tr>
<tr id="parameter-before_id">
    <td><CopyableCode code="before_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately before this object.</td>
</tr>
<tr id="parameter-scope_id">
    <td><CopyableCode code="scope_id" /></td>
    <td><code>string</code></td>
    <td>Filter by scope ID. Only returns files associated with the specified scope (e.g., a session ID).</td>
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

Successful Response

```sql
SELECT
id,
created_at,
downloadable,
filename,
mime_type,
scope,
size_bytes,
type
FROM anthropic.files.files
WHERE file_id = '{{ file_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful Response

```sql
SELECT
id,
created_at,
downloadable,
filename,
mime_type,
scope,
size_bytes,
type
FROM anthropic.files.files
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND scope_id = '{{ scope_id }}'
;
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
DELETE FROM anthropic.files.files
WHERE file_id = '{{ file_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="upload"
    values={[
        { label: 'upload', value: 'upload' },
        { label: 'download', value: 'download' }
    ]}
>
<TabItem value="upload">

Successful Response

```sql
EXEC anthropic.files.files.upload 
@@json=
'{
"file": "{{ file }}"
}'
;
```
</TabItem>
<TabItem value="download">

Successful Response

```sql
EXEC anthropic.files.files.download 
@file_id='{{ file_id }}' --required
;
```
</TabItem>
</Tabs>
