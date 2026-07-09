# stackql-provider-anthropic

This repo masters **two [StackQL](https://github.com/stackql/stackql) providers** for the
Anthropic (Claude) platform from one factory pipeline:

| Provider | Surface | Auth env var | Key type | Docs |
|---|---|---|---|---|
| `anthropic` | User/inference API — messages, models, batches, files, agents, deployments, environments, sessions, skills, memory stores, user profiles, vaults | `ANTHROPIC_API_KEY` | `sk-ant-api...` (workspace-scoped) | [anthropic-provider.stackql.io](https://anthropic-provider.stackql.io) |
| `anthropic_admin` | Admin API (`/v1/organizations/*`) — users, invites, workspaces, members, API keys, usage/cost reports, Claude Code analytics, rate limits | `ANTHROPIC_ADMIN_KEY` | `sk-ant-admin01-...` (org-scoped) | [anthropic-admin-provider.stackql.io](https://anthropic-admin-provider.stackql.io) |

The two key types are disjoint (neither can call the other's endpoints); both send
`x-api-key` + `anthropic-version` headers on the wire.

## Quick test

```bash
REG_ROOT="$(pwd)/stackql_anthropic_provider/provider-dev/openapi"
REG="{\"url\":\"file://${REG_ROOT}\",\"localDocRoot\":\"${REG_ROOT}\",\"verifyConfig\":{\"nopVerify\":true}}"
./stackql --registry="${REG}" shell
```

```sql
-- inference is a result set
SELECT id, model, role, JSON_EXTRACT(content, '$[0].text') AS reply
FROM anthropic.messages.messages
WHERE model = 'claude-sonnet-5'
  AND max_tokens = 128
  AND messages = '[{"role":"user","content":"hello"}]';

-- org usage, one row per time bucket
SELECT starting_at, ending_at, results
FROM anthropic_admin.usage.usage_reports
WHERE starting_at = '2026-07-01T00:00:00Z' AND "group_by[]" = 'model';
```

## Surface

- `anthropic`: 12 services / 26 resources / 104 methods — generated from Anthropic's
  official (Stainless) OpenAPI spec; 100% spec coverage minus a documented 22-op
  exclusion list (SSE streams, OAuth-only tunnels, beta twins of GA ops), enforced by CI.
- `anthropic_admin`: 6 services / 11 resources / 27 methods — hand-authored from the
  canonical platform docs (the Admin API ships in no OpenAPI spec and no SDK).

## Layout

```
factory/                             shared pipeline + guards (see factory/README.md)
stackql_anthropic_provider/          spec-driven provider: provider-dev/{downloaded,source,config,openapi,docgen}, bin/, tests/, website/
stackql_anthropic_admin_provider/    docs-driven provider: provider-dev/{source,config,openapi,docgen}, bin/, tests/, website/
```

## Build & test

```bash
npm install                     # patches provider-utils docgen via postinstall
npm run build                   # anthropic:   prepass → split → normalize+scrub → analyze → generate → post-pass → guards
npm run build-admin             # anthropic_admin: same chain from normalize onward
npm run test-meta-routes        # anthropic: SHOW/DESCRIBE walk, zero errors required (auto-downloads stackql if absent)
npm run test-meta-routes-admin  # anthropic_admin: SHOW/DESCRIBE walk, zero errors required (auto-downloads stackql if absent)
npm run smoke                   # anthropic: wire-contract-enforcing mock suite
npm run smoke-admin             # anthropic_admin: wire-contract-enforcing mock suite
npm run smoke-live              # anthropic: authenticated smoke tests
npm run smoke-live-admin        # anthropic_admin: authenticated smoke tests
npm run docgen && npm run docgen-admin   # regenerate website docs
```

## Microsite Testing

```bash
cd stackql_anthropic_provider/website
yarn build
yarn serve
cd ../..
```
```bash
cd stackql_anthropic_admin_provider/website
yarn build
yarn serve
cd ../..
```

Regeneration is byte-idempotent given the committed mapping CSVs and the vendored spec
(CI enforces this with `git diff --exit-code`). The mapping CSVs
(`provider-dev/config/all_services.csv`) are append-only after the initial review — the
SQL surface only changes through a conscious, reviewable CSV edit.

Websites are two Docusaurus 3.10 sites deployed on Netlify (one Netlify site per
`website/` base directory — see `netlify.toml`).

`CLAUDE.md` is the engineering source of truth: pipeline contract, wire-verified rules,
taxonomies, guard definitions, and every empirical finding (including a stackql
v0.10.542 EXEC-prepare panic this repo works around).
