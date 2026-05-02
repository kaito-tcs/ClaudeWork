---
description: Scan for secrets in git history (gitleaks, trufflehog)
argument-hint: "[repo-path]"
---

# /secret-scan

## Purpose
Scan git history and codebase for exposed secrets: API keys, passwords, credentials, database URLs. Remove secrets and rotate if exposed.

## When to Use
- Before open-sourcing repo
- Security incident involving leaked credentials
- After dev accidentally commits .env file
- Part of CI/CD security checks

## Inputs
- Repository path
- Secret types to scan for (API keys, passwords, tokens, database URLs)

## Workflow
1. **security-auditor** runs secret scanner: `gitleaks`, `trufflehog`, or `git-secrets`
2. **security-auditor** reviews findings: false positives vs. real secrets
3. **Decision point**: Are there real exposed secrets?
   - Yes → immediately rotate credentials, amend git history (filter-branch or BFG)
   - No → false positive, document and skip
4. **security-auditor** adds secret patterns to `.gitignore` and pre-commit hooks
5. **security-auditor** commits remediation and verifies re-scan passes

## Outputs
- Secret scan report: `docs/secret-scan.md`
- Identified secrets removed from git history
- Credentials rotated (new API keys, DB passwords)
- `.gitignore` and pre-commit hooks updated
- CI/CD check added to prevent future leaks

## Quality Gates
- No real secrets found in git history
- All false positives identified and whitelisted
- Credentials rotated if exposed
- Pre-commit hook prevents new secret commits

## Example
```
/secret-scan "."

Secret Scan Results (gitleaks):

Secrets Found in Git History:

Critical - AWS Access Key:
  File: .env (commit abc123, 5 commits ago)
  Secret: AKIA3XXXXXXXXXXXXX
  Status: EXPOSED (commit is in public history)
  Action: 1. Rotate AWS access key immediately
          2. Remove from git history with: git filter-branch --tree-filter 'rm -f .env'
          3. Force push: git push origin main --force-with-lease

High - Database Password:
  File: config.py (commit def456, 3 months ago)
  Secret: postgres://user:MyPassword123@db.example.com
  Status: EXPOSED
  Action: 1. Rotate database password
          2. Amend commit: git commit --amend -m "Remove DB creds"

False Positives (Whitelisted):
  - "apiKey" = "demo-key-xxx" in README (intentionally documented example)
  - "password" = "Password123" in tests (test fixture, not real)

Remediation Actions:
1. Rotate AWS access key ✓
2. Rotate database password ✓
3. Filter .env from git history ✓
4. Update .gitignore (add .env, config.py) ✓
5. Add pre-commit hook ✓
6. Re-scan: PASS (no secrets found) ✓

Pre-commit Hook:
  - Prevents commit if secret pattern detected
  - Prevents accidental .env or .aws/credentials commits

CI/CD Check:
  - gitleaks runs on every PR
  - Fails if secrets found

Scan Report: docs/secret-scan.md
Status: SECURE ✓
```
