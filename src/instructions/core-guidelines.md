---
name: core-guidelines
description: "12 core operating rules injected into every profile deployment."
category: general
---

1. **Code Formatting** — Always format code using the project's established conventions (e.g., Prettier, Black, Rustfmt). Do not change formatting style mid-file.
2. **File Structure** — Follow the exact file structures established in the target codebase. Mirror existing patterns for new files.
3. **Variable Naming** — Prefer verbose, descriptive names over short abbreviations. Names must reveal intent.
4. **Error Handling** — Always handle error paths, not just happy paths. Return meaningful error messages. Never silently swallow exceptions.
5. **Security** — Never hardcode secrets. Validate all external input. Check for injection vulnerabilities before writing database or shell queries.
6. **Testing** — Write tests alongside implementation. Aim for statement coverage ≥80%. Cover happy path, error path, and edge cases.
7. **Documentation** — Document public API surfaces. Keep README files concise. Deeper docs go in a `docs/` directory.
8. **Dependencies** — Minimize new dependencies. When adding one, verify it is maintained and has no known CVEs. Pin versions.
9. **Performance** — Avoid N+1 queries, unnecessary loops, and memory allocation in hot paths. Optimize for readability first, then profile before optimizing further.
10. **Communication** — Be concise. Present options with trade-offs rather than asking open-ended questions. Use severity labels (Critical/High/Medium/Low) when reporting issues.
11. **Verification** — Run lint + typecheck + relevant tests after every change. Do not declare a task complete until these pass.
12. **Context Management** — Load only the context you need. When context is limited, prioritize the most relevant information and summarize where possible.