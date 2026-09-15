---
title: versions
hide_title: false
hide_table_of_contents: false
keywords:
  - versions
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

Creates, updates, deletes, gets or lists a <code>versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.agents.versions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
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
        "description": "The model that will power your agent.<br /><br />See [models](https://docs.anthropic.com/en/docs/models-overview) for additional details and options. (claude-fable-5-1)"
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed mode. `fast` provides significantly faster output token generation at premium pricing. Defaults to `standard`. Not all models support `fast`; invalid combinations are rejected at create time. (standard, fast)"
      },
      {
        "name": "effort",
        "type": "object",
        "description": "How hard Claude works on each inference call. One of `low`, `medium`, `high`, `xhigh`, `max`. Always present; resolved to the per-model default at save time when not supplied.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (low)"
          }
        ]
      },
      {
        "name": "inference_geo",
        "type": "string",
        "description": "Geographic region for model inference. When unset, requests fall through to the workspace's default_inference_geo."
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
          },
          {
            "name": "model",
            "type": "string",
            "description": "The advisor model id."
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
            "name": "type",
            "type": "string",
            "description": " (bash)"
          },
          {
            "name": "name",
            "type": "string",
            "description": " (bash)"
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
          },
          {
            "name": "allowed_domains",
            "type": "array",
            "description": ""
          },
          {
            "name": "blocked_domains",
            "type": "array",
            "description": ""
          },
          {
            "name": "max_content_tokens",
            "type": "integer (int32)",
            "description": ""
          },
          {
            "name": "user_location",
            "type": "object",
            "description": "Approximate user location for search result localization.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": "Location precision. Only \"approximate\" is supported. (approximate)"
              },
              {
                "name": "city",
                "type": "string",
                "description": "City name."
              },
              {
                "name": "region",
                "type": "string",
                "description": "Region or state name."
              },
              {
                "name": "country",
                "type": "string",
                "description": "Two-letter ISO 3166-1 country code, uppercase."
              },
              {
                "name": "timezone",
                "type": "string",
                "description": "IANA timezone identifier, e.g. \"America/Los_Angeles\"."
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-agent_id"><code>agent_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
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
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
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
FROM anthropic.agents.versions
WHERE agent_id = '{{ agent_id }}' -- required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
