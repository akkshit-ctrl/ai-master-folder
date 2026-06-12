---
name: testing
description: "TDD methodology, test plan generation, coverage analysis, and boundary testing. Use when writing tests, planning test coverage, or improving a test suite."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - testing
    - tdd
    - quality
    - coverage
allowed-tools: read bash glob grep
---

# Testing

Standardized approach to test-driven development and test generation.

## TDD Cycle (Red-Green-Refactor)

1. **Red**: Write a failing test that describes the expected behavior
2. **Green**: Write the minimum code to make the test pass
3. **Refactor**: Improve code quality while keeping tests green

## Test Plan Generation

When asked to create a test plan, cover:

### Unit Tests
- Public API surface (every exported function/component)
- Happy path — expected inputs produce expected outputs
- Error path — invalid inputs produce appropriate errors
- Edge cases — boundary values, empty/null, type coercion

### Integration Tests
- Module interactions (does A call B correctly?)
- Data flow (does data transform correctly through the pipeline?)
- External dependency contracts (API responses, DB queries)

### Coverage Targets
- **Statements**: ≥80%
- **Branches**: ≥75%
- **Functions**: ≥90%
- **Lines**: ≥80%

## Test Organization

Name tests descriptively:

```
describe('ModuleName')
  describe('methodName')
    it('returns expected value when given valid input')
    it('throws when given invalid input')
    it('handles edge case: empty string')
```

## Framework Detection

Detect the project's test framework from config files:
- `jest.config.*` → Jest
- `vitest.config.*` → Vitest
- `mocha` in package.json → Mocha
- `pytest` in pyproject.toml → Pytest

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I don't need to test this" | Everything that can break should be tested. |
| "100% coverage means bug-free code" | Coverage measures what ran, not what was verified. Focus on quality. |
| "Integration tests are enough" | Unit tests pinpoint failures. You need both layers. |
