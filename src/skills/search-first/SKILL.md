---
name: search-first
description: "Research-before-coding workflow: search codebase and docs before implementing."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - research
    - investigation
    - search
    - due-diligence
allowed-tools:
  - grep
  - glob
  - read
  - bash
---

# Search First

Always search the codebase and related documentation before writing new code.

## Workflow

### Step 1: Search Existing Patterns
Before creating a new file or function, search for:
- Existing similar implementations: `grep -r "similarFunction" src/`
- Existing types, interfaces, or models in the domain
- Utility functions that might already do what you need
- Configuration patterns for similar features

### Step 2: Check Conventions
- Look at neighboring files for style and structure patterns
- Check if there's an existing test pattern to follow
- Verify naming conventions from similar modules

### Step 3: Review Documentation
- Search README files and docs/ directory for relevant guidance
- Check for ADRs (Architecture Decision Records) about the domain
- Look for any relevant issues or PRs

### Step 4: Only Then Implement
- With full context from steps 1-3, write the implementation
- Follow the patterns discovered during research
- Reuse existing utilities rather than rewriting

## When to Skip
- Trivial changes (1-2 lines) in familiar code
- New file creation in well-understood domains
- When explicitly told to "just implement" by the user

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I know the codebase already" | Search catches what you forgot. Even senior devs search first. |
| "Searching takes too long" | 30 seconds of search can save 30 minutes of rework. |
| "I'll find it as I go" | You'll miss existing patterns and create inconsistencies. |
