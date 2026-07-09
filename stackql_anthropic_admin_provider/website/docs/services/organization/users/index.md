---
title: users
hide_title: false
hide_table_of_contents: false
keywords:
  - users
  - organization
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

Creates, updates, deletes, gets or lists a <code>users</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="users" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.organization.users" /></td></tr>
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
    "description": "ID of the User."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the User."
  },
  {
    "name": "added_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the User joined the Organization."
  },
  {
    "name": "email",
    "type": "string",
    "description": "Email of the User."
  },
  {
    "name": "role",
    "type": "string",
    "description": "Organization role of the User. (admin, billing, claude_code_user, developer, user)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `user`. (user)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "ID of the User."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the User."
  },
  {
    "name": "added_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the User joined the Organization."
  },
  {
    "name": "email",
    "type": "string",
    "description": "Email of the User."
  },
  {
    "name": "role",
    "type": "string",
    "description": "Organization role of the User. (admin, billing, claude_code_user, developer, user)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `user`. (user)"
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
    <td><a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Get an organization member by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-email"><code>email</code></a></td>
    <td>List members of the organization.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-role"><code>role</code></a></td>
    <td></td>
    <td>Update an organization member's role. The role cannot be set to `admin` via the API.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Remove a member from the organization. Members with the `admin` role cannot be removed via the API.</td>
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
<tr id="parameter-user_id">
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td>ID of the User.</td>
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
<tr id="parameter-email">
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>Filter by user email.</td>
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

Get an organization member by ID.

```sql
SELECT
id,
name,
added_at,
email,
role,
type
FROM anthropic_admin.organization.users
WHERE user_id = '{{ user_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List members of the organization.

```sql
SELECT
id,
name,
added_at,
email,
role,
type
FROM anthropic_admin.organization.users
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND email = '{{ email }}'
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

Update an organization member's role. The role cannot be set to `admin` via the API.

```sql
UPDATE anthropic_admin.organization.users
SET 
role = '{{ role }}'
WHERE 
user_id = '{{ user_id }}' --required
WHERE role = '{{ role }}' --required
RETURNING
id,
name,
added_at,
email,
role,
type;
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

Remove a member from the organization. Members with the `admin` role cannot be removed via the API.

```sql
DELETE FROM anthropic_admin.organization.users
WHERE user_id = '{{ user_id }}' --required
;
```
</TabItem>
</Tabs>
