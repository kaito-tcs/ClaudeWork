# Claude Code Web Engineering Studio

Turn Claude Code into a full web engineering studio — **35+ specialized agents**, **55+ workflow skills**, and a complete coordination system mirroring how real product teams operate.

Opinionated for **Python (Django / FastAPI)** on the backend and **JavaScript / TypeScript (React / Next.js)** on the frontend, with first-class support for QA, security, performance, accessibility, and DevOps.

> Inspired by [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios). Same hierarchy, different industry.

---

## What you get

- **35+ agents** organized in three tiers — Directors (vision), Leads (domain), Specialists (hands-on).
- **55+ slash commands** covering the entire SDLC — from `/start` and `/create-prd` through `/dev-story`, `/code-review`, `/security-audit`, `/deploy-checklist`, and `/postmortem`.
- **Hooks & guardrails** — pre-commit lint/type/test, secret scanning, gap detection at session end.
- **Team orchestration** — `/team-feature`, `/team-release`, `/team-security-review` coordinate multiple agents on a single deliverable.
- **A real collaboration contract** — Question → Options → Decision → Draft → Approval. No silent autonomous edits.

---

## Quick start

```bash
git clone <this-repo> my-app && cd my-app
claude
> /start
```

`/start` figures out where you are (greenfield idea / partial spec / existing codebase) and routes you to the right workflow.

---

## Layout

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Master configuration. Read first. |
| `.claude/agents/` | 35+ agent personas (markdown + YAML frontmatter). |
| `.claude/commands/` | 55+ slash command workflows. |
| `.claude/hooks/` | Validation hooks (pre-commit, pre-push, session-end). |
| `.claude/settings.json` | Model tier defaults, hook wiring, safety. |
| `docs/AGENTS.md` | Full roster + when to use each. |
| `docs/SKILLS.md` | Slash-command catalogue. |
| `docs/WORKFLOWS.md` | End-to-end recipes (new feature, hotfix, release). |

---

## License

MIT.
