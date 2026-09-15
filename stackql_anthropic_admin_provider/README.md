# `anthropic_admin` StackQL provider

The Anthropic Admin API (`/v1/organizations/*`): 6 services / 11 resources /
27 methods, hand-authored from the canonical platform docs - the Admin API has
no SDK client surface, so `provider-dev/source/*.yaml` are transcriptions of
the reference pages (URLs pinned in each file header). Since 2026-09 the
bundled OpenAPI spec also models the Admin API (100 beta-keyed ops); those are
excluded from the `anthropic` provider and reserved for this one (see
`NOTES.md` for the split and the uncovered candidates).

- Auth: `ANTHROPIC_ADMIN_KEY` (org-scoped `sk-ant-admin01-...` key, admin-role-created,
  organization accounts only) sent as `x-api-key`; disjoint from regular API keys
- Surface: organization info/users/invites · workspaces/members/rate-limit overrides ·
  api_keys (list/get/update ONLY - the API forbids create/delete) · usage reports ·
  Claude Code analytics · cost reports · org rate limits
- Reports and rate-limit endpoints auto-paginate (cursor); entity lists page manually
- On the Claude Platform on AWS only workspace CRUD works
- Excluded, documented: WIF endpoints (need `org:admin` OAuth, reject admin keys);
  Compliance/Spend-Limits/Enterprise Analytics (third key type, future `anthropic_enterprise`)
- Docs: https://anthropic-admin-provider.stackql.io

Build/test from the repo root: `make build-admin`, `make test`, `make smoke-admin`
(READ-ONLY; published provider: `make smoke-admin-live`), `make docs-admin`. See
`tests/README.md` for the test layers.
