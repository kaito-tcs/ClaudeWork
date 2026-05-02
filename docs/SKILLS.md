# Slash Command Catalogue

This studio ships **66 slash commands** that wrap the SDLC end-to-end. Each command names the agents it invokes, follows the **Question → Options → Decision → Draft → Approval** contract, and produces concrete artifacts.

> Open any command file in `.claude/commands/<name>.md` to read or edit its workflow.

---

## Initialization & Planning

| Command | Purpose |
|---|---|
| `/start` | Assess project state (greenfield / spec / existing code) and route to the right workflow |
| `/create-prd` | Produce a Product Requirements Doc |
| `/create-spec` | Convert a PRD into a Technical Spec |
| `/create-epics` | Break a spec into epics |
| `/create-stories` | Split epics into user stories with acceptance criteria |
| `/dev-story` | Implement one story end-to-end (code + tests + docs) |
| `/story-done` | Final review, run gates, mark story complete |
| `/sprint-plan` | Sprint planning ceremony output |
| `/sprint-retro` | Retro template + analysis |

## Architecture

| Command | Purpose |
|---|---|
| `/design-system-architecture` | Services, data flow, integration patterns |
| `/design-data-model` | ER design, schema, indexes |
| `/design-api` | REST / OpenAPI 3.1 or GraphQL schema, error model, versioning |
| `/create-adr` | Architecture decision record |
| `/tech-debt-audit` | Categorize / prioritize tech debt |
| `/migration-plan` | Plan a multi-step migration (e.g. monolith → service) |

## Frontend

| Command | Purpose |
|---|---|
| `/scaffold-nextjs` | Next.js 15 App Router + TS + Tailwind + ESLint + tests |
| `/scaffold-react-spa` | Vite + React + TS SPA |
| `/create-component` | Typed React component + Storybook + unit test |
| `/create-page` | Next.js page with metadata, layout, data fetching |
| `/add-routing` | App Router routing with nested + intercepting routes |
| `/add-state-management` | Zustand / Redux Toolkit / TanStack Query setup |
| `/optimize-bundle` | Bundle analysis + code-splitting plan |
| `/add-i18n` | next-intl / formatjs setup with routing |
| `/audit-a11y` | axe-core + manual pass + remediation plan |
| `/audit-cwv` | Core Web Vitals audit with Lighthouse CI |

## Backend

| Command | Purpose |
|---|---|
| `/scaffold-fastapi` | FastAPI + Pydantic v2 + async SQLAlchemy + Alembic + pytest |
| `/scaffold-django` | Django 5 + DRF + Postgres + Celery + pytest |
| `/create-endpoint` | Typed REST endpoint with validation, tests, OpenAPI |
| `/create-model` | ORM model + migration + admin/CRUD + tests |
| `/create-migration` | Safe DB migration (online schema change pattern) |
| `/add-auth` | OAuth2/OIDC or session+CSRF, password (Argon2), MFA hooks |
| `/add-rbac` | Role/permission model + decorators + tests |
| `/add-caching` | Redis caching with stampede protection and invalidation |
| `/add-rate-limiting` | Token-bucket rate limiter; per-route/per-user policies |
| `/add-background-task` | Celery / ARQ task with retries, idempotency, DLQ |
| `/add-webhook` | Outbound webhook delivery (signed, retried, observable) |
| `/optimize-query` | EXPLAIN ANALYZE + index recommendations |

## Testing & Quality

| Command | Purpose |
|---|---|
| `/write-unit-tests` | pytest / Vitest unit tests for changed code |
| `/write-integration-tests` | DB + HTTP integration tests |
| `/write-e2e-tests` | Playwright E2E test for a user journey |
| `/test-coverage-audit` | Coverage report + gap analysis + plan |
| `/code-review` | Full review pass on a diff/PR (security + perf + correctness) |
| `/refactor` | Propose + execute a targeted refactor |
| `/debug-issue` | Structured debug (reproduce, isolate, fix, regression test) |
| `/fix-flaky-test` | Root-cause flake and stabilize |

## Security

| Command | Purpose |
|---|---|
| `/security-audit` | OWASP-aligned audit pass |
| `/threat-model` | STRIDE-based threat model for a feature |
| `/dependency-audit` | pip-audit / npm audit / Snyk; triage CVEs |
| `/owasp-check` | Top 10 self-check across the codebase |
| `/pen-test` | Exploratory pen test against staging |
| `/secret-scan` | gitleaks / trufflehog scan + remediation |

## DevOps & Release

| Command | Purpose |
|---|---|
| `/setup-cicd` | GitHub Actions pipeline (lint, type, test, build, deploy) |
| `/dockerize` | Multi-stage Dockerfile + Compose for app + db + cache |
| `/setup-observability` | OpenTelemetry + Prometheus + Grafana + Sentry |
| `/deploy-checklist` | Pre-deploy gate |
| `/incident-response` | Triage + comms + runbook |
| `/postmortem` | Blameless postmortem |
| `/provision-infra` | Terraform module for app infra (AWS or GCP) |
| `/release-notes` | Generate release notes from commits + PRs |

## Team Orchestration

These commands coordinate **multiple agents** on a single deliverable.

| Command | Purpose |
|---|---|
| `/team-feature` | Full feature: PRD → spec → stories → impl → tests → review → release notes |
| `/team-bug-fix` | Repro → fix → test → review → deploy |
| `/team-release` | Release coordination across FE / BE / DevOps / QA |
| `/team-security-review` | security-auditor + penetration-tester + code-reviewer |
| `/team-performance` | Frontend + backend + database performance specialists |
| `/team-a11y` | accessibility-engineer + accessibility-tester + lead-ux-engineer |
| `/team-incident` | incident-response + monitoring + on-call coordination |
