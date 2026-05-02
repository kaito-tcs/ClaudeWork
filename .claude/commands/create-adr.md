---
description: Create an Architecture Decision Record
argument-hint: "[decision-title]"
---

# /create-adr

## Purpose
Document a significant architectural decision: the context, alternatives considered, decision made, and consequences. ADRs create a decision trail for future architects and engineers.

## When to Use
- Choosing between technologies (Framework A vs. B, DB, caching strategy)
- Significant design decisions (monolith vs. microservices, sync vs. async)
- Documenting a decision that has trade-offs
- Before or shortly after implementation begins

## Inputs
- Decision title (e.g., "Use FastAPI instead of Django")
- Context: why are we making this decision?
- Alternatives considered (at least 2)
- Consequences: benefits and drawbacks of chosen option

## Workflow
1. **lead-architect** or relevant specialist writes ADR draft with template
2. **tech-director** reviews for clarity and rationale
3. **Decision point**: Is the decision well-justified? Are consequences realistic?
4. **lead-architect** incorporates feedback
5. ADR written to `docs/adr/NNN-slug.md` (e.g., `001-use-fastapi.md`)

## Outputs
- `docs/adr/NNN-<slug>.md` — ADR following standard template
- Decision is recorded and linked from relevant docs (spec, architecture, README)

## Quality Gates
- Context clearly explains the problem
- Alternatives are concrete and fair (no strawman arguments)
- Decision is justified by consequences
- Consequences are realistic (not speculative)
- If superseded by a later ADR, mark as "Superseded" and link

## Example
```
/create-adr "Use FastAPI instead of Django"

Context:
Real-time features (WebSocket) and async I/O are core requirements.

Alternatives:
1. Django + Channels — mature, but adds complexity
2. FastAPI + asyncpg — lightweight, modern, built-in async
3. Node.js Express — unfamiliar to team

Decision: FastAPI

Consequences:
+ Native async, modern Python ecosystem, Pydantic v2 validation
+ Smaller team learning curve than Django
- Fewer third-party packages than Django (may build more in-house)
- Smaller community vs. Django

ADR saved to: docs/adr/001-use-fastapi.md
```
