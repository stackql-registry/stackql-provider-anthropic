---
title: credentials
hide_title: false
hide_table_of_contents: false
keywords:
  - credentials
  - vaults
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

Creates, updates, deletes, gets or lists a <code>credentials</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="credentials" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="anthropic.vaults.credentials" /></td></tr>
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
    "description": "Unique identifier for the credential."
  },
  {
    "name": "vault_id",
    "type": "string",
    "description": "Identifier of the vault this credential belongs to."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "Human-readable name for the credential."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the credential was archived. Null if not archived."
  },
  {
    "name": "auth",
    "type": "object",
    "description": "Authentication configuration for this credential.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (mcp_oauth)"
      },
      {
        "name": "mcp_server_url",
        "type": "string",
        "description": "URL of the MCP server this credential authenticates against."
      },
      {
        "name": "expires_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "refresh",
        "type": "object",
        "description": "Refresh token configuration, if the credential supports token refresh.",
        "children": [
          {
            "name": "token_endpoint",
            "type": "string",
            "description": "Token endpoint URL used to refresh the access token."
          },
          {
            "name": "client_id",
            "type": "string",
            "description": "OAuth client ID."
          },
          {
            "name": "resource",
            "type": "string",
            "description": "OAuth resource indicator."
          },
          {
            "name": "scope",
            "type": "string",
            "description": "OAuth scope for the refresh request."
          },
          {
            "name": "token_endpoint_auth",
            "type": "object",
            "description": "Token endpoint requires no client authentication.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (none)"
              }
            ]
          }
        ]
      },
      {
        "name": "secret_name",
        "type": "string",
        "description": "Name of the environment variable."
      },
      {
        "name": "networking",
        "type": "object",
        "description": "Outbound hosts the secret value is substituted on.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (unrestricted)"
          },
          {
            "name": "allowed_hosts",
            "type": "array",
            "description": "Hostnames on which the secret will be substituted. An entry matches the request host exactly; a `*.`-prefixed entry matches any subdomain of the named domain but not the domain itself."
          }
        ]
      },
      {
        "name": "injection_location",
        "type": "object",
        "description": "Where in the outbound request the secret value is substituted.",
        "children": [
          {
            "name": "header",
            "type": "boolean",
            "description": "Whether the placeholder is substituted in request header values."
          },
          {
            "name": "body",
            "type": "boolean",
            "description": "Whether the placeholder is substituted in the request body."
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
    "description": "Arbitrary key-value metadata attached to the credential."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (vault_credential)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
  }
]} />
</TabItem>
<TabItem value="list">

Successful response (OK)

