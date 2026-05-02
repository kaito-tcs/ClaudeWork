---
description: Bug fix workflow (repro → fix → test → review → deploy)
argument-hint: "[bug-id or description]"
---

# /team-bug-fix

## Purpose
Coordinate bug fix end-to-end: reproduce in test, implement fix, write regression test, code review, deploy. Prevent recurrence.

## When to Use
- Critical bug reported
- Customer-blocking issue
- Regression discovered

## Inputs
- Bug report: symptom, steps to reproduce, environment
- Severity: critical, high, medium, low
- Customer impact: which users affected

## Workflow
1. **qa-engineer** reproduces bug with minimal test case
2. **lead-engineer** investigates root cause (logs, debugging)
3. **engineer** implements fix
4. **test-engineer** writes regression test (prevents re-occurrence)
5. **code-reviewer** reviews fix (no new bugs introduced)
6. **qa-engineer** verifies fix on staging
7. **devops-engineer** deploys hotfix to production
8. **engineering-manager** monitors for regression

## Outputs
- Bug reproduced with test case
- Root cause identified
- Fix implemented
- Regression test added
- Fix deployed
- Postmortem (if critical)

## Quality Gates
- Bug is reproducible
- Fix addresses root cause
- Regression test passing
- No new bugs introduced
- Fix deployed and verified on production
- Customer notified

## Example
```
/team-bug-fix "BUG-42: Users cannot checkout on mobile"

Bug Report:
  Symptom: Checkout page hangs on mobile
  Steps: 1. Add product to cart 2. Go to checkout 3. Page never loads
  Environment: iOS Safari, Android Chrome
  Affected: ~15% of users (mobile)
  Severity: Critical (revenue impact)

Reproduction:

QA Engineer:
  Reproduces on iPhone 12, Safari
  Network tab shows: POST /checkout hangs (no response)
  Error: JavaScript console shows "Cannot read property 'address' of undefined"

Root Cause Analysis:

Lead Engineer:
  Issue: Missing null check in Checkout component
  File: frontend/components/Checkout.tsx, line 85
  Code: const { address } = user  (assumes user exists)
  On mobile, user object sometimes undefined due to timing
  Likely cause: useEffect race condition on mobile (slower network)

Fix Implemented:

Engineer writes:
  const address = user?.address || defaultAddress
  Add defensive null checks throughout Checkout component
  Ensure state initialized properly

Regression Test:

Test Engineer writes:
  test('checkout works when user loads slowly')
  - Delay user data fetch by 1s
  - Verify checkout still renders
  - Verify form submission works

Fix Verification:

Code Review: ✓ Approved (fix is minimal, safe)

QA Testing:
  - Desktop: ✓ Checkout works
  - Mobile iOS: ✓ Checkout works
  - Mobile Android: ✓ Checkout works
  - Slow network: ✓ Checkout works (simulated 3G)

Deployment:

DevOps:
  - Deploy hotfix to staging (verify)
  - Deploy to production (canary 10%)
  - Monitor error rate (no regression)
  - Full rollout

Monitoring:
  - Error rate: was 5% → now < 0.1%
  - Checkout success rate: 85% → 98% (mobile)
  - Mobile users: now able to checkout

Communication:
  - Customer notified: "Checkout issue fixed"
  - Release notes: "Hotfix v2.0.1"

Postmortem:
  - Root cause: Race condition in useEffect
  - Prevention: Add E2E test for slow network
  - Code review check: null safety

Status: FIXED ✓
```
