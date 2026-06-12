# Git hooks

This repo keeps its hooks here (tracked in git) instead of `.git/hooks` (which isn't).

## Enable (once per clone)

```sh
git config core.hooksPath .githooks
```

## What's here

- **pre-commit** — regenerates `docs/GUIDE.md` from `src/` (via `scripts/Generate-Guide.ps1`)
  and stages it, so the usage guide is always current. Requires PowerShell (`pwsh` or
  `powershell`); if absent, it skips silently. CI also checks the guide is up to date, so a
  stale guide is caught even if the hook isn't enabled.
