---
title: skills
hide_title: false
hide_table_of_contents: false
keywords:
  - skills
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

Creates, updates, deletes, gets or lists a <code>skills</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="skills" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.skills.skills" /></td></tr>
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
    "description": "Unique identifier for the skill.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill was created."
  },
  {
    "name": "display_title",
    "type": "string",
    "description": "Display title for the skill.<br /><br />This is a human-readable label that is not included in the prompt sent to the model."
  },
  {
    "name": "latest_version",
    "type": "string",
    "description": "The latest version identifier for the skill.<br /><br />This represents the most recent version of the skill that has been created."
  },
  {
    "name": "source",
    "type": "string",
    "description": "Source of the skill.<br /><br />This may be one of the following values:<br />* `\"custom\"`: the skill was created by a user<br />* `\"anthropic\"`: the skill was created by Anthropic"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skills, this is always `\"skill\"`."
  },
  {
    "name": "updated_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill was last updated."
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for the skill.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill was created."
  },
  {
    "name": "display_title",
    "type": "string",
    "description": "Display title for the skill.<br /><br />This is a human-readable label that is not included in the prompt sent to the model."
  },
  {
    "name": "latest_version",
    "type": "string",
    "description": "The latest version identifier for the skill.<br /><br />This represents the most recent version of the skill that has been created."
  },
  {
    "name": "source",
    "type": "string",
    "description": "Source of the skill.<br /><br />This may be one of the following values:<br />* `\"custom\"`: the skill was created by a user<br />* `\"anthropic\"`: the skill was created by Anthropic"
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skills, this is always `\"skill\"`."
  },
  {
    "name": "updated_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill was last updated."
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
    <td><a href="#parameter-skill_id"><code>skill_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-source"><code>source</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-files"><code>files</code></a></td>
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
<tr id="parameter-skill_id">
    <td><CopyableCode code="skill_id" /></td>
    <td><code>string</code></td>
    <td>Unique identifier for the skill.  The format and length of IDs may change over time.</td>
</tr>
<tr id="parameter-source">
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td>Filter skills by source.  If provided, only skills from the specified source will be returned: * `"custom"`: only return user-created skills * `"anthropic"`: only return Anthropic-created skills</td>
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
display_title,
latest_version,
source,
type,
updated_at
FROM anthropic.skills.skills
WHERE skill_id = '{{ skill_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful Response

```sql
SELECT
id,
created_at,
display_title,
latest_version,
source,
type,
updated_at
FROM anthropic.skills.skills
WHERE source = '{{ source }}'
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
DELETE FROM anthropic.skills.skills
WHERE skill_id = '{{ skill_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' }
    ]}
>
<TabItem value="create">

Successful Response

```sql
EXEC anthropic.skills.skills.create 
@@json=
'{
"files": "{{ files }}", 
"display_title": "{{ display_title }}"
}'
;
```
</TabItem>
</Tabs>
