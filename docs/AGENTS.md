# Agent Roster

This studio is staffed by **42 specialized agents** organized into three tiers. This page is the directory — _who_ does _what_ and _when_ to invoke them.

> All agents follow the studio contract: **Question → Options → Decision → Draft → Approval**. They never auto-execute architecture-level decisions.

---

## Tier 1 — Directors (`opus`)

These three own vision and arbitrate cross-cutting decisions. Invoked at initiative kickoff and for architecture-level calls.

| Agent | Owns | Invoke when… |
|---|---|---|
| `product-director` | Product vision, user stories, RICE prioritization | starting a new feature, deciding what to build, prioritizing the backlog |
| `tech-director` | Stack, architecture, build vs buy, ADR sign-off | choosing between technologies, scoping a major redesign, accepting an ADR |
| `engineering-manager` | Sprint planning, capacity, risk, cross-team coordination | planning a sprint, estimating, managing dependencies |

---

## Tier 2 — Department Leads (`sonnet`)

Each lead owns one domain end-to-end. They translate director intent into specs and unblock specialists.

| Agent | Owns |
|---|---|
| `lead-architect` | System architecture, service boundaries, data flow |
| `lead-frontend-engineer` | Frontend roadmap, component strategy, build pipeline |
| `lead-backend-engineer` | Backend roadmap, API contracts, framework choice |
| `lead-qa-engineer` | Test strategy, coverage policy, release readiness |
| `lead-security-engineer` | Threat model, secure SDLC, secrets, auth model |
| `lead-devops-engineer` | CI/CD, infra, observability, on-call, SLO/SLI |
| `lead-data-engineer` | Schema strategy, migration policy, analytics pipelines |
| `lead-ux-engineer` | Design system, IA, interaction patterns, a11y baseline |

---

## Tier 3 — Specialists (`sonnet` / `haiku` for narrow tasks)

### Frontend (TypeScript / React / Next.js)

| Agent | Owns |
|---|---|
| `react-engineer` | React 18+, hooks, suspense, composition |
| `nextjs-engineer` | App Router, server components/actions, ISR/SSG/SSR |
| `typescript-specialist` | strict-mode TS, generics, narrowing |
| `css-engineer` | Tailwind v4, CSS Modules, design tokens |
| `state-management-specialist` | RSC data, TanStack Query, Zustand, Redux Toolkit |
| `frontend-performance-engineer` | Core Web Vitals (LCP/INP/CLS), bundle analysis |
| `accessibility-engineer` | WCAG 2.2 AA, ARIA, keyboard, screen-reader |
| `component-library-engineer` | Storybook 8, Chromatic, design-system upkeep |
| `i18n-engineer` | locale routing, ICU MessageFormat, RTL |

### Backend (Python)

| Agent | Owns |
|---|---|
| `python-engineer` | Idiomatic Python 3.12+, typing, async, packaging |
| `django-specialist` | Django 5.x, ORM, admin, DRF, channels |
| `fastapi-specialist` | FastAPI, Pydantic v2, async SQLAlchemy 2, Alembic |
| `database-engineer` | PostgreSQL 16, indexes, EXPLAIN ANALYZE, partitioning |
| `api-designer` | REST/OpenAPI 3.1, GraphQL, error envelopes (RFC 7807) |
| `authentication-engineer` | OAuth2/OIDC, JWT, MFA (TOTP/WebAuthn), Argon2 |
| `caching-engineer` | Redis, CDN, HTTP cache, stampede control |
| `task-queue-engineer` | Celery, RQ, ARQ, idempotency, DLQ |
| `backend-performance-engineer` | profiling, N+1, async, connection pools |

### QA & Security

| Agent | Owns |
|---|---|
| `test-engineer` | Unit/integration with pytest, Vitest, contract tests |
| `e2e-test-engineer` | Playwright, Cypress, auth flows, visual regression |
| `code-reviewer` | Correctness, idiom, readability, coverage |
| `security-auditor` | OWASP Top 10, secret scanning, CVE triage |
| `penetration-tester` | Auth bypass, IDOR, SSRF, injection, exploit chains |
| `accessibility-tester` | axe, manual SR pass, keyboard-only, color contrast |
| `performance-tester` | k6, Locust, Lighthouse CI, soak tests |

### DevOps & Platform

| Agent | Owns |
|---|---|
| `ci-cd-engineer` | GitHub Actions, GitLab CI, build/test/deploy |
| `docker-engineer` | Dockerfiles, multi-stage, distroless, BuildKit |
| `cloud-engineer` | AWS / GCP, Terraform, IAM, VPC, secrets manager |
| `monitoring-engineer` | Prometheus, Grafana, OpenTelemetry, Sentry |

### Data & Analytics

| Agent | Owns |
|---|---|
| `analytics-engineer` | Event taxonomy, funnels, dashboards, warehouse SQL |
| `data-pipeline-engineer` | ETL/ELT, dbt, Airflow, Dagster, data quality |

---

## How to invoke

Most users don't invoke an agent directly — they use a slash command (see [`SKILLS.md`](./SKILLS.md)) and the command picks the right agent. To invoke explicitly:

```
@react-engineer please refactor src/components/UserCard.tsx to use suspense boundaries
```

## Where each agent lives

`.claude/agents/<name>.md` — open any of these to read or edit the system prompt.
