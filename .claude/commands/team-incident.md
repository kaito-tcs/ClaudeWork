---
description: Incident response coordination (incident-response + monitoring + on-call)
argument-hint: "[incident-severity]"
---

# /team-incident

## Purpose
Coordinate incident response at team level: incident-responder triages, monitoring-engineer investigates, on-call rotates, communication sends updates, postmortem analyzes root cause.

## When to Use
- Critical service outage
- Security incident
- Data loss or corruption
- Customer-impacting issue

## Inputs
- Incident report: symptoms, affected service, detection method
- Estimated severity
- Customer impact assessment

## Workflow
1. **incident-responder** triages: severity, affected users, ETA to fix
2. **monitoring-engineer** investigates: logs, metrics, dashboards
3. **on-call-engineer** begins mitigation (hotfix, rollback, feature flag)
4. **engineering-manager** activates war room (Slack, call)
5. **product-director** updates status page and customers
6. **monitoring-engineer** watches for improvements
7. **incident-responder** documents timeline
8. **engineering-manager** schedules postmortem

## Outputs
- Incident ticket with timeline
- Root cause analysis
- Mitigation implemented
- Status page updates
- Postmortem scheduled

## Quality Gates
- Incident severity correct
- Mitigation deployed and verified
- Customers informed
- No repeat incidents (root cause addressed)

## Example
```
/team-incident critical

Incident Activation:

Incident ID: INC-2026-05-02-001
Severity: CRITICAL (all users affected)
Detected: 14:23 UTC (monitoring alert)
Affected Service: Orders API
Impact: 500 users, checkout disabled

Incident Response:

Incident Responder:
  - Triage: Critical (all users, revenue impact)
  - Severity: P1 (production down)
  - ETA estimate: 15–30 minutes
  - Activate on-call team

Monitoring Engineer:
  - Check dashboards: error rate 95%, latency 5s
  - Check logs: "database connection pool exhausted"
  - Check services: API healthy, DB unhealthy
  - Focus: database issues

On-Call Engineer (Alice):
  - Paged at 14:24
  - Logged in and started investigation
  - Identified: connection leak in new endpoint

Engineering Manager (Bob):
  - Created war room (Slack #incidents)
  - Called incident rotation (Alice, Charlie, Diana)
  - Started timer (5 min response SLA)

Product Director (Carol):
  - Updated status page: "investigating checkout issue"
  - Prepared customer email (not yet sent)
  - Monitoring social media for customer reports

Timeline:

14:23 - Alert: error rate 95% (monitoring)
14:24 - Incident created (INC-001), on-call paged
14:26 - War room open, team assembled
14:28 - Root cause: connection leak in OrderService
14:32 - Feature flag created to disable endpoint
14:35 - Hotfix deployed to production
14:36 - Error rate: 95% → 0.5%
14:37 - Verification: checkout working
14:38 - Status page: "issue resolved"
14:40 - Customer notification: "issue fixed"

Mitigation Applied:

Feature Flag:
  - Disabled problematic OrderService endpoint
  - Connections returned to normal pool
  - Checkout re-enabled via alternate path

Code Fix (in progress):
  - Connection cleanup added to OrderService
  - Fix will be deployed in next release

Monitoring:

During incident:
  - Connection pool: 95% → 0% (recovered)
  - Error rate: 95% → 0.5% (normal)
  - Latency: 5s → 200ms (normal)

Post-Incident:
  - Monitor connection pool for 1 hour (no regression)
  - Alert set: connection pool > 80%
  - Alert set: error rate > 1%

Communication:

Status Page Updates:
  - 14:23: Investigating checkout issue
  - 14:37: Issue resolved
  - 14:40: Full post-mortem in 24h

Customer Email:
  "We experienced a brief checkout outage from 14:23–14:37 UTC.
   Root cause: database connection leak.
   Fix: deployed hotfix to prevent recurrence.
   Our sincere apologies for the inconvenience."

Slack Announcement:
  #general: "Orders API incident resolved. See #incidents for details."

Postmortem Scheduled:

Date: 2026-05-03, 10:00 UTC
Duration: 1 hour
Attendees: Alice (incident lead), Bob (manager), Charlie (BE), Diana (DB)
Goal: Understand root cause and prevent recurrence

Expected Outcomes:
  - Root cause analysis
  - Contributing factors identified
  - Action items assigned (monitoring, code review, testing)
  - Follow-up tasks scheduled

Incident Status: RESOLVED ✓
Follow-up: Postmortem scheduled for 2026-05-03
```
