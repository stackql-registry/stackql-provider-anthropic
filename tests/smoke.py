#!/usr/bin/env python3
"""Manifest-driven live smoke-test runner for the stackql `anthropic` and
`anthropic_admin` providers (one manifest per provider).

Each test is a SQL statement (inline `sql:` in the manifest, or an `.iql`
file under the provider's tests/queries/), rendered as a Jinja2 template,
executed with `stackql exec --output json`, and checked against its
expectations. Tests run in manifest order and share a variable map: a test's
`exports` publish values under `{test_name}.{export_name}`, which later
templates reference as `{{ test_name.export_name }}`.

Everything the suite creates is named `stackql-smoke-<stamp>`; cleanup
steps carry `always_run: true`, and a failed or interrupted run rolls back
its breadcrumbs by live discovery using the manifest's `config.rollback`
rules (`--rollback` runs that standalone). The admin manifest is read-only
and declares no rollback rules.

Credentials come from the environment (`--env-file .env` loads a dotenv
file), exactly as the providers read them:

    ANTHROPIC_API_KEY        anthropic:       workspace-scoped Claude API key
    ANTHROPIC_ADMIN_KEY      anthropic_admin: org-scoped Admin API key
                             (ANTHROPIC_ADMIN_API_KEY is accepted as an alias
                             and copied across when ANTHROPIC_ADMIN_KEY is unset)

Usage (WSL / Linux / macOS - a stackql binary on PATH, $STACKQL or ./stackql):
    python3 tests/smoke.py --env-file .env                        # anthropic, local provider
    python3 tests/smoke.py --env-file .env --live                 # anthropic, published provider
    python3 tests/smoke.py --env-file .env --manifest stackql_anthropic_admin_provider/tests/manifest.yaml
    python3 tests/smoke.py --list                                 # list tests
    python3 tests/smoke.py --env-file .env --only models_list     # subset (no dependency resolution)
    python3 tests/smoke.py --env-file .env --rollback             # teardown only
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone

import yaml
from jinja2 import Environment, StrictUndefined
from jinja2.exceptions import UndefinedError

PASS, FAIL, SKIP = "PASS", "FAIL", "SKIP"
SMOKE_PREFIX = "stackql-smoke"

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(HERE, ".."))
DEFAULT_MANIFEST = os.path.join(REPO_ROOT, "stackql_anthropic_provider", "tests", "manifest.yaml")

# Failure signatures that fail a test regardless of its expectations (even
# with allow_error) - stackql exits 0 for several of these, so exit-code
# checks alone would miss them.
DEFAULT_FATAL_PATTERNS = [
    "duplicate column name",
    "aborting DDL run",
    "error processing response",
    "failed to transform",
    "schema unsuitable for select",
    "no such column",
    "could not locate symbol",
    "unknown flag",
    "cannot find matching operation",
    "does NOT match SQL type",
    "parser error",
]


class TestResult:
    def __init__(self, name, status, detail="", duration=0.0):
        self.name = name
        self.status = status
        self.detail = detail
        self.duration = duration


def load_env_file(path):
    """Load KEY=VALUE lines into the environment (comments, `export`,
    quotes and CRLF tolerated - a stray \\r in the key breaks the
    x-api-key header)."""
    with open(path, "r", encoding="utf-8-sig") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            if line.startswith("export "):
                line = line[len("export "):]
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'").replace("\r", "")
            if key:
                os.environ[key] = value


def apply_env_aliases(aliases):
    """`config.credentials_env_aliases`: {TARGET: [ALIAS, ...]} - copy the
    first set alias into TARGET when TARGET itself is unset."""
    for target, sources in (aliases or {}).items():
        if os.environ.get(target):
            continue
        for src in sources or []:
            if os.environ.get(src):
                os.environ[target] = os.environ[src]
                break


def registry_arg(registry_path):
    reg = {
        "url": "file://" + registry_path,
        "localDocRoot": registry_path,
        "verifyConfig": {"nopVerify": True},
    }
    return "--registry=" + json.dumps(reg)


def find_stackql(explicit):
    if explicit:
        return explicit
    if os.environ.get("STACKQL"):
        return os.environ["STACKQL"]
    local = os.path.join(REPO_ROOT, "stackql")
    if os.path.exists(local):
        return os.path.abspath(local)
    return "stackql"


def run_stackql(stackql, registry_path, query, timeout):
    # registry_path=None (--live) omits the --registry override so stackql
    # resolves the provider from the public registry, signatures verified.
    cmd = [stackql]
    if registry_path:
        cmd.append(registry_arg(registry_path))
    # The bare "--" argv separator stops the CLI parsing a query that begins
    # with a SQL comment as a flag.
    cmd += ["--output", "json", "exec", "--", query]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    return proc.returncode, proc.stdout or "", proc.stderr or ""


def parse_rows(stdout):
    text = stdout.strip()
    if not text:
        return None
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        return None
    if isinstance(parsed, list):
        return parsed
    if isinstance(parsed, dict):
        return [parsed]
    return None


def evaluate(expect, rc, stdout, stderr, rows, fatal_patterns):
    failures = []
    combined = stdout + "\n" + stderr
    for pattern in fatal_patterns:
        if pattern.lower() in combined.lower():
            failures.append("fatal pattern %r in output: %s" % (pattern, combined.strip()[:300]))
    if rc != 0 and not expect.get("allow_error", False):
        failures.append("exit code %d: %s" % (rc, (stderr or stdout).strip()[:300]))
    min_rows = expect.get("min_rows")
    if min_rows is not None:
        count = len(rows) if rows is not None else 0
        if count < min_rows:
            failures.append("expected >= %d rows, got %d" % (min_rows, count))
    for needle in expect.get("contains", []) or []:
        if needle not in combined:
            failures.append("output does not contain %r" % needle)
    for needle in expect.get("not_contains", []) or []:
        if needle in combined:
            failures.append("output still contains %r" % needle)
    return failures


def extract_exports(test, stdout, stderr, rows, render):
    values = {}
    failures = []
    for export in test.get("exports", []) or []:
        name = export["name"]
        if "column" in export:
            row_index = export.get("row", 0)
            if not rows or row_index >= len(rows):
                if export.get("optional"):
                    continue
                failures.append("export %r: no row %d in result" % (name, row_index))
                continue
            row = rows[row_index]
            if export["column"] not in row:
                failures.append("export %r: column %r not in row (have: %s)" % (name, export["column"], ", ".join(sorted(row))))
                continue
            values[name] = row[export["column"]]
        elif "regex" in export:
            pattern = render(str(export["regex"]))
            match = re.search(pattern, stdout + "\n" + stderr)
            if not match:
                if not export.get("optional"):
                    failures.append("export %r: regex %r not found" % (name, pattern))
                continue
            values[name] = match.group(1) if match.groups() else match.group(0)
        else:
            failures.append("export %r: needs 'column' or 'regex'" % name)
    return values, failures


def rollback(stackql, registry_path, rules, render, timeout=180):
    """Best-effort teardown of every smoke breadcrumb by live discovery,
    driven by the manifest's `config.rollback` rules:

        - description: archive smoke agents
          discover: SELECT id, name FROM anthropic.agents.agents
          name_column: name          # rows whose value starts with stackql-smoke
          id_column: id
          action: EXEC anthropic.agents.agents.archive @agent_id = '{{ id }}'

    Independent of the manifest export chain so it works after a mid-run
    failure or Ctrl+C. A discover query that errors (a beta surface the key
    is not enrolled in) is logged and skipped."""

    def log(msg):
        print("[rollback] %s" % msg, flush=True)

    def q(sql, tolerate=True):
        try:
            rc, out, err = run_stackql(stackql, registry_path, sql, timeout)
        except (subprocess.TimeoutExpired, OSError) as exc:
            log("ERROR running %r: %s" % (sql[:100], exc))
            return 1, "", "", None
        if rc != 0 and not tolerate:
            log("ERROR (%d): %s -> %s" % (rc, sql[:100], (err or out).strip()[:180]))
        return rc, out or "", err or "", parse_rows(out)

    if not rules:
        log("no rollback rules in the manifest (read-only suite) - nothing to do")
        return
    log("scanning for smoke breadcrumbs")
    for rule in rules:
        rc, out, err, rows = q(render(rule["discover"]))
        if rc != 0:
            log("skip %r: discovery failed (%s)" % (rule.get("description", "rule"), (err or out).strip()[:160]))
            continue
        name_col = rule.get("name_column", "name")
        id_col = rule.get("id_column", "id")
        hits = [r for r in (rows or []) if str(r.get(name_col, "")).startswith(SMOKE_PREFIX)]
        for r in hits:
            log("%s: %s (%s)" % (rule.get("description", "rule"), r[id_col], r[name_col]))
            q(render(rule["action"], id=r[id_col]), tolerate=False)
        if not hits:
            log("%s: no breadcrumbs" % rule.get("description", "rule"))
    log("rollback complete")


def base_context():
    now = datetime.now(timezone.utc).replace(microsecond=0)
    stamp = str(int(time.time()))[-6:]
    midnight = now.replace(hour=0, minute=0, second=0)
    iso = lambda d: d.isoformat().replace("+00:00", "Z")  # noqa: E731
    return {
        "stamp": stamp,
        "now_iso": iso(now),
        "today_midnight_iso": iso(midnight),
        "days_ago_7_iso": iso(now - timedelta(days=7)),
        "days_ago_7_midnight_iso": iso(midnight - timedelta(days=7)),
        "days_ago_30_iso": iso(now - timedelta(days=30)),
        "days_ago_30_midnight_iso": iso(midnight - timedelta(days=30)),
        "today_date": midnight.strftime("%Y-%m-%d"),
        "days_ago_7_date": (midnight - timedelta(days=7)).strftime("%Y-%m-%d"),
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--manifest", default=DEFAULT_MANIFEST, help="manifest to run (default: the anthropic live manifest)")
    ap.add_argument("--stackql", default=None, help="stackql binary (default: $STACKQL, ./stackql, else 'stackql' on PATH)")
    ap.add_argument("--env-file", default=None, help="dotenv file with the provider credentials")
    ap.add_argument("--only", default=None, help="comma-separated test names to run (dependencies are NOT auto-included)")
    ap.add_argument("--list", action="store_true", help="list tests and exit")
    ap.add_argument("--verbose", action="store_true", help="print each rendered query and raw output")
    ap.add_argument("--rendered-sql", default=None, metavar="FILE", help="write every rendered query executed this run to FILE")
    ap.add_argument("--rollback", action="store_true", help="run ONLY the breadcrumb rollback (live discovery + teardown) and exit")
    ap.add_argument("--no-rollback", action="store_true", help="do not auto-run the rollback after a failed or interrupted run")
    ap.add_argument("--live", action="store_true",
                    help="test the published provider from the public stackql registry (drops the local --registry override; "
                         "the provider is pulled and signature-verified by stackql first)")
    args = ap.parse_args()

    with open(args.manifest, "r", encoding="utf-8") as f:
        manifest = yaml.safe_load(f)

    config = manifest.get("config") or {}
    provider = config.get("provider")
    credentials_var = config.get("credentials_env_var")
    if not provider or not credentials_var:
        print("manifest config needs `provider` and `credentials_env_var`", file=sys.stderr)
        return 2
    manifest_dir = os.path.dirname(os.path.abspath(args.manifest))
    queries_dir = os.path.join(manifest_dir, config.get("queries_dir", "queries"))
    registry_path = None if args.live else os.path.abspath(os.path.join(manifest_dir, config.get("registry_path", "../provider-dev/openapi")))
    timeout = int(config.get("query_timeout_seconds", 120))
    fatal_patterns = config.get("fatal_patterns", DEFAULT_FATAL_PATTERNS)
    pause = float(config.get("inter_request_delay_seconds", 0.25))
    stackql = find_stackql(args.stackql)

    if args.env_file:
        load_env_file(args.env_file)
    apply_env_aliases(config.get("credentials_env_aliases"))

    tests = manifest.get("tests") or []
    if args.list:
        for t in tests:
            print("%-34s %s" % (t["name"], t.get("description", "")))
        return 0

    if not os.environ.get(credentials_var):
        print("%s is not set - export it or pass --env-file .env" % credentials_var, file=sys.stderr)
        return 2

    only = set(args.only.split(",")) if args.only else None

    try:
        version_proc = subprocess.run([stackql, "--version"], capture_output=True, text=True, timeout=30)
        version = (version_proc.stdout or "").strip().splitlines()
        version = version[0] if version else "unknown"
    except OSError as exc:
        print("cannot execute stackql binary %r: %s" % (stackql, exc), file=sys.stderr)
        return 2
    print("binary:   %s" % stackql)
    print("version:  %s" % version)
    print("provider: %s" % provider)
    print("registry: %s" % (registry_path or "public registry (live)"))

    if args.live:
        print("pulling %s provider from the public registry ..." % provider)
        try:
            rc, out, err = run_stackql(stackql, registry_path, "REGISTRY PULL %s" % provider, timeout)
        except (subprocess.TimeoutExpired, OSError) as exc:
            print("registry pull failed: %s" % exc, file=sys.stderr)
            return 2
        pull_text = (out + err).strip()
        if pull_text:
            print(pull_text)
        if rc != 0:
            print("registry pull failed (rc=%d), aborting" % rc, file=sys.stderr)
            return 2
        try:
            rc, out, err = run_stackql(stackql, registry_path, "SHOW PROVIDERS", timeout)
        except (subprocess.TimeoutExpired, OSError):
            rc, out = 1, ""
        pulled_version = None
        for row in parse_rows(out) or []:
            if row.get("name") == provider:
                pulled_version = row.get("version")
        print("provider: %s %s (public registry)" % (provider, pulled_version or "(version unknown)"))

    jenv = Environment(undefined=StrictUndefined)
    context = base_context()
    # manifest vars may reference the base context ({{ stamp }}) and env vars
    context["env"] = dict(os.environ)
    for k, v in (manifest.get("vars") or {}).items():
        context[k] = jenv.from_string(str(v)).render(**context) if isinstance(v, str) else v
    print("stamp:    %s  (resources named %s-%s-*)" % (context["stamp"], SMOKE_PREFIX, context["stamp"]))

    def render_ctx(s, **extra):
        return jenv.from_string(s).render(**{**context, **extra})

    if args.rollback:
        rollback(stackql, registry_path, config.get("rollback"), render_ctx, timeout)
        return 0

    results = []
    rendered_log = []
    run_aborted = False
    interrupted = False

    try:
        for test in tests:
            name = test["name"]
            if only is not None and name not in only:
                continue
            always_run = bool(test.get("always_run", False))
            if run_aborted and not always_run:
                results.append(TestResult(name, SKIP, "earlier failure"))
                continue
            skip_if = test.get("skip_if_var")
            if skip_if and (context.get(skip_if) or os.environ.get(skip_if)):
                results.append(TestResult(name, SKIP, "%s is set" % skip_if))
                continue
            requires = test.get("requires_var")
            if requires and not (context.get(requires) or os.environ.get(requires)):
                results.append(TestResult(name, SKIP, "%s is not set" % requires))
                continue

            def render(s, _ctx=context):
                return jenv.from_string(s).render(**_ctx)

            started = time.time()
            try:
                if "sql" in test:
                    raw_query = test["sql"]
                else:
                    with open(os.path.join(queries_dir, test["file"]), "r", encoding="utf-8") as f:
                        raw_query = f.read()
                query = render(raw_query).strip()
                expect = dict(test.get("expect") or {})
                expect["contains"] = [render(str(n)) for n in (expect.get("contains") or [])]
                expect["not_contains"] = [render(str(n)) for n in (expect.get("not_contains") or [])]
            except UndefinedError as exc:
                results.append(TestResult(name, SKIP, "unresolvable template: %s" % exc))
                continue
            except OSError as exc:
                results.append(TestResult(name, FAIL, str(exc)))
                run_aborted = True
                continue

            if args.verbose:
                print("--- %s ---\n%s" % (name, query))
            if args.rendered_sql is not None:
                header = ["-- " + "=" * 66, "-- test: %s" % name]
                if test.get("description"):
                    header.append("-- %s" % test["description"])
                header.append("-- " + "=" * 66)
                rendered_log.append("\n".join(header) + "\n" + query + ";\n")

            retry = test.get("retry") or {}
            attempts = max(1, int(retry.get("attempts", 1)))
            delay = float(retry.get("delay_seconds", 5))
            failures = ["not run"]
            stdout = stderr = ""
            rows = None
            for attempt in range(attempts):
                if attempt:
                    print("  [retry] attempt %d/%d failed (%s); retrying in %ds" % (attempt, attempts, "; ".join(failures)[:160], delay), flush=True)
                    time.sleep(delay)
                try:
                    rc, stdout, stderr = run_stackql(stackql, registry_path, query, timeout)
                except (subprocess.TimeoutExpired, OSError) as exc:
                    failures = ["invocation failed: %s" % exc]
                    continue
                rows = parse_rows(stdout)
                exempt = set(test.get("fatal_exempt") or [])
                effective_fatal = [p for p in fatal_patterns if p not in exempt]
                failures = evaluate(expect, rc, stdout, stderr, rows, effective_fatal)
                if not failures:
                    break
            if pause:
                time.sleep(pause)

            if args.verbose:
                print(stdout.strip() or stderr.strip())

            if failures:
                results.append(TestResult(name, FAIL, "; ".join(failures), time.time() - started))
                run_aborted = True
                continue

            export_values, export_failures = extract_exports(test, stdout, stderr, rows, render)
            if export_failures:
                results.append(TestResult(name, FAIL, "; ".join(export_failures), time.time() - started))
                run_aborted = True
                continue
            if export_values:
                context[name] = {**context.get(name, {}), **export_values}

            results.append(TestResult(name, PASS, "", time.time() - started))
    except KeyboardInterrupt:
        interrupted = True
        print("\n[interrupt] run interrupted - proceeding to summary and rollback", flush=True)

    if args.rendered_sql is not None:
        with open(args.rendered_sql, "w", encoding="utf-8") as f:
            f.write("-- Rendered queries executed by tests/smoke.py (%s)\n-- binary: %s\n-- version: %s\n\n" % (os.path.basename(args.manifest), stackql, version))
            f.write("\n".join(rendered_log))
        print("rendered SQL written to %s (%d queries)" % (args.rendered_sql, len(rendered_log)))

    width = max((len(r.name) for r in results), default=10)
    print("\n" + "=" * 74)
    counts = {PASS: 0, FAIL: 0, SKIP: 0}
    for r in results:
        counts[r.status] += 1
        line = "  %-*s  %-4s  %5.1fs" % (width, r.name, r.status, r.duration)
        if r.detail:
            line += "  %s" % r.detail[:180]
        print(line)
    print("=" * 74)
    print("  %d passed, %d failed, %d skipped" % (counts[PASS], counts[FAIL], counts[SKIP]))

    if (interrupted or counts[FAIL]) and not args.no_rollback and config.get("rollback"):
        print("\nfailure/interrupt detected - rolling back smoke breadcrumbs (disable with --no-rollback)", flush=True)
        rollback(stackql, registry_path, config.get("rollback"), render_ctx, timeout)

    if interrupted:
        return 130
    return 1 if counts[FAIL] else 0


if __name__ == "__main__":
    sys.exit(main())
