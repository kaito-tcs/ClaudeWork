# Claude Code Web Engineering Studio - Slash Commands

Complete set of 66 slash commands for orchestrating web engineering workflows in Claude Code.

## Command Categories

### Initialization & Planning (9)
Guide projects from conception to sprint-level execution.

- **`/start`** — Assess project state and route to appropriate workflow
- **`/create-prd`** — Produce a Product Requirements Document
- **`/create-spec`** — Create Technical Specification from PRD
- **`/create-epics`** — Break spec into epics with dependencies
- **`/create-stories`** — Break epics into user stories with AC
- **`/dev-story`** — Implement one story end-to-end (code, tests, docs)
- **`/story-done`** — Final review gate and story completion
- **`/sprint-plan`** — Sprint planning ceremony
- **`/sprint-retro`** — Sprint retrospective and metrics

### Architecture (6)
Design systems, data models, and APIs before implementation.

- **`/design-system-architecture`** — Design services, data flow, integration patterns
- **`/design-data-model`** — ER schema, indexes, and data ownership
- **`/design-api`** — REST/GraphQL API contract and OpenAPI spec
- **`/create-adr`** — Architecture Decision Record for design decisions
- **`/tech-debt-audit`** — Categorize and prioritize tech debt
- **`/migration-plan`** — Plan multi-step migrations (monolith→service, etc.)

### Frontend (10)
Modern web frontend development with Next.js, React, and TypeScript.

- **`/scaffold-nextjs`** — Next.js 15 App Router scaffold with TS, Tailwind, testing
- **`/scaffold-react-spa`** — Vite + React SPA scaffold with routing and state
- **`/create-component`** — Typed React component with story and unit test
- **`/create-page`** — Next.js page with metadata, layout, and data fetching
- **`/add-routing`** — App Router setup with nested layouts and intercepting routes
- **`/add-state-management`** — Zustand/Redux Toolkit/TanStack Query setup
- **`/optimize-bundle`** — Bundle analysis, code-splitting, and optimization
- **`/add-i18n`** — Multi-language support with next-intl
- **`/audit-a11y`** — Accessibility audit (axe-core) and remediation
- **`/audit-cwv`** — Core Web Vitals optimization

### Backend (12)
Python/FastAPI and Django backends with async, validation, and persistence.

- **`/scaffold-fastapi`** — FastAPI + Pydantic v2 + SQLAlchemy + Alembic project
- **`/scaffold-django`** — Django 5 + DRF + PostgreSQL + Celery project
- **`/create-endpoint`** — REST endpoint with validation, tests, OpenAPI
- **`/create-model`** — ORM model with migration, admin, CRUD, and tests
- **`/create-migration`** — Safe database migration with reversibility
- **`/add-auth`** — OAuth2/JWT or session-based authentication
- **`/add-rbac`** — Role-based access control with decorators
- **`/add-caching`** — Redis caching with stampede protection
- **`/add-rate-limiting`** — Token-bucket rate limiting per user/endpoint
- **`/add-background-task`** — Celery/ARQ tasks with retries and DLQ
- **`/add-webhook`** — Outbound webhooks (signed, retried, observable)
- **`/optimize-query`** — Query optimization with EXPLAIN ANALYZE and indexes

### Testing & Quality (8)
Comprehensive testing and code quality practices.

- **`/write-unit-tests`** — pytest/Vitest unit tests for code
- **`/write-integration-tests`** — DB + HTTP integration tests
- **`/write-e2e-tests`** — Playwright E2E tests for user journeys
- **`/test-coverage-audit`** — Coverage report and gap analysis
- **`/code-review`** — Full code review (security, performance, correctness)
- **`/refactor`** — Targeted refactoring (reduce duplication, improve clarity)
- **`/debug-issue`** — Structured debugging (reproduce, isolate, fix, test)
- **`/fix-flaky-test`** — Root-cause and stabilize flaky tests

### Security (6)
OWASP-aligned security practices and threat modeling.

- **`/security-audit`** — OWASP Top 10 audit pass
- **`/threat-model`** — STRIDE-based threat modeling
- **`/dependency-audit`** — CVE scanning and triage (pip-audit, npm audit)
- **`/owasp-check`** — Quick OWASP Top 10 self-check
- **`/pen-test`** — Exploratory penetration testing
- **`/secret-scan`** — Scan git history for exposed secrets

