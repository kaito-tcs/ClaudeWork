---
description: OWASP Top 10 self-check across codebase
argument-hint: "[component-or-app]"
---

# /owasp-check

## Purpose
Quick OWASP Top 10 checklist: verify controls for A1 (injection), A2 (broken auth), A3 (sensitive data), A4 (XML/XXE), A5 (broken access), A6 (misconfiguration), A7 (injection), A8 (insecure deserialization), A9 (components), A10 (logging).

## When to Use
- Sprint-level security check
- Before code review
- Part of Definition of Done
- Lighter than full security audit

## Inputs
- Component or app to check
- Known risky areas (forms, payment, auth)

## Workflow
1. **engineer** or **security-engineer** goes through OWASP Top 10 checklist
2. For each item: check code for vulnerability
3. Document: pass, fail, or acceptable risk
4. If failures found, create tickets to fix
5. Can proceed only if critical items pass

## Outputs
- OWASP checklist completed: `docs/owasp-check.md`
- Failures documented with line numbers
- Remediation plan if needed

## Quality Gates
- All critical items pass (A1, A2, A3 injection/auth/data)
- Documented exceptions for acceptable risks
- No known OWASP Top 10 violations

## Example
```
/owasp-check "POST /api/v1/orders endpoint"

OWASP Top 10 Checklist:

A1 - Injection:
✓ PASS - Query uses parameterized queries (SQLAlchemy ORM)
✓ PASS - Input validated with Pydantic (no raw strings)

A2 - Broken Authentication:
✓ PASS - Endpoint requires valid JWT token
✓ PASS - Token validated in middleware

A3 - Sensitive Data Exposure:
✓ PASS - Passwords hashed with Argon2 (not stored plain)
✓ PASS - HTTPS enforced (no HTTP)
✓ PASS - Payment data not logged (Stripe tokenization)

A4 - XML External Entities (XXE):
✓ PASS - No XML parsing in this endpoint

A5 - Broken Access Control:
✓ PASS - User can only create orders for themselves (user_id validated)
✓ PASS - Admin-only endpoints protected with @require_role('admin')

A6 - Security Misconfiguration:
✓ PASS - Security headers present (CSP, X-Frame-Options)
✓ PASS - Default credentials removed (no hardcoded secrets)

A7 - XSS:
✓ PASS - No HTML injection (JSON API, no templates)

A8 - Insecure Deserialization:
✓ PASS - Using Pydantic (safe deserialization)

A9 - Using Components with Known Vulnerabilities:
✓ PASS - Dependency audit passed (no critical CVEs)

A10 - Insufficient Logging/Monitoring:
✓ PASS - All auth attempts logged (login, token refresh)
✓ PASS - Errors logged with sanitized details

Overall: PASS ✓
Can proceed to merge.
```
