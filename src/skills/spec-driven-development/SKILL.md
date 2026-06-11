---
name: spec-driven-development
description: "Write a PRD covering objectives, structure, constraints, and acceptance criteria before any code."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - spec
    - prd
    - requirements
    - planning
allowed-tools:
  - read
  - write
  - edit
---

# Spec-Driven Development

Write a specification before writing code. The spec defines what success looks like, so implementation becomes execution rather than exploration.

## When to Use
- Starting a new project or feature
- Making a significant change to existing behavior
- When requirements are unclear or underspecified
- Before writing any code

## Process

### Phase 1: Objectives
Define the goal in one sentence:
```
## Objective
[One sentence describing what this change achieves and why it matters]
```

### Phase 2: Requirements
List what the system must do:
```
## Requirements
- [ ] [requirement 1] — measurable acceptance criterion
- [ ] [requirement 2] — measurable acceptance criterion
```

Label each as `MUST`, `SHOULD`, or `NICE TO HAVE`.

### Phase 3: Out of Scope
Explicitly state what is NOT covered:
```
## Out of Scope
- [feature or concern] — [why it's excluded]
```

### Phase 4: Structure
Describe the architecture and key components:
```
## Structure
### Component A
- Responsibility: ...
- Interface: ...
- Dependencies: ...

### Component B
- Responsibility: ...
- Interface: ...
- Dependencies: ...
```

### Phase 5: Constraints
Document boundaries and decisions:
```
## Constraints
- **Technology**: [language, framework, version]
- **Performance**: [latency, throughput targets]
- **Security**: [auth model, data classification]
- **Compatibility**: [backward compatibility requirements]
```

### Phase 6: Testing Strategy
```
## Testing
- **Unit**: [what to unit test]
- **Integration**: [integration points to verify]
- **E2E**: [user flows to cover]
```

## Output
The spec is written to a file (e.g., `specs/<feature-name>.md`) and reviewed before implementation begins. Do not write code until the spec is approved.

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I know what to build, I don't need a spec" | Writing the spec clarifies hidden assumptions and catches contradictions. |
| "Specs take too long to write" | Hours of spec-writing saves days of rework. |
| "The spec will go out of date immediately" | A dated spec is a record of intent. Update it as you go. |
| "Agile doesn't need specs" | Agile needs acceptance criteria. A spec is acceptance criteria. |