### DevOps & Release (8)
Infrastructure, deployment, and release management.

- **`/setup-cicd`** — GitHub Actions pipeline (lint, test, build, deploy)
- **`/dockerize`** — Multi-stage Dockerfile and docker-compose
- **`/setup-observability`** — OpenTelemetry, Prometheus, Grafana, Sentry
- **`/deploy-checklist`** — Pre-deploy verification gate
- **`/incident-response`** — Triage, communicate, and manage incidents
- **`/postmortem`** — Blameless postmortem analysis
- **`/provision-infra`** — Terraform modules for AWS/GCP
- **`/release-notes`** — Generate release notes from commits/PRs

### Team Orchestration (7)
Multi-team coordination for complex workflows.

- **`/team-feature`** — Full feature workflow (PRD→spec→stories→impl→tests→release)
- **`/team-bug-fix`** — Bug fix coordination (repro→fix→test→review→deploy)
- **`/team-release`** — Release coordination across FE/BE/DevOps/QA
- **`/team-security-review`** — Coordinated security review (audit + pen-test + code review)
- **`/team-performance`** — Performance optimization (FE + BE + DB)
- **`/team-a11y`** — Accessibility review (engineer + tester + UX)
- **`/team-incident`** — Incident response coordination

## Using Commands

Each command file includes:

1. **Frontmatter** — Description and argument hint for command picker
2. **Purpose** — What the workflow accomplishes
3. **When to Use** — Trigger situations
4. **Inputs** — What the user must provide
5. **Workflow** — Numbered steps with agent names and outputs
6. **Outputs** — Concrete files and artifacts produced
7. **Quality Gates** — Verification criteria
8. **Example** — Realistic scenario demonstrating the command

Commands follow a consistent pattern: **Question → Options → Decision → Draft → Approval**.

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Vitest, Playwright

**Backend:** FastAPI or Django 5, Pydantic v2, async SQLAlchemy, pytest

**Database:** PostgreSQL 16, Redis

**DevOps:** Docker, GitHub Actions, Terraform

**Security:** OWASP Top 10, STRIDE, OAuth2, JWT, Argon2

## Agents Referenced

Commands invoke specialized agents to orchestrate work:

- **Leadership:** product-director, tech-director, engineering-manager
- **Architecture:** lead-architect, api-designer, database-engineer
- **Frontend:** lead-frontend-engineer, react-engineer, nextjs-engineer, typescript-specialist, css-engineer, state-management-specialist, frontend-performance-engineer, accessibility-engineer, component-library-engineer, i18n-engineer, ux-engineer
- **Backend:** lead-backend-engineer, python-engineer, django-specialist, fastapi-specialist, authentication-engineer, caching-engineer, task-queue-engineer, backend-performance-engineer
- **QA & Testing:** lead-qa-engineer, test-engineer, e2e-test-engineer, code-reviewer, accessibility-tester, performance-tester
- **Security:** lead-security-engineer, security-auditor, penetration-tester
- **DevOps:** lead-devops-engineer, ci-cd-engineer, docker-engineer, cloud-engineer, monitoring-engineer
- **Data:** lead-data-engineer, analytics-engineer, data-pipeline-engineer

## File Paths Referenced

Commands use real, opinionated file paths:

- Docs: `docs/adr/NNN-<slug>.md`, `docs/prd/`, `docs/spec/`, `docs/epics.md`, `docs/stories/`
- Frontend: `frontend/`, `src/components/`, `src/pages/`, `src/store.ts`
- Backend: `backend/`, `app/`, `app/api/routes/`, `app/models/`, `app/schemas/`, `migrations/`
- Tests: `tests/unit/`, `tests/integration/`, `tests/e2e/`
- Config: `.github/workflows/`, `docker-compose.yml`, `.env.example`, `tsconfig.json`, `pyproject.toml`

## Total Count

**66 commands** organized across 8 categories, enabling end-to-end web engineering from vision to production.

---

Last updated: May 2, 2026
