---
description: Setup GitHub Actions pipeline (lint, type, test, build, deploy)
argument-hint: "[environment]"
---

# /setup-cicd

## Purpose
Create GitHub Actions CI/CD workflows: automated lint, type-check, test, build, and deploy on every push/PR. Catches issues before merge.

## When to Use
- Project initialization
- Adding CI/CD to existing project
- Improving build pipeline

## Inputs
- Target environment(s): dev, staging, production
- Deployment target: Vercel, Heroku, custom server, K8s
- Notification: email, Slack on failure

## Workflow
1. **ci-cd-engineer** designs workflow: jobs (lint, test, build), triggers, dependencies
2. **ci-cd-engineer** creates `.github/workflows/` files (YAML)
3. **ci-cd-engineer** adds secrets: API keys, deploy tokens, credentials
4. **engineer** tests workflow: push to feature branch, verify job runs
5. **ci-cd-engineer** adds deployment jobs (if applicable)
6. **engineering-manager** reviews and approves pipeline

## Outputs
- `.github/workflows/ci.yml` — lint, type-check, test for every PR
- `.github/workflows/deploy.yml` — deploy on merge to main
- Documentation: workflow explanation, secrets required
- CI/CD dashboard: build status, deploy history

## Quality Gates
- All jobs pass before PR merge
- Test coverage verified (>80%)
- Type-checking passes
- Build succeeds
- Deploy to staging works

## Example
```
/setup-cicd staging

Workflows created:

.github/workflows/ci.yml:
  trigger: push to any branch, PR
  jobs:
    - lint: eslint/ruff, prettier
    - type-check: TypeScript/pyright
    - test: pytest/vitest (unit + integration)
    - build: next/vite build
    - coverage: report to Codecov

.github/workflows/deploy.yml:
  trigger: push to main
  jobs:
    - build: build Docker image
    - deploy-staging: deploy to staging
    - smoke-test: Playwright E2E tests
    - notify: Slack on success/failure

Secrets configured:
  - DOCKER_REGISTRY_TOKEN (push to registry)
  - STAGING_DEPLOY_TOKEN (access staging infrastructure)
  - SLACK_WEBHOOK (notifications)

Workflows trigger on:
  - Push to feature branch: run CI (no deploy)
  - PR to main: run CI (block merge if fails)
  - Merge to main: run CI + deploy to staging

Status badges:
  - ![CI](https://github.com/org/repo/workflows/CI/badge.svg)
  - ![Deploy](https://github.com/org/repo/workflows/Deploy/badge.svg)
```
