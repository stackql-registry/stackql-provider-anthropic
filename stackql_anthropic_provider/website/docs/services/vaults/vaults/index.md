---
title: vaults
hide_title: false
hide_table_of_contents: false
keywords:
  - vaults
  - vaults
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

Creates, updates, deletes, gets or lists a <code>vaults</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="vaults" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.vaults.vaults" /></td></tr>
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
    "description": "Unique identifier for the vault."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "Human-readable name for the vault."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the vault was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata attached to the vault."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (vault)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for the vault."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "Human-readable name for the vault."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the vault was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata attached to the vault."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (vault)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
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
    <td><a href="#parameter-vault_id"><code>vault_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-display_name"><code>display_name</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a></td>
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
<tr id="parameter-vault_id">
    <td><CopyableCode code="vault_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter vault_id (example: vlt_011CZkZDLs7fYzm1hXNPeRjv)</td>
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
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include archived vaults in the results.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>Maximum number of vaults to return per page. Defaults to 20, maximum 100.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque pagination token from a previous `list_vaults` response.</td>
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
display_name,
archived_at,
created_at,
metadata,
type,
updated_at
FROM anthropic.vaults.vaults
WHERE vault_id = '{{ vault_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
display_name,
archived_at,
created_at,
metadata,
type,
updated_at
FROM anthropic.vaults.vaults
WHERE "x-api-key" = '{{ x-api-key }}'
AND limit = '{{ limit }}'
AND page = '{{ page }}'
AND include_archived = '{{ include_archived }}'
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
INSERT INTO anthropic.vaults.vaults (
display_name,
metadata,
anthropic-version,
anthropic-beta
)
SELECT 
'{{ display_name }}' /* required */,
'{{ metadata }}',
'{{ anthropic-version }}',
'{{ anthropic-beta }}'
RETURNING
id,
display_name,
archived_at,
created_at,
metadata,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: vaults
  props:
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Human-readable name for the vault. 1-255 characters.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value metadata to attach to the vault. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.
    - name: anthropic-version
      value: "{{ anthropic-version }}"
    - name: anthropic-beta
      value: "{{ anthropic-beta }}"
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
UPDATE anthropic.vaults.vaults
SET 
display_name = '{{ display_name }}',
metadata = '{{ metadata }}'
WHERE 
vault_id = '{{ vault_id }}' --required
RETURNING
id,
display_name,
archived_at,
created_at,
metadata,
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
DELETE FROM anthropic.vaults.vaults
WHERE vault_id = '{{ vault_id }}' --required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="archive"
    values={[
        { label: 'archive', value: 'archive' }
    ]}
>
<TabItem value="archive">

Successful response (OK)

```sql
EXEC anthropic.vaults.vaults.archive 
@vault_id='{{ vault_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
</Tabs>
