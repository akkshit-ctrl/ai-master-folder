---
name: iterative-retrieval
description: "Progressive context refinement: retrieve information in stages, from broad to specific."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - retrieval
    - context
    - search
    - progressive
allowed-tools:
  - grep
  - glob
  - read
  - bash
---

# Iterative Retrieval

Retrieve information progressively — from broad context to specific detail — to minimize token usage while building complete understanding.

## Retrieval Pattern

### Level 1: Directory Map
Get the lay of the land:
```
src/components/
src/utils/
src/hooks/
```

### Level 2: File Headers
Read only the first 20-30 lines of candidate files to understand purpose, exports, and types.

### Level 3: Targeted Read
Read specific functions or sections based on Level 2 findings:
```
/explain --target src/utils/parse.ts:10-45
```

### Level 4: Related Files
Follow imports and references to understand the full dependency chain.

## Principles
- **Start broad, narrow progressively**: Don't read 5 files when 1 will do
- **Stop when you have enough context**: Resist the urge to keep reading
- **Check for existing solutions first**: Before deep-diving, search for prior art
- **Use grep for precision**: `grep -r "functionName" src/` is faster than reading random files

## When to Use
- Exploring an unfamiliar codebase
- Debugging a specific issue
- Understanding a complex feature
- Before making changes to unfamiliar code

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll just read the whole file" | Reading progressively saves tokens and builds understanding faster. |
| "I already know this codebase" | Even familiar codebases have surprises. Search first. |
