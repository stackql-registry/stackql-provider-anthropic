# Tests - `anthropic` provider

Four layers, cheapest first (see the repo-level `tests/README.md` for the
runners and the manifest schema). Commands run from the repo root.

| Layer | Command | What it proves |
|---|---|---|
| Offline validation | `node stackql_anthropic_provider/tests/offline_validation.mjs` (`make test-offline`) | 12 services, 27 resources + the `vw_model_capabilities` view, the verb mappings the CSV pins (inference SELECTs, multipart uploads exec-only, dreams lifecycle), DESCRIBE shapes, 21 cursor-paginated lists, 23 LIMIT pushdowns, header defaults (`anthropic-version`, per-endpoint `anthropic-beta`, optional `anthropic-workspace-id`), the auth block |
| Integration (mock API) | `node tests/integration/run_integration_tests.cjs --manifest stackql_anthropic_provider/tests/integration/manifest.yaml` (`make test-integration`) | 38 statements against the wire-contract-enforcing mock: credentials error without a key, POST-as-SELECT inference, after_id lists terminating, cursor pagination over agents / GA files / dreams, the workspace header reaching the wire from a WHERE clause (and a malformed id rejected), GA files and skills reads, the beta-keyed skill content download dispatching without a flag, agents and dreams write lifecycles, every docs index example |
| Meta routes | `node stackql_anthropic_provider/bin/test-meta-routes.cjs anthropic` (`make test-meta`) | Every `SHOW` / `DESCRIBE` route over a local wire server, zero errors |
| Live smoke | `python3 tests/smoke.py --env-file .env` (`make smoke`, `make smoke-live`) | `stackql_anthropic_provider/tests/manifest.yaml` against the real API |

## Live suite

Read-only apart from one 16-token completion on `claude-haiku-4-5` (well under
a cent per run); token counting is free. Coverage: models list/get and the
capabilities view, token counting, the completion, batches, GA files and
skills (list, get, versions). Two gated groups:

- `ANTHROPIC_WORKSPACE_ID=wrkspc_...` enables the workspace-scoped models
  query (`WHERE "anthropic-workspace-id" = ...`).
- `SMOKE_AGENTS=1` enables the managed-agents write lifecycle (create, get,
  archive, named `stackql-smoke-<stamp>-agent`), which needs a key enrolled in
  the managed agents beta. The rollback rule archives any `stackql-smoke-*`
  agent it finds (`make smoke-cleanup`).

Beta surfaces the key is not enrolled in (dreams, user profiles) return 404
from the API and are covered by the mock suite only.

```bash
cp .env.example .env                       # ANTHROPIC_API_KEY=...
make smoke                                 # local provider (provider-dev/openapi)
make smoke-live                            # published provider: REGISTRY PULL anthropic
make smoke SMOKE_ARGS="--only models_list,token_count --verbose"
```

## Query files

`tests/queries/**/*.iql` are shared by the integration manifest, the live
manifest and the docs-example guard (`factory/check-doc-examples.mjs`): every
SQL block on the docs index page must be byte-identical (modulo whitespace)
to a file under `tests/queries/examples/`.
