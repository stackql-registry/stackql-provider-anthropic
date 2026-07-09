---
title: api_keys
hide_title: false
hide_table_of_contents: false
keywords:
  - api_keys
  - api_keys
  - anthropic_admin
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage anthropic_admin resources using SQL
custom_edit_url: null
image: /img/stackql-anthropic_admin-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SchemaTable from '@site/src/components/SchemaTable/SchemaTable';

Creates, updates, deletes, gets or lists an <code>api_keys</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="api_keys" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.api_keys.api_keys" /></td></tr>
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
    "description": "ID of the API key."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the API key."
  },
  {
    "name": "workspace_id",
    "type": "string",
    "description": "ID of the Workspace associated with the API key, or null if the API key belongs to the default Workspace."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the API Key was created."
  },
  {
    "name": "created_by",
    "type": "object",
    "description": "The ID and type of the actor that created the API key.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "ID of the actor that created the object."
      },
      {
        "name": "type",
        "type": "string",
        "description": "Type of the actor that created the object."
      }
    ]
  },
  {
    "name": "expires_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the API Key expires, or null if it never expires."
  },
  {
    "name": "partial_key_hint",
    "type": "string",
    "description": "Partially redacted hint for the API key."
  },
  {
    "name": "status",
    "type": "string",
    "description": "Status of the API key. (active, archived, expired, inactive)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `api_key`. (api_key)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "ID of the API key."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the API key."
  },
  {
    "name": "workspace_id",
    "type": "string",
    "description": "ID of the Workspace associated with the API key, or null if the API key belongs to the default Workspace."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the API Key was created."
  },
  {
    "name": "created_by",
    "type": "object",
    "description": "The ID and type of the actor that created the API key.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "ID of the actor that created the object."
      },
      {
        "name": "type",
        "type": "string",
        "description": "Type of the actor that created the object."
      }
    ]
  },
  {
    "name": "expires_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the API Key expires, or null if it never expires."
  },
  {
    "name": "partial_key_hint",
    "type": "string",
    "description": "Partially redacted hint for the API key."
  },
  {
    "name": "status",
    "type": "string",
    "description": "Status of the API key. (active, archived, expired, inactive)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `api_key`. (api_key)"
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
    <td><a href="#parameter-api_key_id"><code>api_key_id</code></a></td>
    <td></td>
    <td>Get an API key by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-created_by_user_id"><code>created_by_user_id</code></a></td>
    <td>List API keys in the organization.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-api_key_id"><code>api_key_id</code></a></td>
    <td></td>
    <td>Update an API key's name or status.</td>
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
<tr id="parameter-api_key_id">
    <td><CopyableCode code="api_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the API key.</td>
</tr>
<tr id="parameter-after_id">
    <td><CopyableCode code="after_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. Returns the page of results immediately after this object.</td>
</tr>
<tr id="parameter-before_id">
    <td><CopyableCode code="before_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. Returns the page of results immediately before this object.</td>
</tr>
<tr id="parameter-created_by_user_id">
    <td><CopyableCode code="created_by_user_id" /></td>
    <td><code>string</code></td>
    <td>Filter by the ID of the User who created the object.</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Filter by API key status.</td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td>Filter by Workspace ID.</td>
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

Get an API key by ID.

```sql
SELECT
id,
name,
workspace_id,
created_at,
created_by,
expires_at,
partial_key_hint,
status,
type
FROM anthropic_admin.api_keys.api_keys
WHERE api_key_id = '{{ api_key_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List API keys in the organization.

```sql
SELECT
id,
name,
workspace_id,
created_at,
created_by,
expires_at,
partial_key_hint,
status,
type
FROM anthropic_admin.api_keys.api_keys
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND status = '{{ status }}'
AND workspace_id = '{{ workspace_id }}'
AND created_by_user_id = '{{ created_by_user_id }}'
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

Update an API key's name or status.

```sql
UPDATE anthropic_admin.api_keys.api_keys
SET 
name = '{{ name }}',
status = '{{ status }}'
WHERE 
api_key_id = '{{ api_key_id }}' --required
RETURNING
id,
name,
workspace_id,
created_at,
created_by,
expires_at,
partial_key_hint,
status,
type;
```
</TabItem>
</Tabs>
