---
title: vw_model_capabilities
hide_title: false
hide_table_of_contents: false
keywords:
  - vw_model_capabilities
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

Creates, updates, deletes, gets or lists a <code>vw_model_capabilities</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="vw_model_capabilities" /></td></tr>
<tr><td><b>Type</b></td><td>View</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.models.vw_model_capabilities" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by this view:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Unique model identifier, e.g. `claude-sonnet-5`.</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Human-readable name of the model.</td>
</tr>
<tr>
    <td><CopyableCode code="batch" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports the Message Batches API.</td>
</tr>
<tr>
    <td><CopyableCode code="citations" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports citations.</td>
</tr>
<tr>
    <td><CopyableCode code="code_execution" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports the code execution tool.</td>
</tr>
<tr>
    <td><CopyableCode code="context_management" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports context management.</td>
</tr>
<tr>
    <td><CopyableCode code="effort" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports the effort parameter.</td>
</tr>
<tr>
    <td><CopyableCode code="xhigh" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the `xhigh` effort tier is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="high" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the `high` effort tier is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="max" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the `max` effort tier is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="medium" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the `medium` effort tier is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="low" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the `low` effort tier is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="image_input" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model accepts image input.</td>
</tr>
<tr>
    <td><CopyableCode code="pdf_input" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model accepts PDF input.</td>
</tr>
<tr>
    <td><CopyableCode code="structured_outputs" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports structured outputs.</td>
</tr>
<tr>
    <td><CopyableCode code="thinking" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the model supports extended thinking.</td>
</tr>
<tr>
    <td><CopyableCode code="adaptive" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether adaptive thinking is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="enabled" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether manually-enabled thinking is supported.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><CopyableCode code="string" /></td>
    <td>RFC 3339 timestamp when the model was released.</td>
</tr>
<tr>
    <td><CopyableCode code="max_input_tokens" /></td>
    <td><CopyableCode code="integer" /></td>
    <td>Maximum number of input tokens accepted by the model.</td>
</tr>
<tr>
    <td><CopyableCode code="max_tokens" /></td>
    <td><CopyableCode code="integer" /></td>
    <td>Maximum number of output tokens the model can generate.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Object type; always `model`.</td>
</tr>
</tbody>
</table>

## `SELECT` Examples

```sql
SELECT
  id,
  display_name,
  batch,
  citations,
  code_execution,
  context_management,
  effort,
  xhigh,
  high,
  max,
  medium,
  low,
  image_input,
  pdf_input,
  structured_outputs,
  thinking,
  adaptive,
  enabled,
  created_at,
  max_input_tokens,
  max_tokens,
  type
FROM anthropic.models.vw_model_capabilities;
```

## SQL Definition

<Tabs
defaultValue="Sqlite3"
values={[
{ label: 'Sqlite3', value: 'Sqlite3' },
{ label: 'Postgres', value: 'Postgres' }
]}
>
<TabItem value="Sqlite3">

```sql
SELECT
  id,
  display_name,
  JSON_EXTRACT(capabilities, '$.batch.supported') AS batch,
  JSON_EXTRACT(capabilities, '$.citations.supported') AS citations,
  JSON_EXTRACT(capabilities, '$.code_execution.supported') AS code_execution,
  JSON_EXTRACT(capabilities, '$.context_management.supported') AS context_management,
  JSON_EXTRACT(capabilities, '$.effort.supported') AS effort,
  JSON_EXTRACT(capabilities, '$.effort.xhigh.supported') AS xhigh,
  JSON_EXTRACT(capabilities, '$.effort.high.supported') AS high,
  JSON_EXTRACT(capabilities, '$.effort.max.supported') AS max,
  JSON_EXTRACT(capabilities, '$.effort.medium.supported') AS medium,
  JSON_EXTRACT(capabilities, '$.effort.low.supported') AS low,
  JSON_EXTRACT(capabilities, '$.image_input.supported') AS image_input,
  JSON_EXTRACT(capabilities, '$.pdf_input.supported') AS pdf_input,
  JSON_EXTRACT(capabilities, '$.structured_outputs.supported') AS structured_outputs,
  JSON_EXTRACT(capabilities, '$.thinking.supported') AS thinking,
  JSON_EXTRACT(capabilities, '$.thinking.types.adaptive.supported') AS adaptive,
  JSON_EXTRACT(capabilities, '$.thinking.types.enabled.supported') AS enabled,
  created_at,
  max_input_tokens,
  max_tokens,
  type
FROM anthropic.models.models
```

</TabItem>
<TabItem value="Postgres">

```sql
SELECT
  id,
  display_name,
  json_extract_path_text(capabilities::json, 'batch', 'supported') AS batch,
  json_extract_path_text(capabilities::json, 'citations', 'supported') AS citations,
  json_extract_path_text(capabilities::json, 'code_execution', 'supported') AS code_execution,
  json_extract_path_text(capabilities::json, 'context_management', 'supported') AS context_management,
  json_extract_path_text(capabilities::json, 'effort', 'supported') AS effort,
  json_extract_path_text(capabilities::json, 'effort', 'xhigh', 'supported') AS xhigh,
  json_extract_path_text(capabilities::json, 'effort', 'high', 'supported') AS high,
  json_extract_path_text(capabilities::json, 'effort', 'max', 'supported') AS max,
  json_extract_path_text(capabilities::json, 'effort', 'medium', 'supported') AS medium,
  json_extract_path_text(capabilities::json, 'effort', 'low', 'supported') AS low,
  json_extract_path_text(capabilities::json, 'image_input', 'supported') AS image_input,
  json_extract_path_text(capabilities::json, 'pdf_input', 'supported') AS pdf_input,
  json_extract_path_text(capabilities::json, 'structured_outputs', 'supported') AS structured_outputs,
  json_extract_path_text(capabilities::json, 'thinking', 'supported') AS thinking,
  json_extract_path_text(capabilities::json, 'thinking', 'types', 'adaptive', 'supported') AS adaptive,
  json_extract_path_text(capabilities::json, 'thinking', 'types', 'enabled', 'supported') AS enabled,
  created_at,
  max_input_tokens,
  max_tokens,
  type
FROM anthropic.models.models
```

</TabItem>
</Tabs>
