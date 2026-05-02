# Claude Code Web Engineering Studio

This repository turns Claude Code into a **professional web engineering studio**. Instead of one general-purpose assistant, you get a hierarchy of specialized agents — directors who own product/tech vision, leads who own each domain, and specialists who do the hands-on work.

The stack is opinionated for **Python (Django / FastAPI) on the backend** and **JavaScript / TypeScript (React / Next.js) on the frontend**, with first-class agents and skills for QA, security, performance, accessibility, and DevOps.

---

## Philosophy

This system is designed around four core principles:

1. **Separation of concerns.** Each agent owns one domain (auth, database, accessibility, performance, etc.). When you ask for help, the right specialist is invoked — not a generalist guessing.
2. **User-driven collaboration.** Agents do not autonomously execute. They follow `Question → Options → Decision → Draft → Approval`. You always make the call before code is written.
3. **Quality gates by default.** Every change is implicitly reviewed by a code-reviewer, security-auditor, and test-engineer before being marked done. Hooks enforce baseline checks (lint, type-check, secret scanning).
4. **Studio hierarchy mirrors real teams.** Directors guard vision. Leads own domains and unblock specialists. Specialists deliver. Same model that works at real engineering orgs.

---

## Architecture

```
claude-code-web-engineering/
├── CLAUDE.md                  # ← you are here (master configuration)
├── README.md                  # quick start
├── .claude/
│   ├── agents/                # 35+ agent personas (markdown + YAML frontmatter)
│   ├── commands/              # 55+ slash commands (workflow skills)
│   ├── hooks/                 # validation hooks (pre-commit, pre-push)
│   ├── settings.json          # model defaults, hook wiring, safety rules
│   └── docs/                  # in-system docs read by agents at runtime
└── docs/                      # human-facing documentation
    ├── AGENTS.md              # full roster + when to use each
    ├── SKILLS.md              # full slash-command catalogue
    └── WORKFLOWS.md           # end-to-end recipes (new feature, hotfix, release…)
```

---

## Agent Hierarchy

### Tier 1 — Directors (model: opus)

These three agents own vision and arbitrate cross-cutting decisions. They are invoked at the **start** of an initiative and again for **architecture-level** calls.

| Agent | Owns |
|---|---|
| `product-director` | Product vision, user stories, acceptance criteria, prioritization |
| `tech-director` | Tech stack, cross-cutting architecture, build vs. buy, ADRs |
| `engineering-manager` | Sprints, estimates, capacity, cross-team coordination |

### Tier 2 — Department Leads (model: sonnet)

Each lead owns one domain end-to-end. They translate director intent into specs and unblock specialists.

| Agent | Owns |
|---|---|
| `lead-architect` | System architecture, service boundaries, data flow |
| `lead-frontend-engineer` | Frontend roadmap, component strategy, build pipeline |
| `lead-backend-engineer` | Backend roadmap, API contracts, service decomposition |
| `lead-qa-engineer` | Test strategy, coverage policy, release readiness |
| `lead-security-engineer` | Threat model, secure SDLC, auth model |
| `lead-devops-engineer` | CI/CD, infra, observability, on-call |
| `lead-data-engineer` | Schema, migrations, analytics pipelines |
| `lead-ux-engineer` | Design system, IA, interaction patterns, a11y baseline |

### Tier 3 — Specialists (model: sonnet, occasionally haiku for narrow tasks)

#### Frontend (JavaScript / TypeScript)
- `react-engineer` — React component patterns, hooks, context
- `nextjs-engineer` — App Router, server components, edge/runtime, SSR/ISR
- `typescript-specialist` — types, generics, narrowing, strict-mode migrations
- `css-engineer` — Tailwind, CSS Modules, design tokens, responsive layouts
- `state-management-specialist` — Redux Toolkit, Zustand, TanStack Query, RSC data
- `frontend-performance-engineer` — Core Web Vitals, bundle analysis, lazy loading
- `accessibility-engineer` — WCAG 2.2, ARIA, keyboard, screen readers
- `component-library-engineer` — Storybook, MDX docs, design system maintenance
- `i18n-engineer` — locale routing, message catalogues, RTL, ICU

#### Backend (Python)
- `python-engineer` — idiomatic Python 3.12+, typing, async, packaging
- `django-specialist` — Django 5.x, ORM, admin, DRF, channels
- `fastapi-specialist` — FastAPI, Pydantic v2, dependency injection, async SQLAlchemy
- `database-engineer` — PostgreSQL, indexing, query plans, partitioning
- `api-designer` — REST, OpenAPI, GraphQL, versioning, pagination, error model
- `authentication-engineer` — OAuth2/OIDC, JWT, session, MFA, password policy
- `caching-engineer` — Redis, CDN, HTTP caching, cache invalidation
- `task-queue-engineer` — Celery, RQ, ARQ, scheduled jobs, idempotency
- `backend-performance-engineer` — profiling, N+1, async, connection pools

