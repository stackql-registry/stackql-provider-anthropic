# Tests — `anthropic` provider

## Meta routes

Walks every service/resource/method (`SHOW SERVICES/RESOURCES/EXTENDED
METHODS` + `DESCRIBE EXTENDED`), owns the stackql server lifecycle, and
hard-fails on any error, duplicate (resource, verb) signature, or
zero-column selectable resource:

```bash
STACKQL=/path/to/stackql node bin/test-meta-routes.cjs anthropic
```

## Smoke (manifest-driven)

```bash
STACKQL=/path/to/stackql node tests/smoke.cjs                 # mock mode
STACKQL=/path/to/stackql node tests/smoke.cjs --live          # live subset
node tests/smoke.cjs --only agents_insert,agents_archive      # cherry-pick
```

Mock mode (default) starts `tests/mock/mock-server.cjs`, copies the
generated registry to a temp dir, rewrites `servers:` to the mock, and runs
`tests/manifest.yaml` in order. The mock **rejects wire-contract
violations** — missing `x-api-key` → 401, missing `anthropic-version` →
400, beta path without the per-endpoint `anthropic-beta` flag → 400 — so a
green run proves header/auth behaviour, not just row plumbing. It serves
the agents list as 2 cursor pages to prove auto-pagination walks, and
after_id-style lists (batches/models) with `last_id` populated so a
wrongly-stamped pagination config would loop and fail.

Live mode is gated on `ANTHROPIC_API_KEY` and runs only tests tagged
`live: true` (models list, free token counting, and one 16-token haiku
inference).

Manifest schema: see the header comment in `tests/smoke.cjs` (`exports`
publish `{{ test.name }}` template variables to later tests; `always_run`
marks cleanup steps; `expect_error` inverts the assertion; fatal patterns
fail a test even when stackql exits 0).
