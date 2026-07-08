---
title: deployments
hide_title: false
hide_table_of_contents: false
keywords:
  - deployments
  - deployments
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

Creates, updates, deletes, gets or lists a <code>deployments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.deployments.deployments" /></td></tr>
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
    "description": "Unique identifier for this deployment."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name."
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": "ID of the `environment` where sessions run."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Reference to the agent this deployment runs, resolved to a concrete version.",
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
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "Time the deployment was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Time the deployment was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of what the deployment does."
  },
  {
    "name": "initial_events",
    "type": "array",
    "description": "Events sent to each session immediately after creation.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (user.message)"
      },
      {
        "name": "content",
        "type": "array",
        "description": "Array of content blocks for the user message.",
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
        "name": "description",
        "type": "string",
        "description": "What the agent should produce. This is the task specification."
      },
      {
        "name": "rubric",
        "type": "object",
        "description": "How to grade the outcome. Text or file reference.",
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
        "name": "max_iterations",
        "type": "integer (int32)",
        "description": "Eval→revision cycles before giving up. Default 3, max 20."
      }
    ]
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs."
  },
  {
    "name": "paused_reason",
    "type": "object",
    "description": "Why the deployment is paused. Non-null exactly when status is paused; null otherwise.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (manual)"
      },
      {
        "name": "error",
        "type": "object",
        "description": "The failed run's error.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (environment_archived_error)"
          }
        ]
      }
    ]
  },
  {
    "name": "resources",
    "type": "array",
    "description": "Resources attached to sessions created from this deployment. Echoes the input minus write-only credentials.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (github_repository)"
      },
      {
        "name": "url",
        "type": "string",
        "description": "Github URL of the repository"
      },
      {
        "name": "mount_path",
        "type": "string",
        "description": "Mount path in the container. Defaults to `/workspace/<repo-name>`."
      },
      {
        "name": "checkout",
        "type": "object",
        "description": "Branch or commit to check out. Defaults to the repository's default branch.",
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
        "name": "file_id",
        "type": "string",
        "description": "ID of a previously uploaded file."
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
      },
      {
        "name": "access",
        "type": "string",
        "description": "Access mode for the mounted store. Defaults to read_write. read_only mounts the store as a read-only filesystem. (read_write, read_only)"
      },
      {
        "name": "instructions",
        "type": "string",
        "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
      }
    ]
  },
  {
    "name": "schedule",
    "type": "object",
    "description": "Recurring cron schedule. Presence enables scheduled execution; null means manual-only. Includes computed timestamps (next fire times, last run) on the cron variant.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (cron)"
      },
      {
        "name": "expression",
        "type": "string",
        "description": "5-field POSIX cron expression: minute hour day-of-month month day-of-week (e.g., \"0 9 * * 1-5\" for weekdays at 9am). Day-of-week is 0-7 where 0 and 7 both mean Sunday. Extended cron syntax - seconds or year fields, and the special characters L, W, #, and ? - is not supported, nor are predefined shortcuts (@daily)."
      },
      {
        "name": "timezone",
        "type": "string",
        "description": "IANA timezone identifier (e.g., \"America/Los_Angeles\", \"UTC\")."
      },
      {
        "name": "last_run_at",
        "type": "string (date-time)",
        "description": "Time the most recent scheduled run actually started. Null until one completes; preserved after the deployment is archived. Manual runs do not update this."
      },
      {
        "name": "upcoming_runs_at",
        "type": "array",
        "description": "Up to 5 timestamps of upcoming cron occurrences. Non-empty for active and paused deployments (reflects what the schedule would do if unpaused); empty once the deployment is archived (`archived_at` set). Each fire is offset by a small per-schedule jitter, so a run will actually start at or shortly after its listed time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Computed status of the deployment: `active` or `paused`. Archived deployments report `active` with `archived_at` set. (active, paused)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (deployment)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "Time the deployment was last updated."
  },
  {
    "name": "vault_ids",
    "type": "array",
    "description": "Vault IDs supplying stored credentials for sessions created from this deployment."
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for this deployment."
  },
  {
    "name": "name",
    "type": "string",
    "description": "Human-readable name."
  },
  {
    "name": "environment_id",
    "type": "string",
    "description": "ID of the `environment` where sessions run."
  },
  {
    "name": "agent",
    "type": "object",
    "description": "Reference to the agent this deployment runs, resolved to a concrete version.",
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
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "Time the deployment was archived. Null if not archived."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "Time the deployment was created."
  },
  {
    "name": "description",
    "type": "string",
    "description": "Description of what the deployment does."
  },
  {
    "name": "initial_events",
    "type": "array",
    "description": "Events sent to each session immediately after creation.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (user.message)"
      },
      {
        "name": "content",
        "type": "array",
        "description": "Array of content blocks for the user message.",
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
        "name": "description",
        "type": "string",
        "description": "What the agent should produce. This is the task specification."
      },
      {
        "name": "rubric",
        "type": "object",
        "description": "How to grade the outcome. Text or file reference.",
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
        "name": "max_iterations",
        "type": "integer (int32)",
        "description": "Eval→revision cycles before giving up. Default 3, max 20."
      }
    ]
  },
  {
    "name": "metadata",
    "type": "object",
    "description": "Arbitrary key-value metadata. Maximum 16 pairs."
  },
  {
    "name": "paused_reason",
    "type": "object",
    "description": "Why the deployment is paused. Non-null exactly when status is paused; null otherwise.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (manual)"
      },
      {
        "name": "error",
        "type": "object",
        "description": "The failed run's error.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (environment_archived_error)"
          }
        ]
      }
    ]
  },
  {
    "name": "resources",
    "type": "array",
    "description": "Resources attached to sessions created from this deployment. Echoes the input minus write-only credentials.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (github_repository)"
      },
      {
        "name": "url",
        "type": "string",
        "description": "Github URL of the repository"
      },
      {
        "name": "mount_path",
        "type": "string",
        "description": "Mount path in the container. Defaults to `/workspace/<repo-name>`."
      },
      {
        "name": "checkout",
        "type": "object",
        "description": "Branch or commit to check out. Defaults to the repository's default branch.",
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
        "name": "file_id",
        "type": "string",
        "description": "ID of a previously uploaded file."
      },
      {
        "name": "memory_store_id",
        "type": "string",
        "description": "The memory store ID (memstore_...). Must belong to the caller's organization and workspace."
      },
      {
        "name": "access",
        "type": "string",
        "description": "Access mode for the mounted store. Defaults to read_write. read_only mounts the store as a read-only filesystem. (read_write, read_only)"
      },
      {
        "name": "instructions",
        "type": "string",
        "description": "Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars."
      }
    ]
  },
  {
    "name": "schedule",
    "type": "object",
    "description": "Recurring cron schedule. Presence enables scheduled execution; null means manual-only. Includes computed timestamps (next fire times, last run) on the cron variant.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (cron)"
      },
      {
        "name": "expression",
        "type": "string",
        "description": "5-field POSIX cron expression: minute hour day-of-month month day-of-week (e.g., \"0 9 * * 1-5\" for weekdays at 9am). Day-of-week is 0-7 where 0 and 7 both mean Sunday. Extended cron syntax - seconds or year fields, and the special characters L, W, #, and ? - is not supported, nor are predefined shortcuts (@daily)."
      },
      {
        "name": "timezone",
        "type": "string",
        "description": "IANA timezone identifier (e.g., \"America/Los_Angeles\", \"UTC\")."
      },
      {
        "name": "last_run_at",
        "type": "string (date-time)",
        "description": "Time the most recent scheduled run actually started. Null until one completes; preserved after the deployment is archived. Manual runs do not update this."
      },
      {
        "name": "upcoming_runs_at",
        "type": "array",
        "description": "Up to 5 timestamps of upcoming cron occurrences. Non-empty for active and paused deployments (reflects what the schedule would do if unpaused); empty once the deployment is archived (`archived_at` set). Each fire is offset by a small per-schedule jitter, so a run will actually start at or shortly after its listed time."
      }
    ]
  },
  {
    "name": "status",
    "type": "string",
    "description": "Computed status of the deployment: `active` or `paused`. Archived deployments report `active` with `archived_at` set. (active, paused)"
  },
  {
    "name": "type",
    "type": "string",
    "description": " (deployment)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "Time the deployment was last updated."
  },
  {
    "name": "vault_ids",
    "type": "array",
    "description": "Vault IDs supplying stored credentials for sessions created from this deployment."
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
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-x-api-key"><code>x-api-key</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-page"><code>page</code></a>, <a href="#parameter-agent_id"><code>agent_id</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-created_at[gte]"><code>created_at[gte]</code></a>, <a href="#parameter-created_at[lte]"><code>created_at[lte]</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-agent"><code>agent</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-initial_events"><code>initial_events</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#pause"><CopyableCode code="pause" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#unpause"><CopyableCode code="unpause" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-beta"><code>anthropic-beta</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#run"><CopyableCode code="run" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
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
<tr id="parameter-deployment_id">
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter deployment_id (example: depl_011CZkZcDH3vPqd7xnEfwTai)</td>
</tr>
<tr id="parameter-agent_id">
    <td><CopyableCode code="agent_id" /></td>
    <td><code>string</code></td>
    <td>Filter by agent ID.</td>
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
    <td>Return deployments created at or after this time (inclusive).</td>
</tr>
<tr id="parameter-created_at[lte]">
    <td><CopyableCode code="created_at[lte]" /></td>
    <td><code>string (date-time)</code></td>
    <td>Return deployments created at or before this time (inclusive).</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>When true, includes archived deployments. Default: false (exclude archived).</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>Maximum results per page. Default 20, maximum 100.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>string</code></td>
    <td>Opaque pagination cursor.</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Filter by status: active or paused. Omit for both. To include archived deployments, use include_archived instead; the two cannot be combined.</td>
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
environment_id,
agent,
archived_at,
created_at,
description,
initial_events,
metadata,
paused_reason,
resources,
schedule,
status,
type,
updated_at,
vault_ids
FROM anthropic.deployments.deployments
WHERE deployment_id = '{{ deployment_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
name,
environment_id,
agent,
archived_at,
created_at,
description,
initial_events,
metadata,
paused_reason,
resources,
schedule,
status,
type,
updated_at,
vault_ids
FROM anthropic.deployments.deployments
WHERE "x-api-key" = '{{ x-api-key }}'
AND limit = '{{ limit }}'
AND page = '{{ page }}'
AND agent_id = '{{ agent_id }}'
AND status = '{{ status }}'
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
INSERT INTO anthropic.deployments.deployments (
name,
description,
agent,
environment_id,
vault_ids,
initial_events,
resources,
metadata,
schedule,
anthropic-version,
anthropic-beta
)
SELECT 
'{{ name }}' /* required */,
'{{ description }}',
'{{ agent }}' /* required */,
'{{ environment_id }}' /* required */,
'{{ vault_ids }}',
'{{ initial_events }}' /* required */,
'{{ resources }}',
'{{ metadata }}',
'{{ schedule }}',
'{{ anthropic-version }}',
'{{ anthropic-beta }}'
RETURNING
id,
name,
environment_id,
agent,
archived_at,
created_at,
description,
initial_events,
metadata,
paused_reason,
resources,
schedule,
status,
type,
updated_at,
vault_ids
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: deployments
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Human-readable name for the deployment.
    - name: description
      value: "{{ description }}"
      description: |
        Description of what the deployment does.
    - name: agent
      value: "{{ agent }}"
      description: |
        Agent to deploy. Accepts the \`agent\` ID string, which pins the latest version, or an \`agent\` object with both id and version specified. The agent must exist and not be archived.
    - name: environment_id
      value: "{{ environment_id }}"
      description: |
        ID of the \`environment\` defining the container configuration for sessions created from this deployment.
    - name: vault_ids
      value:
        - "{{ vault_ids }}"
      description: |
        Vault IDs for stored credentials the agent can use during sessions created from this deployment. Maximum 50.
    - name: initial_events
      description: |
        Events to send to each session immediately after creation. At least 1, maximum 50.
      value:
        - type: "{{ type }}"
          content: "{{ content }}"
          description: "{{ description }}"
          rubric:
            type: "{{ type }}"
            file_id: "{{ file_id }}"
            content: "{{ content }}"
          max_iterations: {{ max_iterations }}
    - name: resources
      description: |
        Resources (e.g. repositories, files) to mount into each session's container. Maximum 500.
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
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.
    - name: schedule
      description: |
        Optional recurring cron schedule. When present, the deployment fires automatically. Both expression and timezone are required when schedule is set.
      value:
        type: "{{ type }}"
        expression: "{{ expression }}"
        timezone: "{{ timezone }}"
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
UPDATE anthropic.deployments.deployments
SET 
name = '{{ name }}',
description = '{{ description }}',
agent = '{{ agent }}',
environment_id = '{{ environment_id }}',
vault_ids = '{{ vault_ids }}',
initial_events = '{{ initial_events }}',
resources = '{{ resources }}',
metadata = '{{ metadata }}',
schedule = '{{ schedule }}'
WHERE 
deployment_id = '{{ deployment_id }}' --required
RETURNING
id,
name,
environment_id,
agent,
archived_at,
created_at,
description,
initial_events,
metadata,
paused_reason,
resources,
schedule,
status,
type,
updated_at,
vault_ids;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="archive"
    values={[
        { label: 'archive', value: 'archive' },
        { label: 'pause', value: 'pause' },
        { label: 'unpause', value: 'unpause' },
        { label: 'run', value: 'run' }
    ]}
>
<TabItem value="archive">

Successful response (OK)

```sql
EXEC anthropic.deployments.deployments.archive 
@deployment_id='{{ deployment_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
<TabItem value="pause">

Successful response (OK)

```sql
EXEC anthropic.deployments.deployments.pause 
@deployment_id='{{ deployment_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
<TabItem value="unpause">

Successful response (OK)

```sql
EXEC anthropic.deployments.deployments.unpause 
@deployment_id='{{ deployment_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
<TabItem value="run">

Successful response (OK)

```sql
EXEC anthropic.deployments.deployments.run 
@deployment_id='{{ deployment_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@anthropic-beta='{{ anthropic-beta }}'
;
```
</TabItem>
</Tabs>
