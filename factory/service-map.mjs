// Path → service taxonomy for the `anthropic` provider (12 services).
// The spec has no tags, so provider-utils `split` runs with
// --svc-discriminator=function pointed at this module's default export.
//
// Taxonomy is pinned in CLAUDE.md — changes need explicit confirmation.

const PREFIX_MAP = [
  ['/v1/messages', 'messages'],
  ['/v1/models', 'models'],
  ['/v1/complete', 'completions'],
  ['/v1/agents', 'agents'],
  ['/v1/deployment_runs', 'deployments'],
  ['/v1/deployments', 'deployments'],
  ['/v1/environments', 'environments'],
  ['/v1/files', 'files'],
  ['/v1/memory_stores', 'memory_stores'],
  ['/v1/sessions', 'sessions'],
  ['/v1/skills', 'skills'],
  ['/v1/user_profiles', 'user_profiles'],
  ['/v1/vaults', 'vaults'],
];

export default function serviceForPath(pathKey /*, operationId, tags, ctx */) {
  for (const [prefix, service] of PREFIX_MAP) {
    if (pathKey === prefix || pathKey.startsWith(`${prefix}/`) || pathKey.startsWith(`${prefix}?`)) {
      return service;
    }
  }
  throw new Error(`service-map: no service mapping for path '${pathKey}' — extend PREFIX_MAP (taxonomy change needs confirmation)`);
}
