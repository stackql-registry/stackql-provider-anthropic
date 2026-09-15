# Engineering Notes

Findings from the 2026-09 refresh, each with the evidence behind it. Sources: the
bundled upstream spec (`anthropics/anthropic-sdk-python` `scripts/mock-spec.json.gz`,
decompressed sha256 `96aef986008e...`, pinned 2026-09-15), the PyPI `anthropic`
package 1.5.0, stackql v0.11.669 (the WSL binary every test layer ran with),
`@stackql/provider-utils` 0.7.9, read-only probes against api.anthropic.com with a
workspace key, and the mock API in `tests/integration/`. The Admin API live suite did
not run (no admin key available); the mock suite is its credential-free coverage.

## 1. The upstream spec moved inside the SDK repo (guard 5)

CI guard 5 read `openapi_spec_url` / `openapi_spec_hash` from
`anthropics/anthropic-sdk-python/.stats.yml`. Upstream commit `f9b0cf2` (2026-09-03,
"bundle the mock server spec and update dev tooling") removed both fields from the
Python, TypeScript, Go and Java SDK repos; `.stats.yml` now carries only
`configured_endpoints: 201`. The spec itself is committed to the SDK repo as
`scripts/mock-spec.json.gz`: gzipped OpenAPI 3.1.0 JSON, 165 paths, 244 operations,
2.5 MB decompressed (230 KB gzipped), `info` has a title and no version.

`factory/locate.mjs` and `factory/download.mjs` now share `factory/lib/bundled-spec.mjs`:
fetch the archive, gunzip with node `zlib`, sha256 the decompressed JSON. The pin
(`factory/spec-snapshot.json`, `bundled_spec_sha256`) is the hash of the JSON, not of the
archive - gzip output embeds a timestamp, so the archive bytes are not a stable identity.
`download.mjs` verifies the hash before writing and converts the JSON to YAML with
`js-yaml` (`lineWidth: -1`, `noRefs`) at the path the pipeline already read, so
`pre-pass.mjs`, `guards.mjs` and the npm scripts were untouched. Verified: with the old
snapshot `locate.mjs` exits 3 ("snapshot predates the bundled-spec pin"), after `--pin`
and `download.mjs` it reports "no drift"; a fetch failure is the only exit 2. The
superseded Stainless URL and md5 are kept in the snapshot under `superseded` for
provenance (both URLs still resolve). A weekly `spec-drift` CI job opens an issue when
the hash moves; the `providers` job keeps guard 5 fatal.

## 2. Spec diff, 116 -> 201 endpoints

Old pin: `anthropic-506a5ad7...yml` (hash `d272f069`, 126 ops / 85 paths, 2026-07).
New: 244 ops / 165 paths. 118 operations added, none removed, no operationId changes
on common ops. The additions:

| Group | Ops | Disposition |
|---|---|---|
| GA `/v1/files` and `/v1/skills` (non-beta twins of the beta paths) | 13 | mapped; beta twins excluded |
| `/v1/dreams?beta=true` (new research-preview service) | 5 | mapped as service `dreams` |
| `/v1/organizations/*?beta=true` (the Admin API, beta-keyed) | 100 | excluded from `anthropic` in 4 groups |

Parameter changes on common ops: `anthropic-workspace-id` (optional header) added to
~110 ops; the beta files list moved from `after_id`/`before_id` to `page` + `ids[]`;
`user_profiles` list gained `order_by`; `memory_versions` list gained
`service_account_id`; the thread stream gained `event_deltas[]`. OpenAPI 3.1-isms in
the new spec: 1554 `{type: null}` union members, 642 `const`, 25 exclusive bounds, still
no `type: [...]` arrays - the existing pre-pass downlevel handles all of it.

### Files and skills went GA

Live (2026-09-15, workspace key): `GET /v1/files` and `GET /v1/skills` return 200
without any `anthropic-beta` header. The PyPI package 1.5.0 exposes them as top-level
`files` / `skills` resources with no flag, and its `beta/files.py` and `beta/skills/`
modules no longer send a default flag either (only caller-supplied betas). The provider
therefore maps the GA paths and excludes the beta twins, the same treatment as the beta
twins of messages/batches/models. `factory/csv-review.mjs` pins the GA operationIds to
the SAME resources, methods and verbs the beta rows carried (files.list/get/delete +
upload/download exec; skills.list/get/delete + create exec; versions.list/get/delete +
create exec) - the SQL surface is unchanged, only the wire path moved. Two consequences:

- `files.list` is now cursor-paginated (`page` / `next_page`, stamped mechanically by
  post-pass); the beta list was after_id. 21 cursor lists in the provider now (was 19).
