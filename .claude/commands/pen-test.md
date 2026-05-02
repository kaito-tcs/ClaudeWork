---
description: Exploratory penetration test against staging
argument-hint: "[scope]"
---

# /pen-test

## Purpose
Conduct exploratory penetration testing: attempt real attacks (auth bypass, injection, privilege escalation) against staging environment. Find vulnerabilities before production.

## When to Use
- Before major release
- After significant architecture change
- Security incident post-mortem
- Quarterly security exercise

## Inputs
- Staging URL
- Scope: full app or specific areas (auth, payments, admin)
- Known weak areas to focus on
- Any out-of-scope systems

## Workflow
1. **penetration-tester** sets up in staging environment (may create test data)
2. **penetration-tester** attempts common attacks: SQL injection, XSS, auth bypass, privilege escalation
3. **penetration-tester** documents findings: method, impact, exploitability
4. **security-auditor** and **lead-architect** triage: critical vs. medium vs. low
5. **engineer** implements fixes
6. **penetration-tester** re-tests to verify fixes
7. Pen test report published (findings fixed before production)

## Outputs
- Penetration test report: `docs/pen-test-report.md`
- Vulnerability findings with proof-of-concept
- Remediation plan for each finding
- Re-test results (after fixes applied)

## Quality Gates
- No critical vulnerabilities exploitable
- All findings documented and triaged
- Fixes verified in re-test
- Staging matches production deployment

## Example
```
/pen-test "staging.example.com"

Pen Test Scope:
- Authentication: login, token refresh, logout
- User data: profile, order history
- Admin: user management, reporting
- Excluded: third-party integrations

Findings:

Critical Vulnerability (CVSS 9.8):
- SQL injection in /api/search?q=
  Proof: q=' OR '1'='1 returns all products
  Impact: Attacker can extract all user data
  Root cause: Query parameter not parameterized
  Fix: Use ORM parameterization
  Fix verified: ✓ PASS (re-test)

High Vulnerability (CVSS 8.2):
- Auth token stored in localStorage (XSS risk)
  Proof: JavaScript can access token via localStorage
  Impact: XSS attack can steal token and impersonate user
  Root cause: Token storage in localStorage instead of secure cookie
  Fix: Move to httpOnly cookie
  Fix verified: ✓ PASS (re-test)

Medium Vulnerability (CVSS 6.5):
- Weak password policy (min 4 chars)
  Proof: Can brute-force 4-char password in < 1 second
  Impact: Attacker can guess common passwords
  Root cause: Insufficient validation
  Fix: Enforce min 12 chars + complexity
  Fix verified: ✓ PASS (re-test)

Remediation Summary:
- Critical: 1 fixed
- High: 1 fixed
- Medium: 1 fixed
- Total effort: 2 days
- All findings resolved before production release

Pen Test Report: docs/pen-test-report.md
Ready for production: ✓ YES
```
