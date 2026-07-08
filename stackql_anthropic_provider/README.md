# `anthropic` StackQL provider

The user/inference surface of the Anthropic API: 12 services / 26 resources /
104 methods, generated from Anthropic's official (Stainless) OpenAPI spec —
100% spec coverage minus a documented 22-op exclusion list (2 SSE streams,
10 OAuth-only tunnels ops, 10 beta twins of GA ops), enforced in CI.

- Auth: `ANTHROPIC_API_KEY` (workspace-scoped `sk-ant-api...` key) sent as `x-api-key`
- `anthropic-version` (and per-endpoint `anthropic-beta` flags) are sent automatically
- Inference ops are SELECTs (`messages`, `token_counts`, `completions` return result sets)
- Cursor lists (beta surfaces) auto-paginate; after_id lists (models, batches, files) page manually
- Docs: https://anthropic-provider.stackql.io

```
provider-dev/downloaded/   vendored upstream spec (pinned by factory/spec-snapshot.json)
provider-dev/source/       pre-passed + split + normalized per-service specs (regenerated)
provider-dev/config/       all_services.csv — the durable mapping table (append-only)
provider-dev/openapi/      the generated provider tree (what stackql loads)
provider-dev/docgen/       headerContent for the website docgen
bin/                       meta-route harness + server scripts
tests/                     manifest-driven smoke suite + wire-contract-enforcing mock
website/                   Docusaurus site (anthropic-provider.stackql.io, Netlify)
```

Build/test from the repo root: `npm run build`, `npm run test-meta-routes`,
`npm run smoke` (see `tests/README.md`), `npm run docgen`.
