---
title: batches
hide_title: false
hide_table_of_contents: false
keywords:
  - batches
  - messages
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

Creates, updates, deletes, gets or lists a <code>batches</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="batches" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.messages.batches" /></td></tr>
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
    "description": "Unique object identifier.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch was archived and its results became unavailable."
  },
  {
    "name": "cancel_initiated_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which cancellation was initiated for the Message Batch. Specified only if cancellation was initiated."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch was created."
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which processing for the Message Batch ended. Specified only once processing ends.<br /><br />Processing ends when every request in a Message Batch has either succeeded, errored, canceled, or expired."
  },
  {
    "name": "expires_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch will expire and end processing, which is 24 hours after creation."
  },
  {
    "name": "processing_status",
    "type": "string",
    "description": "Processing status of the Message Batch. (in_progress, canceling, ended)"
  },
  {
    "name": "request_counts",
    "type": "object",
    "description": "Tallies requests within the Message Batch, categorized by their status.<br /><br />Requests start as `processing` and move to one of the other statuses only once processing of the entire batch ends. The sum of all values always matches the total number of requests in the batch.",
    "children": [
      {
        "name": "canceled",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have been canceled.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "errored",
        "type": "integer",
        "description": "Number of requests in the Message Batch that encountered an error.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "expired",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have expired.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "processing",
        "type": "integer",
        "description": "Number of requests in the Message Batch that are processing."
      },
      {
        "name": "succeeded",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have completed successfully.<br /><br />This is zero until processing of the entire Message Batch has ended."
      }
    ]
  },
  {
    "name": "results_url",
    "type": "string",
    "description": "URL to a `.jsonl` file containing the results of the Message Batch requests. Specified only once processing ends.<br /><br />Results in the file are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Message Batches, this is always `\"message_batch\"`. (message_batch)"
  }
]} />
</TabItem>
<TabItem value="list">

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique object identifier.<br /><br />The format and length of IDs may change over time."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch was archived and its results became unavailable."
  },
  {
    "name": "cancel_initiated_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which cancellation was initiated for the Message Batch. Specified only if cancellation was initiated."
  },
  {
    "name": "created_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch was created."
  },
  {
    "name": "ended_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which processing for the Message Batch ended. Specified only once processing ends.<br /><br />Processing ends when every request in a Message Batch has either succeeded, errored, canceled, or expired."
  },
  {
    "name": "expires_at",
    "type": "string (date-time)",
    "description": "RFC 3339 datetime string representing the time at which the Message Batch will expire and end processing, which is 24 hours after creation."
  },
  {
    "name": "processing_status",
    "type": "string",
    "description": "Processing status of the Message Batch. (in_progress, canceling, ended)"
  },
  {
    "name": "request_counts",
    "type": "object",
    "description": "Tallies requests within the Message Batch, categorized by their status.<br /><br />Requests start as `processing` and move to one of the other statuses only once processing of the entire batch ends. The sum of all values always matches the total number of requests in the batch.",
    "children": [
      {
        "name": "canceled",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have been canceled.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "errored",
        "type": "integer",
        "description": "Number of requests in the Message Batch that encountered an error.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "expired",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have expired.<br /><br />This is zero until processing of the entire Message Batch has ended."
      },
      {
        "name": "processing",
        "type": "integer",
        "description": "Number of requests in the Message Batch that are processing."
      },
      {
        "name": "succeeded",
        "type": "integer",
        "description": "Number of requests in the Message Batch that have completed successfully.<br /><br />This is zero until processing of the entire Message Batch has ended."
      }
    ]
  },
  {
    "name": "results_url",
    "type": "string",
    "description": "URL to a `.jsonl` file containing the results of the Message Batch requests. Specified only once processing ends.<br /><br />Results in the file are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests."
  },
  {
    "name": "type",
    "type": "string",
    "description": "Object type.<br /><br />For Message Batches, this is always `\"message_batch\"`. (message_batch)"
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
    <td><a href="#parameter-message_batch_id"><code>message_batch_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>This endpoint is idempotent and can be used to poll for Message Batch completion. To access the results of a Message Batch, make a request to the `results_url` field in the response.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-before_id"><code>before_id</code></a>, <a href="#parameter-after_id"><code>after_id</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>List all Message Batches within a Workspace. Most recently created batches are returned first.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-requests"><code>requests</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-anthropic-user-profile-id"><code>anthropic-user-profile-id</code></a></td>
    <td>Send a batch of Message creation requests.<br /><br />The Message Batches API can be used to process multiple Messages API requests at once. Once a Message Batch is created, it begins processing immediately. Batches can take up to 24 hours to complete.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-message_batch_id"><code>message_batch_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Delete a Message Batch.<br /><br />Message Batches can only be deleted once they've finished processing. If you'd like to delete an in-progress batch, you must first cancel it.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-message_batch_id"><code>message_batch_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a></td>
    <td>Batches may be canceled any time before processing ends. Once cancellation is initiated, the batch enters a `canceling` state, at which time the system may complete any in-progress, non-interruptible requests before finalizing cancellation.<br /><br />The number of canceled requests is specified in `request_counts`. To determine which requests were canceled, check the individual results within the batch. Note that cancellation may not result in any canceled requests if they were non-interruptible.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
</tr>
<tr>
    <td><a href="#results"><CopyableCode code="results" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-message_batch_id"><code>message_batch_id</code></a></td>
    <td><a href="#parameter-anthropic-version"><code>anthropic-version</code></a>, <a href="#parameter-x-api-key"><code>x-api-key</code></a></td>
    <td>Streams the results of a Message Batch as a `.jsonl` file.<br /><br />Each line in the file is a JSON object containing the result of a single request in the Message Batch. Results are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)</td>
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
<tr id="parameter-message_batch_id">
    <td><CopyableCode code="message_batch_id" /></td>
    <td><code>string</code></td>
    <td>ID of the Message Batch.</td>
