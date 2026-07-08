---
title: invites
hide_title: false
hide_table_of_contents: false
keywords:
  - invites
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

Creates, updates, deletes, gets or lists an <code>invites</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="invites" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.organization.invites" /></td></tr>
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
    "description": "ID of the Invite."
  },
  {
    "name": "email",
    "type": "string",
    "description": "Email of the User being invited."
  },
  {
    "name": "expires_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Invite expires."
  },
  {
    "name": "invited_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Invite was created."
  },
  {
    "name": "role",
    "type": "string",
    "description": "Organization role of the invited User. (admin, billing, claude_code_user, developer, user)"
  },
  {
    "name": "status",
    "type": "string",
    "description": "Status of the Invite. (accepted, deleted, expired, pending)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `invite`. (invite)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "ID of the Invite."
  },
  {
    "name": "email",
    "type": "string",
    "description": "Email of the User being invited."
  },
  {
    "name": "expires_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Invite expires."
  },
  {
    "name": "invited_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Invite was created."
  },
  {
    "name": "role",
    "type": "string",
    "description": "Organization role of the invited User. (admin, billing, claude_code_user, developer, user)"
  },
  {
    "name": "status",
    "type": "string",
    "description": "Status of the Invite. (accepted, deleted, expired, pending)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `invite`. (invite)"
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
    <td><a href="#parameter-invite_id"><code>invite_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Get an organization invite by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-limit"><code>limit</code></a></td>
    <td>List pending and historical invites for the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-email"><code>email</code></a>, <a href="#parameter-role"><code>role</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Invite a user to the organization. Invites expire after 21 days.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-invite_id"><code>invite_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Delete an organization invite.</td>
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
<tr id="parameter-invite_id">
    <td><CopyableCode code="invite_id" /></td>
    <td><code>string</code></td>
    <td>ID of the Invite.</td>
</tr>
<tr id="parameter-after_id">
    <td><CopyableCode code="after_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. Returns the page of results immediately after this object.</td>
</tr>
<tr id="parameter-anthropic-version">
    <td><CopyableCode code="anthropic-version" /></td>
    <td><code>string</code></td>
    <td>The version of the Claude API you want to use.</td>
</tr>
<tr id="parameter-before_id">
    <td><CopyableCode code="before_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. Returns the page of results immediately before this object.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of items to return per page. Defaults to 20; ranges from 1 to 1000.</td>
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

Get an organization invite by ID.

```sql
SELECT
id,
email,
expires_at,
invited_at,
role,
status,
type
FROM anthropic_admin.organization.invites
WHERE invite_id = '{{ invite_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List pending and historical invites for the organization.

```sql
SELECT
id,
email,
expires_at,
invited_at,
role,
status,
type
FROM anthropic_admin.organization.invites
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND limit = '{{ limit }}'
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

Invite a user to the organization. Invites expire after 21 days.

```sql
INSERT INTO anthropic_admin.organization.invites (
email,
role,
anthropic-version
)
SELECT 
'{{ email }}' /* required */,
'{{ role }}' /* required */,
'{{ anthropic-version }}'
RETURNING
id,
email,
expires_at,
invited_at,
role,
status,
type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: invites
  props:
    - name: email
      value: "{{ email }}"
      description: |
        Email of the User.
    - name: role
      value: "{{ role }}"
      description: |
        Role for the invited User. Cannot be \`admin\`.
      valid_values: ['billing', 'claude_code_user', 'developer', 'user']
    - name: anthropic-version
      value: "{{ anthropic-version }}"
      description: The version of the Claude API you want to use.
      description: The version of the Claude API you want to use.
`}</CodeBlock>

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

Delete an organization invite.

```sql
DELETE FROM anthropic_admin.organization.invites
WHERE invite_id = '{{ invite_id }}' --required
;
```
</TabItem>
</Tabs>
