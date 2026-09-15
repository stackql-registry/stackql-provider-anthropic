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
    "name": "expires_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing when the file will expire and become unavailable for download. Null if the file does not expire. For files uploaded with `expires_in_seconds`, this is the upload time plus that value."
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
    "name": "expires_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing when the file will expire and become unavailable for download. Null if the file does not expire. For files uploaded with `expires_in_seconds`, this is the upload time plus that value."
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
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-ids[]"><code>ids[]</code></a>, <a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#upload"><CopyableCode code="upload" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-file"><code>file</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#download"><CopyableCode code="download" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-file_id"><code>file_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
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
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
</tr>
<tr id="parameter-ids[]">
    <td><CopyableCode code="ids[]" /></td>
    <td><code>string</code></td>
    <td>Restrict the result set to Files whose `id` is in this list. At most 100 entries (after de-duplication). Mutually exclusive with `page` and `limit`. When supplied, the response is always a single page (`next_page` is null). IDs that do not resolve to a visible File — including deleted Files — are silently omitted.</td>
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
expires_at,
filename,
mime_type,
size_bytes,
type
FROM anthropic.files.files
WHERE file_id = '{{ file_id }}' -- required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
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
expires_at,
filename,
mime_type,
size_bytes,
type
FROM anthropic.files.files
WHERE "ids[]" = '{{ ids[] }}'
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
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
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
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
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
@@json=
'{
"file": "{{ file }}", 
"expires_in_seconds": {{ expires_in_seconds }}
}'
;
```
</TabItem>
<TabItem value="download">

Successful Response

```sql
EXEC anthropic.files.files.download 
@file_id='{{ file_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
