---
title: versions
hide_title: false
hide_table_of_contents: false
keywords:
  - versions
  - skills
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

Creates, updates, deletes, gets or lists a <code>versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.skills.versions" /></td></tr>
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
    "description": "Unique identifier for this Skill Version. The id addresses the version in<br />paths and pins it in references."
  },
  {
    "name": "name",
    "type": "string",
    "description": "The Skill's immutable kebab-case slug, set at creation from the first<br />upload's SKILL.md frontmatter `name` (or its enclosing directory). Every<br />later upload must resolve to the same value. Also the top-level directory<br />of the Skill's mounted files and the base name of a downloaded archive."
  },
  {
    "name": "skill_id",
    "type": "string",
    "description": "Unique identifier for the skill.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "ISO 8601 timestamp of when the skill was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skill Versions, this is always `\"skill_version\"`. (skill_version)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this Skill Version. The id addresses the version in<br />paths and pins it in references."
  },
  {
    "name": "name",
    "type": "string",
    "description": "The Skill's immutable kebab-case slug, set at creation from the first<br />upload's SKILL.md frontmatter `name` (or its enclosing directory). Every<br />later upload must resolve to the same value. Also the top-level directory<br />of the Skill's mounted files and the base name of a downloaded archive."
  },
  {
    "name": "skill_id",
    "type": "string",
    "description": "Unique identifier for the skill.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "ISO 8601 timestamp of when the skill was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skill Versions, this is always `\"skill_version\"`. (skill_version)"
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
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-files"><code>files</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#download"><CopyableCode code="download" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td>Download a skill version's content as a zip archive.</td>
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
<tr id="parameter-skill_id">
    <td><CopyableCode code="skill_id" /></td>
    <td><code>string</code></td>
    <td>Unique identifier for the skill.  The format and length of IDs may change over time.</td>
</tr>
<tr id="parameter-version">
    <td><CopyableCode code="version" /></td>
    <td><code>string</code></td>
    <td>Identifies the skill version by its version ID.  Requests carrying the `skills-2025-10-02` beta header address versions by their Unix epoch timestamp instead (e.g., "1759178010641129").</td>
</tr>
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
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
name,
skill_id,
created_at,
description,
type
FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' -- required
AND version = '{{ version }}' -- required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
;
```
</TabItem>
<TabItem value="list">

Successful Response

```sql
SELECT
id,
name,
skill_id,
created_at,
description,
type
FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' -- required
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
DELETE FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' --required
AND version = '{{ version }}' --required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'download', value: 'download' }
    ]}
>
<TabItem value="create">

Successful Response

```sql
EXEC anthropic.skills.versions.create 
@skill_id='{{ skill_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
@@json=
'{
"files": "{{ files }}"
}'
;
```
</TabItem>
<TabItem value="download">

Download a skill version's content as a zip archive.

```sql
EXEC anthropic.skills.versions.download 
@skill_id='{{ skill_id }}' --required, 
@version='{{ version }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
