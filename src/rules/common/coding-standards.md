---
name: coding-standards
description: "Language-agnostic coding conventions: immutability, naming, file organization, consistency."
category: development
priority: high
---

# Coding Standards

## Immutability & State
- Prefer immutable data structures. Avoid mutating function parameters.
- Use `const`/`final`/`let`-once by default; only allow mutation when required for performance.
- Side-effect-free functions are preferred. If a function must have side effects, name it to indicate that (e.g., `saveToFile`, `updateRecord`).

## Naming Conventions
- Names must reveal intent: `calculateTotal` not `calcTot`, `isValid` not `check`.
- Boolean variables and functions should use `is`, `has`, `can`, `should` prefixes.
- Avoid abbreviations unless they are universally understood (`URL`, `HTML`, `API`).
- Use consistent casing per language: camelCase for JavaScript/TypeScript/Python, PascalCase for classes/components, UPPER_SNAKE for constants.

## File Organization
- One logical concept per file. Keep files focused and under 500 lines.
- Group related files by feature or module, not by type.
- Name files after their primary export (e.g., `userService.ts`, `parseInput.ts`).

## Code Quality
- Do not commit commented-out code, debug `console.log`, or unused imports.
- Avoid magic numbers and inline strings — extract to named constants.
- Prefer early returns over deep nesting. Maximum nesting depth: 4 levels.
- Keep functions small — ideally under 20 lines, never over 60.

## Consistency
- Follow the existing codebase's conventions above all else.
- If no established convention exists, use the standards defined here.
- When modifying existing code, match the style of surrounding code.
