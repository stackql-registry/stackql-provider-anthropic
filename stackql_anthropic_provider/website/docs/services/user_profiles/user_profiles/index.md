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
    "description": "Real-world name of the entity this profile represents (company or individual). For a company the platform resells Claude access to (`access_type` `passthrough`) this is that company's name."
  },
  {
    "name": "external_id",
    "type": "string",
    "description": "Platform's own identifier for this user. Not enforced unique. Present under the `user-profiles-2026-03-24` and `user-profiles-2026-08-18` beta headers; under `user-profiles-2026-09-04` the value is `external_user_details.reference_id`."
  },
  {
    "name": "access_type",
    "type": "string",
    "description": "How the platform uses the API for this entity: `application` (default) or `passthrough`. Present under the `user-profiles-2026-08-18` and later beta headers. (application, passthrough)"
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this user profile was created, in RFC 3339 format."
  },
  {
    "name": "external_user_details",
    "type": "object",
    "description": "Details about the entity this profile represents, as the platform states them; not verified by Anthropic. Present under the `user-profiles-2026-09-04` beta header, with every field present and `null` until the platform supplies a value; the earlier beta headers serve `reference_id` as the top-level `external_id`, and `user-profiles-2026-08-18` serves `onboarded_at` as `external_user_onboarded_at`.",
    "children": [
      {
        "name": "reference_id",
        "type": "string",
        "description": "The platform's own reference for the entity. `null` until the platform supplies one."
      },
      {
        "name": "onboarded_at",
        "type": "string (date-time)",
        "description": "When the entity opened its account with the platform, as stated by the platform, in RFC 3339 format (UTC). `null` until the platform supplies one."
      },
      {
        "name": "account_status",
        "type": "string",
        "description": "The status of the entity's account on the platform: `active`, `suspended` or `blocked`. `null` until the platform supplies one. (active, suspended, blocked)"
      },
      {
        "name": "entity_type",
        "type": "string",
        "description": "What kind of entity the profile represents: `individual`, `business`, `non_profit` or `government`. `null` until the platform supplies one. (individual, business, non_profit, government)"
      },
      {
        "name": "country",
        "type": "string",
        "description": "The country the platform associates with the entity, as an ISO 3166-1 alpha-2 code. `null` until the platform supplies one."
      },
      {
        "name": "name_hash",
        "type": "string",
        "description": "The platform-computed hash of the entity's name. `null` until the platform supplies one."
      },
      {
        "name": "email_hash",
        "type": "string",
        "description": "The platform-computed hash of the entity's email address. `null` until the platform supplies one."
      }
    ]
  },
  {
    "name": "external_user_onboarded_at",
    "type": "string (date-time)",
    "description": "When the entity this profile represents opened its account with the platform, as stated by the platform, in RFC 3339 format (UTC). `null` until the platform supplies one. Present under the `user-profiles-2026-08-18` beta header; under `user-profiles-2026-09-04` the value is `external_user_details.onboarded_at`."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars."
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
    "description": "Real-world name of the entity this profile represents (company or individual). For a company the platform resells Claude access to (`access_type` `passthrough`) this is that company's name."
  },
  {
    "name": "external_id",
    "type": "string",
    "description": "Platform's own identifier for this user. Not enforced unique. Present under the `user-profiles-2026-03-24` and `user-profiles-2026-08-18` beta headers; under `user-profiles-2026-09-04` the value is `external_user_details.reference_id`."
  },
  {
    "name": "access_type",
    "type": "string",
    "description": "How the platform uses the API for this entity: `application` (default) or `passthrough`. Present under the `user-profiles-2026-08-18` and later beta headers. (application, passthrough)"
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When this user profile was created, in RFC 3339 format."
  },
  {
    "name": "external_user_details",
    "type": "object",
    "description": "Details about the entity this profile represents, as the platform states them; not verified by Anthropic. Present under the `user-profiles-2026-09-04` beta header, with every field present and `null` until the platform supplies a value; the earlier beta headers serve `reference_id` as the top-level `external_id`, and `user-profiles-2026-08-18` serves `onboarded_at` as `external_user_onboarded_at`.",
    "children": [
      {
        "name": "reference_id",
        "type": "string",
        "description": "The platform's own reference for the entity. `null` until the platform supplies one."
      },
      {
        "name": "onboarded_at",
        "type": "string (date-time)",
        "description": "When the entity opened its account with the platform, as stated by the platform, in RFC 3339 format (UTC). `null` until the platform supplies one."
      },
      {
        "name": "account_status",
        "type": "string",
        "description": "The status of the entity's account on the platform: `active`, `suspended` or `blocked`. `null` until the platform supplies one. (active, suspended, blocked)"
      },
      {
        "name": "entity_type",
        "type": "string",
        "description": "What kind of entity the profile represents: `individual`, `business`, `non_profit` or `government`. `null` until the platform supplies one. (individual, business, non_profit, government)"
      },
      {
        "name": "country",
        "type": "string",
        "description": "The country the platform associates with the entity, as an ISO 3166-1 alpha-2 code. `null` until the platform supplies one."
      },
      {
        "name": "name_hash",
        "type": "string",
        "description": "The platform-computed hash of the entity's name. `null` until the platform supplies one."
      },
      {
        "name": "email_hash",
        "type": "string",
        "description": "The platform-computed hash of the entity's email address. `null` until the platform supplies one."
      }
    ]
  },
  {
    "name": "external_user_onboarded_at",
    "type": "string (date-time)",
    "description": "When the entity this profile represents opened its account with the platform, as stated by the platform, in RFC 3339 format (UTC). `null` until the platform supplies one. Present under the `user-profiles-2026-08-18` beta header; under `user-profiles-2026-09-04` the value is `external_user_details.onboarded_at`."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars."
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
    <td><a href="#parameter-order"><code>order</code></a>, <a href="#parameter-order_by"><code>order_by</code></a></td>
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
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>Query parameter for order_by</td>
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
access_type,
created_at,
external_user_details,
external_user_onboarded_at,
metadata,
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
access_type,
created_at,
external_user_details,
external_user_onboarded_at,
metadata,
trust_grants,
type,
updated_at
FROM anthropic.user_profiles.user_profiles
WHERE order = '{{ order }}'
AND order_by = '{{ order_by }}'
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
access_type,
external_user_onboarded_at,
external_user_details,
metadata
)
SELECT 
'{{ external_id }}',
'{{ name }}',
'{{ access_type }}',
'{{ external_user_onboarded_at }}',
'{{ external_user_details }}',
'{{ metadata }}'
RETURNING
id,
name,
external_id,
access_type,
created_at,
external_user_details,
external_user_onboarded_at,
metadata,
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
        Platform's own identifier for this user. Not enforced unique. Maximum 255 characters. Accepted under the \`user-profiles-2026-03-24\` and \`user-profiles-2026-08-18\` beta headers; under \`user-profiles-2026-09-04\` send \`external_user_details.reference_id\` instead.
    - name: name
      value: "{{ name }}"
      description: |
        Optional for all profiles. Real-world name of the entity this profile represents (company or individual); for a company the platform resells Claude access to (\`access_type\` \`passthrough\`), that company's name where known. Maximum 255 characters.
    - name: access_type
      value: "{{ access_type }}"
      description: |
        How the platform uses the API for this entity. \`application\` (default): the profile represents an individual end-user of the platform's product. \`passthrough\`: the profile identifies a company the platform resells Claude access to.
      valid_values: ['application', 'passthrough']
    - name: external_user_onboarded_at
      value: "{{ external_user_onboarded_at }}"
      description: |
        When the entity this profile represents opened its account with the platform, in RFC 3339 format: for an \`application\` profile, when the end-user signed up; for a \`passthrough\` profile, when the company became the platform's customer. Must be a complete timestamp no more than 1 minute in the future. Optional. Accepted under the \`user-profiles-2026-08-18\` beta header; under \`user-profiles-2026-09-04\` send \`external_user_details.onboarded_at\` instead.
    - name: external_user_details
      description: |
        Details about the entity this profile represents, as the platform states them. Every field is optional. Accepted under the \`user-profiles-2026-09-04\` beta header only.
      value:
        reference_id: "{{ reference_id }}"
        onboarded_at: "{{ onboarded_at }}"
        account_status: "{{ account_status }}"
        entity_type: "{{ entity_type }}"
        country: "{{ country }}"
        name_hash: "{{ name_hash }}"
        email_hash: "{{ email_hash }}"
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
access_type = '{{ access_type }}',
external_user_onboarded_at = '{{ external_user_onboarded_at }}',
external_user_details = '{{ external_user_details }}'
WHERE 
user_profile_id = '{{ user_profile_id }}' --required
RETURNING
id,
name,
external_id,
access_type,
created_at,
external_user_details,
external_user_onboarded_at,
metadata,
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
