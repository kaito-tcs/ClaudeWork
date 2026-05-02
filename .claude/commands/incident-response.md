---
description: Triage, communicate, and manage incident workflow
argument-hint: "[incident-type]"
---

# /incident-response

## Purpose
Structured incident response: triage severity, establish communication, coordinate team, execute mitigation, and document for postmortem.

## When to Use
- Service down or degraded
- Security breach
- Data loss
- Customer-facing outage

## Inputs
- Incident description
- Affected service/users
- Severity estimate (critical, high, medium, low)

## Workflow
1. **incident-responder** triages: severity, affected users, ETA to fix
2. **engineering-manager** activates on-call rotation
3. **lead-engineer** investigates root cause (logs, monitoring)
4. **lead-engineer** implements mitigation (hotfix, rollback, feature flag)
5. **devops-engineer** deploys fix and monitors
6. **product-director** communicates status to customers
7. **incident-responder** documents timeline for postmortem

## Outputs
- Incident ticket: severity, timeline, root cause
- Communication: status page updates, customer emails
- Mitigation applied
- Postmortem scheduled

## Quality Gates
- Incident severity correctly triaged
- Team notified and coordinated
- Mitigation deployed and verified
- Customers informed
- No repeat incidents (address root cause)

## Example
```
/incident-response "database connection pool exhausted"

Incident Triage:

Severity: Critical (all users affected, DB unreachable)
Affected Users: 100% of active users (~500)
Service Impact: Orders endpoint down, search slow
Detected: 14:23 UTC
Status: ACTIVE

Communication Channel:
  - Slack: #incidents (real-time updates)
  - Status Page: customer notification
  - PagerDuty: on-call alerts

Timeline:

14:23 - Alert: DB connection pool exhausted (monitoring)
14:24 - Incident created, on-call engineer notified
14:26 - Team assembled (Alice lead, Bob devops, Charlie DB expert)
14:28 - Root cause: new endpoint has connection leak (DB connection not closed)
14:35 - Mitigation applied: feature flag to disable problematic endpoint
14:36 - Deploy: green (60s) to production
14:37 - Verification: monitoring shows normal connection count
14:38 - Service recovered
14:40 - Customer communication sent

Postmortem scheduled: 2026-05-03 at 10:00 UTC

Impact Summary:
- Duration: 14 minutes (14:23–14:37)
- Users affected: ~500
- Transactions lost: 42 orders (recovered from queue)
- Root cause: Connection pool leak in new OrderService endpoint

Prevention:
1. Add connection pool exhaustion alert
2. Add code review check for connection cleanup
3. Add integration test for connection leaks
```
