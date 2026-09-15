# StackQL Anthropic provider factory: `anthropic` (spec-driven) and
# `anthropic_admin` (docs-driven) from one pipeline.
#
# Every step is deterministic and re-runnable; mapping decisions live in
# factory/ (csv-review.mjs rules, exclusions.yaml, beta-flags.yaml,
# service-map.mjs), never in hand-edited artifacts. `make all` runs the
# full chain: verify the spec pin -> build both providers -> offline +
# integration + meta-route tests + docs-example check -> docs -> website
# builds. The live smoke suites (`make smoke`, `make smoke-live`) need
# credentials and are never part of `all`.
#
# Requirements: Node >= 20, GNU make, a stackql binary ($STACKQL, ./stackql
# or on PATH; the integration runner downloads one on Linux/macOS if none
# is found), Python 3 with pyyaml and jinja2 for the smoke suites, yarn for
# the websites. Runs under Linux / WSL / macOS (the stackql binary is a
# Linux ELF on Windows hosts - use WSL).
#
# Live credentials (never committed - .env is gitignored; `make smoke`
# sources it if present, see .env.example):
#   ANTHROPIC_API_KEY     anthropic provider
#   ANTHROPIC_ADMIN_KEY   anthropic_admin provider (ANTHROPIC_ADMIN_API_KEY accepted)

SHELL := bash
.DEFAULT_GOAL := help

USER_DIR := stackql_anthropic_provider
ADMIN_DIR := stackql_anthropic_admin_provider
USER_PROVIDER_ROOT := $(USER_DIR)/provider-dev/openapi/src/anthropic/v00.00.00000
ADMIN_PROVIDER_ROOT := $(ADMIN_DIR)/provider-dev/openapi/src/anthropic_admin/v00.00.00000
PORT ?= 5444
ENV_FILE := .env
PYTHON ?= $(shell command -v python3 >/dev/null 2>&1 && echo python3 || echo python)

.PHONY: help deps fetch-spec refresh-spec build build-user build-admin check-mappings mappings guards \
        test test-offline test-integration test-meta test-doc-examples \
        smoke smoke-admin smoke-live smoke-admin-live smoke-cleanup smoke-list \
        docs docs-admin website website-admin website-start clean all

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils per package.json range; postinstall patches docgen)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-spec: ## guard 5 - verify the bundled upstream spec against factory/spec-snapshot.json (exit 3 on drift, never writes)
	node factory/locate.mjs

refresh-spec: ## ACCEPT the upstream spec: re-pin the snapshot and re-vendor the spec (review the diff, then make build)
	node factory/locate.mjs --pin
	node factory/download.mjs

mappings: ## anthropic: pre-pass, split, normalize, analyze (appends new ops to all_services.csv) and apply the review rules
	npm run prepass
	npm run split
	npm run normalize
	npm run analyze
	node factory/csv-review.mjs

check-mappings: ## like mappings, but FAIL if all_services.csv is not the reviewed state (unreviewed or drifted rows)
	npm run prepass
	npm run split
	npm run normalize
	npm run analyze
	node factory/csv-review.mjs --check

build-user: mappings ## anthropic: generate the provider tree, post-pass, guards 1-4 + 6
	npm run generate
	npm run guards

build-admin: ## anthropic_admin: stage the hand-authored specs, normalize, analyze, generate, post-pass, guards
	npm run build-admin

build: build-user build-admin ## both providers from the vendored inputs

guards: ## re-run the build guards on the generated anthropic tree (no regeneration)
	npm run guards

# ------------------------------------------------------------------- tests

test-offline: ## SHOW / DESCRIBE assertions over the local file registry, both providers (no server, no credentials)
	node $(USER_DIR)/tests/offline_validation.mjs
	node $(ADMIN_DIR)/tests/offline_validation.mjs

