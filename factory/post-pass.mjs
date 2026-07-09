#!/usr/bin/env node
// Post-pass enrichment, run on a GENERATED provider tree
// (<openapi>/src/<provider>/v00.00.00000).
//
//   node factory/post-pass.mjs --provider-root DIR
//
// Steps:
//   1. every body-bearing method gets `config.requestBodyTranslate:
//      {algorithm: naive}` AND `request.mediaType: <the op's body content
//      key>` (generate only stamps the former, and only on post/put/patch —
//      the loader binds the body schema by exact content-key match, so a
//      missing request.mediaType silently unbinds required body fields).
//   2. cursor-style list methods (GET with a `page` query param and a
//      `next_page` property in the 200 response schema) get
//      `config.pagination` — request token `page` in query, response token
//      `$.next_page` in body. after_id/has_more lists get NOTHING (their
//      `last_id` stays populated on the final page → infinite loop risk;
//      wire-verified policy).
//   3. EXEC-panic workaround (wire-verified against stackql v0.10.542):
//      EXEC prepare panics (nil wrappedSchema.GetType) when the exec
//      method's resolved response schema has NO array-typed property, and
//      fails ("no schema found for method") when the response is a bare
//      scalar (binary downloads). Both are fixed by stamping
//      `response.schema_override` to a synthetic envelope that carries an
//      array property. Applied ONLY to exec-only methods (never referenced
//      from sqlVerbs) that match either failure shape — methods whose
//      schemas already carry an array property are left untouched.
//   4. LIMIT pushdown (wire-verified against stackql v0.10.542): every
//      method whose operation carries a `limit` query param gets
//      `config.queryParamPushdown: {top: {paramName: limit[, maxValue]}}`
//      — SQL `LIMIT n` is then pushed to the wire as `limit=n` (clamped to
//      the param schema's `maximum` when declared) while stackql's
//      client-side LIMIT remains authoritative. The `limit` param itself is
//      suppressed from the user docs by scrub-docs (API primitive beneath
//      the SQL surface).
//   5. re-dump every YAML with YAML 1.1 keyword quoting (stackql's Go YAML
//      parser is YAML 1.1: bare `y`/`yes`/`no`/`on`/`off` strings would
//      silently become booleans).

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function argOf(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
const providerRoot = argOf('--provider-root');
if (!providerRoot) {
  console.error('usage: post-pass.mjs --provider-root <.../src/<provider>/v00.00.00000>');
  process.exit(1);
}
const servicesDir = path.join(providerRoot, 'services');

function resolveOp(spec, opRef) {
  const parts = opRef.replace(/^#\/paths\//, '').split('/');
  const httpVerb = parts.pop();
  const pathKey = parts.join('/').replace(/~1/g, '/').replace(/~0/g, '~');
  return { op: ((spec.paths || {})[pathKey] || {})[httpVerb], httpVerb, pathKey };
}

function schemaOf(spec, maybeRef) {
  if (!maybeRef) return null;
  if (maybeRef.$ref) {
    const name = maybeRef.$ref.split('/').pop();
    return (spec.components?.schemas || {})[name] || null;
  }
  return maybeRef;
}

function dump(obj) {
  return YAML.stringify(obj, { lineWidth: 0, aliasDuplicateObjects: false, version: '1.1' });
}

const EXEC_ENVELOPE_NAME = 'StackqlExecResult';
const EXEC_ENVELOPE = {
  type: 'object',
  description: 'Synthetic dispatch-result envelope for EXEC-only methods (see post-pass step 3).',
  properties: {
    result: { type: 'string', description: 'Raw response payload.' },
    items: { type: 'array', items: { type: 'string' } },
  },
};

let bodyStamped = 0, paginationStamped = 0, execOverrides = 0, pushdownStamped = 0;
for (const f of fs.readdirSync(servicesDir).filter((x) => /\.ya?ml$/.test(x))) {
  const p = path.join(servicesDir, f);
  const spec = YAML.parse(fs.readFileSync(p, 'utf8'));
  const resources = spec.components?.['x-stackQL-resources'] || {};

  for (const resource of Object.values(resources)) {
    const sqlVerbMethods = new Set(
      Object.values(resource.sqlVerbs || {}).flat().map((x) => x.$ref.split('/').pop())
    );
    for (const [mName, method] of Object.entries(resource.methods || {})) {
      if (!sqlVerbMethods.has(mName)) {
        // exec-only method — apply the panic workaround where needed
        const { op: execOp } = resolveOp(spec, method.operation.$ref);
        const content = execOp?.responses?.[method.response?.openAPIDocKey || '200']?.content || {};
        const ct = method.response?.mediaType && content[method.response.mediaType]
          ? method.response.mediaType : Object.keys(content)[0];
        const schema = schemaOf(spec, content[ct]?.schema);
        const hasArrayProp = !!schema && Object.values(schema.properties || {}).some(
          (prop) => prop && (prop.type === 'array' || (prop.$ref && schemaOf(spec, prop)?.type === 'array'))
        );
        const isBareScalar = !!schema && schema.type !== 'object' && !schema.properties;
        if (schema && !hasArrayProp && (ct !== 'application/x-jsonl' || isBareScalar)) {
          spec.components.schemas = spec.components.schemas || {};
          spec.components.schemas[EXEC_ENVELOPE_NAME] = EXEC_ENVELOPE;
          method.response = method.response || {};
          method.response.schema_override = { $ref: `#/components/schemas/${EXEC_ENVELOPE_NAME}` };
          execOverrides++;
        }
      }
      const { op, httpVerb } = resolveOp(spec, method.operation.$ref);
      if (!op) throw new Error(`${f}: dangling operation ref for method ${mName}`);

      // 1. body binding
      const content = op.requestBody?.content;
      if (content) {
        const contentKey = Object.keys(content)[0];
        method.config = method.config || {};
        method.config.requestBodyTranslate = { algorithm: 'naive' };
        method.request = { ...(method.request || {}), mediaType: contentKey };
        bodyStamped++;
      }

      // 2. cursor pagination
      if (httpVerb === 'get') {
        const hasPageParam = (op.parameters || []).some((x) => x.in === 'query' && x.name === 'page');
        const respSchema = schemaOf(spec, op.responses?.['200']?.content?.['application/json']?.schema);
        const hasNextPage = !!respSchema?.properties?.next_page;
        if (hasPageParam && hasNextPage) {
          method.config = method.config || {};
          method.config.pagination = {
            requestToken: { key: 'page', location: 'query' },
            responseToken: { key: '$.next_page', location: 'body' },
          };
          paginationStamped++;
        }
      }

      // 4. LIMIT pushdown on limit-bearing methods
      const limitParam = (op.parameters || []).find((x) => x.in === 'query' && x.name === 'limit');
      if (limitParam) {
        const maximum = schemaOf(spec, limitParam.schema)?.maximum;
        method.config = method.config || {};
        method.config.queryParamPushdown = {
          top: { paramName: 'limit', ...(Number.isFinite(maximum) ? { maxValue: maximum } : {}) },
        };
        pushdownStamped++;
      }
    }
  }
  fs.writeFileSync(p, dump(spec));
}

// 3. provider.yaml re-dump for consistent YAML 1.1 output
const providerYamlPath = path.join(providerRoot, 'provider.yaml');
fs.writeFileSync(providerYamlPath, dump(YAML.parse(fs.readFileSync(providerYamlPath, 'utf8'))));

console.log(`post-pass: ${bodyStamped} body-bearing methods bound, ${paginationStamped} cursor lists paginated, ${execOverrides} exec response overrides, ${pushdownStamped} LIMIT pushdowns`);
