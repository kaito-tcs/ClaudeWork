---
description: Provision infrastructure with Terraform (AWS or GCP)
argument-hint: "[aws|gcp] [environment]"
---

# /provision-infra

## Purpose
Define and provision cloud infrastructure as code: compute, database, networking, storage. Repeatable, version-controlled, and easy to tear down.

## When to Use
- Setting up environment (dev, staging, prod)
- Scaling infrastructure
- Disaster recovery setup
- Team onboarding (everyone has same infra)

## Inputs
- Cloud provider: aws or gcp
- Environment: dev, staging, production
- Resources needed: compute (VM, K8s), database, storage, networking

## Workflow
1. **devops-engineer** designs infrastructure (compute, DB, network)
2. **cloud-engineer** writes Terraform modules: `compute.tf`, `database.tf`, `networking.tf`
3. **cloud-engineer** configures state management (remote backend)
4. **devops-engineer** reviews plan: `terraform plan` shows what will be created
5. **decision-point**: Changes look correct?
6. **devops-engineer** applies: `terraform apply` creates resources
7. **devops-engineer** documents infrastructure in README

## Outputs
- Terraform configuration: `infra/terraform/` directory
- `.tfvars` files: environment-specific variables
- Remote state backend: S3 (AWS) or Cloud Storage (GCP)
- Deployment runbook: how to apply, destroy, scale
- Cost estimate: monthly bill for resources

## Quality Gates
- Terraform plan reviewed and approved
- No hardcoded secrets (use variables)
- Resources tagged (environment, team, cost-center)
- Backup enabled (RDS, Cloud SQL)
- Monitoring configured
- Destroy plan tested (can tear down cleanly)

## Example
```
/provision-infra aws production

Terraform Modules Created:

infra/terraform/
  main.tf              (provider, remote state)
  variables.tf         (input variables)
  compute.tf           (EC2, Auto Scaling)
  database.tf          (RDS PostgreSQL)
  networking.tf        (VPC, subnets, security groups)
  storage.tf           (S3, CloudFront)
  iam.tf               (roles, policies)
  monitoring.tf        (CloudWatch, SNS)

Resource Plan:

Compute:
  - ALB (Application Load Balancer)
  - Auto Scaling Group (min 2, max 10 instances)
  - EC2 t3.medium instances (1 primary, 1 standby)
  - Security group: allow 80, 443 inbound

Database:
  - RDS PostgreSQL 16 (db.r5.large)
  - Multi-AZ (high availability)
  - 100GB storage, auto-scaling
  - Backup: daily snapshot, 30-day retention

Networking:
  - VPC (10.0.0.0/16)
  - Public subnets (web tier)
  - Private subnets (app tier)
  - NAT Gateway for egress

Storage:
  - S3 bucket for file uploads (lifecycle policy: delete old files)
  - CloudFront CDN for static assets

Monitoring:
  - CloudWatch alarms (high CPU, high memory)
  - SNS email notifications

Variables (.tfvars):
  environment = "production"
  instance_type = "t3.medium"
  rds_allocated_storage = 100
  asg_min_size = 2
  asg_max_size = 10

Apply Plan:
$ cd infra/terraform
$ terraform plan -var-file=production.tfvars
  Plan: 24 to add, 0 to change, 0 to destroy
$ terraform apply -var-file=production.tfvars
  ✓ Resources created (3 min)

Cost Estimate: ~$500/month
  - EC2: $200/month (2 instances)
  - RDS: $250/month (db.r5.large)
  - S3 + CloudFront: $50/month

Runbook: docs/terraform-runbook.md
```
