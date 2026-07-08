# factory/ — the shared provider pipeline

Both providers are mastered here. The `anthropic` provider is spec-driven
(pattern 1 with custom passes); `anthropic_admin` is docs-driven (hand-authored
source specs) and enters the same chain at normalize.

```
locate.mjs        read .stats.yml from anthropics/anthropic-sdk-python HEAD → spec URL;
                  compares openapi_spec_hash to spec-snapshot.json (guard 5, CI hard-fail);
                  --pin consciously bumps the snapshot
download.mjs      fetch the pinned spec → stackql_anthropic_provider/provider-dev/downloaded/ (vendored)
pre-pass.mjs      drop excluded ops (exclusions.yaml) · downlevel OpenAPI 3.1→3.0
                  (null-union members, const→enum, exclusive bounds) · stamp header
                  defaults (anthropic-version everywhere; per-endpoint anthropic-beta
                  from beta-flags.yaml on beta paths)
service-map.mjs   path → service taxonomy (12 services) for provider-utils split
scrub-unions.mjs  post-normalize: collapse residual NESTED anyOf/oneOf/allOf to opaque
                  JSON-blob schemas; delete every additionalProperties (guard 4 input)
csv-review-bootstrap.mjs  ONE-TIME mapping review (already applied; CSVs are append-only now)
post-pass.mjs     request.mediaType + requestBodyTranslate:naive on body-bearing methods ·
                  pagination config on cursor lists ONLY (page + $.next_page, detected
                  structurally) · schema_override workaround for the stackql v0.10.542
                  EXEC-prepare panic · YAML 1.1 re-dump
guards.mjs        guards 1-4 + 6: spec-coverage diff == exclusions exactly · select-shape
                  consistency · signature uniqueness · no-polymorphism scan · zero-column
                  selects
patch-provider-utils.mjs  local docgen fix (Required Params for SELECT-routed body
                  methods) — postinstall hook; upstream diff in upstream/
scrub-docs.mjs    post-docgen: strip auto-injected header params from SQL samples;
                  double-quote hyphenated/bracketed identifiers
beta-flags.yaml   per-endpoint anthropic-beta defaults, extracted from the PyPI
                  `anthropic` package (re-verify on every spec bump)
exclusions.yaml   the documented 22-op exclusion list (guard 1 contract)
spec-snapshot.json  pinned upstream spec URL + hash
```

Orchestration lives in the root `package.json` scripts (`build`, `build-admin`,
`docgen`, `docgen-admin`, `guards`). See the repo `CLAUDE.md` for the binding
engineering rules and all empirical findings.