#### QA & Security
- `test-engineer` — unit + integration (pytest, Vitest, Jest)
- `e2e-test-engineer` — Playwright, Cypress, visual regression
- `code-reviewer` — correctness, readability, idiom, test coverage
- `security-auditor` — OWASP Top 10, secret scanning, dependency CVEs
- `penetration-tester` — auth bypass, IDOR, SSRF, injection, exploit chains
- `accessibility-tester` — axe, manual screen-reader pass, keyboard-only audit
- `performance-tester` — k6, Locust, Lighthouse CI, load profiles

#### DevOps & Platform
- `ci-cd-engineer` — GitHub Actions, GitLab CI, build/test/deploy pipelines
- `docker-engineer` — Dockerfiles, multi-stage, Compose, image hygiene
- `cloud-engineer` — AWS / GCP, IaC (Terraform), networking, IAM
- `monitoring-engineer` — Prometheus, Grafana, Sentry, structured logging, alerts

#### Data & Analytics
- `analytics-engineer` — events, funnels, dashboards, SQL warehouse
- `data-pipeline-engineer` — ETL/ELT, scheduled jobs, dbt, Airflow

---

## Slash Commands (Skills)

Slash commands are workflow recipes. They invoke the right agent(s), enforce the right gates, and produce predictable artifacts. See `docs/SKILLS.md` for the full catalogue. Highlights:

**Initialization & planning** — `/start`, `/create-prd`, `/create-spec`, `/create-epics`, `/create-stories`, `/sprint-plan`, `/sprint-retro`

**Architecture** — `/design-system-architecture`, `/design-data-model`, `/design-api`, `/create-adr`, `/tech-debt-audit`

**Frontend** — `/scaffold-nextjs`, `/create-component`, `/create-page`, `/add-state-management`, `/optimize-bundle`, `/add-i18n`, `/audit-a11y`

**Backend** — `/scaffold-fastapi`, `/scaffold-django`, `/create-endpoint`, `/create-model`, `/create-migration`, `/add-auth`, `/add-caching`, `/add-rate-limiting`, `/add-background-task`

**Testing & quality** — `/write-unit-tests`, `/write-integration-tests`, `/write-e2e-tests`, `/test-coverage-audit`, `/code-review`, `/refactor`

**Security** — `/security-audit`, `/threat-model`, `/dependency-audit`, `/owasp-check`, `/pen-test`

**DevOps** — `/setup-cicd`, `/dockerize`, `/deploy-checklist`, `/incident-response`, `/postmortem`

**Team orchestration** — `/team-feature`, `/team-bug-fix`, `/team-release`, `/team-security-review`, `/team-performance`

---

## Collaboration Model

Every task follows the same shape:

1. **Question.** Agent restates the goal and surfaces ambiguity.
2. **Options.** Agent presents 2–4 viable approaches with trade-offs.
3. **Decision.** **You** pick. Agents never pick for you on architecture-level calls.
4. **Draft.** Agent shows the change as a diff *before* writing.
5. **Approval.** You approve. Then and only then are `Write`/`Edit` tools used.

This is enforced in every agent prompt and reinforced by the `pre-write-approval` hook.

---

## Quality Gates

The following are enforced automatically:

- **`pre-commit`** — runs `ruff`/`black` on Python, `eslint`/`prettier` on JS/TS, `mypy --strict` on changed Python files, and `tsc --noEmit` on changed TS files.
- **`pre-push`** — runs the test suite and a secrets scan.
- **`session-end`** — gap detection: did any new endpoint land without a test? any new model without a migration? any new component without a Storybook story?

You can tune strictness in `.claude/settings.json`.

---

## Quick Start

```bash
# 1. Drop this template into your project root (or use as-is for a greenfield project)
git clone <this-repo> my-app && cd my-app

# 2. Open in Claude Code
claude

# 3. Bootstrap
> /start
```

`/start` interviews you about where the project is (idea / spec / existing code) and routes you to the right workflow. From there, every change goes through the studio.

---

## Customization

- **Edit any agent** in `.claude/agents/<name>.md` to match your team's idiom.
- **Edit any skill** in `.claude/commands/<name>.md` to change the workflow.
- **Pin model tiers** in `.claude/settings.json` (e.g. force directors to Opus, specialists to Haiku).
- **Add a domain.** Drop a new `.md` into `agents/` and it's automatically discoverable.

---

## License

MIT.
