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
    "description": "The unique ID of the dream (`drm_...`)."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "The ID of the session that runs the dream (`sesn_...`), or `null` if that session hasn't started.<br /><br />Stream that session's events to follow what the dream reads and writes.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#watch-the-pipeline-run) for how to watch a running dream."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the dream was archived, in RFC 3339, or `null` if it hasn't been archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When the dream was created, in RFC 3339.<br /><br />Lists of dreams are sorted by this time, newest first."
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "When the dream reached `completed`, `failed`, or `canceled`, in RFC 3339, or `null` if it is still `pending` or `running`."
  },
  {
    "name": "error",
    "type": "object",
    "description": "Why the dream failed, or `null` if `status` isn't `failed`.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": "A code for why the dream failed, such as `timeout` or `internal_error`.<br /><br />The [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#errors) lists common error codes and when they occur."
      },
      {
        "name": "message",
        "type": "string",
        "description": "A human-readable explanation of why the dream failed."
      }
    ]
  },
  {
    "name": "inputs",
    "type": "array",
    "description": "The sources that the dream reads, from the request that created it.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store for the dream to read (`memstore_...`).<br /><br />The memory store must be in the same workspace as the dream and must not be archived."
      },
      {
        "name": "session_ids",
        "type": "array",
        "description": "The IDs of the sessions whose transcripts the dream reads (`sesn_...`).<br /><br />Give 1 to 100 IDs, with no duplicates. Each session must be in the same workspace as the dream. Responses list the IDs in sorted order.<br /><br />The [limits table in the Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#limits) lists all the limits on a dream."
      }
    ]
  },
  {
    "name": "instructions",
    "type": "string",
    "description": "The guidance given when the dream was created, or `null` if none was given."
  },
  {
    "name": "model",
    "type": "object",
    "description": "The model that runs a dream, from the request that created it.<br /><br />The dream uses this model for all of its work. The response always gives the model as an object, even if the request gave only a model ID.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The ID of the model that runs the dream, as given in the request that created it."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "How fast the model generates output for the dream. Always `standard`. (standard, fast)"
      }
    ]
  },
  {
    "name": "output_behavior",
    "type": "object",
    "description": "Where the dream writes its result, as set in the request that created the dream. If that request left out `output_behavior`, the dream used the `create_new` behavior.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (create_new)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store for the dream to write its result to (`memstore_...`). It must be the memory store in the `memory_store` entry of `inputs`."
      }
    ]
  },
  {
    "name": "outputs",
    "type": "array",
    "description": "The memory store that holds the dream's result, as a one-item array, or an empty array until the dream records that memory store.<br /><br />The array is empty while the dream is `pending` and for a short time after it starts `running`. It can stay empty if the dream fails or is canceled before then. The memory store holds the complete result only once `status` is `completed`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#use-the-output) for how to review and use the result.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store that the dream writes its result to (`memstore_...`).<br /><br />With `output_behavior` set to `create_new`, this is a new memory store. With `update_existing`, it is the input memory store."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Where a dream is in its lifecycle.<br /><br />`completed`, `failed`, and `canceled` are final: once a dream has one of these statuses, its status doesn't change again.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#lifecycle) for what each status means. (pending, running, completed, failed, canceled)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (dream)"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "The dream's token counts, which stop changing once its `status` is `completed` or `failed`. After a cancel, they can keep changing.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that weren't read from or written to the prompt cache."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "The tokens that the model generated for the dream."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that were read from the prompt cache."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that were written to the prompt cache, for both the 5-minute and 1-hour cache durations."
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
    "description": "The unique ID of the dream (`drm_...`)."
  },
  {
    "name": "session_id",
    "type": "string",
    "description": "The ID of the session that runs the dream (`sesn_...`), or `null` if that session hasn't started.<br /><br />Stream that session's events to follow what the dream reads and writes.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#watch-the-pipeline-run) for how to watch a running dream."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the dream was archived, in RFC 3339, or `null` if it hasn't been archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "When the dream was created, in RFC 3339.<br /><br />Lists of dreams are sorted by this time, newest first."
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "When the dream reached `completed`, `failed`, or `canceled`, in RFC 3339, or `null` if it is still `pending` or `running`."
  },
  {
    "name": "error",
    "type": "object",
    "description": "Why the dream failed, or `null` if `status` isn't `failed`.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": "A code for why the dream failed, such as `timeout` or `internal_error`.<br /><br />The [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#errors) lists common error codes and when they occur."
      },
      {
        "name": "message",
        "type": "string",
        "description": "A human-readable explanation of why the dream failed."
      }
    ]
  },
  {
    "name": "inputs",
    "type": "array",
    "description": "The sources that the dream reads, from the request that created it.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store for the dream to read (`memstore_...`).<br /><br />The memory store must be in the same workspace as the dream and must not be archived."
      },
      {
        "name": "session_ids",
        "type": "array",
        "description": "The IDs of the sessions whose transcripts the dream reads (`sesn_...`).<br /><br />Give 1 to 100 IDs, with no duplicates. Each session must be in the same workspace as the dream. Responses list the IDs in sorted order.<br /><br />The [limits table in the Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#limits) lists all the limits on a dream."
      }
    ]
  },
  {
    "name": "instructions",
    "type": "string",
    "description": "The guidance given when the dream was created, or `null` if none was given."
  },
  {
    "name": "model",
    "type": "object",
    "description": "The model that runs a dream, from the request that created it.<br /><br />The dream uses this model for all of its work. The response always gives the model as an object, even if the request gave only a model ID.",
    "children": [
      {
        "name": "id",
        "type": "string",
        "description": "The ID of the model that runs the dream, as given in the request that created it."
      },
      {
        "name": "speed",
        "type": "string",
        "description": "How fast the model generates output for the dream. Always `standard`. (standard, fast)"
      }
    ]
  },
  {
    "name": "output_behavior",
    "type": "object",
    "description": "Where the dream writes its result, as set in the request that created the dream. If that request left out `output_behavior`, the dream used the `create_new` behavior.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (create_new)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store for the dream to write its result to (`memstore_...`). It must be the memory store in the `memory_store` entry of `inputs`."
      }
    ]
  },
  {
    "name": "outputs",
    "type": "array",
    "description": "The memory store that holds the dream's result, as a one-item array, or an empty array until the dream records that memory store.<br /><br />The array is empty while the dream is `pending` and for a short time after it starts `running`. It can stay empty if the dream fails or is canceled before then. The memory store holds the complete result only once `status` is `completed`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#use-the-output) for how to review and use the result.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (memory_store)"
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The ID of the memory store that the dream writes its result to (`memstore_...`).<br /><br />With `output_behavior` set to `create_new`, this is a new memory store. With `update_existing`, it is the input memory store."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Where a dream is in its lifecycle.<br /><br />`completed`, `failed`, and `canceled` are final: once a dream has one of these statuses, its status doesn't change again.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#lifecycle) for what each status means. (pending, running, completed, failed, canceled)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (dream)"
  },
  {
    "name": "usage",
    "type": "object",
    "description": "The dream's token counts, which stop changing once its `status` is `completed` or `failed`. After a cancel, they can keep changing.",
    "children": [
      {
        "name": "input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that weren't read from or written to the prompt cache."
      },
      {
        "name": "output_tokens",
        "type": "integer (int32)",
        "description": "The tokens that the model generated for the dream."
      },
      {
        "name": "cache_read_input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that were read from the prompt cache."
      },
      {
        "name": "cache_creation_input_tokens",
        "type": "integer (int32)",
        "description": "The dream's input tokens that were written to the prompt cache, for both the 5-minute and 1-hour cache durations."
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
    <td>Get a dream by ID to check its status, output memory store, and token usage.<br /><br />Archived dreams are returned too.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#track-progress) for how to poll a dream and what each status means.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-statuses[]"><code>statuses[]</code></a>, <a href="#parameter-created_at[gt]"><code>created_at[gt]</code></a>, <a href="#parameter-created_at[lt]"><code>created_at[lt]</code></a>, <a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td>List the dreams in the workspace, newest first.<br /><br />Archived dreams are left out unless `include_archived` is `true`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#list-dreams) for how to page through dreams.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-inputs"><code>inputs</code></a>, <a href="#parameter-model"><code>model</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td>Start an asynchronous job that uses past sessions to produce a reorganized version of a memory store and get back the dream to poll for the result.<br /><br />By default the dream writes its result to a new memory store and doesn't change the input memory store. The response has `status` set to `pending` and an empty `outputs` array. Poll the dream until `status` is `completed`, `failed`, or `canceled`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#create-a-dream) to learn more about creating dreams.</td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-dream_id"><code>dream_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td>Stop a `pending` or `running` dream.<br /><br />The response shows `status` as `canceled`, unless the dream reached `completed` or `failed` first. `usage` can keep changing after the response. Canceling a `canceled` dream returns it unchanged. Canceling a `completed` or `failed` dream returns a 400 error.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#cancel-a-dream) to learn more about canceling dreams.</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-dream_id"><code>dream_id</code></a></td>
    <td><a href="#parameter-anthropic-workspace-id"><code>anthropic-workspace-id</code></a></td>
    <td>Hide a `completed`, `failed`, or `canceled` dream from the default list of dreams.<br /><br />Archiving a `pending` or `running` dream returns a 400 error, so cancel it first. Archiving an archived dream returns it unchanged. An archived dream can still be fetched by ID. Archiving can't be undone.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#archive-a-dream) to learn more about archiving dreams.</td>
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
    <td>The ID of the dream to archive (`drm_...`).</td>
</tr>
<tr id="parameter-anthropic-workspace-id">
    <td><CopyableCode code="anthropic-workspace-id" /></td>
    <td><code>string</code></td>
    <td>Optional header to select the Workspace for this request. The value is a Workspace ID (for example, `wrkspc_011CZkZaBF1tNoB5wlCeusgy`).  Only needed for credentials that can act on more than one Workspace. A credential that belongs to a specific Workspace may omit it; if sent, it must match that Workspace. (example: wrkspc_011CZkZaBF1tNoB5wlCeusgy)</td>
</tr>
<tr id="parameter-created_at[gt]">
    <td><CopyableCode code="created_at[gt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return only dreams created after this time (exclusive), in RFC 3339.</td>
</tr>
<tr id="parameter-created_at[lt]">
    <td><CopyableCode code="created_at[lt]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return only dreams created before this time (exclusive), in RFC 3339.</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include archived dreams. Defaults to `false`.</td>
</tr>
<tr id="parameter-statuses[]">
    <td><CopyableCode code="statuses[]" /></td>
    <td><code>array</code></td>
    <td>Return only dreams that have one of these statuses.  Repeat the parameter to give more than one status. Leave it out to return dreams of every status.</td>
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

Get a dream by ID to check its status, output memory store, and token usage.<br /><br />Archived dreams are returned too.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#track-progress) for how to poll a dream and what each status means.

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

List the dreams in the workspace, newest first.<br /><br />Archived dreams are left out unless `include_archived` is `true`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#list-dreams) for how to page through dreams.

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

Start an asynchronous job that uses past sessions to produce a reorganized version of a memory store and get back the dream to poll for the result.<br /><br />By default the dream writes its result to a new memory store and doesn't change the input memory store. The response has `status` set to `pending` and an empty `outputs` array. Poll the dream until `status` is `completed`, `failed`, or `canceled`.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#create-a-dream) to learn more about creating dreams.

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
      description: |
        The memory store and sessions for the dream to read, as exactly one \`memory_store\` entry and exactly one \`sessions\` entry.
      value:
        - type: "{{ type }}"
          memory_store_id: "{{ memory_store_id }}"
          session_ids: "{{ session_ids }}"
    - name: model
      value: "{{ model }}"
      description: |
        The model that runs a dream, given as a model ID or as an object with \`id\` and \`speed\`.
        In the object form, \`speed\` can only be \`standard\`.
        The [limits table in the Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#limits) lists the supported models.
    - name: instructions
      value: "{{ instructions }}"
      description: |
        Guidance that steers how the dream reads the sessions and organizes the output memory store, from 1 to 4,096 characters.
        See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#steer-with-instructions) for what kinds of instructions work well.
    - name: output_behavior
      description: |
        Which memory store a dream writes its result to. Defaults to \`create_new\` when left out of a create request.
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

Stop a `pending` or `running` dream.<br /><br />The response shows `status` as `canceled`, unless the dream reached `completed` or `failed` first. `usage` can keep changing after the response. Canceling a `canceled` dream returns it unchanged. Canceling a `completed` or `failed` dream returns a 400 error.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#cancel-a-dream) to learn more about canceling dreams.

```sql
EXEC anthropic.dreams.dreams.cancel 
@dream_id='{{ dream_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
<TabItem value="archive">

Hide a `completed`, `failed`, or `canceled` dream from the default list of dreams.<br /><br />Archiving a `pending` or `running` dream returns a 400 error, so cancel it first. Archiving an archived dream returns it unchanged. An archived dream can still be fetched by ID. Archiving can't be undone.<br /><br />See the [Dreams guide](https://platform.claude.com/docs/en/managed-agents/dreams#archive-a-dream) to learn more about archiving dreams.

```sql
EXEC anthropic.dreams.dreams.archive 
@dream_id='{{ dream_id }}' --required, 
@anthropic-workspace-id='{{ anthropic-workspace-id }}'
;
```
</TabItem>
</Tabs>
