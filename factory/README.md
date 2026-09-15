# factory/ - the shared provider pipeline

Both providers are mastered here. The `anthropic` provider is spec-driven
(pattern 1 with custom passes); `anthropic_admin` is docs-driven (hand-authored
source specs) and enters the same chain at normalize. The root `Makefile` is
the entry point (`make help`); the npm scripts in the root `package.json` are
the individual steps.

```
lib/bundled-spec.mjs  shared upstream access: the spec is bundled in
                  anthropics/anthropic-sdk-python as scripts/mock-spec.json.gz (gzipped
                  OpenAPI 3.1 JSON); .stats.yml only carries configured_endpoints now.
                  The pin is the sha256 of the DECOMPRESSED JSON.
locate.mjs        fetch + gunzip + hash the bundled spec; report openapi / paths / ops /
                  configured_endpoints; compare with spec-snapshot.json (guard 5, CI
                  hard-fail, exit 3 on drift, exit 2 only when upstream is unreachable);
                  --pin consciously re-records the snapshot (make refresh-spec)
download.mjs      same fetch, verified against the pin (fails without writing on a
                  mismatch), converted to YAML (js-yaml) at
                  stackql_anthropic_provider/provider-dev/downloaded/anthropic-openapi.yml
pre-pass.mjs      drop excluded ops (exclusions.yaml) · downlevel OpenAPI 3.1 -> 3.0
                  (null-union members, const -> enum, exclusive bounds) · stamp header
                  defaults (anthropic-version everywhere; per-endpoint anthropic-beta
                  from beta-flags.yaml on beta paths; `no_default` prefixes keep the
                  header optional with no default)
service-map.mjs   path -> service taxonomy (13 prefixes, 12 emitted services) for
                  provider-utils split
scrub-unions.mjs  post-normalize: collapse residual NESTED anyOf/oneOf/allOf to opaque
                  JSON-blob schemas; delete every additionalProperties (guard 4 input)
csv-review.mjs    the mapping review as RULES (filename::path::verb -> resource, method,
                  verb, objectKey), one block per spec refresh, applied to the rows
                  provider-utils analyze appends; `--check` = make check-mappings (CI)
csv-review-bootstrap.mjs  the ONE-TIME 2026-07 review (already applied; kept as history)
admin-split.mjs   stage stackql_anthropic_admin_provider/provider-dev/source/*.yaml into
                  source/split/ for the shared chain (node, so it runs on any host)
post-pass.mjs     request.mediaType + requestBodyTranslate:naive on body-bearing methods ·
                  pagination config on cursor lists ONLY (page + $.next_page, detected
                  structurally) · schema_override workaround for the stackql v0.10.542
                  EXEC-prepare panic · LIMIT pushdown · YAML 1.1 re-dump
guards.mjs        guards 1-4 + 6: spec-coverage diff == exclusions exactly · select-shape
                  consistency · signature uniqueness · no-polymorphism scan · zero-column
                  selects
check-doc-examples.mjs  guard 7: every SQL block on a docs index page must be an .iql the
                  integration suite runs
patch-provider-utils.mjs  local docgen fix (Required Params for SELECT-routed body
                  methods) - postinstall hook; upstream diff in upstream/
enrich-select-docs.mjs  post-docgen: body params + curated Query Example tabs for the
                  POST-as-SELECT inference methods (docgen-select-examples.yaml)
scrub-docs.mjs    post-docgen: strip auto-injected header params from the docs
                  (`--keep anthropic-workspace-id` re-documents the workspace selector
                  on the anthropic site); double-quote hyphenated/bracketed identifiers
beta-flags.yaml   per-endpoint anthropic-beta defaults, extracted from the PyPI
                  `anthropic` package (re-verify on every spec bump; 1.5.0 as of 2026-09)
exclusions.yaml   the documented 136-op exclusion list in 9 groups (guard 1 contract)
spec-snapshot.json  the pin: bundled_spec_sha256 + openapi / paths / operations /
                  configured_endpoints / pinned date (+ the superseded Stainless URL
                  and hash for provenance)
```

See the repo `CLAUDE.md` for the binding engineering rules and `NOTES.md` for
the dated findings of each refresh.
