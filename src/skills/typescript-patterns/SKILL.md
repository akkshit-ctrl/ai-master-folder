---
name: typescript-patterns
description: "TypeScript strict mode patterns: generics, discriminated unions, branded types, async patterns."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - typescript
    - patterns
    - types
    - async
    - generics
allowed-tools:
  - read
  - edit
  - bash
  - grep
  - glob
---

# TypeScript Patterns

TypeScript best practices with strict mode enabled.

## Strict Mode
Enable in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Discriminated Unions
```typescript
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
  | { status: "loading" };

function handleResult<T>(result: Result<T>) {
  switch (result.status) {
    case "success": return result.data;
    case "error": throw result.error;
    case "loading": return null;
  }
}
```

## Branded Types
```typescript
type UserId = string & { readonly __brand: "UserId" };
function createUserId(id: string): UserId {
  return id as UserId;
}
```

## Async Patterns
- Use `Promise.allSettled` over `Promise.all` for fault tolerance
- Use `AbortController` for cancellable operations
- Prefer `async/await` over raw `.then()` chains
- Use `neverthrow` or discriminated unions for explicit error handling

## Testing with Vitest
```typescript
import { describe, it, expect } from "vitest";

describe("processData", () => {
  it("returns transformed output for valid input", () => {
    expect(processData({ input: "test" })).toEqual({ output: "TEST" });
  });
});
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Strict mode is too noisy" | Strict mode catches real bugs. Fix the types, don't relax the rules. |
| "I'll add types later" | Untyped code accumulates type debt faster than any other kind. |
| "Any works fine here" | `any` defeats the purpose of TypeScript. Use `unknown` instead. |
