---
name: docker-patterns
description: "Docker patterns: multi-stage builds, Compose, security, networking, optimization. Use when writing or fixing a Dockerfile or docker-compose, shrinking images, or containerizing an app."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "devops"
  tags:
    - docker
    - containers
    - compose
    - devops
    - infrastructure
allowed-tools: read edit bash
---

# Docker Patterns

Docker best practices for development and production.

## Multi-Stage Builds
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Docker Compose Patterns
```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    depends_on:
      db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/db

  db:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s

volumes:
  pgdata:
```

## Security Best Practices
- Use official images with specific versions (never `latest`)
- Run as non-root user with `USER` directive
- Use read-only root filesystem where possible
- Scan images with `docker scout` or `trivy`
- Minimize layers by combining RUN commands
- Use `.dockerignore` to exclude unnecessary files

## Optimization
- Order layers from least to most frequently changing
- Use `--link` flag for faster builds (BuildKit)
- Use cache mounts for package manager caches
- Multi-stage builds to minimize final image size
- Use Alpine or distroless base images for production

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll optimize the Dockerfile later" | A bad Dockerfile wastes time and money every build. Fix it now. |
| ":latest is fine for development" | `:latest` breaks builds unpredictably. Pin versions. |
| "My image works without multi-stage" | Multi-stage isn't optional — it's the minimum for production. |
