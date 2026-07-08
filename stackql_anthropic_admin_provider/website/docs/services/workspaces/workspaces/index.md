---
title: workspaces
hide_title: false
hide_table_of_contents: false
keywords:
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>workspaces</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspaces" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic_admin.workspaces.workspaces" /></td></tr>
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
    "description": "ID of the Workspace."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the Workspace."
  },
  {
    "name": "compartment_id",
    "type": "string",
    "description": "Identifier for this Workspace's encryption compartment, referenced by customer-managed encryption key (CMEK) configurations."
  },
  {
    "name": "external_key_id",
    "type": "string",
    "description": "ID of the customer-managed encryption key (CMEK) configuration used by this Workspace, or null."
  },
  {
    "name": "archived_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Workspace was archived, or null if the Workspace is not archived."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Workspace was created."
  },
  {
    "name": "data_residency",
    "type": "object",
    "description": "Data residency configuration with `allowed_inference_geos`, `default_inference_geo` and `workspace_geo` members.",
    "children": [
      {
        "name": "allowed_inference_geos",
        "type": "string",
        "description": "Permitted inference geo values - the string `unrestricted` or a JSON array of specific geos."
      },
      {
        "name": "default_inference_geo",
        "type": "string",
        "description": "Default inference geo applied when requests omit the parameter."
      },
      {
        "name": "workspace_geo",
        "type": "string",
        "description": "Geographic region for workspace data storage. Immutable after creation."
      }
    ]
  },
  {
    "name": "display_color",
    "type": "string",
    "description": "Hex color code representing the Workspace in the Claude Console."
  },
  {
    "name": "tags",
    "type": "string",
    "description": "User-defined tags as string key-value pairs. (opaque JSON object)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `workspace`. (workspace)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "ID of the Workspace."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the Workspace."
  },
  {
    "name": "compartment_id",
    "type": "string",
    "description": "Identifier for this Workspace's encryption compartment, referenced by customer-managed encryption key (CMEK) configurations."
  },
  {
    "name": "external_key_id",
    "type": "string",
    "description": "ID of the customer-managed encryption key (CMEK) configuration used by this Workspace, or null."
  },
  {
    "name": "archived_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Workspace was archived, or null if the Workspace is not archived."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 datetime string indicating when the Workspace was created."
  },
  {
    "name": "data_residency",
    "type": "object",
    "description": "Data residency configuration with `allowed_inference_geos`, `default_inference_geo` and `workspace_geo` members.",
    "children": [
      {
        "name": "allowed_inference_geos",
        "type": "string",
        "description": "Permitted inference geo values - the string `unrestricted` or a JSON array of specific geos."
      },
      {
        "name": "default_inference_geo",
        "type": "string",
        "description": "Default inference geo applied when requests omit the parameter."
      },
      {
        "name": "workspace_geo",
        "type": "string",
        "description": "Geographic region for workspace data storage. Immutable after creation."
      }
    ]
  },
  {
    "name": "display_color",
    "type": "string",
    "description": "Hex color code representing the Workspace in the Claude Console."
  },
  {
    "name": "tags",
    "type": "string",
    "description": "User-defined tags as string key-value pairs. (opaque JSON object)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type. Always `workspace`. (workspace)"
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Get a workspace by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a></td>
    <td>List workspaces in the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Create a new workspace.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Update a workspace's name or tags.</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Archive a workspace.</td>
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
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include Workspaces that have been archived in the response.</td>
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

Get a workspace by ID.

```sql
SELECT
id,
name,
compartment_id,
external_key_id,
archived_at,
created_at,
data_residency,
display_color,
tags,
type
FROM anthropic_admin.workspaces.workspaces
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List workspaces in the organization.

```sql
SELECT
id,
name,
compartment_id,
external_key_id,
archived_at,
created_at,
data_residency,
display_color,
tags,
type
FROM anthropic_admin.workspaces.workspaces
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND limit = '{{ limit }}'
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

Create a new workspace.

```sql
INSERT INTO anthropic_admin.workspaces.workspaces (
name,
data_residency,
external_key_id,
tags,
anthropic-version
)
SELECT 
'{{ name }}' /* required */,
'{{ data_residency }}',
'{{ external_key_id }}',
'{{ tags }}',
'{{ anthropic-version }}'
RETURNING
id,
name,
compartment_id,
external_key_id,
archived_at,
created_at,
data_residency,
display_color,
tags,
type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: workspaces
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Name of the Workspace.
    - name: data_residency
      value: "{{ data_residency }}"
      description: |
        Data residency configuration for the workspace as a JSON object with \`allowed_inference_geos\`, \`default_inference_geo\` and \`workspace_geo\` members. If omitted, defaults to workspace_geo \`us\`, allowed_inference_geos \`unrestricted\`, default_inference_geo \`global\`.
    - name: external_key_id
      value: "{{ external_key_id }}"
      description: |
        ID of the customer-managed encryption key (CMEK) configuration to use for this Workspace. Write-once; requires CMEK to be enabled for the organization.
    - name: tags
      value: "{{ tags }}"
      description: |
        User-defined tags as a JSON object of string key-value pairs. Keys may not begin with \`anthropic\`.
    - name: anthropic-version
      value: "{{ anthropic-version }}"
      description: The version of the Claude API you want to use.
      description: The version of the Claude API you want to use.
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

Update a workspace's name or tags.

```sql
UPDATE anthropic_admin.workspaces.workspaces
SET 
name = '{{ name }}',
tags = '{{ tags }}'
WHERE 
workspace_id = '{{ workspace_id }}' --required
RETURNING
id,
name,
compartment_id,
external_key_id,
archived_at,
created_at,
data_residency,
display_color,
tags,
type;
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

Archive a workspace.

```sql
EXEC anthropic_admin.workspaces.workspaces.archive 
@workspace_id='{{ workspace_id }}' --required, 
@anthropic-version='{{ anthropic-version }}'
;
```
</TabItem>
</Tabs>
