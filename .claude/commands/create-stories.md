---
description: Break epics into user stories with acceptance criteria
argument-hint: "[epic-name]"
---

# /create-stories

## Purpose
Decompose an epic into user stories. Each story is ~2–5 days of work, has a clear user persona, acceptance criteria, and definition of done. Stories are ready to be picked up by developers.

## When to Use
- When an epic is ready to start
- Before sprint planning
- To clarify scope with the team
- To enable parallel development

## Inputs
- Epic name or ID (from epics.md)
- Team size and typical sprint velocity
- Any domain-specific acceptance criteria (compliance, security, performance)

## Workflow
1. **product-director** writes user story format: "As [persona], I want [feature], so that [benefit]"
2. **lead-architect** flags technical story dependencies (DB migration, API contract, schema change)
3. **Decision point**: Are there blocking stories (e.g., "set up authentication" before "user login")?
   - Create technical stories first if needed
   - Mark dependencies clearly
4. **lead-frontend-engineer** & **lead-backend-engineer** detail acceptance criteria per story
5. **engineering-manager** estimates and orders stories in `docs/stories/<epic-name>.md`

## Outputs
- `docs/stories/<epic-name>.md` — user stories with acceptance criteria, technical notes, point estimate
- Dependency map showing which stories block others
- Story backlog ready for sprint planning

## Quality Gates
- Each story has 3–5 acceptance criteria (testable, not vague)
- All stories in an epic relate to the epic goal
- Blocking dependencies identified and sequenced
- Stories are sized: most are 2–5 points (no mega-stories)
- Non-functional requirements (performance, security, a11y) are explicit

## Example
```
/create-stories "E1: Core Product Listing"

Stories created in docs/stories/product-listing.md:

S1.1: Product Search (3 pts)
  As a buyer, I want to search products by name
  AC: Search returns relevant results within 200ms
  AC: Results paginated at 20/page
  Blocks: S1.2 (filtering)

S1.2: Add Search Filters (5 pts)
  As a buyer, I want to filter by category, price, rating
  AC: Filters applied without full page reload
  Depends on: S1.1

S1.3: Product Recommendations (5 pts)
  As a buyer, I want AI-powered recommendations
  AC: ML model scores products; UI shows top 5 recs
  Technical: Requires Redis cache layer (T1.1)
```
