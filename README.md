# stackql-provider-anthropic

This repo masters **two [StackQL](https://github.com/stackql/stackql) providers** for the
Anthropic (Claude) platform from one factory pipeline:

| Provider | Surface | Auth env var | Key type | Docs |
|---|---|---|---|---|
| `anthropic` | User/inference API - messages, models, batches, files, skills, agents, deployments, environments, sessions, memory stores, dreams, user profiles, vaults | `ANTHROPIC_API_KEY` | `sk-ant-api...` (workspace-scoped) | [anthropic-provider.stackql.io](https://anthropic-provider.stackql.io) |
| `anthropic_admin` | Admin API (`/v1/organizations/*`) - users, invites, workspaces, members, API keys, usage/cost reports, Claude Code analytics, rate limits | `ANTHROPIC_ADMIN_KEY` | `sk-ant-admin01-...` (org-scoped) | [anthropic-admin-provider.stackql.io](https://anthropic-admin-provider.stackql.io) |

The two key types are disjoint (neither can call the other's endpoints); both send
`x-api-key` + `anthropic-version` headers on the wire.

## Quick test

```bash
REG_ROOT="$(pwd)/stackql_anthropic_provider/provider-dev/openapi"
REG="{\"url\":\"file://${REG_ROOT}\",\"localDocRoot\":\"${REG_ROOT}\",\"verifyConfig\":{\"nopVerify\":true}}"
stackql --registry="${REG}" shell
```

```sql
-- inference is a result set
SELECT id, model, role, JSON_EXTRACT(content, '$[0].text') AS reply
FROM anthropic.messages.messages
WHERE model = 'claude-sonnet-5'
  AND max_tokens = 128
  AND messages = '[{"role":"user","content":"hello"}]';

-- scope a query to one workspace (the header is a double-quoted parameter)
SELECT id, display_name FROM anthropic.models.models
WHERE "anthropic-workspace-id" = 'wrkspc_01CZkZaBF1tNoB5wlCeusgy';

-- org usage, one row per time bucket
SELECT starting_at, ending_at, results
FROM anthropic_admin.usage.usage_reports
WHERE starting_at = '2026-09-01T00:00:00Z' AND "group_by[]" = 'model';
```

## Surface

- `anthropic`: 12 services / 27 resources (+1 view) / 108 methods - generated from the
  OpenAPI spec bundled in `anthropics/anthropic-sdk-python` (`scripts/mock-spec.json.gz`,
  244 operations); 100% spec coverage minus a documented 136-op exclusion list (SSE
  streams, OAuth-only tunnels, beta twins of GA ops, the hard-deprecated `/v1/complete`,
  and the Admin API ops the spec now carries), enforced by CI.
- `anthropic_admin`: 6 services / 11 resources / 27 methods - hand-authored from the
  canonical platform docs (the Admin API has no SDK client surface; the spec's admin ops
  are excluded from `anthropic` and reserved for this provider).

## Layout

```
factory/                             shared pipeline + guards (see factory/README.md)
tests/                               shared runners: smoke.py (live), integration/ (mock API + runner)
stackql_anthropic_provider/          spec-driven provider: provider-dev/{downloaded,source,config,openapi,docgen,views}, bin/, tests/, website/
stackql_anthropic_admin_provider/    docs-driven provider: provider-dev/{source,config,openapi,docgen}, bin/, tests/, website/
Makefile                             entry point (make help)
```

## Build & test

```bash
make deps             # npm install (patches provider-utils docgen via postinstall)
make fetch-spec       # guard 5: bundled upstream spec must match factory/spec-snapshot.json
make refresh-spec     # accept an upstream change: re-pin + re-vendor (review the diff)
make build            # anthropic: prepass -> split -> normalize+scrub -> analyze -> csv-review -> generate -> post-pass -> guards
                      # anthropic_admin: stage -> normalize+scrub -> analyze -> generate -> post-pass -> guards
make check-mappings   # all_services.csv must be the reviewed state (CI)
make test             # offline validation + mock integration + meta routes + docs-example check, both providers
make smoke            # live, anthropic (reads + one 16-token completion); .env sourced if present
make smoke-admin      # live, anthropic_admin (read-only)
make smoke-live       # live against the PUBLISHED provider (REGISTRY PULL anthropic)
make docs docs-admin  # regenerate website docs
make website website-admin   # build the Docusaurus microsites
```

The live suites read credentials from the environment or `--env-file .env`
(see `.env.example`). Run the stackql-backed layers under WSL on Windows.

Regeneration is byte-idempotent given the committed mapping CSVs and the vendored spec
(CI enforces this with `git diff`). The mapping CSVs
(`provider-dev/config/all_services.csv`) are append-only: analyze appends a row per new
operation and `factory/csv-review.mjs` holds the reviewed mapping as rules, so the SQL
surface only changes through a conscious, reviewable rule.

Websites are two Docusaurus 3.10 sites deployed on Netlify (one Netlify site per
`website/` base directory - see `netlify.toml`).

`CLAUDE.md` is the engineering source of truth (pipeline contract, wire-verified rules,
taxonomies, guard definitions); `NOTES.md` records the findings of each refresh.
