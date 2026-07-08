# Tests — `anthropic_admin` provider

Same architecture as the `anthropic` provider (shared runner + shared
wire-contract-enforcing mock, which also enforces the disjoint
`sk-ant-admin...` key space on `/v1/organizations/*`):

```bash
STACKQL=/path/to/stackql node bin/test-meta-routes.cjs anthropic_admin
STACKQL=/path/to/stackql node ../stackql_anthropic_provider/tests/smoke.cjs \
  --manifest tests/manifest.yaml            # mock mode
STACKQL=/path/to/stackql node ../stackql_anthropic_provider/tests/smoke.cjs \
  --manifest tests/manifest.yaml --live     # READ-ONLY live subset
```

The mock smoke covers: admin-key-space rejection, invites and workspaces
INSERT/SELECT/UPDATE/EXEC-archive lifecycles, workspace members,
usage/cost/claude_code report pagination (2 cursor pages each), the
`"group_by[]"` bracketed wire param (double-quoted identifier — see the
pinned answers to the admin open questions in the repo CLAUDE.md), and the
rate-limits `model` filter. Live tests are READ-ONLY and never mutate a
live organization.
