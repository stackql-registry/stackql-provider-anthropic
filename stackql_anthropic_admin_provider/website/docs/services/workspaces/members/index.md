---
title: members
hide_title: false
hide_table_of_contents: false
keywords:
  - members
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.workspaces.members" /></td></tr>
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
    "name": "user_id",
    "type": "string",
    "description": "ID of the User."
  },
  {
    "name": "workspace_id",
    "type": "string",
    "description": "ID of the Workspace."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `workspace_member`. (workspace_member)"
  },
  {
    "name": "workspace_role",
    "type": "string",
    "description": "Role of the Workspace Member. (workspace_admin, workspace_billing, workspace_developer, workspace_restricted_developer, workspace_user)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "user_id",
    "type": "string",
    "description": "ID of the User."
  },
  {
    "name": "workspace_id",
    "type": "string",
    "description": "ID of the Workspace."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `workspace_member`. (workspace_member)"
  },
  {
    "name": "workspace_role",
    "type": "string",
    "description": "Role of the Workspace Member. (workspace_admin, workspace_billing, workspace_developer, workspace_restricted_developer, workspace_user)"
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Get a workspace member.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a></td>
    <td>List members of a workspace.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-workspace_role"><code>workspace_role</code></a></td>
    <td></td>
    <td>Add an organization member to a workspace. The role cannot be `workspace_billing`.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-workspace_role"><code>workspace_role</code></a></td>
    <td></td>
    <td>Update a workspace member's role.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Remove a member from a workspace.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td>ID of the Workspace.</td>
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

Get a workspace member.

```sql
SELECT
user_id,
workspace_id,
type,
workspace_role
FROM anthropic_admin.workspaces.members
WHERE workspace_id = '{{ workspace_id }}' -- required
AND user_id = '{{ user_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List members of a workspace.

```sql
SELECT
user_id,
workspace_id,
type,
workspace_role
FROM anthropic_admin.workspaces.members
WHERE workspace_id = '{{ workspace_id }}' -- required
AND before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
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

Add an organization member to a workspace. The role cannot be `workspace_billing`.

```sql
INSERT INTO anthropic_admin.workspaces.members (
user_id,
workspace_role,
workspace_id
)
SELECT 
'{{ user_id }}' /* required */,
'{{ workspace_role }}' /* required */,
'{{ workspace_id }}'
RETURNING
user_id,
workspace_id,
type,
workspace_role
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: members
  props:
    - name: workspace_id
      value: "{{ workspace_id }}"
      description: Required parameter for the members resource.
    - name: user_id
      value: "{{ user_id }}"
      description: |
        ID of the User.
    - name: workspace_role
      value: "{{ workspace_role }}"
      description: |
        Role of the new Workspace Member. Cannot be \`workspace_billing\`.
      valid_values: ['workspace_admin', 'workspace_developer', 'workspace_restricted_developer', 'workspace_user']
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

Update a workspace member's role.

```sql
UPDATE anthropic_admin.workspaces.members
SET 
workspace_role = '{{ workspace_role }}'
WHERE 
workspace_id = '{{ workspace_id }}' --required
WHERE user_id = '{{ user_id }}' --required
AND workspace_role = '{{ workspace_role }}' --required
RETURNING
user_id,
workspace_id,
type,
workspace_role;
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

Remove a member from a workspace.

```sql
DELETE FROM anthropic_admin.workspaces.members
WHERE workspace_id = '{{ workspace_id }}' --required
AND user_id = '{{ user_id }}' --required
;
```
</TabItem>
</Tabs>
