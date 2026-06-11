---
name: code-analysis
description: "Static analysis patterns: lint interpretation, complexity measurement, dependency analysis."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - analysis
    - static-analysis
    - complexity
    - quality
allowed-tools:
  - read
  - bash
  - glob
  - grep
---

# Code Analysis

Analyze codebases for quality metrics, complexity, and structural issues.

## Analysis Dimensions

### Complexity Analysis
- **Cyclomatic complexity**: Flag functions with complexity > 10
- **Cognitive complexity**: Flag deeply nested conditionals and long chains
- **Dependency depth**: Measure import/module depth; flag excessive coupling
- **Function length**: Flag functions over 60 lines

### Dependency Analysis
- Check for circular dependencies between modules
- Identify unused dependencies in package.json / pyproject.toml / Cargo.toml
- Flag outdated or deprecated packages
- Detect dependency version mismatches (multiple versions of same package)

### Lint Analysis
- Run the project's linter and categorize results:
  - **Error** — must fix before merge
  - **Warning** — should fix before merge
  - **Info** — consider fixing in follow-up

### Structural Analysis
- Directory depth and organization assessment
- Naming convention consistency check
- File size distribution (flag files over 500 lines)
- Import/export pattern consistency

## Output Format
```
## Analysis Summary
**Complexity**: [score] — [issues found]
**Dependencies**: [health] — [issues found]
**Lint**: [pass/warn/fail] — [issues found]
**Structure**: [assessment]

### Key Issues
1. [severity]: [description] — [file:line]
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I can see the issues without running analysis" | Static analysis catches what humans miss. Run it. |
| "Analysis takes too long" | It's faster than debugging a production issue. |
