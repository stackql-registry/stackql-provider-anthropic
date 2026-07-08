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
    "description": "Unique identifier for the skill version.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "skill_id",
    "type": "string",
    "description": "Identifier for the skill that this version belongs to."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill version was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "directory",
    "type": "string",
    "description": "Directory name of the skill version.<br /><br />This is the top-level directory name that was extracted from the uploaded files."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skill Versions, this is always `\"skill_version\"`."
  },
  {
    "name": "version",
    "type": "string",
    "description": "Version identifier for the skill.<br /><br />Each version is identified by a Unix epoch timestamp (e.g., \"1759178010641129\")."
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for the skill version.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "skill_id",
    "type": "string",
    "description": "Identifier for the skill that this version belongs to."
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "ISO 8601 timestamp of when the skill version was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of the skill version.<br /><br />This is extracted from the SKILL.md file in the skill upload."
  },
  {
    "name": "directory",
    "type": "string",
    "description": "Directory name of the skill version.<br /><br />This is the top-level directory name that was extracted from the uploaded files."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Skill Versions, this is always `\"skill_version\"`."
  },
  {
    "name": "version",
    "type": "string",
    "description": "Version identifier for the skill.<br /><br />Each version is identified by a Unix epoch timestamp (e.g., \"1759178010641129\")."
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
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a></td>
    <td><a href="#parameter-page"><code>page</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-files"><code>files</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#download"><CopyableCode code="download" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-skill_id"><code>skill_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
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
    <td>Version identifier for the skill.  Each version is identified by a Unix epoch timestamp (e.g., "1759178010641129").</td>
</tr>
<tr id="parameter-anthropic-beta">
    <td><CopyableCode code="anthropic-beta" /></td>
    <td><code>string</code></td>
    <td>Optional header to specify the beta version(s) you want to use.  To use multiple betas, use a comma separated list like `beta1,beta2` or specify the header multiple times for each beta.</td>
</tr>
<tr id="parameter-anthropic-version">
    <td><CopyableCode code="anthropic-version" /></td>
    <td><code>string</code></td>
    <td>The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of items to return per page.  Defaults to `20`. Ranges from `1` to `1000`.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Optionally set to the `next_page` token from the previous response.</td>
</tr>
<tr id="parameter-x-api-key">
    <td><CopyableCode code="x-api-key" /></td>
    <td><code>string</code></td>
    <td>Your unique API key for authentication.  This key is required in the header of all API requests, to authenticate your account and access Anthropic's services. Get your API key through the [Console](https://console.anthropic.com/settings/keys). Each key is scoped to a Workspace.</td>
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
directory,
type,
version
FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' -- required
AND version = '{{ version }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
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
directory,
type,
version
FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' -- required
AND page = '{{ page }}'
AND limit = '{{ limit }}'
AND "x-api-key" = '{{ x-api-key }}'
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
INSERT INTO anthropic.skills.versions (
files,
skill_id,
anthropic-beta,
anthropic-version
)
SELECT 
'{{ files }}' /* required */,
'{{ skill_id }}',
'{{ anthropic-beta }}',
'{{ anthropic-version }}'
RETURNING
id,
name,
skill_id,
created_at,
description,
directory,
type,
version
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: versions
  props:
    - name: skill_id
      value: "{{ skill_id }}"
      description: Required parameter for the versions resource.
    - name: files
      value:
        - "{{ files }}"
      description: |
        Files to upload for the skill.
        All files must be in the same top-level directory and must include a SKILL.md file at the root of that directory.
    - name: anthropic-beta
      value: "{{ anthropic-beta }}"
      description: Optional header to specify the beta version(s) you want to use.  To use multiple betas, use a comma separated list like \`beta1,beta2\` or specify the header multiple times for each beta.
      description: Optional header to specify the beta version(s) you want to use.  To use multiple betas, use a comma separated list like \`beta1,beta2\` or specify the header multiple times for each beta.
    - name: anthropic-version
      value: "{{ anthropic-version }}"
      description: The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).
      description: The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).
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

No description available.

```sql
DELETE FROM anthropic.skills.versions
WHERE skill_id = '{{ skill_id }}' --required
AND version = '{{ version }}' --required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="download"
    values={[
        { label: 'download', value: 'download' }
    ]}
>
<TabItem value="download">

Download a skill version's content as a zip archive.

```sql
EXEC anthropic.skills.versions.download 
@skill_id='{{ skill_id }}' --required, 
@version='{{ version }}' --required, 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}', 
@x-api-key='{{ x-api-key }}'
;
```
</TabItem>
</Tabs>
