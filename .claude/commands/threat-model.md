---
description: STRIDE-based threat modeling for a feature
argument-hint: "[feature-name]"
---

# /threat-model

## Purpose
Use STRIDE methodology to identify threats in a feature: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. Document mitigations.

## When to Use
- Designing security-sensitive features (auth, payments, admin)
- Before implementation
- Threat landscape changes

## Inputs
- Feature description (e.g., "payment processing")
- Data involved (sensitive types, users affected)
- External integrations (third-party APIs, payment gateways)

## Workflow
1. **security-engineer** draws data flow diagram for feature
2. **security-engineer** applies STRIDE to each component
3. **lead-architect** prioritizes threats by likelihood and impact
4. **Decision point**: What's acceptable risk level? What must be mitigated?
5. **security-engineer** documents threats and mitigations
6. **lead-architect** approves threat model
7. Mitigations implemented in code

## Outputs
- Threat model document: `docs/threat-models/<feature>.md`
- Data flow diagram (DFD) showing components and data
- STRIDE analysis per component
- Mitigation strategies documented
- Implementation checklist

## Quality Gates
- Data flows clearly documented
- All components have STRIDE analysis
- Mitigations are specific (not vague)
- Residual risks accepted by team
- Mitigations tested

## Example
```
/threat-model "Payment Processing"

Data Flow:
User → API → Payment Service → Stripe → Bank

STRIDE Analysis:

Spoofing:
- Threat: Attacker calls /payment API as another user
  Mitigation: Enforce JWT auth with user ID claim, validate requester owns order

- Threat: Fake Stripe webhook (payment completed)
  Mitigation: Verify webhook signature with Stripe secret

Tampering:
- Threat: Attacker modifies order amount before payment
  Mitigation: Validate amount matches order in DB (don't trust request)

- Threat: Man-in-middle intercepts payment data
  Mitigation: HTTPS TLS 1.3+, disable weak ciphers

Repudiation:
- Threat: User claims they didn't make payment
  Mitigation: Log all payments with timestamps, user ID, IP

Information Disclosure:
- Threat: Payment details in logs or error messages
  Mitigation: Never log full card numbers, mask sensitive fields

Denial of Service:
- Threat: Attacker makes 1000s of payment requests
  Mitigation: Rate limit /payment endpoint (10 req/min per user)

Elevation of Privilege:
- Threat: Customer user calls /admin/refund endpoint
  Mitigation: RBAC check: @require_role('admin') before refund

Mitigations Checklist:
✓ JWT auth enforced
✓ Stripe signature validation
✓ Amount validation
✓ HTTPS + TLS 1.3
✓ Sensitive data masked in logs
✓ Rate limiting configured
✓ RBAC on admin endpoints

Threat Model: docs/threat-models/payments.md
```
