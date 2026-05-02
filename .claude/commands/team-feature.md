---
description: Full feature workflow (PRD → spec → stories → impl → tests → review)
argument-hint: "[feature-name]"
---

# /team-feature

## Purpose
Orchestrate a complete feature from concept to release: PRD → spec → stories → implementation → tests → review → release notes. Multi-team coordination.

## When to Use
- Major feature launch
- Cross-functional work (FE + BE + DevOps)
- High-visibility features (user-facing, revenue-impact)

## Inputs
- Feature name and vision
- Timeline (sprint estimate)
- Team structure (FE lead, BE lead, QA, etc.)

## Workflow
1. **product-director** writes PRD with user stories and success metrics
2. **tech-director** and **lead-architect** write technical specification
3. **engineering-manager** breaks spec into epics, then stories with AC
4. **lead-frontend-engineer** & **lead-backend-engineer** implement stories in parallel
5. **test-engineer** writes unit, integration, E2E tests (80%+ coverage)
6. **code-reviewer** reviews all code changes (security, perf, correctness)
7. **qa-engineer** runs smoke tests on staging
8. **devops-engineer** deploys to production
9. **product-director** writes release notes and announces feature

## Outputs
- Complete feature end-to-end: code, tests, docs, release notes
- FE: new pages/components with tests
- BE: new endpoints with tests
- Tests: >80% coverage, all passing
- Documentation: API docs, user guide
- Release notes published

## Quality Gates
- All stories complete and in "Done"
- Code review approved
- Tests passing (unit, integration, E2E)
- Coverage >80%
- Staging verified
- Release notes published
- No regressions in existing features

## Example
```
/team-feature "Product Recommendations Engine"

Feature Timeline: 3 sprints (6 weeks)

Sprint 1 (PRD + Spec):
  - Product Director writes PRD (2 days)
  - Tech Director writes spec (2 days)
  - Design system updates (1 day)
  Result: PRD and spec approved

Sprint 2 (Backend + FE Setup):
  - Backend Engineer: create ML model endpoint, recommendations API (5 days)
    Stories: S1 (fetch recommendations), S2 (cache recs), S3 (A/B test)
  - Frontend Engineer: build recommendation UI (5 days)
    Stories: S4 (recommendation widget), S5 (personalization prefs)
  Result: All stories in code review

Sprint 3 (Testing + Deployment):
  - QA: E2E tests for recommendation feature (2 days)
  - DevOps: deploy to staging, production (1 day)
  - Release: publish release notes, announce (1 day)
  Result: Feature live, customers notified

Deliverables:
  FE:
    - components/RecommendationWidget.tsx (with tests)
    - pages/user/preferences.tsx (personalization)
    - Integration with BE API

  BE:
    - GET /api/v1/recommendations/{user_id}
    - POST /api/v1/users/{id}/recommendation_prefs
    - Background task: refresh recommendations daily

  Tests:
    - 45 unit tests (components, services)
    - 8 integration tests (API endpoints)
    - 3 E2E tests (full user journey)
    - Coverage: 84%

  Docs:
    - API docs (OpenAPI)
    - User guide: how recommendations work
    - A/B test setup guide

  Release Notes:
    - Feature highlight
    - How to enable personalization
    - Performance improvements (+2% CTR estimated)

Team Status:
  Product: ✓ Complete
  Frontend: ✓ Complete
  Backend: ✓ Complete
  QA: ✓ Complete
  DevOps: ✓ Complete
  Feature: LIVE
```
