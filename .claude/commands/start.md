---
description: Assess project state and route to the right initialization workflow
argument-hint: "[greenfield|spec|existing]"
---

# /start

## Purpose
Analyze the current project state (greenfield, specification-only, or existing codebase) and route you to the appropriate next workflow. Gathers context about tech stack, team, scope, and constraints.

## When to Use
- Starting a brand new project
- Inheriting a codebase with unclear state
- Resuming a project after a break
- Before running any other planning workflow

## Inputs
- Mandatory: project name and brief mission statement
- Optional: argument (greenfield, spec, existing) to skip detection
- Optional: existing codebase path or GitHub URL
- Optional: team size and skill mix

## Workflow
1. **product-director** asks clarifying questions: mission, users, core features, success metrics
2. **tech-director** assesses tech stack preferences: frontend (React/Next.js), backend (FastAPI/Django), DB (Postgres), deployment (Docker/K8s)
3. **Decision point**: Classify as greenfield, spec-only, or existing
   - **Greenfield** → recommend `/create-prd` workflow
   - **Spec-only** → recommend `/create-spec` workflow
   - **Existing** → recommend `git log` inspection + `/tech-debt-audit`
4. **lead-architect** drafts routing decision doc
5. **engineering-manager** reviews and approves next steps

## Outputs
- Classification: greenfield|spec-only|existing
- Context snapshot: tech stack, team, budget, timeline
- Next-step recommendation (PRD, spec, debt audit, or full feature)
- CLAUDE.md initialized with project fundamentals

## Quality Gates
- All key stakeholders identified
- Tech stack explicitly chosen (or documented as TBD)
- Success criteria named
- Decision doc approved by lead-architect

## Example
```
/start

> Product Director: What's the mission of this project?
User: A real-time collaborative whiteboard for remote teams.

> Tech Director: Prefer Next.js with tRPC or REST API?
User: Next.js with REST, but need real-time—WebSocket or polling?

> [assessed as greenfield]

> Result: You should run /create-prd to lock down requirements before designing.
```
