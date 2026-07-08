---
title: environments
hide_title: false
hide_table_of_contents: false
keywords:
  - environments
  - environments
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

Creates, updates, deletes, gets or lists an <code>environments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.environments.environments" /></td></tr>
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
    "description": "Environment identifier (e.g., 'env_...')"
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name for the environment"
  },
  {
    "name": "archived_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was archived, or null if not archived"
  },
  {
    "name": "config",
    "type": "object",
    "description": "Environment configuration (either Anthropic Cloud or self-hosted)",
    "children": [
      {
        "name": "networking",
        "type": "object",
        "description": "Network configuration policy.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": "Network policy type (unrestricted)"
          },
          {
            "name": "allow_mcp_servers",
            "type": "boolean",
            "description": "Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array."
          },
          {
            "name": "allow_package_managers",
            "type": "boolean",
            "description": "Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array."
          },
          {
            "name": "allowed_hosts",
            "type": "array",
            "description": "Specifies domains the container can reach."
          }
        ]
      },
      {
        "name": "packages",
        "type": "object",
        "description": "Package manager configuration.",
        "children": [
          {
            "name": "apt",
            "type": "array",
            "description": "Ubuntu/Debian packages to install"
          },
          {
            "name": "cargo",
            "type": "array",
            "description": "Rust packages to install"
          },
          {
            "name": "gem",
            "type": "array",
            "description": "Ruby packages to install"
          },
          {
            "name": "go",
            "type": "array",
            "description": "Go packages to install"
          },
          {
            "name": "npm",
            "type": "array",
            "description": "Node.js packages to install"
          },
          {
            "name": "pip",
            "type": "array",
            "description": "Python packages to install"
          },
          {
            "name": "type",
            "type": "string",
            "description": "Package configuration type (packages)"
          }
        ]
      },
      {
        "name": "type",
        "type": "string",
        "description": "Environment type (cloud)"
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was created"
  },
  {
    "name": "description",
    "type": "string",
    "description": "User-provided description for the environment"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "User-provided metadata key-value pairs"
  },
  {
    "name": "scope",
    "type": "string",
    "description": "The visibility scope for this environment. 'organization' means visible to all accounts. 'account' means visible only to the owning account. (organization, account)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "The type of object (always 'environment') (environment)"
  },
  {
    "name": "updated_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was last updated"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Environment identifier (e.g., 'env_...')"
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name for the environment"
  },
  {
    "name": "archived_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was archived, or null if not archived"
  },
  {
    "name": "config",
    "type": "object",
    "description": "Environment configuration (either Anthropic Cloud or self-hosted)",
    "children": [
      {
        "name": "networking",
        "type": "object",
        "description": "Network configuration policy.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": "Network policy type (unrestricted)"
          },
          {
            "name": "allow_mcp_servers",
            "type": "boolean",
            "description": "Permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array."
          },
          {
            "name": "allow_package_managers",
            "type": "boolean",
            "description": "Permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array."
          },
          {
            "name": "allowed_hosts",
            "type": "array",
            "description": "Specifies domains the container can reach."
          }
        ]
      },
      {
        "name": "packages",
        "type": "object",
        "description": "Package manager configuration.",
        "children": [
          {
            "name": "apt",
            "type": "array",
            "description": "Ubuntu/Debian packages to install"
          },
          {
            "name": "cargo",
            "type": "array",
            "description": "Rust packages to install"
          },
          {
            "name": "gem",
            "type": "array",
            "description": "Ruby packages to install"
          },
          {
            "name": "go",
            "type": "array",
            "description": "Go packages to install"
          },
          {
            "name": "npm",
            "type": "array",
            "description": "Node.js packages to install"
          },
          {
            "name": "pip",
            "type": "array",
            "description": "Python packages to install"
          },
          {
            "name": "type",
            "type": "string",
            "description": "Package configuration type (packages)"
          }
        ]
      },
      {
        "name": "type",
        "type": "string",
        "description": "Environment type (cloud)"
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was created"
  },
  {
    "name": "description",
    "type": "string",
    "description": "User-provided description for the environment"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "User-provided metadata key-value pairs"
  },
  {
    "name": "scope",
    "type": "string",
    "description": "The visibility scope for this environment. 'organization' means visible to all accounts. 'account' means visible only to the owning account. (organization, account)"
  },
  {
    "name": "type",
    "type": "string",
    "description": "The type of object (always 'environment') (environment)"
  },
  {
    "name": "updated_at",
    "type": "string",
    "description": "RFC 3339 timestamp when environment was last updated"
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Retrieve a specific environment by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>List environments with pagination support.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Create a new environment with the specified configuration.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Update an existing environment's configuration.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Delete an environment by ID. Returns a confirmation of the deletion.</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Archive an environment by ID. Archived environments cannot be used to create new sessions.</td>
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
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td> (example: env_011CZkZ9X2dpNyB7HsEFoRfW)</td>
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
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Include archived environments in the response</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of environments to return</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque cursor from previous response for pagination. Pass the `next_page` value from the previous response.</td>
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

Retrieve a specific environment by ID.

```sql
SELECT
id,
name,
archived_at,
config,
created_at,
description,
metadata,
scope,
type,
updated_at
FROM anthropic.environments.environments
WHERE environment_id = '{{ environment_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

List environments with pagination support.

```sql
SELECT
id,
name,
archived_at,
config,
created_at,
description,
metadata,
scope,
type,
updated_at
FROM anthropic.environments.environments
WHERE limit = '{{ limit }}'
AND page = '{{ page }}'
AND include_archived = '{{ include_archived }}'
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

Create a new environment with the specified configuration.

```sql
INSERT INTO anthropic.environments.environments (
config,
description,
metadata,
name,
scope,
anthropic-beta,
anthropic-version
)
SELECT 
'{{ config }}',
'{{ description }}',
'{{ metadata }}',
'{{ name }}' /* required */,
'{{ scope }}',
'{{ anthropic-beta }}',
'{{ anthropic-version }}'
RETURNING
id,
name,
archived_at,
config,
created_at,
description,
metadata,
scope,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: environments
  props:
    - name: config
      value: "{{ config }}"
      description: |
        Environment configuration
    - name: description
      value: "{{ description }}"
      description: |
        Optional description of the environment
    - name: metadata
      value: "{{ metadata }}"
      description: |
        User-provided metadata key-value pairs
    - name: name
      value: "{{ name }}"
      description: |
        Human-readable name for the environment
    - name: scope
      value: "{{ scope }}"
      description: |
        The visibility scope for this environment. 'organization' makes the environment visible to all accounts. 'account' restricts visibility to the owning account only. Only applicable for self-hosted environments. If not specified, defaults based on organization type.
      valid_values: ['organization', 'account']
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


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Update an existing environment's configuration.

```sql
UPDATE anthropic.environments.environments
SET 
config = '{{ config }}',
description = '{{ description }}',
metadata = '{{ metadata }}',
name = '{{ name }}',
scope = '{{ scope }}'
WHERE 
environment_id = '{{ environment_id }}' --required
RETURNING
id,
name,
archived_at,
config,
created_at,
description,
metadata,
scope,
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

Delete an environment by ID. Returns a confirmation of the deletion.

```sql
DELETE FROM anthropic.environments.environments
WHERE environment_id = '{{ environment_id }}' --required
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

Archive an environment by ID. Archived environments cannot be used to create new sessions.

```sql
EXEC anthropic.environments.environments.archive 
@environment_id='{{ environment_id }}' --required, 
@anthropic-beta='{{ anthropic-beta }}', 
@anthropic-version='{{ anthropic-version }}'
;
```
</TabItem>
</Tabs>
