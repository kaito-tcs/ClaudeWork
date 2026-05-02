---
description: Produce a Product Requirements Document from project vision
argument-hint: "[feature name or epic]"
---

# /create-prd

## Purpose
Collaboratively draft a Product Requirements Document (PRD) that locks down user personas, feature list, success metrics, and constraints. Output is a versioned markdown file ready for stakeholder review.

## When to Use
- Starting a greenfield project
- Defining a major new feature area
- Refreshing product direction after discovery
- Before creating technical specifications

## Inputs
- Project mission and vision
- Target users / personas (optional; can be created during workflow)
- Rough feature ideas (bullets or sentences)
- Business constraints: budget, timeline, team size

## Workflow
1. **product-director** interviews user personas and writes initial persona sketches
2. **tech-director** flags technical feasibility concerns and constraints
3. **Decision point**: Prioritize features (Must/Should/Could/Won't)
4. **product-director** drafts PRD sections: mission, personas, user stories, success metrics, constraints
5. **lead-architect** reviews for technical ambition vs. scope
6. **product-director** incorporates feedback; final version written to `docs/prd/PRD-<date>.md`

## Outputs
- `docs/prd/PRD-<YYYY-MM-DD>.md` — full PRD with sections: mission, personas, features, success metrics, constraints, timeline
- Companion file: `docs/prd/user-stories.md` (backlog of rough user stories)
- Decision log: why features are Must/Should/Could

## Quality Gates
- Personas are concrete (name, role, pain point, success criterion per persona)
- Features are user-centric, not technical (no "build a REST API"—instead "users can export in CSV")
- Success metrics are measurable (not "users love it" but "DAU > 10k by Q3")
- Assumptions documented (tech stack, market, user behavior)
- Stakeholder sign-off obtained

## Example
```
/create-prd "E-commerce product discovery"

PRD written to: docs/prd/PRD-2026-05-02.md

Personas:
- Alex (buyer): wants fast search & smart recommendations
- Sam (seller): wants inventory management & bulk listing

Must-Have Features:
- Product search with filters
- Shopping cart & checkout
- Order history

Success Metric: 100 orders/day by month 2
```
