---
description: Pre-deploy verification gate and runbook
argument-hint: "[target-environment]"
---

# /deploy-checklist

## Purpose
Verify readiness before deploying to production: all tests pass, migrations safe, secrets configured, monitoring ready, rollback plan documented. Green light to deploy.

## When to Use
- Before every production release
- Major version deployments
- Schema migrations
- Critical feature launches

## Inputs
- Target environment (staging, production)
- Change type (feature, hotfix, migration)
- Team members on-call

## Workflow
1. **release-engineer** gathers pre-deploy checklist items
2. **engineering-manager** verifies: all tests pass, code reviewed, no blockers
3. **database-engineer** checks: migrations safe, reversible, tested
4. **devops-engineer** verifies: secrets configured, infra ready, monitoring active
5. **product-director** confirms: feature is production-ready, no known issues
6. **Decision point**: All items passed?
   - Yes → proceed to deploy
   - No → fix blockers before deploying
7. Checklist signed off; deployment scheduled

## Outputs
- Pre-deploy checklist: `docs/deploy-checklist-<date>.md`
- Change log: what's being deployed
- Rollback plan: how to revert if needed
- Communication: notify stakeholders

## Quality Gates
- All tests passing (unit, integration, E2E)
- Code review approved
- Database migrations tested and reversible
- Monitoring and alerting active
- Secrets configured in target environment
- Rollback procedure documented and tested
- Feature flags (if needed) staged and tested
- Team notified, on-call ready

## Example
```
/deploy-checklist "production"

Pre-Deploy Checklist for Release v2.1.0:

Code Readiness:
  ✓ All commits on main branch
  ✓ All tests passing (unit 487/487, integration 24/24, E2E 12/12)
  ✓ Code review approved by 2 reviewers
  ✓ No TypeScript or mypy errors
  ✓ Bundle size check passed (250KB, target 300KB)

Database:
  ✓ Migrations written and tested on staging
  ✓ Migration reversal tested (can rollback)
  ✓ Backup of production DB created
  ✓ No migrations blocking (data migration safe)

Infrastructure:
  ✓ Secrets configured (API keys, DB password, JWT secret)
  ✓ Environment variables set
  ✓ Load balancer health checks working
  ✓ DNS updated (if domain change)

Monitoring & Alerting:
  ✓ Sentry configured and receiving errors
  ✓ Prometheus scraping metrics
  ✓ Grafana dashboards active
  ✓ PagerDuty alerts configured
  ✓ Slack notifications enabled

Feature Flags:
  ✓ New features protected by feature flag
  ✓ Flag tested in staging (enabled/disabled)
  ✓ Flag can be toggled without redeploying

Rollback Plan:
  1. If critical error: feature flag disable (0 downtime)
  2. If database issue: run migration rollback script (1 min)
  3. If full revert needed: docker pull old image, deploy (5 min)
  4. Communication: notify team, update status page

Team Readiness:
  ✓ On-call engineer notified (Alice)
  ✓ Release notes prepared
  ✓ Customer communication drafted (if needed)
  ✓ Product team aware of deploy window

Approval:
  ✓ Release Engineer: approved
  ✓ Tech Lead: approved
  ✓ Product Manager: approved
  ✓ DevOps Lead: approved

Status: READY TO DEPLOY ✓
Scheduled: 2026-05-02 at 14:00 UTC (5-min deploy window)
```
