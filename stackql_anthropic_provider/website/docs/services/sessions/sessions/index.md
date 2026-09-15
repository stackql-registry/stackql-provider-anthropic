---
title: sessions
hide_title: false
hide_table_of_contents: false
keywords:
  - sessions
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

Creates, updates, deletes, gets or lists a <code>sessions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sessions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.sessions.sessions" /></td></tr>
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
    "name": "deployment_id",
    "type": "string",
    "description": "Deployment ID when the session was created from a deployment reference. Null otherwise."
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Resolved `agent` definition for a `session`. Snapshot of the `agent` at `session` creation time.",
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
                "description": "Permission policy for tool execution."
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
                "description": "Approximate user location for search result localization."
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
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the session was archived. Null if not archived."
  },
  {
    "name": "budget",
    "type": "object",
    "description": "The session's enforced spend ceiling, or null when no budget is set.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (limit)"
      },
      {
        "name": "max_list_cost",
        "type": "object",
        "description": "Maximum list cost the session may accrue. List price is used regardless of any negotiated discount, so the cap fires at or before the actual charge.",
        "children": [
          {
            "name": "currency",
            "type": "string",
            "description": "Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced. (USD)"
          },
          {
            "name": "amount",
            "type": "string",
            "description": "Amount in minor units of the currency, as an integer decimal string with no leading zeros: \"2500\" is $25.00 and \"50\" is fifty cents. A string rather than a number so no float rounding is ever applied."
          }
        ]
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": ""
  },
  {
    "name": "outcome_evaluations",
    "type": "array",
    "description": "Per-outcome evaluation state. One entry per `define_outcome` event sent to the session.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (outcome_evaluation)"
      },
      {
        "name": "outcome_id",
        "type": "string",
        "description": "Server-generated outc_ ID for this outcome."
      },
      {
        "name": "description",
        "type": "string",
        "description": "What the agent should produce."
      },
      {
        "name": "result",
        "type": "string",
        "description": "Current evaluation state. `pending` before the agent begins work; `running` while producing or revising; `evaluating` while the grader scores; `satisfied`/`max_iterations_reached`/`failed`/`interrupted` are terminal."
      },
      {
        "name": "iteration",
        "type": "integer (int32)",
        "description": "0-indexed revision cycle the outcome is currently on."
      },
      {
        "name": "completed_at",
        "type": "string (date-time)",
        "description": "When the outcome reached a terminal result. Null while `pending`/`running`/`evaluating`."
      },
      {
        "name": "explanation",
        "type": "string",
        "description": "Grader's verdict text from the most recent evaluation. For `satisfied`, explains why criteria are met; for `needs_revision` (intermediate), what's missing; for `failed`, why unrecoverable."
      }
    ]
  },
  {
    "name": "resources",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (github_repository)"
      },
      {
        "name": "id",
        "type": "string",
        "description": ""
      },
      {
        "name": "url",
        "type": "string",
        "description": ""
      },
      {
        "name": "mount_path",
        "type": "string",
        "description": ""
      },
      {
        "name": "checkout",
        "type": "object",
        "description": "",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (branch)"
          },
          {
            "name": "name",
            "type": "string",
            "description": "Branch name to check out."
          },
          {
            "name": "sha",
            "type": "string",
            "description": "Full commit SHA to check out."
          }
        ]
      },
      {
        "name": "created_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "updated_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "file_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
      },
      {
        "name": "access",
        "type": "string",
        "description": "Access mode for the mounted store. Defaults to `read_write`. `read_only` mounts the store as a read-only filesystem. (read_write, read_only)"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Display name of the memory store, snapshotted at attach time. Later edits to the store's name do not propagate to this resource."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Description of the memory store, snapshotted at attach time. Rendered into the agent's system prompt. Empty string when the store has no description."
      },
      {
        "name": "instructions",
        "type": "string",
        "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
      }
    ]
  },
  {
    "name": "stats",
    "type": "object",
    "description": "Timing statistics for the session.",
    "children": [
      {
        "name": "duration_seconds",
        "type": "number (double)",
        "description": "Elapsed time since session creation in seconds. For terminated sessions, frozen at the final update."
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds the session spent in `running` status. Excludes idle time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "SessionStatus enum (rescheduling, running, idle, terminated)"
  },
  {
    "name": "title",
    "type": "string",
    "description": ""
  },
  {
    "name": "type",
    "type": "string",
    "description": " (session)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for the session.",
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
      },
      {
        "name": "list_cost",
        "type": "object",
        "description": "Cumulative list cost of the session across all turns, priced at public list rates. Absent until cost tracking is available for the session.",
        "children": [
          {
            "name": "currency",
            "type": "string",
            "description": "Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced. (USD)"
          },
          {
            "name": "amount",
            "type": "string",
            "description": "Amount in minor units of the currency, as an integer decimal string with no leading zeros: \"2500\" is $25.00 and \"50\" is fifty cents. A string rather than a number so no float rounding is ever applied."
          }
        ]
      },
      {
        "name": "server_tool_use",
        "type": "object",
        "description": "Cumulative server-executed tool usage across all turns. Absent until server-tool tracking is available for the session.",
        "children": [
          {
            "name": "web_search_requests",
            "type": "integer (int32)",
            "description": "Number of server-executed web search requests."
          },
          {
            "name": "web_fetch_requests",
            "type": "integer (int32)",
            "description": "Number of server-executed web fetch requests."
          }
        ]
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds during which the session had at least one thread in running status. Overlapping activity from concurrent threads is counted once, unlike `stats.active_seconds`, which sums each thread's own active time. This is the duration the session's runtime cost is priced on."
      }
    ]
  },
  {
    "name": "vault_ids",
    "type": "array",
    "description": "Vault IDs attached to the session at creation. Empty when no vaults were supplied."
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
    "name": "deployment_id",
    "type": "string",
    "description": "Deployment ID when the session was created from a deployment reference. Null otherwise."
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Resolved `agent` definition for a `session`. Snapshot of the `agent` at `session` creation time.",
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
                "description": "Permission policy for tool execution."
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
                "description": "Approximate user location for search result localization."
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
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the session was archived. Null if not archived."
  },
  {
    "name": "budget",
    "type": "object",
    "description": "The session's enforced spend ceiling, or null when no budget is set.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (limit)"
      },
      {
        "name": "max_list_cost",
        "type": "object",
        "description": "Maximum list cost the session may accrue. List price is used regardless of any negotiated discount, so the cap fires at or before the actual charge.",
        "children": [
          {
            "name": "currency",
            "type": "string",
            "description": "Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced. (USD)"
          },
          {
            "name": "amount",
            "type": "string",
            "description": "Amount in minor units of the currency, as an integer decimal string with no leading zeros: \"2500\" is $25.00 and \"50\" is fifty cents. A string rather than a number so no float rounding is ever applied."
          }
        ]
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "metadata",
    "type": "object",
    "description": ""
  },
  {
    "name": "outcome_evaluations",
    "type": "array",
    "description": "Per-outcome evaluation state. One entry per `define_outcome` event sent to the session.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (outcome_evaluation)"
      },
      {
        "name": "outcome_id",
        "type": "string",
        "description": "Server-generated outc_ ID for this outcome."
      },
      {
        "name": "description",
        "type": "string",
        "description": "What the agent should produce."
      },
      {
        "name": "result",
        "type": "string",
        "description": "Current evaluation state. `pending` before the agent begins work; `running` while producing or revising; `evaluating` while the grader scores; `satisfied`/`max_iterations_reached`/`failed`/`interrupted` are terminal."
      },
      {
        "name": "iteration",
        "type": "integer (int32)",
        "description": "0-indexed revision cycle the outcome is currently on."
      },
      {
        "name": "completed_at",
        "type": "string (date-time)",
        "description": "When the outcome reached a terminal result. Null while `pending`/`running`/`evaluating`."
      },
      {
        "name": "explanation",
        "type": "string",
        "description": "Grader's verdict text from the most recent evaluation. For `satisfied`, explains why criteria are met; for `needs_revision` (intermediate), what's missing; for `failed`, why unrecoverable."
      }
    ]
  },
  {
    "name": "resources",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (github_repository)"
      },
      {
        "name": "id",
        "type": "string",
        "description": ""
      },
      {
        "name": "url",
        "type": "string",
        "description": ""
      },
      {
        "name": "mount_path",
        "type": "string",
        "description": ""
      },
      {
        "name": "checkout",
        "type": "object",
        "description": "",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (branch)"
          },
          {
            "name": "name",
            "type": "string",
            "description": "Branch name to check out."
          },
          {
            "name": "sha",
            "type": "string",
            "description": "Full commit SHA to check out."
          }
        ]
      },
      {
        "name": "created_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "updated_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "file_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
      },
      {
        "name": "access",
        "type": "string",
        "description": "Access mode for the mounted store. Defaults to `read_write`. `read_only` mounts the store as a read-only filesystem. (read_write, read_only)"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Display name of the memory store, snapshotted at attach time. Later edits to the store's name do not propagate to this resource."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Description of the memory store, snapshotted at attach time. Rendered into the agent's system prompt. Empty string when the store has no description."
      },
      {
        "name": "instructions",
        "type": "string",
        "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
      }
    ]
  },
  {
    "name": "stats",
    "type": "object",
    "description": "Timing statistics for the session.",
    "children": [
      {
        "name": "duration_seconds",
        "type": "number (double)",
        "description": "Elapsed time since session creation in seconds. For terminated sessions, frozen at the final update."
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds the session spent in `running` status. Excludes idle time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "SessionStatus enum (rescheduling, running, idle, terminated)"
  },
  {
    "name": "title",
    "type": "string",
    "description": ""
  },
  {
    "name": "type",
    "type": "string",
    "description": " (session)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for the session.",
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
      },
      {
        "name": "list_cost",
        "type": "object",
        "description": "Cumulative list cost of the session across all turns, priced at public list rates. Absent until cost tracking is available for the session.",
        "children": [
          {
            "name": "currency",
            "type": "string",
            "description": "Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced. (USD)"
          },
          {
            "name": "amount",
            "type": "string",
            "description": "Amount in minor units of the currency, as an integer decimal string with no leading zeros: \"2500\" is $25.00 and \"50\" is fifty cents. A string rather than a number so no float rounding is ever applied."
          }
        ]
      },
      {
        "name": "server_tool_use",
        "type": "object",
        "description": "Cumulative server-executed tool usage across all turns. Absent until server-tool tracking is available for the session.",
        "children": [
          {
            "name": "web_search_requests",
            "type": "integer (int32)",
            "description": "Number of server-executed web search requests."
          },
          {
            "name": "web_fetch_requests",
            "type": "integer (int32)",
            "description": "Number of server-executed web fetch requests."
          }
        ]
      },
      {
        "name": "active_seconds",
        "type": "number (double)",
        "description": "Cumulative time in seconds during which the session had at least one thread in running status. Overlapping activity from concurrent threads is counted once, unlike `stats.active_seconds`, which sums each thread's own active time. This is the duration the session's runtime cost is priced on."
      }
    ]
  },
  {
    "name": "vault_ids",
    "type": "array",
    "description": "Vault IDs attached to the session at creation. Empty when no vaults were supplied."
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
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[gt]"><code>created_at[gt]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-created_at[lt]"><code>created_at[lt]</code></a>, <a href="#parameter-agent_id"><code>agent_id</code></a>, <a href="#parameter-agent_version"><code>agent_version</code></a>, <a href="#parameter-order"><code>order</code></a>, <a href="#parameter-memory_store_id"><code>memory_store_id</code></a>, <a href="#parameter-deployment_id"><code>deployment_id</code></a>, <a href="#parameter-statuses[]"><code>statuses[]</code></a>, <a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-agent"><code>agent</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-session_id"><code>session_id</code></a></td>
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
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter session_id (example: sesn_011CZkZAtmR3yMPDzynEDxu7)</td>
</tr>
<tr id="parameter-agent_id">
    <td><CopyableCode code="agent_id" /></td>
    <td><code>string</code></td>
    <td>Filter sessions created with this agent ID.</td>
</tr>
<tr id="parameter-agent_version">
    <td><CopyableCode code="agent_version" /></td>
    <td><code>integer (int32)</code></td>
    <td>Filter by agent version. Only applies when `agent_id` is also set.</td>
</tr>
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
</tr>
<tr id="parameter-created_at[gt]">
    <td><CopyableCode code="created_at[gt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return sessions created after this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[gte]">
    <td><CopyableCode code="created_at[gte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return sessions created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lt]">
    <td><CopyableCode code="created_at[lt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return sessions created before this time (exclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return sessions created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-deployment_id">
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td>Filter sessions created by this deployment ID.</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>When true, includes archived sessions. Default: false (exclude archived).</td>
</tr>
<tr id="parameter-memory_store_id">
    <td><CopyableCode code="memory_store_id" /></td>
    <td><code>string</code></td>
    <td>Filter sessions whose resources contain a `memory_store` with this memory store ID.</td>
</tr>
<tr id="parameter-order">
    <td><CopyableCode code="order" /></td>
    <td><code>string</code></td>
    <td>Sort direction for results, ordered by `created_at`. Defaults to `desc` (newest first).</td>
</tr>
<tr id="parameter-statuses[]">
    <td><CopyableCode code="statuses[]" /></td>
    <td><code>array</code></td>
    <td>Filter by session status. Repeat the parameter to match any of multiple statuses.</td>
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
deployment_id,
environment_id,
agent,
archived_at,
budget,
created_at,
metadata,
outcome_evaluations,
resources,
stats,
status,
title,
type,
updated_at,
usage,
vault_ids
FROM anthropic.sessions.sessions
WHERE session_id = '{{ session_id }}' -- required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
deployment_id,
environment_id,
agent,
archived_at,
budget,
created_at,
metadata,
outcome_evaluations,
resources,
stats,
status,
title,
type,
updated_at,
usage,
vault_ids
FROM anthropic.sessions.sessions
WHERE include_archived = '{{ include_archived }}'
AND "created_at[gte]" = '{{ created_at[gte] }}'
AND "created_at[gt]" = '{{ created_at[gt] }}'
AND "created_at[lte]" = '{{ created_at[lte] }}'
AND "created_at[lt]" = '{{ created_at[lt] }}'
AND agent_id = '{{ agent_id }}'
AND agent_version = '{{ agent_version }}'
AND order = '{{ order }}'
AND memory_store_id = '{{ memory_store_id }}'
AND deployment_id = '{{ deployment_id }}'
AND "statuses[]" = '{{ statuses[] }}'
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
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
INSERT INTO anthropic.sessions.sessions (
agent,
environment_id,
title,
metadata,
resources,
vault_ids,
initial_events,
budget,
"anthropic-workspace-id"
)
SELECT 
'{{ agent }}' /* required */,
'{{ environment_id }}' /* required */,
'{{ title }}',
'{{ metadata }}',
'{{ resources }}',
'{{ vault_ids }}',
'{{ initial_events }}',
'{{ budget }}',
'{{ anthropic-workspace-id }}'
RETURNING
id,
deployment_id,
environment_id,
agent,
archived_at,
budget,
created_at,
metadata,
outcome_evaluations,
resources,
stats,
status,
title,
type,
updated_at,
usage,
vault_ids
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: sessions
  props:
    - name: agent
      value: "{{ agent }}"
      description: |
        Agent identifier. Accepts the \`agent\` ID string, which pins the latest version for the session, or an \`agent\` object with both id and version specified.
    - name: environment_id
      value: "{{ environment_id }}"
      description: |
        ID of the \`environment\` defining the container configuration for this session.
    - name: title
      value: "{{ title }}"
      description: |
        Human-readable session title.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value metadata attached to the session. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.
    - name: resources
      description: |
        Resources (e.g. repositories, files) to mount into the session's container.
      value:
        - type: "{{ type }}"
          url: "{{ url }}"
          authorization_token: "{{ authorization_token }}"
          mount_path: "{{ mount_path }}"
          checkout:
            type: "{{ type }}"
            name: "{{ name }}"
            sha: "{{ sha }}"
          file_id: "{{ file_id }}"
          memory_store_id: "{{ memory_store_id }}"
          access: "{{ access }}"
          instructions: "{{ instructions }}"
    - name: vault_ids
      value:
        - "{{ vault_ids }}"
      description: |
        Vault IDs for stored credentials the agent can use during the session.
    - name: initial_events
      description: |
        Initial events to send to the \`session\` at creation, processed in order. Supports \`user.message\` and \`user.define_outcome\` events. Maximum 50 events.
      value:
        - type: "{{ type }}"
          content: "{{ content }}"
          description: "{{ description }}"
          rubric:
            type: "{{ type }}"
            file_id: "{{ file_id }}"
            content: "{{ content }}"
          max_iterations: {{ max_iterations }}
    - name: budget
      description: |
        Enforced spend ceiling for the session. Omit to create an uncapped session. Every model the session can run — the agent's model and each callable agent's model — must have a public list price, or the request is rejected with reason \`model_not_budgetable\`.
      value:
        type: "{{ type }}"
        max_list_cost:
          currency: "{{ currency }}"
          amount: "{{ amount }}"
    - name: anthropic-workspace-id
      value: "{{ anthropic-workspace-id }}"
      description: Optional header to select the Workspace for this request. The value is a Workspace ID (for example, \`wrkspc_011CZkZaBF1tNoB5wlCeusgy\`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)
      description: Optional header to select the Workspace for this request. The value is a Workspace ID (for example, \`wrkspc_011CZkZaBF1tNoB5wlCeusgy\`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)
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
UPDATE anthropic.sessions.sessions
SET 
title = '{{ title }}',
metadata = '{{ metadata }}',
vault_ids = '{{ vault_ids }}',
agent = '{{ agent }}',
budget = '{{ budget }}'
WHERE 
session_id = '{{ session_id }}' --required
WHERE "anthropic-workspace-id" = '{{ anthropic-workspace-id}}'
RETURNING
id,
deployment_id,
environment_id,
agent,
archived_at,
budget,
created_at,
metadata,
outcome_evaluations,
resources,
stats,
status,
title,
type,
updated_at,
usage,
vault_ids;
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
DELETE FROM anthropic.sessions.sessions
WHERE session_id = '{{ session_id }}' --required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
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
EXEC anthropic.sessions.sessions.archive 
@session_id='{{ session_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
