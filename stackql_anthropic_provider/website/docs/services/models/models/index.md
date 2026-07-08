---
title: models
hide_title: false
hide_table_of_contents: false
keywords:
  - models
  - models
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

Creates, updates, deletes, gets or lists a <code>models</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="models" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.models.models" /></td></tr>
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
    "description": "Unique model identifier."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "A human-readable name for the model."
  },
  {
    "name": "capabilities",
    "type": "object",
    "description": "Object mapping capability names to their support details. Keys are always present for all known capabilities.",
    "children": [
      {
        "name": "batch",
        "type": "object",
        "description": "Whether the model supports the Batch API.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "citations",
        "type": "object",
        "description": "Whether the model supports citation generation.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "code_execution",
        "type": "object",
        "description": "Whether the model supports code execution tools.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "context_management",
        "type": "object",
        "description": "Context management support and available strategies.",
        "children": [
          {
            "name": "clear_thinking_20251015",
            "type": "object",
            "description": "Whether the clear_thinking_20251015 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "clear_tool_uses_20250919",
            "type": "object",
            "description": "Whether the clear_tool_uses_20250919 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "compact_20260112",
            "type": "object",
            "description": "Whether the compact_20260112 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "effort",
        "type": "object",
        "description": "Effort (reasoning_effort) support and available levels.",
        "children": [
          {
            "name": "high",
            "type": "object",
            "description": "Whether the model supports high effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "low",
            "type": "object",
            "description": "Whether the model supports low effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "max",
            "type": "object",
            "description": "Whether the model supports max effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "medium",
            "type": "object",
            "description": "Whether the model supports medium effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          },
          {
            "name": "xhigh",
            "type": "object",
            "description": "Whether the model supports xhigh effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          }
        ]
      },
      {
        "name": "image_input",
        "type": "object",
        "description": "Whether the model accepts image content blocks.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "pdf_input",
        "type": "object",
        "description": "Whether the model accepts PDF content blocks.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "structured_outputs",
        "type": "object",
        "description": "Whether the model supports structured output / JSON mode / strict tool schemas.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "thinking",
        "type": "object",
        "description": "Thinking capability and supported type configurations.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          },
          {
            "name": "types",
            "type": "object",
            "description": "Supported thinking type configurations.",
            "children": [
              {
                "name": "adaptive",
                "type": "object",
                "description": "Whether the model supports thinking with type 'adaptive' (auto)."
              },
              {
                "name": "enabled",
                "type": "object",
                "description": "Whether the model supports thinking with type 'enabled'."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the model was released. May be set to an epoch value if the release date is unknown."
  },
  {
    "name": "max_input_tokens",
    "type": "integer",
    "description": "Maximum input context window size in tokens for this model."
  },
  {
    "name": "max_tokens",
    "type": "integer",
    "description": "Maximum value for the `max_tokens` parameter when using this model."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Models, this is always `\"model\"`. (model)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique model identifier."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "A human-readable name for the model."
  },
  {
    "name": "capabilities",
    "type": "object",
    "description": "Object mapping capability names to their support details. Keys are always present for all known capabilities.",
    "children": [
      {
        "name": "batch",
        "type": "object",
        "description": "Whether the model supports the Batch API.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "citations",
        "type": "object",
        "description": "Whether the model supports citation generation.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "code_execution",
        "type": "object",
        "description": "Whether the model supports code execution tools.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "context_management",
        "type": "object",
        "description": "Context management support and available strategies.",
        "children": [
          {
            "name": "clear_thinking_20251015",
            "type": "object",
            "description": "Whether the clear_thinking_20251015 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "clear_tool_uses_20250919",
            "type": "object",
            "description": "Whether the clear_tool_uses_20250919 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "compact_20260112",
            "type": "object",
            "description": "Whether the compact_20260112 strategy is supported.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "effort",
        "type": "object",
        "description": "Effort (reasoning_effort) support and available levels.",
        "children": [
          {
            "name": "high",
            "type": "object",
            "description": "Whether the model supports high effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "low",
            "type": "object",
            "description": "Whether the model supports low effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "max",
            "type": "object",
            "description": "Whether the model supports max effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "medium",
            "type": "object",
            "description": "Whether the model supports medium effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          },
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          },
          {
            "name": "xhigh",
            "type": "object",
            "description": "Whether the model supports xhigh effort level.",
            "children": [
              {
                "name": "supported",
                "type": "boolean",
                "description": "Whether this capability is supported by the model."
              }
            ]
          }
        ]
      },
      {
        "name": "image_input",
        "type": "object",
        "description": "Whether the model accepts image content blocks.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "pdf_input",
        "type": "object",
        "description": "Whether the model accepts PDF content blocks.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "structured_outputs",
        "type": "object",
        "description": "Whether the model supports structured output / JSON mode / strict tool schemas.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          }
        ]
      },
      {
        "name": "thinking",
        "type": "object",
        "description": "Thinking capability and supported type configurations.",
        "children": [
          {
            "name": "supported",
            "type": "boolean",
            "description": "Whether this capability is supported by the model."
          },
          {
            "name": "types",
            "type": "object",
            "description": "Supported thinking type configurations.",
            "children": [
              {
                "name": "adaptive",
                "type": "object",
                "description": "Whether the model supports thinking with type 'adaptive' (auto)."
              },
              {
                "name": "enabled",
                "type": "object",
                "description": "Whether the model supports thinking with type 'enabled'."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the model was released. May be set to an epoch value if the release date is unknown."
  },
  {
    "name": "max_input_tokens",
    "type": "integer",
    "description": "Maximum input context window size in tokens for this model."
  },
  {
    "name": "max_tokens",
    "type": "integer",
    "description": "Maximum value for the `max_tokens` parameter when using this model."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Models, this is always `\"model\"`. (model)"
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
    <td><a href="#parameter-model_id"><code>model_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Get a specific model.<br /><br />The Models API response can be used to determine information about a specific model or resolve a model alias to a model ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>List available models.<br /><br />The Models API response can be used to determine which models are available for use in the API. More recently released models are listed first.</td>
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
<tr id="parameter-model_id">
    <td><CopyableCode code="model_id" /></td>
    <td><code>string</code></td>
    <td>Model identifier or alias.</td>
</tr>
<tr id="parameter-after_id">
    <td><CopyableCode code="after_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately after this object.</td>
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
<tr id="parameter-before_id">
    <td><CopyableCode code="before_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately before this object.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Number of items to return per page.  Defaults to `20`. Ranges from `1` to `1000`.</td>
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

Get a specific model.<br /><br />The Models API response can be used to determine information about a specific model or resolve a model alias to a model ID.

```sql
SELECT
id,
display_name,
capabilities,
created_at,
max_input_tokens,
max_tokens,
type
FROM anthropic.models.models
WHERE model_id = '{{ model_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

List available models.<br /><br />The Models API response can be used to determine which models are available for use in the API. More recently released models are listed first.

```sql
SELECT
id,
display_name,
capabilities,
created_at,
max_input_tokens,
max_tokens,
type
FROM anthropic.models.models
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND limit = '{{ limit }}'
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
</Tabs>
