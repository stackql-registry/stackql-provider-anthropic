# Project rules — StackQL Anthropic provider factory

This repo masters TWO StackQL providers from one pipeline ("the factory"):

| Provider | Surface | Auth env var | Key type |
|---|---|---|---|
| `anthropic` | User/inference API (`/v1/messages`, models, batches, files, skills, agents, sessions, memory stores, dreams, vaults, ...) | `ANTHROPIC_API_KEY` | `sk-ant-api...` (workspace-scoped) |
| `anthropic_admin` | Admin API (`/v1/organizations/*`: users, invites, workspaces, api_keys, usage/cost reports, rate limits, Claude Code analytics) | `ANTHROPIC_ADMIN_KEY` | `sk-ant-admin01-...` (org-scoped, admin-role-created) |

The two key types are disjoint (neither can call the other's endpoints) but the wire auth
structure is identical: `x-api-key` + `anthropic-version` headers.

Default branch: `main` (this is a PLAIN repo, not a fork — the `stackql-provider`
default-branch convention applies only to forked SDK repos). Rules marked
**(verified)** were empirically confirmed on the wire against stackql v0.10.542 during a
prior build and re-confirmed against v0.11.669 during the 2026-09 refresh — do not
re-litigate them. `NOTES.md` carries the dated findings of each refresh; `Makefile`
is the entry point (`make help`).

## Prior-art audit (do not redo)

- Anthropic's Python and TypeScript SDKs are Stainless-generated **from the same OpenAPI
  spec** and are in lockstep (116 configured endpoints each at audit time). Do not derive
  anything from SDK source code — SDK parameter names can be ALIASES of wire names
  (e.g. SDK `created_at_gte` is wire `created_at[gte]`). **The spec is canonical.**
- The spec ships INSIDE the SDK repo: `anthropics/anthropic-sdk-python` →
  `scripts/mock-spec.json.gz` (gzipped OpenAPI 3.1.0 JSON; beta paths pre-baked as
  `?beta=true` path keys). Until 2026-09-03 (upstream commit `f9b0cf2`, "bundle the mock
  server spec and update dev tooling") `.stats.yml` carried `openapi_spec_url` /
  `openapi_spec_hash` pointing at a Stainless-hosted YAML; those fields are gone from the
  Python, TypeScript, Go and Java SDK repos alike and `.stats.yml` now holds only
  `configured_endpoints`. The pin is the sha256 of the DECOMPRESSED JSON (the gzip bytes
  embed a timestamp). Vendored snapshot 2026-09-15: 244 operations / 165 paths
  (audit-time 2026-07: 126 / 85), 1554 `{type: null}` members, 642 `const`.
- Spec ops (244) = SDK-configured (201) + 10 `/v1/tunnels` ops (excluded from both SDKs;
  tunnels are managed via `workspace:manage_tunnels` OAuth, not API keys → we exclude too)
  + the `?beta=true` twins that the SDKs collapse onto GA resources + `/v1/complete`.
- The Admin API has been IN the spec since 2026-09 (100 ops under `/v1/organizations/*`,
  all beta-keyed) but remains in no SDK client surface. The `anthropic_admin` provider is
  still docs-driven (hand-authored transcriptions of the platform reference pages, every
  page serves clean markdown at its `.md` URL); the spec's admin ops are excluded from
  `anthropic` by group in `factory/exclusions.yaml` (see Taxonomies).

## The factory pipeline

### `anthropic` (spec-driven, pattern 1 with custom passes)

```
locate    fetch anthropics/anthropic-sdk-python scripts/mock-spec.json.gz (+ .stats.yml for
          configured_endpoints), gunzip, sha256 the JSON; compare with
          factory/spec-snapshot.json (bundled_spec_sha256). Exit 3 on drift = guard 5;
          `--pin` re-records the snapshot (make refresh-spec)
download  same fetch, verified against the pin (fails without writing on mismatch), written
          as YAML (js-yaml) to stackql_anthropic_provider/provider-dev/downloaded/ (committed)
pre-pass  custom script:
            - downlevel OpenAPI 3.1 → 3.0 constructs (type arrays / null members) as needed
            - inject `anthropic-version` header param: required:false, default '2023-06-01'
            - stamp per-endpoint `anthropic-beta` defaults from the beta-flag table (below);
              prefixes under beta-flags.yaml `no_default` keep the header optional, no default
            - drop excluded ops (factory/exclusions.yaml, 136 ops in 9 groups)
split     monolithic spec → per-service specs using the path→service map (taxonomy below;
          the spec has no tags)
normalize @stackql/provider-utils `normalize` (anyOf/oneOf→allOf rewrite + merge; opaque
          objects → string/JSON-blob columns). Shallow by design — nested unions belong
          inside JSON columns. Then factory/scrub-unions.mjs (residual unions, additionalProperties).
analyze   @stackql/provider-utils mappings → `all_services.csv` (REVIEWED, committed,
          append-only: analyze appends a derived row per NEW op, keyed filename::operationId)
csv-review factory/csv-review.mjs applies the human review of those derived rows as RULES
          (keyed filename::path::verb, one block per refresh); `--check` (make check-mappings,
          CI) fails on an unreviewed or drifted row. This is where resource/method/verb
          surgery lives — see few-shots. The 2026-07 bootstrap review is csv-review-bootstrap.mjs.
generate  provider tree → provider-dev/openapi/src/anthropic/v00.00.00000/ (servers and
          provider config come from provider-dev/config/{servers,provider_config}.json —
          provider-utils 0.7.9 takes JSON|FILE and inline JSON does not survive cmd.exe quoting)
post-pass custom script:
            - `requestBodyTranslate: {algorithm: naive}` + `request.mediaType` on every
              body-bearing method
            - `objectKey: $.data` on list envelopes
            - pagination config on cursor-style lists ONLY (policy below)
guards    CI hard-fails (below)
```

### `anthropic_admin` (docs-driven)

Hand-authored per-service specs in `stackql_anthropic_admin_provider/provider-dev/source/`
(transcribed from the reference pages listed below), entering the SAME chain at
normalize → analyze → generate → post-pass. ~24 operations; stable surface.

## Spike findings (Phase 0, 2026-07-08, spec hash d272f069e15d096063103c857fb8e2a7)

Messages service walked end-to-end (locate → download → pre-pass → split → normalize →
scrub → analyze → CSV review → generate → post-pass → stackql v0.10.542 load →
meta routes → mock SELECTs). All findings empirical:

- **(a) 3.1 constructs**: the spec has NO `type: [...]` arrays; the 3.1-isms are 478
  `{type: 'null'}` anyOf/oneOf members, 476 `const`, 23 numeric
  exclusiveMinimum/Maximum. `factory/pre-pass.mjs` downlevels all three (null members
  stripped + `nullable: true`, const→enum, exclusive→min/max) and stamps
  `openapi: 3.0.3`; the stackql loader accepts the result cleanly.
- **(b) Message-class schemas ARE SQL-shaped** after shallow normalize: `Message`
  projects id/type/role/content(array→JSON)/model/stop_reason/…/usage(object→JSON);
  `MessageTokensCount` projects `input_tokens`. POST-as-SELECT verified on a mock:
  WHERE keys pass into the JSON body via naive translate (`messages` string fans out
  to a real JSON array), the Message row comes back as a result set.
- **normalize is NOT sufficient for guard 4**: it leaves nested unions (48 oneOf in
  messages alone) and ~700 `additionalProperties` across services.
  `factory/scrub-unions.mjs` (new pipeline step, runs after normalize) collapses
  residual nested unions to opaque JSON-blob schemas and deletes every
  `additionalProperties` — all 12 services then scan clean.
- **Pagination classification** (from the spec, mechanical): 19 cursor lists
  (`page` query param + `$.next_page` in response — ALL beta lists) get pagination
  config; 3 after_id lists (models, GA batches, files) get none. `factory/post-pass.mjs`
  detects the cursor pattern structurally, no hand list.
- **Wire quirk**: stackql appends a bare `?` to request URLs when no query params are
  supplied (`POST /v1/messages?`). Harmless on real servers; mocks must parse the URL
  rather than string-match it.
- provider-utils needs `@jsr:registry=https://npm.jsr.io` in `.npmrc`
  (dependency `@jsr/stackql__deno-openapi-dereferencer`). Pinned `^0.7.9` since 2026-09
  (with pgwire-lite `^1.0.2`): generate output for the admin provider was byte-identical
  across 0.7.6 → 0.7.9; the docgen patch (`factory/patch-provider-utils.mjs`) still applies.
- split's "Operations processed" log undercounts (prints 100, emits all 104 ops);
  count ops in the split output, not from the log.
- **stackql v0.10.542 EXEC panic (upstream bug, worked around)**: EXEC prepare
  SIGSEGVs (`wrappedSchema.GetType` on a nil inner schema, via
  `drm.GenerateSelectDML`) whenever the exec method's resolved response schema has NO
  array-typed property (MessageBatch, Workspace, BetaEnrollmentUrl, ...; schemas WITH an
  array property — Agent.tools, SendSessionEvents.data — are fine). Bare-scalar
  responses (binary downloads, `type: string`) fail differently:
  "no schema found for method", no dispatch. BOTH are fixed by stamping
  `response.schema_override` → a synthetic `StackqlExecResult` envelope (object with an
  array property) on exec-only methods matching either shape; `factory/post-pass.mjs`
  step 3 does this mechanically (18 methods in `anthropic`, 1 in `anthropic_admin`).
  All 23 anthropic EXEC methods + admin archive dispatch-verified. Report upstream.
- EXEC invocation syntax: multiple params need commas —
  `EXEC t.r.m @a = 'x', @b = 'y'` (space-separated @params is a parser error).

## Output rules (both providers)

### 1. Auth — `type: custom`, NOT `api_key` **(verified)**

```yaml
config:
  auth:
    type: custom
    location: header
    name: x-api-key
    credentialsenvvar: ANTHROPIC_API_KEY   # ANTHROPIC_ADMIN_KEY for anthropic_admin
```

`type: api_key` puts `api_key <key>` in the Authorization header regardless of
location/name. Only `type: custom` sends `x-api-key`.

### 2. Header defaults are auto-injected **(verified)**

Stackql injects an optional (`required: false`) HEADER param's `schema.default` into the
request when not supplied in SQL; query-param defaults are NOT injected; a
`required: true` header param must be satisfied in every WHERE clause (the original
provider's worst UX wart — never regress to it). Hence: `anthropic-version` optional with
default `'2023-06-01'` on every op; per-endpoint `anthropic-beta` optional with the flag
default on beta ops.

### 3. Beta endpoints — `?beta=true` baked into path keys **(verified)**

The spec already models beta paths as `/v1/agents?beta=true`; stackql sends the path key
verbatim on the wire. Keep them; do not model `beta` as a query parameter.

### 4. Beta-flag defaults table

The spec declares the `anthropic-beta` header but NOT the per-endpoint flag constants
(that's Stainless config). Maintain a small checked-in table
(`factory/beta-flags.yaml`), extracted at build time from the published PyPI `anthropic`
package (`pip download anthropic` → grep resource modules for
`extra_headers = {"anthropic-beta": "<flag>"`). **Verified against anthropic==1.5.0
(2026-09-15)** (0.116.0 on 2026-07-08 before that). Actual table (checked into
`factory/beta-flags.yaml`): `managed-agents-2026-04-01`
(agents/deployments/deployment_runs/environments/sessions/vaults),
`agent-memory-2026-07-22` (memory_stores), `user-profiles-2026-08-18` (user_profiles,
was `-2026-03-24`), `dreaming-2026-04-21` (dreams). Files and skills are GA in the SDK
since 1.x (top-level resources, no flag) — the provider maps the GA `/v1/files` and
`/v1/skills` paths and excludes their beta twins; the SDK's beta files/skills modules send
no default flag any more, so the one surviving beta-only op (skill version content
download) sits under `no_default` (header optional, no default; live-verified: the
endpoint routes without a flag, and with the stale `skills-2025-10-02` flag it takes a
different, older code path). Tunnels carry `mcp-tunnels-2026-06-22` but stay excluded.

### 5. No polymorphism; flat SQL-result-set rows

Final specs contain no anyOf/oneOf/allOf/additionalProperties. One level of named
properties; deeper structures are JSON columns. `normalize` does the heavy lifting;
the guards (below) enforce the result.

### 6. Pagination — two schemes, two policies **(verified)**

- Cursor lists (`page` request param, `$.next_page` in response, nulls out on last page):
  stamp `config.pagination: {requestToken: {key: page, location: query}, responseToken:
  {key: $.next_page, location: body}}`. Auto-pagination wire-verified (multi-page walk).
- `after_id`/`before_id` + `has_more`/`last_id` lists (models, GA batches, files, and ALL
  admin entity lists): NO pagination config — `last_id` stays populated on the final page
  (infinite-loop risk). Keep cursor params for manual paging (`after_id`/`before_id`
  remain documented; `page` and `limit` do not — see rule 6a).

### 6a. LIMIT pushdown + paging-param suppression **(verified 2026-07-09)**

stackql supports query-param pushdown (`internal/stackql/pushdown` in core, translation
in any-sdk `ApplyPushdown`; in the v0.10.542 binary lineage). The neutral intent covers
projection/filter/order-by/limit/offset/count, but only `top` (LIMIT) is dialect-neutral
— filter/order-by rendering is OData-only, and select (projection) needs a
`supportedColumns` list; `skip`/`count` have no matching Anthropic API primitives. So:
every method with a `limit` query param gets `config.queryParamPushdown: {top:
{paramName: limit, maxValue: <param schema maximum, when declared>}}` (post-pass step 4,
mechanical). Wire-verified on a mock: `SELECT ... LIMIT 2` → `?limit=2`; no LIMIT → no
param; client-side LIMIT stays authoritative so this is purely a fetch optimisation.
Live-verified on models (after_id list) and skills (cursor list with pagination config).
API paging primitives are then SUPPRESSED from the user docs by scrub-docs, derived from
the stamped configs (not hardcoded): pagination `requestToken` keys in query location
(`page` — auto-pagination owns it) and pushdown `top.paramName` (`limit` — SQL LIMIT
owns it). Users see LIMIT and auto-pagination, not the wire params.

### 7. Request bodies — naive translator **(verified)**

Every body-bearing method: `request.mediaType: application/json` + `config:
{requestBodyTranslate: {algorithm: naive}}`. SQL keys pass straight into the JSON body,
required body fields surface WITHOUT `data__` prefixes, and JSON-typed values fan out
(`messages = '[{"role":"user",...}]'` arrives as a real array — works in SELECT WHERE,
INSERT, UPDATE SET).

### 8. SQL-verb mapping

`create→INSERT`, `retrieve→get/SELECT`, `list→SELECT`, `update→UPDATE`, `delete→DELETE`;
lifecycle/rpc ops (`archive`, `cancel`, `pause`, `unpause`, `run`, `redact`, `ack`,
`heartbeat`, `poll`, `stop`, `send`, `add`, `mcp_oauth_validate`,
`create_enrollment_url`) → EXEC. Exceptions: inference ops (`messages` create,
token counting) → SELECT (the result IS a result set); ALL `multipart/form-data`
POSTs → EXEC (temporary policy 2026-07-09 until there is a strategy for multipart:
`files.upload`, `skills.create`, `skills.versions.create` — stackql v0.10.542
rejects multipart dispatch with "media type not supported", so INSERT-mapping them
just documents queries that can't run); JSONL `batches` results → EXEC. (Legacy
`complete` was SELECT until the endpoint was hard-deprecated server-side and
dropped — see Taxonomies.) Caveat (2026-09-15, stackql v0.11.669): `SHOW METHODS`
reports a `create`-named method that is in NO sqlVerbs list as `INSERT` (name-based
inference; v0.10.542 said `EXEC`) — the documents still pin `skills.create` and
`skills.versions.create` as exec-only (`insert: []`), the offline validation asserts the
document and accepts either spelling from `SHOW METHODS`.

### 9. ONE select shape per resource — split divergent shapes into separate resources

Stackql resolves a resource's table columns from its select methods; methods with
different response schemas must NOT share a resource. Enforced by a build guard.
See few-shots below.

### 10. Reserved-word and grammar check

Every service/resource/method name must survive
`SHOW METHODS IN <provider>.<service>.<resource>` in stackql's SQL parser.
Known trap: `work` (COMMIT WORK) → renamed `work_items`.

### 11. YAML 1.1 booleans **(verified)**

Stackql's Go YAML parser is YAML 1.1 — quote `y/yes/no/on/off/...` when they appear as
strings/keys (`YAML.stringify(..., {version: '1.1'})` in Node; custom str representer
in Python).

### 12. MDX-safe descriptions

Single-line; HTML stripped; bare `<placeholders>` and `{braces}` backticked. Website
runs sanitize + scrub passes; scrub removes the auto-injected header params from
generated SQL samples and backtick-quotes hyphenated identifiers.

## Few-shots for the mappings review (`all_services.csv`)

The CSV follows the provider-utils analyze contract
(`filename,path,operationId,...,stackql_resource_name,stackql_method_name,stackql_verb,
stackql_object_key,op_description`), keyed `filename::operationId`, append-only after
first review. Use REAL operationIds from the spec (e.g. `messages_post`,
`complete_post`); the ones below illustrate the decisions:

**Few-shot 1 — divergent select shapes → separate resources.** `POST /v1/messages`
returns a `Message` row (id, model, role, content, stop_reason, usage...);
`POST /v1/messages/count_tokens` returns `{input_tokens}`. Same noun, different shapes →
two resources:

```csv
messages.yaml,/v1/messages,messages_post,create,post,#/components/schemas/Message,,,messages,create,select,,Send a structured list of input messages...
messages.yaml,/v1/messages/count_tokens,messages_count_tokens_post,count_tokens,post,#/components/schemas/MessageTokensCount,,,token_counts,count_tokens,select,,Count the number of tokens in a Message...
```

**Few-shot 2 — reserved SQL word → rename.** `/v1/environments/{id}/work...` ops map to
resource `work_items`, never `work`:

```csv
environments.yaml,/v1/environments/{environment_id}/work?beta=true,...,list,get,...,work_items,list,select,$.data,...
```

**Few-shot 3 — required-param signature clash → relocate, don't demote.** `work/stats`
(GET, requires `environment_id`) clashes with `work_items.list` (same signature) in the
select bucket. Relocate to its own selectable resource instead of losing it to EXEC:

```csv
environments.yaml,/v1/environments/{environment_id}/work/stats?beta=true,...,get,get,...,work_stats,get,select,,...
```

**Few-shot 4 — lifecycle and non-SQL payloads → exec.**

```csv
agents.yaml,/v1/agents/{agent_id}/archive?beta=true,...,archive,post,...,agents,archive,exec,,Archive Agent
files.yaml,/v1/files?beta=true,...,upload,post,...,files,upload,exec,,Upload File (multipart - not SQL-expressible)
messages.yaml,/v1/messages/batches/{message_batch_id}/results,...,results,get,...,batches,results,exec,,JSONL stream of batch results
```

**Few-shot 5 — trust wire names, not SDK names.** The spec's query params
`created_at[gte]` / `created_at[lte]` are correct; the SDK's `created_at_gte` is a
client-side alias. Emit the bracketed wire names (backtick-quoted in SQL samples).

## Taxonomies (agreed — changes need explicit confirmation)

### `anthropic` — 12 services, 27 resources (+1 view), 108 methods

messages (messages, token_counts, batches) · models (models, view
vw_model_capabilities) · agents (agents, versions) · deployments (deployments,
deployment_runs) · environments (environments, work_items, work_stats) · files (files) ·
memory_stores (memory_stores, memories, memory_versions) · sessions (sessions, events,
resources, threads, thread_events) · skills (skills, versions) · user_profiles
(user_profiles) · vaults (vaults, credentials) · dreams (dreams).

Added 2026-09-15 (spec refresh, see NOTES.md): the `dreams` service (research-preview
memory-consolidation jobs, `dreaming-2026-04-21`; list/get SELECT, create INSERT,
cancel/archive EXEC; the endpoint returns 404 for keys not enrolled). Files and skills
moved from their `?beta=true` paths to the GA paths with resources/methods/verbs
unchanged (the GA files list is cursor-paginated where the beta one was after_id). The
`anthropic-workspace-id` optional header now sits on ~110 ops; it is documented on the
`anthropic` site (`scrub-docs --keep anthropic-workspace-id`) as the workspace selector
and double-quoted in SQL: `WHERE "anthropic-workspace-id" = 'wrkspc_...'` (live: a
malformed id is a 400 from the API).

Dropped 2026-07-09 (user-confirmed): the `completions` service — `POST /v1/complete`
is hard-deprecated server-side (400 "use /v1/messages" on every call, verified live).
Mapped to the `skip_this_resource` sentinel in the CSV (the provider-utils generate
primitive for op exclusion) + listed in `factory/exclusions.yaml` under
`hard_deprecated` so guard 1 balances.

Excluded, documented (136 ops in `factory/exclusions.yaml`): 2 SSE stream endpoints, 10
tunnels ops (OAuth-only), 10 beta duplicates of GA messages/batches/models, 13 beta
duplicates of GA files/skills, `/v1/complete`, and the 100 Admin API ops (4 groups:
served by `anthropic_admin`, WIF OAuth-only, enterprise key, not yet covered). SDK-side
conveniences (`parse`) are not spec ops.

### `anthropic_admin` — 6 services, 11 resources (~24 ops)

organization (organization[get /me], users, invites) · workspaces (workspaces, members,
rate_limits) · api_keys (api_keys — list/get/update ONLY; the API forbids create/delete)
· usage (usage_reports, claude_code_reports) · cost (cost_reports) · rate_limits
(rate_limits).

Canonical sources (fetch the `.md` URLs):
- https://platform.claude.com/docs/en/manage-claude/admin-api.md
- https://platform.claude.com/docs/en/manage-claude/usage-cost-api.md
- https://platform.claude.com/docs/en/manage-claude/rate-limits-api.md
- https://platform.claude.com/docs/en/manage-claude/claude-code-analytics-api.md
- https://platform.claude.com/docs/en/manage-claude/workspaces.md
- https://platform.claude.com/docs/en/manage-claude/admin-api-keys.md
- per-endpoint schemas: https://platform.claude.com/docs/en/api/admin

Excluded, documented: WIF endpoints (service accounts / federation issuers / rules —
reject admin keys, need `org:admin` OAuth); Compliance / Spend Limits / Enterprise
Analytics (third key type `sk-ant-api01-...` → future `anthropic_enterprise`). Note in
docs: on Claude Platform on AWS only workspace CRUD works.

Spec-vs-admin split (decided 2026-09-15, needs confirmation before changing): the bundled
spec now models the Admin API as 100 `?beta=true`-keyed ops under `/v1/organizations/*`
(operationIds `beta_*`, some with their own `anthropic-beta` flags). The admin provider
was NOT re-platformed onto them — its 27 hand-authored ops are live-verified, GA-keyed
and stable — so `factory/exclusions.yaml` drops all 100 from `anthropic` in four groups:
`admin_served_by_anthropic_admin` (27, the current admin surface), `admin_wif_oauth_only`
(26), `admin_enterprise_key` (21: compliance settings, spend limits, spend-limit increase
requests, `/analytics/*`), `admin_uncovered` (26: external keys, RBAC groups/roles,
organization-level tunnels — candidates for a future admin extension). Re-platforming
the admin provider onto the spec would change every admin wire path (`?beta=true`
suffix) and is a separate, confirmable decision.

Admin open questions — RESOLVED empirically on the mock (2026-07-08), pinned:
(a) **Report row shape: ship `$.data`.** stackql's objectKey DOES support
`$.data[*].results[*]` (row per bucket×group, auto-pagination still walks), but those
rows lose the bucket's `starting_at`/`ending_at` (absent from result items), which are
the x-axis of any usage report. So usage/cost/claude_code use `$.data` (row per bucket:
starting_at, ending_at, results as a JSON column; JSON_EACH for group breakdowns).
(b) **Array query params take ONE scalar value per query.** `WHERE "group_by[]" =
'model'` reaches the wire as `group_by%5B%5D=model` (URL-encoded brackets, accepted).
A JSON-array value does NOT fan out — it arrives as the literal string (unlike request
bodies under naive translate). Quote bracketed identifiers with DOUBLE QUOTES in SQL:
backtick-quoting `` `group_by[]` `` is a stackql parser error (note: this corrects the
"backtick-quoted in SQL samples" instruction in few-shot 5 — backticks only work for
bracket-free identifiers).
(c) **`ending_at` is optional** on both usage_report/messages and cost_report (canonical
reference pages) — routing signatures are `[starting_at]` only; no clash.
(d) **fast-mode: optional header, NO default.** `anthropic-beta` is declared on
usage/cost ops as an optional header param without a default; users grouping/filtering
by `speed` supply `anthropic-beta = 'fast-mode-2026-02-01'` in the WHERE clause.
Also: usage/cost/claude_code reports and both rate_limits endpoints are CURSOR-paginated
(`page` + `next_page`) and get pagination config — the after_id policy applies only to
the admin ENTITY lists (users/invites/workspaces/members/api_keys).

## Views

Convenience views live in `stackql_anthropic_provider/provider-dev/views/<service>/
views.yaml` (hand-authored, checked in) and are spliced into `x-stackQL-resources`
by the provider-utils `generate --views-dir` flag (wired into the `generate` npm
script; API-derived resources win on key collision). Stanza per view (databricks-repo
archetype): `name`, `id`, `config.docs.fields` (name/type/description — this drives
the docgen view page; add `config.docs.requiredParams` for views with `{{ param }}`
placeholders) and `config.views.select` with dialect-predicated DDL:
`predicate: sqlDialect == "sqlite3"` primary + `fallback: {predicate: sqlDialect ==
"postgres", ddl: ...}` (JSON_EXTRACT('$.a.b') ↔ json_extract_path_text(col::json,
'a','b')). docgen-v2 renders views natively (Type: View, fields table, tabbed SQL
Definition). First view: `anthropic.models.vw_model_capabilities` (per-model
capability flags fanned out of the `capabilities` JSON column) — live-verified
2026-07-09; meta-routes DESCRIBE EXTENDED sees all 22 columns.

## Build guards (CI hard-fails)

1. **Spec-coverage diff**: official spec ops minus provider ops must equal EXACTLY the
   documented exclusion list. This is the 100%-coverage requirement, mechanized.
2. **Select-shape consistency**: within a resource, all SELECT methods project the same
   column set.
3. **Signature uniqueness**: within (resource, sqlVerb), no two methods share a
   required-params signature (most-specific-first ordering; clashes demote to EXEC —
   or better, relocate via CSV).
4. **No-polymorphism scan**: zero anyOf/oneOf/allOf/additionalProperties in generated
   services.
5. **Upstream spec drift check** (`node factory/locate.mjs`, `make fetch-spec`): fail
   when the sha256 of the decompressed bundled spec (anthropic-sdk-python
   `scripts/mock-spec.json.gz`) differs from `factory/spec-snapshot.json`, or when the
   snapshot predates the bundled-spec pin (exit 3; exit 2 only when upstream is
   unreachable). Conscious bump: `make refresh-spec`, review, regen. Never a warning.
6. **Zero-column selects**: every SELECT-routed method projects ≥1 column.
7. **Docs examples are tested** (`factory/check-doc-examples.mjs`, CI step after the
   smoke jobs): every ` ```sql ` block on a provider's docs index (assembled from
   `provider-dev/docgen/provider-data/<provider>/headerContent2.txt`) must match, modulo
   whitespace, an `.iql` under that provider's `tests/queries` — so the front page cannot
   claim a query the suite doesn't run. Illustrative blocks (placeholder ids in the agent
   lifecycle snippet) are exempted by heading, with a reason, in the script's `EXEMPT` map.
   Authored SQL is byte-identical to rendered SQL provided `AND` continuation lines are NOT
   indented (scrub-docs left-aligns them).

## Tests (both providers)

Four layers, cheapest first, mirroring stackql-provider-pagerduty / -clickhouse
(`make test` runs the first three; `make smoke*` is live):

- **Offline validation** (`<provider>/tests/offline_validation.mjs`, `make test-offline`):
  SHOW SERVICES/RESOURCES/METHODS + DESCRIBE EXTENDED over the local file registry,
  asserting the expected surface (12/27+1 and 6/11), verb policy, header defaults,
  pagination/pushdown counts, auth block. No server, no credentials.
- **Integration** (`tests/integration/run_integration_tests.cjs --manifest
  <provider>/tests/integration/manifest.yaml`, `make test-integration`): manifest-driven
  suites against `tests/integration/mock_anthropic_server.cjs`, a local mock that REJECTS
  wire-contract violations (missing `x-api-key` → 401, missing `anthropic-version` → 400,
  beta path without the per-endpoint `anthropic-beta` flag → 400 except for `no_default`
  prefixes, malformed `anthropic-workspace-id` → 400, non-admin key on
  `/v1/organizations/*` → 401) and serves 2-page cursor lists (agents, files, dreams,
  admin reports) so auto-pagination is proven; the runner copies the generated registry
  to a temp dir and rewrites `servers:` to the mock. Queries are `.iql` files under
  `<provider>/tests/queries` (shared with the live suite and the docs-example guard).
- **Meta routes** (`<provider>/bin/test-meta-routes.cjs`, `make test-meta`): pgwire
  harness walks every service/resource/method, owns the server lifecycle, zero errors.
  Archetype: stackql-registry/stackql-provider-aws.
- **Live smoke** (`tests/smoke.py --manifest <provider>/tests/manifest.yaml [--live]`,
  `make smoke` / `smoke-admin` / `smoke-live` / `smoke-admin-live`; Python 3 + pyyaml +
  jinja2; `--env-file .env`, see `.env.example`): Jinja2-rendered manifests, exports
  between tests, `--live` pulls the PUBLISHED provider from the registry, breadcrumb
  rollback driven by `config.rollback` rules (archives `stackql-smoke-*` agents).
  anthropic: reads + one 16-token haiku completion (well under a cent); the managed
  agents write lifecycle is gated on `SMOKE_AGENTS=1`, the workspace-scoped test on
  `ANTHROPIC_WORKSPACE_ID`. anthropic_admin: READ-ONLY (never mutates live orgs);
  `ANTHROPIC_ADMIN_API_KEY` is accepted as an alias of `ANTHROPIC_ADMIN_KEY`.
  CI runs the live suites only where the secrets exist (skipped with a notice otherwise).
- Windows hosts: run the stackql-backed layers under WSL (the binary is a Linux ELF);
  the node pipeline itself runs on either side and produces byte-identical output.

## Microsites — two, Netlify

One Docusaurus 3.10 site per provider (`anthropic-provider.stackql.io`,
`anthropic-admin-provider.stackql.io`), vendored shared config
(stackql/docusaurus-config cloned to `.shared-config` at build), docgen via
`@stackql/provider-utils` (latest), `sharp` pinned `^0.33` via resolutions (0.32
downloads binaries from GitHub releases, which breaks in restricted environments).
Deployment is Netlify (NOT GitHub Pages — one Pages site per repo): mirror the layout in
stackql-registry/stackql-provider-databricks (`stackql-provider` branch) — per-site base
directories, selective builds. CI carries NO website jobs (removed 2026-07-09): Netlify
builds both sites (deploy previews on PRs), so a CI site build would duplicate it —
don't re-add one. Admin site auth docs: Admin key, admin-role-created,
org accounts only; cross-link the `anthropic` site (and vice versa).

Known docgen bug — PATCHED LOCALLY (2026-07-08): provider-utils includes
`requestBody.required` in "Required Params" only for insert/update/replace/exec access
types, so SELECT-routed body methods (inference ops) rendered empty Required Params and
unroutable samples. `factory/patch-provider-utils.mjs` (npm postinstall) adds `select`
to the allowlist in `docgen/resource/methods.js` and appends body-required fields to
SELECT example WHERE clauses; the upstream diff is prepared at
`factory/upstream/provider-utils-select-required-params.patch`. Delete the local patch
once a provider-utils release contains the fix.

More website findings (2026-07-08): Docusaurus 3.10 with `future: {v4: true}` requires
the `@docusaurus/faster` package (build hard-fails without it). `factory/scrub-docs.mjs`
post-processes docgen output: hyphenated/bracketed identifiers DOUBLE-quoted in SQL
samples (backticks are a stackql v0.10.542 parser error for both shapes — supersedes
the backtick advice in few-shot 5 and the MDX-safe rule). Re-verified 2026-07-09 for
INSERT column lists: bare AND backticked hyphenated column names are both parser
errors there too; double quotes parse and route.

Header params are NOT user docs (2026-07-09): documented params are path, query, and
request-body ONLY. scrub-docs derives the `in: header` param set mechanically from the
generated specs (`--provider-root`) and strips it from every surface: Methods-table
Required/Optional cells, Parameters-table rows (a table left empty collapses to a
sentence — admin `organization` is the only such page), SQL WHERE/AND conditions,
INSERT column/value line pairs (positional), EXEC `@param` lines (comma re-fixing; the
last surviving @param before `@@json=` carries no comma, matching docgen), and INSERT
"Manifest" yaml props. `x-api-key` is auth plumbing; `anthropic-version` /
`anthropic-beta` are auto-injected from schema defaults. This also hides the
FUNCTIONAL headers (`Anthropic-Worker-ID`, `authorization` on environments/work_items;
`anthropic-user-profile-id`; admin fast-mode `anthropic-beta` per resolved question
(d)) — they still work on the wire, and scrub-docs `--keep h1,h2` re-documents them
per provider if that's ever wanted. The provider index.md auth sections still describe
the header MECHANISM (that's auth docs, not params). Exception since 2026-09-15: the
`anthropic` docgen runs scrub-docs with `--keep anthropic-workspace-id`, so the
workspace selector (an optional header on ~110 ops in the 2026-09 spec) IS documented
as a parameter and appears double-quoted in the SQL samples.

Post-docgen enrichment (2026-07-09): `factory/enrich-select-docs.mjs` (chained BEFORE
scrub-docs in the `docgen`/`docgen-admin` npm scripts — enrich adds body-param rows
before scrub evaluates empty-table collapse; both idempotent) documents the
request-body params of body-bearing SELECT methods (the POST-as-SELECT inference ops:
`messages.create`, `token_counts.count_tokens`), which docgen
otherwise omits: optional body params are appended to the Methods-table "Optional
Params" cell and the SELECT sample WHERE clause; Parameters-table rows are added for
ALL body params (also repairing the dangling `#parameter-*` anchors for required body
params); each such method's SELECT sample becomes nested tabs — "Query Shape"
(placeholders) + "Query Example" (complete runnable query from the checked-in
`factory/docgen-select-examples.yaml`, keyed `<service>.<resource>.<method>` per
provider). `stream` is deliberately undocumented (SSE switch, not SQL-consumable).
Query Examples were run LIVE (2026-07-09); wire rules they must respect:
- integer literals reach the JSON body as numbers, but FLOAT literals arrive as
  strings and the API rejects them (`temperature: Input should be a valid number`) —
  no temperature/top_p in examples;
- JSON array/object string values fan out only when the string is VALID JSON after SQL
  parsing — backslash escapes (`\n`) are interpreted by the parser first and break the
  JSON (value then arrives as a literal string);
- claude-sonnet-5 can lead `content` with a thinking block, so `$[0].text` extraction
  is only deterministic with `thinking = '{"type": "disabled"}'` in the WHERE clause —
  the example pins that and extracts `$[0].text` as `assistant_message`;
- `/v1/complete` is now rejected server-side as deprecated (400 → "use /v1/messages")
  — the completions service was subsequently dropped from the provider entirely (see
  Taxonomies).

Websites re-platformed (2026-07-08, post-merge) onto the NEW archetype from
stackql-registry/stackql-provider-aws (`stackql_aws_provider/website`, branch
`stackql-provider`; deployment vector excluded — this repo stays on Netlify):
- `provider.js` (providerName/providerTitle) + THIN `docusaurus.config.js` calling
  `createConfig` from `./.shared-config/index.js`; the shared config is VENDORED AT
  BUILD TIME (`yarn vendor-config` = rimraf + shallow-clone of
  stackql/docusaurus-config@main, wired as prestart/prebuild; `.shared-config/` is
  gitignored, never committed).
- Docusaurus ^3.10.2 (bumped 2026-09-15 from ^3.10.1) with
  faster/plugin-ideal-image/theme-mermaid + the archetype's overrides/resolutions block.
  plugin-ideal-image pulls sharp 0.32 → binary download breaks here; sharp pinned
  `^0.33` in BOTH overrides and resolutions (kept on top of the archetype, which
  doesn't pin it).
- Both site configs post-mutate two shared-config settings after `createConfig`:
  `config.presets[0][1].docs.showLastUpdateTime = true` (the shared config ships
  `false`; git history stamps each page with its last regen date) and
  `delete config.trailingSlash` (the shared config sets `false`, which emits
  `<route>.html` and 404s the trailing-slash URL; the Docusaurus default emits
  `<route>/index.html`, serving both forms). Keep both through every regen.
- MONOREPO exception: createConfig derives projectName/editUrl as
  `stackql-provider-<name-sans-underscores>` — wrong for this repo. Both site configs
  post-mutate `config.projectName = 'stackql-provider-anthropic'` and the per-site
  `presets[0][1].docs.editUrl`. The providerSlug-derived url
  (anthropic-admin-provider.stackql.io from `anthropic_admin`) IS correct as-is.
- The shared config supplies blog:false, markdown hooks, redirects plugin
  (/providers/*, /install, ... route to the main site client-side), gtag, sitemap.
  docgen frontmatter references `/img/stackql-<providerName>-provider-featured-image.png`
  — alias it from stackql-cover.png in each site's static/img.

## Things NOT to do

- Don't derive params/schemas from SDK source (alias trap). The SDK repo is only used
  for the bundled spec file (`scripts/mock-spec.json.gz`), the `.stats.yml` endpoint
  count, and the beta-flag constants (PyPI package).
- Don't weaken guard 5 to a warning; a moved upstream spec is a conscious re-pin.
- Don't hand-edit `all_services.csv`: new rows come from analyze, their review is a rule
  in `factory/csv-review.mjs`, and `make check-mappings` must stay green.
- Don't enable auto-pagination on `after_id`-style lists.
- Don't emit `required: true` for `anthropic-version`/`anthropic-beta`.
- Don't hand-edit generated provider trees — fix the pass or the CSV and regen.
- Don't rewrite existing CSV rows (append-only); bootstrap deletions are deliberate acts.
- Don't put WIF/Compliance/Spend-Limits under either provider's auth.
- Don't use GitHub Pages for the sites.

## Layout

```
stackql-provider-anthropic/          (plain repo, default branch: main)
├── CLAUDE.md                        this file (rules); NOTES.md (dated refresh findings)
├── Makefile                         entry point: fetch-spec / refresh-spec / build /
│                                    check-mappings / test / smoke* / docs / website / all
├── README.md  .env.example
├── factory/                         shared pipeline: lib/bundled-spec.mjs, locate/download,
│                                    pre-pass/service-map/scrub-unions, csv-review (rules),
│                                    admin-split, post-pass, guards, check-doc-examples,
│                                    beta-flags.yaml, exclusions.yaml, spec-snapshot.json
├── tests/                           shared runners: smoke.py (live), requirements.txt,
│                                    integration/{mock_anthropic_server.cjs,
│                                    run_integration_tests.cjs}
├── stackql_anthropic_provider/
│   ├── provider-dev/{downloaded,source,config,openapi,docgen,views}
│   │                                (config: all_services.csv, servers.json, provider_config.json)
│   ├── bin/  website/
│   └── tests/{manifest.yaml (live), integration/manifest.yaml (mock),
│              offline_validation.mjs, queries/}
├── stackql_anthropic_admin_provider/
│   ├── provider-dev/{source,config,openapi,docgen}   (source = hand-authored)
│   ├── bin/  website/
│   └── tests/{manifest.yaml, integration/manifest.yaml, offline_validation.mjs, queries/}
└── netlify config                   mirror the databricks repo's pattern
```

Align the website/Netlify specifics with the databricks repo once inspected; align
harness scripts with the aws repo. Both are in the stackql-registry org.