</tr>
<tr id="parameter-after_id">
    <td><CopyableCode code="after_id" /></td>
    <td><code>string</code></td>
    <td>ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately after this object.</td>
</tr>
<tr id="parameter-anthropic-user-profile-id">
    <td><CopyableCode code="anthropic-user-profile-id" /></td>
    <td><code>string</code></td>
    <td>The user profile ID to attribute the requests in this batch to. Use when acting on behalf of a party other than your organization. Requires the `user-profiles` beta header. Applies to every request in the batch; an individual request whose `user_profile_id` body field conflicts with this header is errored.</td>
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

This endpoint is idempotent and can be used to poll for Message Batch completion. To access the results of a Message Batch, make a request to the `results_url` field in the response.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
SELECT
id,
archived_at,
cancel_initiated_at,
created_at,
ended_at,
expires_at,
processing_status,
request_counts,
results_url,
type
FROM anthropic.messages.batches
WHERE message_batch_id = '{{ message_batch_id }}' -- required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
<TabItem value="list">

List all Message Batches within a Workspace. Most recently created batches are returned first.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
SELECT
id,
archived_at,
cancel_initiated_at,
created_at,
ended_at,
expires_at,
processing_status,
request_counts,
results_url,
type
FROM anthropic.messages.batches
WHERE before_id = '{{ before_id }}'
AND after_id = '{{ after_id }}'
AND limit = '{{ limit }}'
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

Send a batch of Message creation requests.<br /><br />The Message Batches API can be used to process multiple Messages API requests at once. Once a Message Batch is created, it begins processing immediately. Batches can take up to 24 hours to complete.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
INSERT INTO anthropic.messages.batches (
requests,
anthropic-version,
anthropic-user-profile-id
)
SELECT 
'{{ requests }}' /* required */,
'{{ anthropic-version }}',
'{{ anthropic-user-profile-id }}'
RETURNING
id,
archived_at,
cancel_initiated_at,
created_at,
ended_at,
expires_at,
processing_status,
request_counts,
results_url,
type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: batches
  props:
    - name: requests
      description: |
        List of requests for prompt completion. Each is an individual request to create a Message.
      value:
        - custom_id: "{{ custom_id }}"
          params:
            model: "{{ model }}"
            messages:
              - content: "{{ content }}"
                role: "{{ role }}"
            cache_control: "{{ cache_control }}"
            container: "{{ container }}"
            inference_geo: "{{ inference_geo }}"
            max_tokens: {{ max_tokens }}
            metadata:
              user_id: "{{ user_id }}"
            output_config:
              effort: "{{ effort }}"
              format:
                schema: "{{ schema }}"
                type: "{{ type }}"
            service_tier: "{{ service_tier }}"
            stop_sequences:
              - "{{ stop_sequences }}"
            stream: {{ stream }}
            system: "{{ system }}"
            temperature: {{ temperature }}
            thinking:
              budget_tokens: {{ budget_tokens }}
              display: "{{ display }}"
              type: "{{ type }}"
            tool_choice:
              disable_parallel_tool_use: {{ disable_parallel_tool_use }}
              type: "{{ type }}"
              name: "{{ name }}"
            tools:
              - "{{ tools }}"
            top_k: {{ top_k }}
            top_p: {{ top_p }}
    - name: anthropic-version
      value: "{{ anthropic-version }}"
      description: The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).
      description: The version of the Claude API you want to use.  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).
    - name: anthropic-user-profile-id
      value: "{{ anthropic-user-profile-id }}"
      description: The user profile ID to attribute the requests in this batch to. Use when acting on behalf of a party other than your organization. Requires the \`user-profiles\` beta header. Applies to every request in the batch; an individual request whose \`user_profile_id\` body field conflicts with this header is errored.
      description: The user profile ID to attribute the requests in this batch to. Use when acting on behalf of a party other than your organization. Requires the \`user-profiles\` beta header. Applies to every request in the batch; an individual request whose \`user_profile_id\` body field conflicts with this header is errored.
`}</CodeBlock>

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

Delete a Message Batch.<br /><br />Message Batches can only be deleted once they've finished processing. If you'd like to delete an in-progress batch, you must first cancel it.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
DELETE FROM anthropic.messages.batches
WHERE message_batch_id = '{{ message_batch_id }}' --required
AND "x-api-key" = '{{ x-api-key }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'results', value: 'results' }
    ]}
>
<TabItem value="cancel">

Batches may be canceled any time before processing ends. Once cancellation is initiated, the batch enters a `canceling` state, at which time the system may complete any in-progress, non-interruptible requests before finalizing cancellation.<br /><br />The number of canceled requests is specified in `request_counts`. To determine which requests were canceled, check the individual results within the batch. Note that cancellation may not result in any canceled requests if they were non-interruptible.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
EXEC anthropic.messages.batches.cancel 
@message_batch_id='{{ message_batch_id }}' --required, 
@anthropic-version='{{ anthropic-version }}'
;
```
</TabItem>
<TabItem value="results">

Streams the results of a Message Batch as a `.jsonl` file.<br /><br />Each line in the file is a JSON object containing the result of a single request in the Message Batch. Results are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests.<br /><br />Learn more about the Message Batches API in our [user guide](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

```sql
EXEC anthropic.messages.batches.results 
@message_batch_id='{{ message_batch_id }}' --required, 
@anthropic-version='{{ anthropic-version }}', 
@x-api-key='{{ x-api-key }}'
;
```
</TabItem>
</Tabs>