test-integration: ## manifest-driven suites against the wire-contract-enforcing mock API, both providers (no credentials)
	node tests/integration/run_integration_tests.cjs --manifest $(USER_DIR)/tests/integration/manifest.yaml
	node tests/integration/run_integration_tests.cjs --manifest $(ADMIN_DIR)/tests/integration/manifest.yaml

test-meta: ## meta-route walk (SHOW / DESCRIBE EXTENDED over every resource) against a local stackql server, both providers
	node $(USER_DIR)/bin/test-meta-routes.cjs anthropic --port $(PORT)
	node $(ADMIN_DIR)/bin/test-meta-routes.cjs anthropic_admin --port $(PORT)

test-doc-examples: ## every SQL example on both docs index pages must be a query the integration suites run
	node factory/check-doc-examples.mjs

test: test-offline test-integration test-meta test-doc-examples ## all non-live test layers

# `make smoke` sources .env when present so a developer checkout works
# without exporting anything; CI sets the keys from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '\r' < $(ENV_FILE)); set +a;

smoke: ## live smoke suite, anthropic, against the LOCAL provider (reads + one 16-token completion)
	@$(with_env) $(PYTHON) tests/smoke.py --manifest $(USER_DIR)/tests/manifest.yaml $(SMOKE_ARGS)

smoke-admin: ## live smoke suite, anthropic_admin, against the LOCAL provider (READ-ONLY)
	@$(with_env) $(PYTHON) tests/smoke.py --manifest $(ADMIN_DIR)/tests/manifest.yaml $(SMOKE_ARGS)

smoke-live: ## live smoke suite, anthropic, against the PUBLISHED provider in the public registry (--live)
	@$(with_env) $(PYTHON) tests/smoke.py --manifest $(USER_DIR)/tests/manifest.yaml --live $(SMOKE_ARGS)

smoke-admin-live: ## live smoke suite, anthropic_admin, against the PUBLISHED provider (--live, READ-ONLY)
	@$(with_env) $(PYTHON) tests/smoke.py --manifest $(ADMIN_DIR)/tests/manifest.yaml --live $(SMOKE_ARGS)

smoke-cleanup: ## discover and archive stackql-smoke-* breadcrumbs (agents), then exit
	@$(with_env) $(PYTHON) tests/smoke.py --manifest $(USER_DIR)/tests/manifest.yaml --rollback $(SMOKE_ARGS)

smoke-list: ## list the live smoke tests of both suites and exit
	@$(PYTHON) tests/smoke.py --manifest $(USER_DIR)/tests/manifest.yaml --list
	@$(PYTHON) tests/smoke.py --manifest $(ADMIN_DIR)/tests/manifest.yaml --list

# -------------------------------------------------------------------- docs

docs: ## generate the anthropic website docs (docgen v2 -> enrich SELECT docs -> scrub)
	npm run docgen

docs-admin: ## generate the anthropic_admin website docs
	npm run docgen-admin

website: ## build the anthropic Docusaurus microsite (vendors the shared config first)
	cd $(USER_DIR)/website && yarn install && yarn build

website-admin: ## build the anthropic_admin Docusaurus microsite
	cd $(ADMIN_DIR)/website && yarn install && yarn build

website-start: ## run the anthropic docusaurus dev server
	cd $(USER_DIR)/website && yarn install && yarn start

clean: ## remove generated artifacts (provider trees, split specs, docs, website builds)
	rm -rf $(USER_DIR)/provider-dev/openapi/src $(ADMIN_DIR)/provider-dev/openapi/src \
	       $(USER_DIR)/provider-dev/source/split $(ADMIN_DIR)/provider-dev/source/split \
	       $(USER_DIR)/website/docs/services $(ADMIN_DIR)/website/docs/services \
	       $(USER_DIR)/website/build $(USER_DIR)/website/.docusaurus \
	       $(ADMIN_DIR)/website/build $(ADMIN_DIR)/website/.docusaurus

all: deps fetch-spec build test docs docs-admin website website-admin ## everything non-live: deps, pin check, pipeline, tests, docs, site builds
