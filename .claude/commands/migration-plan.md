---
description: Plan a multi-step migration (monolith to service, library upgrade, etc.)
argument-hint: "[migration-type]"
---

# /migration-plan

## Purpose
Design a safe, phased migration strategy: identify risks, plan rollback, define checkpoints, and minimize disruption. Examples: monolith → microservice, major dependency upgrade, database schema refactor.

## When to Use
- Planning a breaking change
- Multi-sprint migration work
- Production downtime risk
- Need to maintain backward compatibility during migration

## Inputs
- Migration goal (e.g., "move payments to separate service")
- Current state and target state
- Team capacity and risk tolerance
- Rollback requirements

## Workflow
1. **lead-architect** defines current state and target state
2. **lead-architect** & **database-engineer** identify dependencies and breaking points
3. **Decision point**: Big bang or phased? Can we run old and new code in parallel?
4. **devops-engineer** designs deployment strategy: feature flags, canary, blue-green
5. **database-engineer** plans schema migrations if needed (reversible, online changes)
6. **lead-architect** documents checkpoints: what must succeed before moving to next phase
7. Plan written to `docs/migrations/migration-<name>.md`

## Outputs
- `docs/migrations/migration-<name>.md` — phases, checkpoints, rollback plan
- Feature flag configuration for gradual rollout
- Database migration script (if applicable)
- Rollback procedure documented
- Success criteria per phase

## Quality Gates
- All dependencies mapped (what breaks if we change this?)
- Rollback is fast (< 5 min for critical migrations)
- Checkpoints are measurable (not vague "see if it works")
- Team understands risk and mitigation
- No single point of failure in migration path

## Example
```
/migration-plan "Move payments to separate service"

Current: Monolithic app with payments in core service
Target: Separate payment service, decoupled from orders

Phase 1 (Week 1): Payments service deployed in shadow mode
  - Feature flag: payments_service_enabled = false
  - Dual-write: orders service writes to both old and new schemas
  - Checkpoint: Shadow service catches 99% of events with <5ms latency

Phase 2 (Week 2): Canary rollout (10% of users)
  - Feature flag: payments_service_enabled_percent = 10
  - Monitor: error rate, latency, reconciliation
  - Checkpoint: 10% of traffic with <0.1% error rate increase

Phase 3 (Week 3): Full rollout
  - Feature flag: payments_service_enabled = true
  - Remove dual-write
  - Checkpoint: 100% of users on new service, zero reversion

Rollback: Feature flag to false (revert to old service in <1 min)

Plan: docs/migrations/migration-payments-service.md
```
