---
description: OWASP-aligned security audit pass
argument-hint: "[scope]"
---

# /security-audit

## Purpose
Conduct a comprehensive security audit against OWASP Top 10: identify vulnerabilities (injection, broken auth, sensitive data exposure, etc.), categorize by severity, and create remediation plan.

## When to Use
- Before production launch
- Quarterly security review
- After major feature addition
- Before deploying to new environment

## Inputs
- Scope: full app, specific feature, or authentication flow
- Known sensitive areas (payments, user data, admin functions)

## Workflow
1. **security-auditor** reviews code for OWASP Top 10 issues
2. **security-auditor** checks: input validation, auth, session management, crypto, error handling
3. **penetration-tester** attempts attacks: SQL injection, XSS, CSRF, brute force
4. **Decision point**: Critical vulnerabilities found?
   - Critical → must fix before deploy
   - High → plan fix in next sprint
   - Medium/Low → document and prioritize
5. **security-auditor** documents all findings in report
6. Remediation tickets created for each issue

## Outputs
- Security audit report: `docs/security-audit.md`
- Vulnerability list: CVSS scores, descriptions, remediation
- Remediation plan: priority, effort, owner
- Before/after verification (after fixes applied)

## Quality Gates
- No critical vulnerabilities (CVSS > 9)
- High vulnerabilities have mitigation or accepted risk
- All input validated (no injection vulnerabilities)
- Authentication properly implemented (no broken auth)
- Error messages don't leak sensitive info

## Example
```
/security-audit "full-app"

Security Audit Results:

OWASP Top 10 Findings:

Critical (CVSS 9+):
- SQL injection in /api/search (user query not parameterized)
  Fix: Use parameterized queries with ORM

High (CVSS 7-9):
- Missing CSRF token in forms
  Fix: Add CSRF middleware and token validation
  
- Weak password validation (min 4 chars)
  Fix: Enforce min 12 chars + complexity rules

Medium (CVSS 4-7):
- Error messages expose internal paths
  Fix: Return generic error messages to users
  
- Missing Security headers (CSP, X-Frame-Options)
  Fix: Add middleware for security headers

Low (CVSS < 4):
- Dependency outdated: lodash 4.17.20 (latest 4.17.21)
  Fix: Update dependency

Remediation Plan:
- Critical: 1 day (SQL injection)
- High: 2 days (CSRF + password validation)
- Medium: 1 day (headers)
- Low: 0.5 day (dependencies)
Total: 4.5 days to remediate all

Audit Report: docs/security-audit.md
```
