---
description: Release coordination across FE/BE/DevOps/QA
argument-hint: "[version]"
---

# /team-release

## Purpose
Coordinate a release: align FE, BE, DevOps, and QA on timing and dependencies. Execute deployment with monitoring and rollback readiness.

## When to Use
- Major version release (v2.0.0)
- Multiple teams need synchronization
- Complex deployment with dependencies

## Inputs
- Version tag (e.g., v2.1.0)
- Release date/time
- Team members involved
- Known dependencies (BE before FE? DB migration?)

## Workflow
1. **engineering-manager** schedules release window (off-hours, less traffic)
2. **devops-engineer** verifies infrastructure ready
3. **lead-backend-engineer** deploys BE changes first (if migrations)
4. **lead-frontend-engineer** deploys FE after (to match BE API)
5. **qa-engineer** runs smoke tests
6. **devops-engineer** monitors logs and dashboards
7. **product-director** announces release
8. **engineering-manager** runs post-release retrospective

## Outputs
- Coordinated deployment completed
- Release notes published
- Monitoring active
- Post-release checklist completed
- Retrospective held

## Quality Gates
- All teams ready (code merged, tests passing)
- Deploy checklist signed off
- Monitoring active
- Rollback procedure tested
- No critical bugs reported post-release
- Customer impact assessed

## Example
```
/team-release v2.1.0

Release Coordination:

Release Window: 2026-05-02, 14:00–15:00 UTC (1 hour window)
Off-hours: minimal user traffic expected

Team Readiness:

Backend:
  ✓ Code merged to main
  ✓ Tests passing (487 unit, 24 integration)
  ✓ Database migrations reversible
  ✓ Staging deployment verified
  Release: postgres migration + API changes

Frontend:
  ✓ Code merged to main
  ✓ Tests passing (256 components, 12 E2E)
  ✓ Bundle size OK (250KB, target 300KB)
  ✓ Staging deployment verified
  Release: recommendation widget + personalization UI

DevOps:
  ✓ Load balancer healthy
  ✓ Monitoring + alerts active
  ✓ Rollback procedure tested
  Release: upgrade containers, verify health checks

QA:
  ✓ E2E test suite ready
  ✓ Smoke test plan ready
  Release: sanity checks post-deploy

Deployment Sequence:

14:00 - Start release window
14:05 - Backend deployment
        - Run migrations (1 min)
        - Deploy new containers (2 min)
        - Health checks pass
14:10 - Frontend deployment
        - Deploy new build (1 min)
        - CDN cache purge (1 min)
        - Health checks pass
14:15 - QA smoke tests (10 min)
        - Login: ✓
        - Search: ✓
        - Add to cart: ✓
        - Checkout: ✓
        - Recommendations visible: ✓
14:25 - Monitoring check (5 min)
        - Error rate: < 0.1%
        - Latency: nominal
        - CPU/memory: normal
14:30 - Release notes announcement
14:35 - Buffer for hotfixes (if needed)
15:00 - End window, declare release done

Post-Release Monitoring:

24-hour period:
  - Error rate: < 0.1% (target met)
  - User engagement: +3% (new recommendations feature)
  - Performance: stable (no degradation)

Post-Release Retrospective (2026-05-03):
  ✓ Release went smoothly
  ✓ No rollbacks needed
  ✓ Customer feedback positive
  ✓ 0 critical bugs

Communication:
  - Customers: release notes published
  - Team: deployment summary
  - Leadership: business metrics update

Status: RELEASE SUCCESSFUL ✓
```
