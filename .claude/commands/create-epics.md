---
description: Break a Technical Spec into epics
argument-hint: "[spec-file-path]"
---

# /create-epics

## Purpose
Decompose a technical specification into epics: large, shippable feature bundles. Each epic has a goal, acceptance criteria, technical dependencies, and estimated effort. Epics become the top-level container for user stories.

## When to Use
- After technical spec is approved
- Before creating user stories
- When planning a multi-sprint roadmap
- To manage dependencies across teams

## Inputs
- Path to spec file
- Team velocity (stories/sprint) — optional; estimated if not provided
- Timeline or deadline
- Team structure (FE-only, FE+BE, full-stack)

## Workflow
1. **engineering-manager** reads spec and identifies natural feature clusters
2. **lead-architect** maps technical dependencies between epics
3. **Decision point**: Epic order — which can start in parallel? Which must sequence?
   - Draft epic dependency graph
   - Identify critical path
4. **lead-frontend-engineer** & **lead-backend-engineer** estimate effort (story points)
5. **engineering-manager** creates epic backlog in `docs/epics.md` or issue tracker

## Outputs
- `docs/epics.md` — markdown list of epics with goals, acceptance criteria, dependencies, point estimates
- Epic milestone roadmap showing sequence and team assignments
- Dependency graph (as markdown list or ASCII diagram)

## Quality Gates
- Each epic fits in 2–3 sprints (if > 3, break it down)
- Dependencies documented and sequenced
- Success criteria per epic are measurable
- Technical risks flagged (third-party API delays, performance unknowns, etc.)
- All spec features covered by at least one epic

## Example
```
/create-epics docs/spec/SPEC-2026-05-02.md

Epics created:

E1: Core Product Listing (6 pts)
  - Search, filters, recommendations
  - Depends on: database schema (E0)

E2: Seller Onboarding (8 pts)
  - KYC, inventory upload, payout setup
  - Depends on: auth system, E3 (payments)

E3: Payments & Checkout (13 pts)
  - Stripe integration, order creation
  - Depends on: E1 (product listing)

Critical path: E0 → E3 → E2 (10 weeks)
```
