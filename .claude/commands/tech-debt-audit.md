---
description: Categorize and prioritize tech debt across codebase
argument-hint: "[codebase-path or component]"
---

# /tech-debt-audit

## Purpose
Systematically identify tech debt (code smells, outdated dependencies, missing tests, performance issues) and prioritize by impact and effort. Output is a tech debt backlog for future sprints.

## When to Use
- Auditing an existing codebase
- Every sprint: reserve 20% capacity for debt paydown
- Before major refactors
- Performance or stability concerns

## Inputs
- Codebase path or Git repo
- Component(s) to audit (optional; default is full codebase)
- Known pain points or slow areas

## Workflow
1. **code-reviewer** scans for style violations, type errors, test coverage gaps
2. **backend-performance-engineer** profiles for N+1 queries, missing indexes, slow endpoints
3. **frontend-performance-engineer** audits bundle size, unused imports, render inefficiencies
4. **security-auditor** runs dependency audit (pip-audit, npm audit) and checks for secrets
5. **Decision point**: High severity (blocks feature work) vs. low (nice to have)?
6. **engineering-manager** creates tech debt tickets in backlog, prioritized by impact/effort
7. Debt audit summary written to `docs/tech-debt.md`

## Outputs
- `docs/tech-debt.md` — categorized debt: dependencies, tests, performance, refactoring, security
- Prioritized backlog: Severity (critical, high, medium, low) and Effort (1-5 days)
- Recommendations: which debt to tackle first

## Quality Gates
- All findings are actionable (not vague "improve code quality")
- Severity is justified by impact
- Effort estimates are realistic
- High-severity debt has mitigation plan (if not tackled this sprint)

## Example
```
/tech-debt-audit backend/

Findings:

Critical:
- SQLAlchemy N+1 in /api/products endpoint (users query per product) — 2 days
- Missing test coverage in payment module (47%) — 1 day

High:
- Outdated dependencies: Django 4.2 (4 minors behind) — 1 day
- TypeScript errors in React components (18 errors) — 1 day

Medium:
- Bundle size 450KB (target 300KB) — 3 days (code-splitting)
- Missing docstrings in core modules — 2 days

Recommendation: Fix N+1 and payment tests first (block features); defer bundle work to next sprint.

Tech debt issues created in backlog.
```