<SchemaTable fields={[
  {
    "name": "id",
    "type": "string",
    "description": "Unique identifier for the credential."
  },
  {
    "name": "vault_id",
    "type": "string",
    "description": "Identifier of the vault this credential belongs to."
  },
  {
    "name": "display_name",
    "type": "string",
    "description": "Human-readable name for the credential."
  },
  {
    "name": "archived_at",
    "type": "string (date-time)",
    "description": "When the credential was archived. Null if not archived."
  },
  {
    "name": "auth",
    "type": "object",
    "description": "Authentication configuration for this credential.",
    "children": [
      {
        "name": "type",
        "type": "string",
        "description": " (mcp_oauth)"
      },
      {
        "name": "mcp_server_url",
        "type": "string",
        "description": "URL of the MCP server this credential authenticates against."
      },
      {
        "name": "expires_at",
        "type": "string (date-time)",
        "description": "A timestamp in RFC 3339 format"
      },
      {
        "name": "refresh",
        "type": "object",
        "description": "Refresh token configuration, if the credential supports token refresh.",
        "children": [
          {
            "name": "token_endpoint",
            "type": "string",
            "description": "Token endpoint URL used to refresh the access token."
          },
          {
            "name": "client_id",
            "type": "string",
            "description": "OAuth client ID."
          },
          {
            "name": "resource",
            "type": "string",
            "description": "OAuth resource indicator."
          },
          {
            "name": "scope",
            "type": "string",
            "description": "OAuth scope for the refresh request."
          },
          {
            "name": "token_endpoint_auth",
            "type": "object",
            "description": "Token endpoint requires no client authentication.",
            "children": [
              {
                "name": "type",
                "type": "string",
                "description": " (none)"
              }
            ]
          }
        ]
      },
      {
        "name": "secret_name",
        "type": "string",
        "description": "Name of the environment variable."
      },
      {
        "name": "networking",
        "type": "object",
        "description": "Outbound hosts the secret value is substituted on.",
        "children": [
          {
            "name": "type",
            "type": "string",
            "description": " (unrestricted)"
          },
          {
            "name": "allowed_hosts",
            "type": "array",
            "description": "Hostnames on which the secret will be substituted. An entry matches the request host exactly; a `*.`-prefixed entry matches any subdomain of the named domain but not the domain itself."
          }
        ]
      },
      {
        "name": "injection_location",
        "type": "object",
        "description": "Where in the outbound request the secret value is substituted.",
        "children": [
          {
            "name": "header",
            "type": "boolean",
            "description": "Whether the placeholder is substituted in request header values."
          },
          {
            "name": "body",
            "type": "boolean",
            "description": "Whether the placeholder is substituted in the request body."
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
    "description": "Arbitrary key-value metadata attached to the credential."
  },
  {
    "name": "type",
    "type": "string",
    "description": " (vault_credential)"
  },
  {
    "name": "updated_at",
    "type": "string (date-time)",
    "description": "A timestamp in RFC 3339 format"
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
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-credential_id"><code>credential_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a></td>
    <td><a href="#parameter-include_archived"><code>include_archived</code></a></td>
    <td></td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-auth"><code>auth</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-credential_id"><code>credential_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-credential_id"><code>credential_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-credential_id"><code>credential_id</code></a></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="#mcp_oauth_validate"><CopyableCode code="mcp_oauth_validate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-vault_id"><code>vault_id</code></a>, <a href="#parameter-credential_id"><code>credential_id</code></a></td>
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
<tr id="parameter-credential_id">
    <td><CopyableCode code="credential_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter credential_id (example: vcrd_011CZkZEMt8gZan2iYOQfSkw)</td>
</tr>
<tr id="parameter-vault_id">
    <td><CopyableCode code="vault_id" /></td>
    <td><code>string</code></td>
    <td>Path parameter vault_id (example: vlt_011CZkZDLs7fYzm1hXNPeRjv)</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include archived credentials in the results.</td>
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
vault_id,
display_name,
archived_at,
auth,
created_at,
metadata,
type,
updated_at
FROM anthropic.vaults.credentials
WHERE vault_id = '{{ vault_id }}' -- required
AND credential_id = '{{ credential_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Successful response (OK)

```sql
SELECT
id,
vault_id,
display_name,
archived_at,
auth,
created_at,
metadata,
type,
updated_at
FROM anthropic.vaults.credentials
WHERE vault_id = '{{ vault_id }}' -- required
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
INSERT INTO anthropic.vaults.credentials (
auth,
display_name,
metadata,
vault_id
)
SELECT 
'{{ auth }}' /* required */,
'{{ display_name }}',
'{{ metadata }}',
'{{ vault_id }}'
RETURNING
id,
vault_id,
display_name,
archived_at,
auth,
created_at,
metadata,
type,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: credentials
  props:
    - name: vault_id
      value: "{{ vault_id }}"
      description: Required parameter for the credentials resource.
    - name: auth
      description: |
        Authentication configuration for the credential.
      value:
        type: "{{ type }}"
        mcp_server_url: "{{ mcp_server_url }}"
        access_token: "{{ access_token }}"
        expires_at: "{{ expires_at }}"
        refresh:
          refresh_token: "{{ refresh_token }}"
          token_endpoint: "{{ token_endpoint }}"
          client_id: "{{ client_id }}"
          scope: "{{ scope }}"
          resource: "{{ resource }}"
          token_endpoint_auth:
            type: "{{ type }}"
            client_secret: "{{ client_secret }}"
        token: "{{ token }}"
        secret_name: "{{ secret_name }}"
        secret_value: "{{ secret_value }}"
        networking:
          type: "{{ type }}"
          allowed_hosts:
            - "{{ allowed_hosts }}"
        injection_location:
          header: {{ header }}
          body: {{ body }}
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Human-readable name for the credential. Up to 255 characters.
    - name: metadata
      value: "{{ metadata }}"
      description: |
        Arbitrary key-value metadata to attach to the credential. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.
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
UPDATE anthropic.vaults.credentials
SET 
display_name = '{{ display_name }}',
metadata = '{{ metadata }}',
auth = '{{ auth }}'
WHERE 
vault_id = '{{ vault_id }}' --required
WHERE credential_id = '{{ credential_id }}' --required
RETURNING
id,
vault_id,
display_name,
archived_at,
auth,
created_at,
metadata,
type,
updated_at;
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
DELETE FROM anthropic.vaults.credentials
WHERE vault_id = '{{ vault_id }}' --required
AND credential_id = '{{ credential_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="archive"
    values={[
        { label: 'archive', value: 'archive' },
        { label: 'mcp_oauth_validate', value: 'mcp_oauth_validate' }
    ]}
>
<TabItem value="archive">

Successful response (OK)

```sql
EXEC anthropic.vaults.credentials.archive 
@vault_id='{{ vault_id }}' --required, 
@credential_id='{{ credential_id }}' --required
;
```
</TabItem>
<TabItem value="mcp_oauth_validate">

Successful response (OK)

```sql
EXEC anthropic.vaults.credentials.mcp_oauth_validate 
@vault_id='{{ vault_id }}' --required, 
@credential_id='{{ credential_id }}' --required
;
```
</TabItem>
</Tabs>
