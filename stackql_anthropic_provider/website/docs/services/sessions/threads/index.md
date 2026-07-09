---
title: threads
hide_title: false
hide_table_of_contents: false
keywords:
  - threads
  - sessions
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

Creates, updates, deletes, gets or lists a <code>threads</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="threads" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.sessions.threads" /></td></tr>
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
    "description": "Unique identifier for this thread."
  },
  {
    "name": "parent_thread_id",
    "type": "string",
    "description": "Parent thread that spawned this thread. Null for the primary thread."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "The session this thread belongs to."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Resolved agent definition for this thread. Snapshot of the agent at thread creation time.",
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
                "description": "Permission policy for tool execution."
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
                "description": "Permission policy for tool execution."
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
      }
    ]
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the thread was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When the thread was created."
  },
  {
    "name": "stats",
    "type": "object",
    "description": "Timing statistics for this thread. Null until the thread's first status transition.",
    "children": [
      {
        "name": "duration_seconds",
        "type": "number (double)",
        "description": "Elapsed time since thread creation in seconds. For archived threads, frozen at the final update."
      },
      {
        "name": "startup_seconds",
        "type": "number (double)",
        "description": "Time in seconds for the thread to begin running. Zero for child threads, which start immediately."
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds the thread spent actively running. Excludes idle time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Current execution status of the thread. (running, idle, rescheduling, terminated)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (session_thread)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When the thread was last updated."
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for this thread. Null until the thread's first idle transition.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Total input tokens consumed across all turns."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Total output tokens generated across all turns."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens read from prompt cache."
      },
      {
        "name": "cache_creation",
        "type": "object",
        "description": "Tokens used to create prompt cache entries, broken down by cache TTL.",
        "children": [
          {
            "name": "ephemeral_1h_input_tokens",
            "type": "integer (int32)",
            "description": "Tokens used to create 1-hour ephemeral cache entries."
          },
          {
            "name": "ephemeral_5m_input_tokens",
            "type": "integer (int32)",
            "description": "Tokens used to create 5-minute ephemeral cache entries."
          }
        ]
      }
    ]
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this thread."
  },
  {
    "name": "parent_thread_id",
    "type": "string",
    "description": "Parent thread that spawned this thread. Null for the primary thread."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "The session this thread belongs to."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Resolved agent definition for this thread. Snapshot of the agent at thread creation time.",
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
                "description": "Permission policy for tool execution."
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
                "description": "Permission policy for tool execution."
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
      }
    ]
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the thread was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When the thread was created."
  },
  {
    "name": "stats",
    "type": "object",
    "description": "Timing statistics for this thread. Null until the thread's first status transition.",
    "children": [
      {
        "name": "duration_seconds",
        "type": "number (double)",
        "description": "Elapsed time since thread creation in seconds. For archived threads, frozen at the final update."
      },
      {
        "name": "startup_seconds",
        "type": "number (double)",
        "description": "Time in seconds for the thread to begin running. Zero for child threads, which start immediately."
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds the thread spent actively running. Excludes idle time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Current execution status of the thread. (running, idle, rescheduling, terminated)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (session_thread)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "When the thread was last updated."
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for this thread. Null until the thread's first idle transition.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Total input tokens consumed across all turns."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Total output tokens generated across all turns."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens read from prompt cache."
      },
      {
        "name": "cache_creation",
        "type": "object",
        "description": "Tokens used to create prompt cache entries, broken down by cache TTL.",
        "children": [
          {
            "name": "ephemeral_1h_input_tokens",
            "type": "integer (int32)",
            "description": "Tokens used to create 1-hour ephemeral cache entries."
          },
          {
            "name": "ephemeral_5m_input_tokens",
            "type": "integer (int32)",
            "description": "Tokens used to create 5-minute ephemeral cache entries."
          }
        ]
      }
    ]
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
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-thread_id"><code>thread_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-thread_id"><code>thread_id</code></a></td>
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
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter session_id (example: sesn_011CZkZAtmR3yMPDzynEDxu7)</td>
</tr>
<tr id="parameter-thread_id">
    <td><CopyableCode code="thread_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter thread_id (example: sthr_011CZkZVWa6oIjw0rgXZpnBt)</td>
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
parent_thread_id,
session_id,
agent,
archived_at,
created_at,
stats,
status,
type,
updated_at,
usage
FROM anthropic.sessions.threads
WHERE session_id = '{{ session_id }}' -- required
AND thread_id = '{{ thread_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
parent_thread_id,
session_id,
agent,
archived_at,
created_at,
stats,
status,
type,
updated_at,
usage
FROM anthropic.sessions.threads
WHERE session_id = '{{ session_id }}' -- required
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
EXEC anthropic.sessions.threads.archive 
@session_id='{{ session_id }}' --required, 
@thread_id='{{ thread_id }}' --required
;
```
</TabItem>
</Tabs>