- The skill version content download exists only on the beta path
  (`GET /v1/skills/{skill_id}/versions/{version}/content?beta=true`) and is kept as
  `versions.download`. The SDK sends no flag for it. Probe: without a flag the endpoint
  routes (403 "Workspace API keys cannot download Anthropic-published skills", i.e. the
  request reached the handler); with the stale `skills-2025-10-02` flag it takes an
  older code path ("Version must be a numeric timestamp"). So `beta-flags.yaml` gained a
  `no_default` list (`/v1/skills`, `/v1/files`): pre-pass keeps the header optional
  with no default instead of failing the beta-op check, and the mock accepts those
  paths without a flag.

The retired beta rows stay in `all_services.csv` (append-only contract); they are
inert because generate only binds rows whose operation exists in the split specs.

### Beta flags (anthropic 1.5.0)

`user-profiles-2026-03-24` -> `user-profiles-2026-08-18`; `dreaming-2026-04-21` for
dreams; `mcp-tunnels-2026-06-22` on tunnels (still excluded); managed-agents and
agent-memory unchanged; `files-api-2025-04-14` and `skills-2025-10-02` are gone.
Live: `/v1/user_profiles` and `/v1/dreams` return 404 for the test key with either
flag (not enrolled), so both stay mock-verified only.

### Dreams

`BetaCreateDreamRequest` requires `inputs` and `model` after normalize (the top-level
`required: []` in the raw spec hides a union). `BetaDreamModelParams` collapses to
`type: string` with properties, so the model is passed as a JSON string that the naive
translator fans out: `INSERT INTO anthropic.dreams.dreams (inputs, model, instructions)
SELECT '[{"type": "memory_store", "memory_store_id": "..."}]', '{"id": "claude-opus-5"}',
'...' RETURNING id, status`. Verified on the mock (create, get, cancel, archive, 2-page
cursor list). `BetaDream` has array properties, so the EXEC-panic override is not
needed on cancel/archive.

### The Admin API is now in the spec

100 ops under `/v1/organizations/*`, all with `?beta=true` path keys and `beta_*`
operationIds; usage/cost reports, service accounts, federation and org tunnels declare
their own `anthropic-beta` header. Decision (needs confirmation before changing): keep
`anthropic_admin` docs-driven and exclude all 100 from `anthropic`, grouped in
`factory/exclusions.yaml`:

- `admin_served_by_anthropic_admin` (27): exactly the current admin surface.
- `admin_wif_oauth_only` (26): service accounts, federation issuers/rules - policy
  exclusion (reject admin keys).
- `admin_enterprise_key` (21): compliance settings, spend limits, spend-limit increase
  requests, `/analytics/*` - policy exclusion (third key type).
- `admin_uncovered` (26): external keys, RBAC groups/roles, organization-level tunnels
  - candidates for a future `anthropic_admin` extension.

Re-platforming the admin provider onto the spec would put `?beta=true` on every admin
wire path and change every operationId; the hand-authored GA-keyed surface is
live-verified and stable, so it stays. `guards.mjs` guard 1 now balances 244 spec ops
= 108 provider ops + 136 exclusions.

### Mapping stability

Compared with the committed tree: 90 (resource, method, verb) triples unchanged, 13
changed ONLY in wire path (beta -> GA files/skills, listed above), 5 added (dreams), 0
removed. The `anthropic_admin` tree regenerated byte-identically.

## 3. The workspace header

