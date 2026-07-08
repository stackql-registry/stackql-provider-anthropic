# `anthropic_admin` StackQL provider

The Anthropic Admin API (`/v1/organizations/*`): 6 services / 11 resources /
27 methods, hand-authored from the canonical platform docs — the Admin API
ships in no OpenAPI spec and no SDK, so `provider-dev/source/*.yaml` are
transcriptions of the reference pages (URLs pinned in each file header).

- Auth: `ANTHROPIC_ADMIN_KEY` (org-scoped `sk-ant-admin01-...` key, admin-role-created,
  organization accounts only) sent as `x-api-key`; disjoint from regular API keys
- Surface: organization info/users/invites · workspaces/members/rate-limit overrides ·
  api_keys (list/get/update ONLY — the API forbids create/delete) · usage reports ·
  Claude Code analytics · cost reports · org rate limits
- Reports and rate-limit endpoints auto-paginate (cursor); entity lists page manually
- On the Claude Platform on AWS only workspace CRUD works
- Excluded, documented: WIF endpoints (need `org:admin` OAuth, reject admin keys);
  Compliance/Spend-Limits/Enterprise Analytics (third key type → future `anthropic_enterprise`)
- Docs: https://anthropic-admin-provider.stackql.io

Build/test from the repo root: `npm run build-admin`,
`npm run test-meta-routes-admin`, `npm run smoke-admin` (READ-ONLY live subset:
`npm run smoke-admin-live`), `npm run docgen-admin`.
