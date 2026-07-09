---
title: user_profiles
hide_title: false
hide_table_of_contents: false
keywords:
  - user_profiles
  - user_profiles
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

Creates, updates, deletes, gets or lists a <code>user_profiles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="user_profiles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.user_profiles.user_profiles" /></td></tr>
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
    "description": "Unique identifier for this user profile, prefixed `uprof_`."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Display name of the entity this profile represents. For `resold` this is the resold-to company's name."
  },
  {
    "name": "external_id",
    "type": "string",
    "description": "Platform's own identifier for this user. Not enforced unique."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this user profile was created, in RFC 3339 format."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars."
  },
  {
    "name": "relationship",
    "type": "string",
    "description": "How the entity relates to the platform. `external` (default), `resold`, or `internal`. (external, resold, internal)"
  },
  {
    "name": "trust_grants",
    "type": "object",
    "description": "Trust grants for this profile, keyed by grant name. Key omitted when no grant is active or in flight."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `user_profile`. (user_profile)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When this user profile was last modified, in RFC 3339 format. Trust-grant status changes also bump this timestamp."
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this user profile, prefixed `uprof_`."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Display name of the entity this profile represents. For `resold` this is the resold-to company's name."
  },
  {
    "name": "external_id",
    "type": "string",
    "description": "Platform's own identifier for this user. Not enforced unique."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this user profile was created, in RFC 3339 format."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars."
  },
  {
    "name": "relationship",
    "type": "string",
    "description": "How the entity relates to the platform. `external` (default), `resold`, or `internal`. (external, resold, internal)"
  },
  {
    "name": "trust_grants",
    "type": "object",
    "description": "Trust grants for this profile, keyed by grant name. Key omitted when no grant is active or in flight."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `user_profile`. (user_profile)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When this user profile was last modified, in RFC 3339 format. Trust-grant status changes also bump this timestamp."
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
    <td><a href="#parameter-user_profile_id"><code>user_profile_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-order"><code>order</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-user_profile_id"><code>user_profile_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create_enrollment_url"><CopyableCode code="create_enrollment_url" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-user_profile_id"><code>user_profile_id</code></a></td>
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
<tr id="parameter-user_profile_id">
    <td><CopyableCode code="user_profile_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter user_profile_id (example: uprof_011CZkZCu8hGbp5mYRQgUmz9)</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Query parameter for order</td>
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
external_id,
created_at,
metadata,
relationship,
trust_grants,
type,
updated_at
FROM anthropic.user_profiles.user_profiles
WHERE user_profile_id = '{{ user_profile_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
name,
external_id,
created_at,
metadata,
relationship,
trust_grants,
type,
updated_at
FROM anthropic.user_profiles.user_profiles
WHERE order = '{{ order }}'
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
INSERT INTO anthropic.user_profiles.user_profiles (
external_id,
name,
relationship,
metadata
)
SELECT 
'{{ external_id }}',
'{{ name }}',
'{{ relationship }}',
'{{ metadata }}'
RETURNING
id,
name,
external_id,
created_at,
metadata,
relationship,
trust_grants,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: user_profiles
  props:
    - name: external_id
      value: "{{ external_id }}"
      description: |
        Platform's own identifier for this user. Not enforced unique. Maximum 255 characters.
    - name: name
      value: "{{ name }}"
      description: |
        Display name of the entity this profile represents. Required when relationship is \`resold\` (the resold-to company's name); optional otherwise. Maximum 255 characters.
    - name: relationship
      value: "{{ relationship }}"
      description: |
        How the entity relates to the platform. \`external\` (default): an individual end-user. \`resold\`: a company the platform resells Claude access to. \`internal\`: the platform's own usage.
      valid_values: ['external', 'resold', 'internal']
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Free-form key-value data to attach to this user profile. Maximum 16 keys, with keys up to 64 characters and values up to 512 characters. Values must be non-empty strings.
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
UPDATE anthropic.user_profiles.user_profiles
SET 
external_id = '{{ external_id }}',
metadata = '{{ metadata }}',
name = '{{ name }}',
relationship = '{{ relationship }}'
WHERE 
user_profile_id = '{{ user_profile_id }}' --required
RETURNING
id,
name,
external_id,
created_at,
metadata,
relationship,
trust_grants,
type,
updated_at;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="create_enrollment_url"
    values={[
        { label: 'create_enrollment_url', value: 'create_enrollment_url' }
    ]}
>
<TabItem value="create_enrollment_url">

Successful response (OK)

```sql
EXEC anthropic.user_profiles.user_profiles.create_enrollment_url 
@user_profile_id='{{ user_profile_id }}' --required
;
```
</TabItem>
</Tabs>
