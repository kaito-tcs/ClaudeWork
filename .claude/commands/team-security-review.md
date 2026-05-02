---
description: Security-auditor + pen-tester + code-reviewer pass
argument-hint: "[scope]"
---

# /team-security-review

## Purpose
Comprehensive security review: code review for vulnerabilities, penetration testing for attacks, dependency audit for CVEs. Coordinated across security experts.

## When to Use
- Before major release
- After new authentication feature
- Payment integration changes
- Quarterly security assessment

## Inputs
- Scope: full app, feature, or endpoint
- Known sensitive areas
- Threat landscape (any new attacks?)

## Workflow
1. **security-auditor** runs static analysis and code review for OWASP issues
2. **penetration-tester** attempts attacks (injection, auth bypass, privilege escalation)
3. **code-reviewer** reviews code for security anti-patterns
4. **security-auditor** runs dependency audit (CVEs)
5. **team** triages findings: critical, high, medium, low
6. **engineering-manager** prioritizes fixes
7. **engineer** implements fixes
8. **security-auditor** re-tests and verifies

## Outputs
- Security review report: vulnerabilities, severity, status
- Code review comments on security issues
- Pen test report: attacks attempted, results
- CVE list with remediation
- Action items for fixes

## Quality Gates
- No critical vulnerabilities
- High vulnerabilities have fix or accepted risk
- Penetration tests find no exploitable issues
- Code review approves from security angle
- All CVEs addressed

## Example
```
/team-security-review "payment processing feature"

Security Review Results:

Code Review (Security Auditor):

Critical:
- Missing CSRF token in payment form (add token)
- SQL injection in payment search (use parameterized queries)
- Hardcoded API key in code (move to environment)

High:
- Weak password validation (enforce complexity)
- Auth token stored in localStorage (use httpOnly cookie)
- Error messages expose internal DB structure

Medium:
- Missing rate limiting on /payment endpoint
- Insufficient logging of payment attempts
- No audit trail for refunds

Penetration Testing (Pen Tester):

Attempted Attacks:
- SQL injection in payment search: VULNERABLE (fixed with parameterized queries)
- CSRF on payment form: VULNERABLE (fixed with CSRF token)
- Auth bypass with expired token: NOT VULNERABLE (proper validation)
- Privilege escalation (user calling admin refund): VULNERABLE (fixed with RBAC)

Dependency Audit (Security Engineer):

Critical CVEs:
- stripe 5.1.0 has CVE-2024-XXXXX: update to 5.2.0

High CVEs:
- requests 2.27.0 has CVE-2023-YYYYY: update to 2.31.0

Remediation Plan:

Critical Issues (must fix):
  1. Add CSRF token (1 day)
  2. Fix SQL injection (1 day)
  3. Move API key to env (0.5 day)
  4. RBAC check on refund endpoint (1 day)
  Total: 3.5 days

High Issues (fix soon):
  1. Change token storage to httpOnly (1 day)
  2. Improve password validation (0.5 day)
  3. Mask error messages (1 day)
  4. Update dependencies (0.5 day)
  Total: 3 days

Effort to Secure: 6.5 days

Fixes Applied:

Code Review: ✓ All critical issues fixed
Pen Test Re-run: ✓ No vulnerabilities exploitable
Dependency Audit Re-run: ✓ No critical CVEs

Sign-off:

Security Auditor: ✓ Approved for production
Pen Tester: ✓ No exploitable issues
Code Reviewer: ✓ Approved

Status: SECURE ✓
Ready for release.
```
