---
title: events
hide_title: false
hide_table_of_contents: false
keywords:
  - events
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

Creates, updates, deletes, gets or lists an <code>events</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="events" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.sessions.events" /></td></tr>
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
    "description": "Unique identifier for this event."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Name of the custom tool being called."
  },
  {
    "name": "custom_tool_use_id",
    "type": "string",
    "description": "The id of the `agent.custom_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field."
  },
  {
    "name": "from_session_thread_id",
    "type": "string",
    "description": "Public `sthr_` ID of the thread that sent the message."
  },
  {
    "name": "mcp_tool_use_id",
    "type": "string",
    "description": "The id of the `agent.mcp_tool_use` event this result corresponds to."
  },
  {
    "name": "model_request_start_id",
    "type": "string",
    "description": "The id of the corresponding `span.model_request_start` event."
  },
  {
    "name": "outcome_evaluation_start_id",
    "type": "string",
    "description": "The id of the corresponding `span.outcome_evaluation_start` event."
  },
  {
    "name": "outcome_id",
    "type": "string",
    "description": "The `outc_` ID of the outcome being evaluated."
  },
  {
    "name": "session_thread_id",
    "type": "string",
    "description": "If absent, interrupts every non-archived thread in a multiagent session (or the primary alone in a single-agent session). If present, interrupts only the named thread."
  },
  {
    "name": "to_session_thread_id",
    "type": "string",
    "description": "Public `sthr_` ID of the thread the message was sent to."
  },
  {
    "name": "tool_use_id",
    "type": "string",
    "description": "The id of the `agent.tool_use` or `agent.mcp_tool_use` event this result corresponds to, which can be found in the last `session.status_idle` [event's](https://platform.claude.com/docs/en/api/beta/sessions/events/list#beta_managed_agents_session_requires_action.event_ids) `stop_reason.event_ids` field."
  },
  {
    "name": "agent_name",
    "type": "string",
    "description": "Name of the callable agent the thread runs."
  },
  {
    "name": "from_agent_name",
    "type": "string",
    "description": "Name of the callable agent this message came from. Absent when received from the primary agent."
  },
  {
    "name": "mcp_server_name",
    "type": "string",
    "description": "Name of the MCP server providing the tool."
  },
  {
    "name": "to_agent_name",
    "type": "string",
    "description": "Name of the callable agent this message was sent to. Absent when sent to the primary agent."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "The session's effective agent configuration after the update. Present only when the update changed `agent` (tools or mcp_servers); when present it is the full materialised snapshot, not a diff.",
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
      },
      {
        "name": "multiagent",
        "type": "object",
        "description": "Resolved multiagent orchestration configuration. Null when the agent is single-threaded.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (coordinator)"
          },
          {
            "name": "agents",
            "type": "array",
            "description": "Full `agent` definitions the coordinator may spawn as session threads.",
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
                "description": "Model identifier and configuration."
              },
              {
                "name": "system",
                "type": "string",
                "description": ""
              },
              {
                "name": "tools",
                "type": "array",
                "description": ""
              },
              {
                "name": "mcp_servers",
                "type": "array",
                "description": ""
              },
              {
                "name": "skills",
                "type": "array",
                "description": ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "content",
    "type": "array",
    "description": "Array of content blocks comprising the user message.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (text)"
      },
      {
        "name": "text",
        "type": "string",
        "description": "The text content."
      },
      {
        "name": "source",
        "type": "object",
        "description": "The source of the image data.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (base64)"
          },
          {
            "name": "media_type",
            "type": "string",
            "description": "MIME type of the image (e.g., \"image/png\", \"image/jpeg\", \"image/gif\", \"image/webp\")."
          },
          {
            "name": "data",
            "type": "string",
            "description": "Base64-encoded image data."
          },
          {
            "name": "url",
            "type": "string",
            "description": "URL of the image to fetch."
          },
          {
            "name": "file_id",
            "type": "string",
            "description": "ID of a previously uploaded file."
          }
        ]
      },
      {
        "name": "title",
        "type": "string",
        "description": "The title of the document."
      },
      {
        "name": "context",
        "type": "string",
        "description": "Additional context about the document for the model."
      }
    ]
  },
  {
    "name": "deny_message",
    "type": "string",
    "description": "Optional message providing context for a 'deny' decision. Only allowed when result is 'deny'."
  },
  {
    "name": "description",
    "type": "string",
    "description": "What the agent should produce. Copied from the input event."
  },
  {
    "name": "error",
    "type": "object",
    "description": "An unknown or unexpected error occurred during session execution. A fallback variant; clients that don't recognize a new error code can match on `retry_status` and `message` alone.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (unknown_error)"
      },
      {
        "name": "message",
        "type": "string",
        "description": "Human-readable error description."
      },
      {
        "name": "retry_status",
        "type": "object",
        "description": "What the client should do next.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (retrying)"
          }
        ]
      },
      {
        "name": "mcp_server_name",
        "type": "string",
        "description": "Name of the MCP server that failed to connect."
      },
      {
        "name": "vault_id",
        "type": "string",
        "description": "ID of the vault containing the affected credential."
      },
      {
        "name": "credential_id",
        "type": "string",
        "description": "ID of the affected credential."
      }
    ]
  },
  {
    "name": "evaluated_permission",
    "type": "string",
    "description": "The evaluated permission policy for this tool invocation. (allow, ask, deny)"
  },
  {
    "name": "explanation",
    "type": "string",
    "description": "Human-readable explanation of the verdict. For `needs_revision`, describes which criteria failed and why."
  },
  {
    "name": "input",
    "type": "object",
    "description": "Input parameters for the tool call."
  },
  {
    "name": "is_error",
    "type": "boolean",
    "description": "Whether the tool execution resulted in an error."
  },
  {
    "name": "iteration",
    "type": "integer (int32)",
    "description": "0-indexed revision cycle. 0 is the first evaluation; 1 is the re-evaluation after the first revision; etc."
  },
  {
    "name": "max_iterations",
    "type": "integer (int32)",
    "description": "Evaluate-then-revise cycles before giving up. Default 3, max 20."
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "The session's full metadata bag after the update. Present when the update set non-empty metadata; absent when metadata was unchanged or cleared to empty."
  },
  {
    "name": "model_usage",
    "type": "object",
    "description": "Token usage for this model request.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Input tokens consumed by this request."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Output tokens generated by this request."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "Tokens used to create prompt cache in this request."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Tokens read from prompt cache in this request."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed tier this request actually ran at. Mirrors `usage.speed` on /v1/messages. Only present when the fast-mode beta is active. (standard, fast)"
      }
    ]
  },
  {
    "name": "processed_at",
    "type": "string (date-time)",
    "description": "Timestamp when the agent finished processing this message."
  },
  {
    "name": "result",
    "type": "string",
    "description": "The confirmation result: 'allow' or 'deny'. (allow, deny)"
  },
  {
    "name": "rubric",
    "type": "object",
    "description": "How to grade the outcome. File rubrics are currently resolved to their text content; clients should handle both variants.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (file)"
      },
      {
        "name": "file_id",
        "type": "string",
        "description": "ID of the rubric file."
      },
      {
        "name": "content",
        "type": "string",
        "description": "Rubric content. Plain text or markdown — the grader treats it as freeform text."
      }
    ]
  },
  {
    "name": "stop_reason",
    "type": "object",
    "description": "The agent completed its turn naturally and is ready for the next user message.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (end_turn)"
      },
      {
        "name": "event_ids",
        "type": "array",
        "description": "The ids of events the agent is blocked on. Resolving fewer than all re-emits `session.status_idle` with the remainder."
      }
    ]
  },
  {
    "name": "title",
    "type": "string",
    "description": "The session's new title. Present only when the update changed it."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (user.message)"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Aggregate token usage for this evaluation cycle. Sums across all grader model requests within the cycle.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Input tokens consumed by this request."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Output tokens generated by this request."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "Tokens used to create prompt cache in this request."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Tokens read from prompt cache in this request."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed tier this request actually ran at. Mirrors `usage.speed` on /v1/messages. Only present when the fast-mode beta is active. (standard, fast)"
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td><a href="#parameter-order"><code>order</code></a>, <a href="#parameter-types[]"><code>types[]</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[gt]"><code>created_at[gt]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-created_at[lt]"><code>created_at[lt]</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#send"><CopyableCode code="send" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-events"><code>events</code></a></td>
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
<tr id="parameter-created_at[gt]">
    <td><CopyableCode code="created_at[gt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return events created after this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return events created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lt]">
    <td><CopyableCode code="created_at[lt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return events created before this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return events created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Sort direction for results, ordered by created_at. Defaults to asc (chronological).</td>
</tr>
<tr id="parameter-types[]">
    <td><CopyableCode code="types[]" /></td>
    <td><code>array</code></td>
    <td>Filter by event type. Values match the `type` field on returned events (for example, `user.message` or `agent.tool_use`). Omit to return all event types.</td>
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
custom_tool_use_id,
from_session_thread_id,
mcp_tool_use_id,
model_request_start_id,
outcome_evaluation_start_id,
outcome_id,
session_thread_id,
to_session_thread_id,
tool_use_id,
agent_name,
from_agent_name,
mcp_server_name,
to_agent_name,
agent,
content,
deny_message,
description,
error,
evaluated_permission,
explanation,
input,
is_error,
iteration,
max_iterations,
metadata,
model_usage,
processed_at,
result,
rubric,
stop_reason,
title,
type,
usage
FROM anthropic.sessions.events
WHERE session_id = '{{ session_id }}' -- required
AND order = '{{ order }}'
AND "types[]" = '{{ types[] }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[gt]" = '{{ created_at[gt] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
AND "created_at[lt]" = '{{ created_at[lt] }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="send"
    values={[
        { label: 'send', value: 'send' }
    ]}
>
<TabItem value="send">

Successful response (OK)

```sql
EXEC anthropic.sessions.events.send 
@session_id='{{ session_id }}' --required
@@json=
'{
"events": "{{ events }}"
}'
;
```
</TabItem>
</Tabs>
