---
description: Multi-stage Dockerfile and docker-compose for app+db+cache
argument-hint: "[stack]"
---

# /dockerize

## Purpose
Create Docker containers: multi-stage build for app (small final image), docker-compose for local dev (app + postgres + redis), and production-ready Dockerfile.

## When to Use
- First-time containerization
- Before deploying to production
- Local development needs database

## Inputs
- Application type (frontend, backend, full-stack)
- Database: postgres (default) or mysql
- Cache: redis (default)
- Base images: node:20-alpine, python:3.12-slim (default)

## Workflow
1. **docker-engineer** creates multi-stage Dockerfile for backend (if applicable)
2. **docker-engineer** creates Dockerfile for frontend (if applicable)
3. **docker-engineer** creates docker-compose.yml with services: app, postgres, redis
4. **docker-engineer** adds .dockerignore file
5. **engineer** tests locally: `docker-compose up`
6. **ci-cd-engineer** integrates Docker build into CI/CD

## Outputs
- `Dockerfile` (backend) — multi-stage build
- `frontend/Dockerfile` (if frontend) — optimized build
- `docker-compose.yml` — local dev stack
- `.dockerignore` — exclude unnecessary files
- `README.md` — Docker commands (build, run, compose)

## Quality Gates
- Docker build succeeds
- `docker-compose up` runs without errors
- App is accessible (http://localhost:3000 or :8000)
- Database migrations run on startup
- No root user in production image
- Final image size < 500MB (reasonable)

## Example
```
/dockerize "full-stack"

Files created:

backend/Dockerfile (multi-stage):
  Stage 1: builder
    - FROM python:3.12-slim
    - Install dependencies
    - Build virtual environment
  
  Stage 2: runtime
    - FROM python:3.12-slim
    - Copy venv from builder
    - Copy app code
    - Run as non-root user
    - CMD: uvicorn app:main

frontend/Dockerfile:
  Stage 1: builder
    - FROM node:20-alpine
    - Install dependencies
    - Build Next.js app
  
  Stage 2: runtime
    - FROM node:20-alpine
    - Copy built app
    - Run as non-root
    - CMD: npm start

docker-compose.yml:
  services:
    backend:
      build: ./backend
      ports: [8000:8000]
      env_file: .env
      depends_on: [postgres, redis]
    
    postgres:
      image: postgres:16-alpine
      ports: [5432:5432]
      env: POSTGRES_PASSWORD=dev
      volumes: [pgdata:/var/lib/postgresql/data]
    
    redis:
      image: redis:7-alpine
      ports: [6379:6379]
    
    frontend:
      build: ./frontend
      ports: [3000:3000]
      depends_on: [backend]

Commands:
docker-compose up           (start all services)
docker-compose down         (stop all services)
docker build -t app:latest  (build backend image)
docker run -p 8000:8000 app:latest  (run backend container)

Image sizes:
- backend final: 150MB (optimized)
- frontend final: 120MB (optimized)
```
