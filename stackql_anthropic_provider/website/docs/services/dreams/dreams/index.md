---
title: dreams
hide_title: false
hide_table_of_contents: false
keywords:
  - dreams
  - dreams
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

Creates, updates, deletes, gets or lists a <code>dreams</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="dreams" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.dreams.dreams" /></td></tr>
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
    "name": "session_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "error",
    "type": "object",
    "description": "Failure detail for a Dream whose `status` is `failed`.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": ""
      },
      {
        "name": "message",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "inputs",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "session_ids",
        "type": "array",
        "description": ""
      }
    ]
  },
  {
    "name": "instructions",
    "type": "string",
    "description": ""
  },
  {
    "name": "model",
    "type": "object",
    "description": "Model identifier and configuration applied to every pipeline stage. Same wire shape as the Agents API ModelConfig.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "Model identifier, e.g. \"claude-opus-5\". 1-256 characters."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed mode. Defaults to `standard`. (standard, fast)"
      }
    ]
  },
  {
    "name": "output_behavior",
    "type": "object",
    "description": "The default destination: the job creates a new output memory store as a clone of the memory_store input and writes the consolidated memories into it. The input store is never mutated.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (create_new)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "outputs",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Lifecycle status of a Dream. (pending, running, completed, failed, canceled)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (dream)"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for the dream across every pipeline stage.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Total uncached input tokens consumed across every pipeline stage."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Total output tokens generated across every pipeline stage."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens read from prompt cache."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens used to create prompt-cache entries (sum of all TTL tiers)."
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
    "description": ""
  },
  {
    "name": "session_id",
    "type": "string",
    "description": ""
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  },
  {
    "name": "error",
    "type": "object",
    "description": "Failure detail for a Dream whose `status` is `failed`.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": ""
      },
      {
        "name": "message",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "inputs",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      },
      {
        "name": "session_ids",
        "type": "array",
        "description": ""
      }
    ]
  },
  {
    "name": "instructions",
    "type": "string",
    "description": ""
  },
  {
    "name": "model",
    "type": "object",
    "description": "Model identifier and configuration applied to every pipeline stage. Same wire shape as the Agents API ModelConfig.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "Model identifier, e.g. \"claude-opus-5\". 1-256 characters."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "Inference speed mode. Defaults to `standard`. (standard, fast)"
      }
    ]
  },
  {
    "name": "output_behavior",
    "type": "object",
    "description": "The default destination: the job creates a new output memory store as a clone of the memory_store input and writes the consolidated memories into it. The input store is never mutated.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (create_new)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "outputs",
    "type": "array",
    "description": "",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": ""
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Lifecycle status of a Dream. (pending, running, completed, failed, canceled)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (dream)"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "Cumulative token usage for the dream across every pipeline stage.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "Total uncached input tokens consumed across every pipeline stage."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "Total output tokens generated across every pipeline stage."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens read from prompt cache."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "Total tokens used to create prompt-cache entries (sum of all TTL tiers)."
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
    <td><a href="#parameter-dream_id"><code>dream_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-statuses[]"><code>statuses[]</code></a>, <a href="#parameter-created_at[gt]"><code>created_at[gt]</code></a>, <a href="#parameter-created_at[lt]"><code>created_at[lt]</code></a>, <a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-inputs"><code>inputs</code></a>, <a href="#parameter-model"><code>model</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-dream_id"><code>dream_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-dream_id"><code>dream_id</code></a></td>
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
<tr id="parameter-dream_id">
    <td><CopyableCode code="dream_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter dream_id</td>
</tr>
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
</tr>
<tr id="parameter-created_at[gt]">
    <td><CopyableCode code="created_at[gt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return dreams with `created_at` strictly after this timestamp (exclusive lower bound, RFC 3339). Unset applies no lower bound.</td>
</tr>
<tr id="parameter-created_at[lt]">
    <td><CopyableCode code="created_at[lt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return dreams with `created_at` strictly before this timestamp (exclusive upper bound, RFC 3339). Unset applies no upper bound.</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Query parameter for include_archived</td>
</tr>
<tr id="parameter-statuses[]">
    <td><CopyableCode code="statuses[]" /></td>
    <td><code>array</code></td>
    <td>Filter by lifecycle status. Repeat the parameter to match any of multiple statuses. Empty applies no status filter.</td>
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
session_id,
archived_at,
created_at,
ended_at,
error,
inputs,
instructions,
model,
output_behavior,
outputs,
status,
type,
usage
FROM anthropic.dreams.dreams
WHERE dream_id = '{{ dream_id }}' -- required
AND "anthropic-workspace-id" = '{{ anthropic-workspace-id }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
session_id,
archived_at,
created_at,
ended_at,
error,
inputs,
instructions,
model,
output_behavior,
outputs,
status,
type,
usage
FROM anthropic.dreams.dreams
WHERE include_archived = '{{ include_archived }}'
AND "statuses[]" = '{{ statuses[] }}'
AND "created_at[gt]" = '{{ created_at[gt] }}'
AND "created_at[lt]" = '{{ created_at[lt] }}'
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
INSERT INTO anthropic.dreams.dreams (
inputs,
model,
instructions,
output_behavior,
"anthropic-workspace-id"
)
SELECT 
'{{ inputs }}' /* required */,
'{{ model }}' /* required */,
'{{ instructions }}',
'{{ output_behavior }}',
'{{ anthropic-workspace-id }}'
RETURNING
id,
session_id,
archived_at,
created_at,
ended_at,
error,
inputs,
instructions,
model,
output_behavior,
outputs,
status,
type,
usage
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: dreams
  props:
    - name: inputs
      value:
        - type: "{{ type }}"
          memory_store_id: "{{ memory_store_id }}"
          session_ids: "{{ session_ids }}"
    - name: model
      value: "{{ model }}"
      description: |
        Model identifier and configuration applied to every pipeline stage.
    - name: instructions
      value: "{{ instructions }}"
    - name: output_behavior
      description: |
        The default destination: the job creates a new output memory store as a clone of the memory_store input and writes the consolidated memories into it. The input store is never mutated.
      value:
        type: "{{ type }}"
        memory_store_id: "{{ memory_store_id }}"
    - name: anthropic-workspace-id
      value: "{{ anthropic-workspace-id }}"
      description: Optional header to select the Workspace for this request. The value is a Workspace ID (for example, \`wrkspc_011CZkZaBF1tNoB5wlCeusgy\`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)
      description: Optional header to select the Workspace for this request. The value is a Workspace ID (for example, \`wrkspc_011CZkZaBF1tNoB5wlCeusgy\`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)
`}</CodeBlock>

</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'archive', value: 'archive' }
    ]}
>
<TabItem value="cancel">

Successful response (OK)

```sql
EXEC anthropic.dreams.dreams.cancel 
@dream_id='{{ dream_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
<TabItem value="archive">

Successful response (OK)

```sql
EXEC anthropic.dreams.dreams.archive 
@dream_id='{{ dream_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
