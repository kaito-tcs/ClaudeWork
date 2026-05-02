# End-to-End Workflows

Recipes that show how to chain slash commands across the studio for common engineering scenarios. Each recipe assumes you're inside Claude Code at the project root.

---

## 1. Greenfield feature — idea to deployed

```
> /start                       # interview: where are we? → "fresh idea"
> /create-prd                  # product-director drafts PRD
> /create-spec                 # tech-director + lead-architect produce spec
> /create-epics                # break into epics
> /create-stories              # break into stories with ACs
> /design-data-model           # database-engineer schemas + indexes
> /design-api                  # api-designer drafts OpenAPI 3.1
> /scaffold-fastapi            # or /scaffold-django depending on choice
> /scaffold-nextjs             # frontend
> /team-feature <story-id>     # coordinated impl: code → tests → review
> /audit-a11y                  # accessibility-engineer
> /security-audit              # security-auditor pass
> /setup-cicd                  # ci-cd-engineer pipeline
> /deploy-checklist            # pre-deploy gates
> /release-notes               # generated from PRs
```

Artifacts produced (typical):
- `docs/prd/<feature>.md`
- `docs/spec/<feature>.md`
- `docs/adr/NNN-<slug>.md`
- `app/api/<route>/...` and `frontend/app/<page>/...`
- `tests/unit/`, `tests/integration/`, `tests/e2e/`
- `.github/workflows/ci.yml`

---

## 2. Hotfix in production

```
> /team-bug-fix "users seeing 500 on /checkout when cart is empty"
```

Internally this runs:
1. `debug-issue` — reproduce, isolate, identify root cause (`backend-performance-engineer` or `python-engineer` depending on signature)
2. Draft fix → user approves → `Edit` applied
3. `write-integration-tests` — regression test
4. `code-review` — `code-reviewer` + `security-auditor`
5. `deploy-checklist` — gate run
6. PR opened with a draft `postmortem` if the bug was sev-2+

---

## 3. Performance investigation

```
> /team-performance "INP > 500ms on /search"
```

Coordinates:
- `frontend-performance-engineer` — Lighthouse + bundle profile
- `backend-performance-engineer` — server timing + flame graphs
- `database-engineer` — EXPLAIN ANALYZE on slow queries
- `caching-engineer` — cache hit ratio + invalidation review

Outputs a single report with prioritized fixes and a rollout plan.

---

## 4. Security review before launch

```
> /team-security-review
```

Coordinates `security-auditor`, `penetration-tester`, and `code-reviewer`. Produces:
- `docs/security/threat-model-<feature>.md` (STRIDE)
- OWASP Top 10 checklist with findings
- Pen-test report with reproduction steps
- Severity-ranked remediation plan

---

## 5. Accessibility pass

```
> /team-a11y app/checkout
```

`accessibility-engineer` does the static audit, `accessibility-tester` does the manual screen-reader/keyboard pass, `lead-ux-engineer` signs off on UX implications. Outputs WCAG 2.2 AA compliance report.

---

## 6. Production incident

```
> /team-incident
```

Walks through severity assignment, comms template (status page + Slack), live runbook execution, and post-resolution `postmortem`.

---

## 7. Adopting the studio in an existing codebase

```
> /start                       # detects existing code → audit mode
> /tech-debt-audit             # tech-director + leads classify debt
> /test-coverage-audit         # lead-qa-engineer
> /security-audit              # security-auditor
> /audit-cwv                   # frontend-performance-engineer
> /audit-a11y                  # accessibility-engineer
```

Then prioritize the findings into stories and run `/team-feature` against them one at a time.

---

## Key patterns

- **Always start with `/start`** — it routes you and keeps the studio context loaded.
- **Use `/team-*` for cross-cutting work** — they enforce multi-agent coordination so nothing gets dropped.
- **Approve drafts, not summaries.** Every command shows a diff before writing. Read it.
- **Hooks catch the easy mistakes.** `pre-bash-guard.sh` blocks dangerous commands; `session-end-gap-detect.sh` flags missing tests/migrations.
