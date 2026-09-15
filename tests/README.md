# Shared test runners

Four test layers per provider, cheapest first; the first three need no
credentials and run in CI on every push, the smoke suites are live and
secret-gated. Per-provider specifics (expected surface, coverage, gated tests)
are in `stackql_anthropic_provider/tests/README.md` and
`stackql_anthropic_admin_provider/tests/README.md`.

| Layer | Runner | Inputs |
|---|---|---|
| Offline validation | `<provider>/tests/offline_validation.mjs` | the local file registry (`provider-dev/openapi`) |
| Integration (mock API) | `tests/integration/run_integration_tests.cjs --manifest <provider>/tests/integration/manifest.yaml` | `tests/integration/mock_anthropic_server.cjs` + `<provider>/tests/queries/**/*.iql` |
| Meta routes | `<provider>/bin/test-meta-routes.cjs <provider>` | a local stackql server the harness starts and stops |
| Live smoke | `tests/smoke.py --manifest <provider>/tests/manifest.yaml [--live]` | `<provider>/tests/manifest.yaml`, `.env` |

`make test` runs the first three for both providers plus the docs-example
guard (`factory/check-doc-examples.mjs`); `make smoke`, `make smoke-admin`,
`make smoke-live`, `make smoke-admin-live` run the live suites. A stackql
binary is resolved from `$STACKQL`, `./stackql`, then `PATH` (the integration
runner downloads one on Linux/macOS if none is found). Run under WSL on
Windows: the binary is a Linux ELF.

## The mock API

`tests/integration/mock_anthropic_server.cjs` is a wire-contract-enforcing
mock of api.anthropic.com shared by both providers. It rejects violations
rather than being permissive: missing `x-api-key` (401), missing
`anthropic-version` (400), a beta path without its per-endpoint
`anthropic-beta` flag (400; paths the SDK sends no flag for are accepted
without one), a malformed `anthropic-workspace-id` (400), a non-admin key on
`/v1/organizations/*` (401). It serves 2-page cursor lists (agents, files,
dreams, admin reports) so auto-pagination is proven, after_id lists with
`last_id` populated so a wrongly stamped pagination config would loop, a
workspace-scoped models list, and stateful stores for the agents, dreams,
invites and workspaces lifecycles. The runner copies the generated registry
to a temp dir and rewrites `servers:` to the mock; `provider-dev/**` is never
modified.

Integration manifest schema (per test): `name`, `description`, `file`
(relative to `config.queries_dir`), `env` (extra env vars), `expect`
(`min_rows`, `equals_rows`, `contains`, `not_contains`), `expect_error`
(substring that must appear; the test passes on it), `exports`
(`[{name, column}]` publishes `row[0][column]` as `{{ test.name }}`),
`always_run` (cleanup steps). Fatal patterns (`parser error`, `cannot find
matching operation`, ...) fail a test even when stackql exits 0.

## The live smoke runner

`tests/smoke.py` is a manifest-driven runner (Python 3, `pyyaml`, `jinja2`;
`pip install -r tests/requirements.txt`). Each test is a SQL statement
(inline `sql:` or `file:` under the provider's `tests/queries/`), rendered as
a Jinja2 template, executed with `stackql exec --output json` and checked
against `expect` (exit code, `min_rows`, `contains` / `not_contains`,
`allow_error`). Tests share a variable map: `exports` publish values as
`{test_name}.{export_name}` for later templates. `requires_var` /
`skip_if_var` gate a test on a context or environment variable, `retry`
re-runs until the expectations pass, `always_run` marks cleanup steps.

```bash
cp .env.example .env
python3 tests/smoke.py --env-file .env                                              # anthropic, local provider
python3 tests/smoke.py --env-file .env --live                                       # published provider (REGISTRY PULL anthropic)
python3 tests/smoke.py --env-file .env --manifest stackql_anthropic_admin_provider/tests/manifest.yaml
python3 tests/smoke.py --list
python3 tests/smoke.py --env-file .env --only models_list,token_count --verbose
python3 tests/smoke.py --env-file .env --rollback                                   # teardown only
```

Credentials come from the environment or `--env-file` (dotenv; `export`,
quotes and CRLF tolerated), under the names the providers read:
`ANTHROPIC_API_KEY` and `ANTHROPIC_ADMIN_KEY`; `config.credentials_env_aliases`
lets a manifest accept `ANTHROPIC_ADMIN_API_KEY` as an alias.

Everything a suite creates is named `stackql-smoke-<stamp>-*`. A failed or
interrupted run rolls back its breadcrumbs by live discovery using the
manifest's `config.rollback` rules (`discover` SQL, `name_column`,
`id_column`, `action` SQL with `{{ id }}`); `--rollback` runs that alone. The
admin manifest is read-only and declares no rules.

Base context variables available to every template: `stamp`, `now_iso`,
`today_midnight_iso`, `days_ago_7_iso`, `days_ago_7_midnight_iso`,
`days_ago_30_iso`, `days_ago_30_midnight_iso`, `today_date`, `days_ago_7_date`,
and `env` (the process environment, for `requires_var`-gated tests).

Gotchas:

- Numbers arrive as strings in `--output json`; assert on the bare token.
- A JSON-valued column arrives escaped inside the JSON output; project nested
  fields with `JSON_EXTRACT(col, '$.path')`.
- Hyphenated and bracketed parameter names are double-quoted:
  `WHERE "anthropic-workspace-id" = '...'`, `WHERE "group_by[]" = 'model'`
  (one value per statement).
- EXEC takes comma-separated params: `EXEC t.r.m @a = 'x', @b = 'y'`.
