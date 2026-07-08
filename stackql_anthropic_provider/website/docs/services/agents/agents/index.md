---
title: agents
hide_title: false
hide_table_of_contents: false
keywords:
  - agents
  - agents
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

Creates, updates, deletes, gets or lists an <code>agents</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="agents" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.agents.agents" /></td></tr>
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
    "description": ""
  },
  {
    "name": "name",
    "type": "string",
    "description": ""
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the agent was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "description",
    "type": "string",
    "description": ""
  },
  {
    "name": "mcp_servers",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (url)"
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      },
      {
        "name": "url",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "metadata",
    "type": "object",
    "description": ""
  },
  {
    "name": "model",
    "type": "object",
    "description": "Model identifier and configuration.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The model that will power your agent.<br /><br />See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options. (claude-sonnet-5)"
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Defaults to `standard`. Not all models support `fast`; invalid combinations are rejected at create time. (standard, fast)"
      }
    ]
  },
  {
    "name": "multiagent",
    "type": "object",
    "description": "Multiagent orchestration configuration. Null when the agent is single-threaded.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (coordinator)"
      },
      {
        "name": "agents",
        "type": "array",
        "description": "Agents the coordinator may spawn as session threads, each resolved to a specific version.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (agent)"
          },
          {
            "name": "id",
            "type": "string",
            "description": ""
          },
          {
            "name": "version",
            "type": "integer (int32)",
            "description": ""
          }
        ]
      }
    ]
  },
  {
    "name": "skills",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (anthropic)"
      },
      {
        "name": "skill_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "version",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "system",
    "type": "string",
    "description": ""
  },
  {
    "name": "tools",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (agent_toolset_20260401)"
      },
      {
        "name": "default_config",
        "type": "object",
        "description": "Resolved default configuration for agent tools.",
        "children": [
          {
            "name": "enabled",
            "type": "boolean",
            "description": ""
          },
          {
            "name": "permission_policy",
            "type": "object",
            "description": "Permission policy for tool execution.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (always_allow)"
              }
            ]
          }
        ]
      },
      {
        "name": "configs",
        "type": "array",
        "description": "",
        "children": [
          {
            "name": "name",
            "type": "string",
            "description": "Built-in agent tool identifier. (bash, edit, read, write, glob, grep, web_fetch, web_search)"
          },
          {
            "name": "enabled",
            "type": "boolean",
            "description": ""
          },
          {
            "name": "permission_policy",
            "type": "object",
            "description": "Permission policy for tool execution.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (always_allow)"
              }
            ]
          }
        ]
      },
      {
        "name": "mcp_server_name",
        "type": "string",
        "description": ""
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      },
      {
        "name": "description",
        "type": "string",
        "description": ""
      },
      {
        "name": "input_schema",
        "type": "object",
        "description": "JSON Schema for custom tool input parameters.",
        "children": [
          {
            "name": "properties",
            "type": "object",
            "description": ""
          },
          {
            "name": "required",
            "type": "array",
            "description": ""
          },
          {
            "name": "type",
            "type": "string",
            "description": " (object)"
          }
        ]
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (agent)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "version",
    "type": "integer (int32)",
    "description": "The agent's current version. Starts at 1 and increments when the agent is modified."
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": ""
  },
  {
    "name": "name",
    "type": "string",
    "description": ""
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the agent was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "description",
    "type": "string",
    "description": ""
  },
  {
    "name": "mcp_servers",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (url)"
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      },
      {
        "name": "url",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "metadata",
    "type": "object",
    "description": ""
  },
  {
    "name": "model",
    "type": "object",
    "description": "Model identifier and configuration.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The model that will power your agent.<br /><br />See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options. (claude-sonnet-5)"
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Defaults to `standard`. Not all models support `fast`; invalid combinations are rejected at create time. (standard, fast)"
      }
    ]
  },
  {
    "name": "multiagent",
    "type": "object",
    "description": "Multiagent orchestration configuration. Null when the agent is single-threaded.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (coordinator)"
      },
      {
        "name": "agents",
        "type": "array",
        "description": "Agents the coordinator may spawn as session threads, each resolved to a specific version.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (agent)"
          },
          {
            "name": "id",
            "type": "string",
            "description": ""
          },
          {
            "name": "version",
            "type": "integer (int32)",
            "description": ""
          }
        ]
      }
    ]
  },
  {
    "name": "skills",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (anthropic)"
      },
      {
        "name": "skill_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "version",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "system",
    "type": "string",
    "description": ""
  },
  {
    "name": "tools",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (agent_toolset_20260401)"
      },
      {
        "name": "default_config",
        "type": "object",
        "description": "Resolved default configuration for agent tools.",
        "children": [
          {
            "name": "enabled",
            "type": "boolean",
            "description": ""
          },
          {
            "name": "permission_policy",
            "type": "object",
            "description": "Permission policy for tool execution.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (always_allow)"
              }
            ]
          }
        ]
      },
      {
        "name": "configs",
        "type": "array",
        "description": "",
        "children": [
          {
            "name": "name",
            "type": "string",
            "description": "Built-in agent tool identifier. (bash, edit, read, write, glob, grep, web_fetch, web_search)"
          },
          {
            "name": "enabled",
            "type": "boolean",
            "description": ""
          },
          {
            "name": "permission_policy",
            "type": "object",
            "description": "Permission policy for tool execution.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (always_allow)"
              }
            ]
          }
        ]
      },
      {
        "name": "mcp_server_name",
        "type": "string",
        "description": ""
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      },
      {
        "name": "description",
        "type": "string",
        "description": ""
      },
      {
        "name": "input_schema",
        "type": "object",
        "description": "JSON Schema for custom tool input parameters.",
        "children": [
          {
            "name": "properties",
            "type": "object",
            "description": ""
          },
          {
            "name": "required",
            "type": "array",
            "description": ""
          },
          {
            "name": "type",
            "type": "string",
            "description": " (object)"
          }
        ]
      }
    ]
  },
  {
    "name": "type",
    "type": "string",
    "description": " (agent)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "version",
    "type": "integer (int32)",
    "description": "The agent's current version. Starts at 1 and increments when the agent is modified."
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
    <td><a href="#parameter-agent_id"><code>agent_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-model"><code>model</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-agent_id"><code>agent_id</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-agent_id"><code>agent_id</code></a></td>
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
<tr id="parameter-agent_id">
    <td><CopyableCode code="agent_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter agent_id (example: agent_011CZkYpogX7uDKUyvBTophP)</td>
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
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return agents created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return agents created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Include archived agents in results. Defaults to false.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>Maximum results per page. Default 20, maximum 100.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque pagination cursor from a previous response.</td>
</tr>
<tr id="parameter-version">
    <td><CopyableCode code="version" /></td>
    <td><code>integer (int32)</code></td>
    <td>Agent version. Omit for the most recent version. Must be at least 1 if specified.</td>
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
name,
archived_at,
created_at,
description,
mcp_servers,
metadata,
model,
multiagent,
skills,
system,
tools,
type,
updated_at,
version
FROM anthropic.agents.agents
WHERE agent_id = '{{ agent_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
AND version = '{{ version }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
name,
archived_at,
created_at,
description,
mcp_servers,
metadata,
model,
multiagent,
skills,
system,
tools,
type,
updated_at,
version
FROM anthropic.agents.agents
WHERE "x-api-key" = '{{ x-api-key }}'
AND limit = '{{ limit }}'
AND page = '{{ page }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
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
INSERT INTO anthropic.agents.agents (
name,
model,
description,
system,
tools,
mcp_servers,
skills,
metadata,
multiagent,
anthropic-version,
anthropic-beta
)
SELECT 
'{{ name }}' /* required */,
'{{ model }}' /* required */,
'{{ description }}',
'{{ system }}',
'{{ tools }}',
'{{ mcp_servers }}',
'{{ skills }}',
'{{ metadata }}',
'{{ multiagent }}',
'{{ anthropic-version }}',
'{{ anthropic-beta }}'
RETURNING
id,
name,
archived_at,
created_at,
description,
mcp_servers,
metadata,
model,
multiagent,
skills,
system,
tools,
type,
updated_at,
version
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: agents
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Human-readable name for the agent.
    - name: model
      value: "{{ model }}"
      description: |
        Model identifier. Accepts the [model string](https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison), e.g. \`claude-opus-4-6\`, or a \`model_config\` object for additional configuration control
      valid_values: ['claude-sonnet-5']
    - name: description
      value: "{{ description }}"
      description: |
        Description of what the agent does.
    - name: system
      value: "{{ system }}"
      description: |
        System prompt for the agent.
    - name: tools
      description: |
        Tool configurations available to the agent. Maximum of 128 tools across all toolsets allowed.
      value:
        - type: "{{ type }}"
          default_config:
            enabled: {{ enabled }}
            permission_policy:
              type: "{{ type }}"
          configs: "{{ configs }}"
          mcp_server_name: "{{ mcp_server_name }}"
          name: "{{ name }}"
          description: "{{ description }}"
          input_schema:
            properties: "{{ properties }}"
            required:
              - "{{ required }}"
            type: "{{ type }}"
    - name: mcp_servers
      description: |
        MCP servers this agent connects to. Maximum 20. Names must be unique within the array. Every server must be referenced by an \`mcp_toolset\` in \`tools\`; unreferenced servers are rejected. See the [MCP connector guide](https://platform.claude.com/docs/en/managed-agents/mcp-connector).
      value:
        - type: "{{ type }}"
          name: "{{ name }}"
          url: "{{ url }}"
    - name: skills
      description: |
        Skills available to the agent.
      value:
        - type: "{{ type }}"
          skill_id: "{{ skill_id }}"
          version: "{{ version }}"
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.
    - name: multiagent
      description: |
        Multiagent orchestration configuration. Currently supports the \`coordinator\` topology with a roster of 1-20 agents.
      value:
        type: "{{ type }}"
        agents:
          - "{{ agents }}"
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
UPDATE anthropic.agents.agents
SET 
version = {{ version }},
name = '{{ name }}',
description = '{{ description }}',
model = '{{ model }}',
system = '{{ system }}',
tools = '{{ tools }}',
mcp_servers = '{{ mcp_servers }}',
skills = '{{ skills }}',
metadata = '{{ metadata }}',
multiagent = '{{ multiagent }}'
WHERE 
agent_id = '{{ agent_id }}' --required
WHERE version = '{{ version }}' --required
RETURNING
id,
name,
archived_at,
created_at,
description,
mcp_servers,
metadata,
model,
multiagent,
skills,
system,
tools,
type,
updated_at,
version;
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
EXEC anthropic.agents.agents.archive 
@agent_id='{{ agent_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
</Tabs>