`anthropic-workspace-id` is an optional header on ~110 ops ("select the Workspace for
this request; a credential that belongs to one workspace may omit it"). Live probe: a
malformed value is a 400 (`anthropic-workspace-id header must be a valid workspace
ID.`), so the API validates it. Header params are normally scrubbed from the docs
(CLAUDE.md, 2026-07-09); this one is a user-facing selector, so the `anthropic` docgen
runs `scrub-docs --keep anthropic-workspace-id` and the parameter appears in the
Methods and Parameters tables and the SQL samples, double-quoted:
`WHERE "anthropic-workspace-id" = 'wrkspc_...'`. Mock-verified: the WHERE condition
reaches the wire as the header (the mock returns one model for `wrkspc_01`, two
otherwise) and a malformed id surfaces the 400. The live test is gated on
`ANTHROPIC_WORKSPACE_ID` (the test key's workspace id was not available).

## 4. Toolchain

- `@stackql/provider-utils` 0.7.6 -> 0.7.9, `@stackql/pgwire-lite` 1.0.1 -> 1.0.2. The
  0.7.9 `generate` CLI takes `--servers JSON|FILE.json` / `--provider-config
  JSON|FILE.json`; inline JSON does not survive `cmd.exe` quoting on Windows (it arrived
  as `'[{url:https:\api...}]'`), so both providers now carry
  `provider-dev/config/servers.json` and `provider_config.json` (the pagerduty layout).
  The docgen patch (`factory/patch-provider-utils.mjs`) still applies cleanly. The
  admin provider's generated tree was byte-identical across the upgrade.
- The `build-admin` npm script used `rm -rf` / `mkdir -p` / `cp`, which `cmd.exe`
  rejects; `factory/admin-split.mjs` (node) replaces it. The whole node pipeline now
  produces byte-identical output on Windows and WSL (verified by diffing the two runs).
- stackql v0.11.669 vs v0.10.542: `SHOW METHODS` reports a `create`-named method that
  is in no `sqlVerbs` list as `INSERT` (name-based inference); v0.10.542 said `EXEC`.
  Affects `skills.create` and `skills.versions.create` (multipart, exec-only in the
  documents). Runtime is unchanged (multipart still cannot dispatch); the offline
  validation asserts the document and accepts either spelling. The EXEC-prepare panic
  workaround (schema_override envelope, 20 methods now) is still applied; every EXEC
  in the mock suites dispatches on v0.11.669.
- stackql appends a bare `?` when no query params are supplied (`GET /v1/models?`);
  unchanged, the mock parses URLs.

## 5. Test layers (parity with pagerduty / clickhouse)

| Layer | anthropic | anthropic_admin |
|---|---|---|
| Offline validation (`make test-offline`) | 54/54 | 30/30 |
| Integration, mock API (`make test-integration`) | 38/38 | 26/26 |
| Meta routes (`make test-meta`) | 12 services, 27 resources, 109 methods (incl. the view), 0 errors | 6 / 11 / 27, 0 errors |
| Docs examples (`make test-doc-examples`) | 9/10 tested, 1 exempt (agent lifecycle placeholders) | 7/7 |
| Live smoke, local provider (`make smoke`) | 10 passed, 4 skipped (gated: workspace id, SMOKE_AGENTS) | not run (no admin key) |
| Websites (`make website`, `make website-admin`) | Docusaurus 3.10.2, clean build, "Last updated" stamps | same |

The old `smoke.cjs` (mock + live in one runner) became the integration runner
(`tests/integration/run_integration_tests.cjs`, mock-only, shared by both providers) and
the live suite is the Python manifest runner `tests/smoke.py` (Jinja2 templates,
exports, `--live` for the published provider, `--env-file`, manifest-driven rollback
rules). `ANTHROPIC_ADMIN_API_KEY` is accepted as an alias of `ANTHROPIC_ADMIN_KEY`
(the variable the provider reads). The published registry currently serves `anthropic`
v26.07.00416 and `anthropic_admin` v26.07.00416, so `make smoke-live` exercises the
previous release until this refresh is published.

Live budget: one 16-token `claude-haiku-4-5` completion per anthropic run; everything
else is a read or free token counting. Admin calls carry no per-call charge.

## 6. Websites

Both sites on Docusaurus ^3.10.2 (from ^3.10.1). Two post-`createConfig` overrides in
each `docusaurus.config.js`, kept through every regen: `showLastUpdateTime = true`
(the shared config ships `false`; the page footer now carries "Last updated on ..."
from git history) and `delete config.trailingSlash` (the trailing-slash fix already on
this branch). New index sections: workspace-scoped queries, files and skills, dreams;
the admin index links workspace ids to the workspace header. Both builds clean, no
broken links.

Netlify skipped both production deploys after PR #4 merged (2026-09-15). The
per-site `[context.production] ignore` rule was `git diff --quiet $CACHED_COMMIT_REF
$COMMIT_REF -- <provider dir> ../../factory`. Netlify defines `CACHED_COMMIT_REF` as the
last commit it built in ANY context; the last builds were the PR's deploy previews
(`5693036`), and the merge commit `1701e91` has the identical tree (main had no other
commits), so the diff was empty, the command exited 0 and Netlify cancelled the builds
as "no changes". Evidence: the deploy preview served the dreams page while production
still served the July build (dreams page 404, trailing-slash URLs still 301).
Reproduced locally: exit 0 against `5693036`, exit 1 against the merge's first parent.
Fix: the rule now chains a second diff against `$COMMIT_REF^1` with `&&`, so a build is
skipped only when both the last-built diff and the first-parent diff are empty; a git
error (exit 128) is non-zero and builds, the safe direction. Build-hook-triggered
deploys bypass the ignore command entirely.

## 7. Follow-ups

- Confirm the admin split decision (section 2). If the admin provider should take the
  spec's `admin_uncovered` ops (external keys, RBAC, org tunnels), they can enter the
  factory as hand-authored specs or as a second spec-driven split.
- Set `ANTHROPIC_API_KEY` / `ANTHROPIC_ADMIN_KEY` repository secrets for the CI live
  smoke job; supply `ANTHROPIC_WORKSPACE_ID` and an agents-enrolled key locally to lift
  the two gated groups.
- Publish the refreshed providers, then `make smoke-live` / `make smoke-admin-live`.
- Upstream: the stackql `SHOW METHODS` INSERT inference for exec-only `create`
  methods (section 4) and the EXEC-prepare panic (CLAUDE.md spike findings) remain
  worth reporting.
