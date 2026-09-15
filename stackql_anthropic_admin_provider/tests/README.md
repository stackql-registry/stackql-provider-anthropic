# Tests - `anthropic_admin` provider

Same four layers as the `anthropic` provider, through the shared runners
(see the repo-level `tests/README.md`). The shared mock additionally
enforces the disjoint `sk-ant-admin...` key space on `/v1/organizations/*`.
Commands run from the repo root.

| Layer | Command | What it proves |
|---|---|---|
| Offline validation | `node stackql_anthropic_admin_provider/tests/offline_validation.mjs` (`make test-offline`) | 6 services, 11 resources, 27 methods; `api_keys` is list/get/update only; reports are `SELECT`s requiring `starting_at` only and project one row per bucket (`starting_at`, `ending_at`, `results`); cursor pagination on the 5 report / rate-limit methods and on nothing else; the fast-mode `anthropic-beta` header stays optional with no default; the auth block |
| Integration (mock API) | `node tests/integration/run_integration_tests.cjs --manifest stackql_anthropic_admin_provider/tests/integration/manifest.yaml` (`make test-integration`) | 26 statements: admin-key-space rejection, invites and workspaces INSERT / SELECT / UPDATE / EXEC-archive lifecycles, workspace members, usage / cost / Claude Code report pagination (2 cursor pages each), the `"group_by[]"` bracketed wire param as a double-quoted identifier, the rate-limits `model` filter, every docs index example |
| Meta routes | `node stackql_anthropic_admin_provider/bin/test-meta-routes.cjs anthropic_admin` (`make test-meta`) | Every `SHOW` / `DESCRIBE` route over a local wire server, zero errors |
| Live smoke | `python3 tests/smoke.py --env-file .env --manifest stackql_anthropic_admin_provider/tests/manifest.yaml` (`make smoke-admin`, `make smoke-admin-live`) | `tests/manifest.yaml` against a real organization, READ-ONLY |

## Live suite

READ-ONLY by policy: it never mutates a live organization, so it declares no
rollback rules. Coverage: organization, users (list, get), invites, workspaces
(list, get), members, workspace rate-limit overrides, API keys (list, get),
usage and cost reports over the last 7 days (daily buckets), the Claude Code
report, organization rate limits. Admin calls carry no per-call charge.

Needs an org-scoped Admin API key in `ANTHROPIC_ADMIN_KEY` (the variable the
provider reads); `ANTHROPIC_ADMIN_API_KEY` is accepted as an alias and copied
across by the runner.

```bash
cp .env.example .env                       # ANTHROPIC_ADMIN_KEY=...
make smoke-admin                           # local provider
make smoke-admin-live                      # published provider: REGISTRY PULL anthropic_admin
```
