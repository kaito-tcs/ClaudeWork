---
description: Audit dependencies (pip-audit, npm audit, Snyk) and triage CVEs
argument-hint: "[backend|frontend|all]"
---

# /dependency-audit

## Purpose
Scan all dependencies for known vulnerabilities: use pip-audit (Python), npm audit (Node), or Snyk. Categorize by severity and create update plan.

## When to Use
- Before production release
- After security incident
- Monthly dependency review
- New critical CVE announced

## Inputs
- Scope: backend (Python), frontend (Node), or both
- Auto-fix preference: yes/no for patch/minor updates

## Workflow
1. **security-auditor** runs audit tool: `pip-audit` or `npm audit` or Snyk
2. **security-auditor** generates report: CVE list, severity, affected versions
3. **Decision point**: Which CVEs must be fixed (critical), which can wait (patch versions)?
4. **engineer** updates vulnerable dependencies to patched versions
5. **test-engineer** runs full test suite to ensure updates don't break anything
6. **security-auditor** re-audits to verify all CVEs resolved
7. Report published and dependencies updated in lockfiles

## Outputs
- Dependency audit report: `docs/dependency-audit.md`
- CVE list with severity and affected packages
- Updated dependency files (requirements.txt, package-lock.json)
- All tests passing
- Lockfiles committed to source control

## Quality Gates
- No critical CVEs (severity 9+)
- High CVEs have remediation plan
- All updates tested (tests pass)
- Lockfiles in sync with manifests

## Example
```
/dependency-audit backend

Dependency Audit Results (Python):

Critical Vulnerabilities (must fix):
- requests 2.27.0: CVE-2023-XXXXX (RCE via improper parsing)
  Current: 2.27.0 → Update to: 2.31.0 (patched)
  Effort: 0.5 day (test API client)

High Vulnerabilities (fix soon):
- django 4.0.0: CVE-2023-YYYYY (auth bypass)
  Current: 4.0.0 → Update to: 4.2.8 (patched)
  Effort: 1 day (test auth, migrations)

Medium Vulnerabilities (can wait):
- jsonschema 4.0: CVE-2024-ZZZZZ (DoS on large inputs)
  Current: 4.0 → Update to: 4.21.1
  Effort: 0.5 day

Action Plan:
1. Update requests 2.31.0 (critical) → tests pass ✓
2. Update django 4.2.8 (high) → tests pass ✓
3. Schedule jsonschema update (medium) for next sprint

Audit Report: docs/dependency-audit.md
Lockfile: requirements.lock (updated)
```
