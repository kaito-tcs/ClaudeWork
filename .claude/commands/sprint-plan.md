---
description: Run sprint planning ceremony and output backlog commitment
argument-hint: "[sprint-number or date-range]"
---

# /sprint-plan

## Purpose
Conduct sprint planning: review team velocity, pull stories from backlog, estimate, identify blockers, and commit to a sprint goal. Output is a sprint plan document and updated issue tracker.

## When to Use
- Start of every sprint
- Planning meeting with the team
- After backlog refinement session

## Inputs
- Team size and historical velocity (stories/points per sprint)
- Story backlog (from docs/stories/ or issue tracker)
- Any known team constraints (vacation, interviews, on-call duty)
- Sprint length (1-week or 2-week standard)

## Workflow
1. **engineering-manager** reviews team velocity and sprint capacity
2. **team** discusses backlog priorities: which stories solve the highest-value problems?
3. **Decision point**: How much capacity do we have this sprint (accounting for interrupts, support)?
   - Typical: 70–80% of capacity for stories, 20–30% for bug fixes, tech debt, interrupts
4. **lead-frontend-engineer** & **lead-backend-engineer** confirm story estimates are realistic
5. **engineering-manager** commits stories to sprint; creates sprint goal
6. Sprint plan written to `docs/sprints/sprint-<N>.md`

## Outputs
- `docs/sprints/sprint-<N>.md` — sprint plan with goal, committed stories, capacity breakdown
- Issue tracker updated: stories labeled with sprint, assigned to owners
- Risk register: known blockers and unknowns

## Quality Gates
- Sprint capacity matches team size and historical velocity
- Each developer has clear assignment (avoid "whoever is free")
- Sprint goal is achievable and valuable
- Blockers identified (e.g., waiting for design, infrastructure setup)
- Team consensus on commitment

## Example
```
/sprint-plan "Sprint 12: May 2–16, 2026"

Team Velocity: 26 points/sprint (4 devs, avg 6.5 pts each)
Sprint Goal: Ship product search MVP (S1.1 + S1.2 + recommendations API)

Committed Stories:
- S1.1: Product Search (3 pts) → Alice
- S1.2: Search Filters (5 pts) → Bob
- S1.3: Recommendations API (8 pts) → Charlie + Diana (pair)
- T1.1: Set up Redis (3 pts) → Bob (spike)

Known Risks:
- Design handoff delayed 2 days
- Redis setup may require DevOps consultation

Buffer: 4 pts (bug fixes, interrupts)
```
