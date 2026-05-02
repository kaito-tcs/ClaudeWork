---
description: Blameless postmortem analysis and action items
argument-hint: "[incident-id]"
---

# /postmortem

## Purpose
Conduct a blameless postmortem: understand timeline, identify root and contributing causes, brainstorm prevention measures, and assign follow-up actions to prevent recurrence.

## When to Use
- After incident is fully resolved
- Any incident severity (not just critical)
- To learn and improve systems
- Within 24–48 hours of incident

## Inputs
- Incident ID and timeline
- Team members involved (required for meeting)
- Known facts and logs

## Workflow
1. **incident-responder** or **engineering-manager** schedules meeting (30–60 min)
2. **team** gathers: blameless mindset (no blame)
3. **lead-engineer** walks through timeline
4. **team** identifies: root cause, contributing factors, why it wasn't caught
5. **team** brainstorms: prevention measures (monitoring, testing, process)
6. **engineering-manager** assigns action items with owners and deadlines
7. **postmortem** published to team; action items tracked to completion

## Outputs
- Postmortem document: `docs/postmortems/INC-<date>-<title>.md`
- Root cause analysis
- Contributing factors identified
- Action items created and assigned
- Timeline documented

## Quality Gates
- Root cause identified (not just symptoms)
- Blameless tone (focus on systems, not people)
- Action items are specific (not vague "improve testing")
- Prevention measures address root cause
- Follow-up items tracked and completed

## Example
```
/postmortem "INC-2026-05-02-DB-Pool-Exhaustion"

Postmortem: Database Connection Pool Exhaustion

Incident Duration: 14 minutes (14:23–14:37 UTC)
Severity: Critical (all users affected)
Impact: Orders endpoint down, search degraded

Timeline:

14:23 - Monitoring alert: connection pool at 100% (max 50)
14:24 - Alert routed to on-call engineer (Alice)
14:26 - Team assembled, diagnostics started
14:28 - Root cause identified: new OrderService endpoint not closing connections
14:32 - Feature flag created to disable problematic endpoint
14:35 - Fix deployed to production
14:36 - Monitoring confirms connection pool normalized
14:37 - All endpoints healthy

Root Cause:
  OrderService.__init__() creates DB connection but doesn't cleanup on error.
  When payment validation fails, connection leaks.
  50 rapid failures exhaust pool (50 × 1 leaked connection).

Contributing Factors:
  1. No monitoring for connection pool utilization (added today)
  2. Code review didn't catch missing connection cleanup
  3. No integration test for connection leaks
  4. Feature flag didn't exist to disable risky endpoint (retroactive protection)

Prevention Measures (Action Items):

1. Add connection pool monitoring (DB engineer, due 2026-05-05)
   - Alert when pool > 80% utilization
   - Alert on connection leak patterns

2. Add integration test for connection cleanup (Test engineer, due 2026-05-09)
   - Test that all DB operations cleanup connections (even on error)
   - Run test in CI for all new endpoints

3. Update code review checklist (Code reviewer, due 2026-05-05)
   - Check for connection cleanup in finally/context managers
   - Review DB exception handling

4. Add feature flag system (DevOps engineer, due 2026-05-12)
   - Implement feature flag for all critical endpoints
   - Allow disable without redeploy

5. Improve error logging (Backend lead, due 2026-05-05)
   - Log connection pool state on critical errors
   - Better diagnostics for future incidents

Action Items Summary:
  - 5 items created
  - Due dates: 5–12 May
  - Owners: each area lead

Lessons Learned:
  - Monitoring gaps left us blind to pool exhaustion
  - Resource cleanup is critical (especially DB connections)
  - Feature flags are great for emergency mitigation

Postmortem Document: docs/postmortems/INC-2026-05-02-db-pool.md
```
