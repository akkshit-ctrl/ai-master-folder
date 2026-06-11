---
name: project-init
description: "Scaffold new projects with consistent structure, config files, and best-practice conventions."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - scaffolding
    - project-setup
    - initialization
    - conventions
allowed-tools:
  - bash
  - write
  - read
  - edit
---

# Project Init

Scaffold new projects with a consistent, production-ready structure.

## Project Structure Convention

```
project-root/
├── src/                  # Source code
├── tests/                # Test files (mirrors src/)
├── docs/                 # Documentation
├── scripts/              # Build/deploy scripts
├── .github/              # CI/CD workflows
│   └── workflows/
├── .gitignore
├── README.md
├── CHANGELOG.md
├── LICENSE
├── [package.json | pyproject.toml | Cargo.toml | ...]
└── [config files]
```

## Initialization Workflow

1. **Detect stack**: Examine user-provided tech choices or project requirements
2. **Create directory structure**: Standard folder layout
3. **Initialize version control**: `git init`, create `.gitignore`
4. **Generate config files**: Language-appropriate config (package.json, tsconfig, etc.)
5. **Create README**: Project name, description, setup instructions, scripts
6. **Set up testing**: Test framework config + placeholder test
7. **First commit**: Initial scaffold commit

## Stack-Specific Defaults

### Node.js / TypeScript
- package.json with scripts (build, test, lint, dev)
- tsconfig.json (strict mode)
- ESLint + Prettier config
- Vitest or Jest config

### Python
- pyproject.toml with dependencies
- pytest config
- .python-version for pyenv
- requirements.txt or poetry.lock

### Rust
- Cargo.toml with dependencies
- rust-toolchain.toml
- Clippy config

## Post-Scaffold Instructions

After scaffolding, inform the user:
- How to install dependencies
- How to run tests
- How to start development
- Where to add source code

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll set up the structure as I go" | Consistent structure from day one prevents refactoring later. |
| "READMEs are a waste of time" | READMEs are the first thing new contributors see. Make it count. |
