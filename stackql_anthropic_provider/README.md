# `anthropic` StackQL provider

The user/inference surface of the Anthropic API: 12 services / 27 resources
(+1 view) / 108 methods, generated from the OpenAPI spec bundled in
`anthropics/anthropic-sdk-python` (244 operations, pinned in
`factory/spec-snapshot.json`) - 100% spec coverage minus a documented 136-op
exclusion list (SSE streams, OAuth-only tunnels, beta twins of GA ops, the
hard-deprecated `/v1/complete`, the Admin API ops reserved for
`anthropic_admin`), enforced in CI.

- Auth: `ANTHROPIC_API_KEY` (workspace-scoped `sk-ant-api...` key) sent as `x-api-key`
- `anthropic-version` (and per-endpoint `anthropic-beta` flags) are sent automatically;
  the optional `anthropic-workspace-id` parameter scopes a query to one workspace
- Inference ops are SELECTs (`messages`, `token_counts` return result sets)
- Cursor lists (beta surfaces, GA files and skills) auto-paginate; after_id lists
  (models, batches) page manually; SQL `LIMIT` is pushed down to the wire
- Docs: https://anthropic-provider.stackql.io

```
provider-dev/downloaded/   vendored upstream spec (pinned by factory/spec-snapshot.json)
provider-dev/source/       pre-passed + split + normalized per-service specs (regenerated)
provider-dev/config/       all_services.csv (durable mapping table, append-only; reviewed
                           by factory/csv-review.mjs), servers.json, provider_config.json
provider-dev/openapi/      the generated provider tree (what stackql loads)
provider-dev/views/        hand-authored views (vw_model_capabilities)
provider-dev/docgen/       headerContent for the website docgen
bin/                       meta-route harness + server scripts
tests/                     offline validation, integration manifest (mock), live manifest
                           (tests/smoke.py), shared .iql queries - see tests/README.md
website/                   Docusaurus site (anthropic-provider.stackql.io, Netlify)
```

Build/test from the repo root: `make build`, `make test`, `make smoke`
(see `tests/README.md`), `make docs`.
