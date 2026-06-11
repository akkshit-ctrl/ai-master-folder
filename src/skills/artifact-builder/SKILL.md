---
name: artifact-builder
description: "Build, package, and verify distribution artifacts across languages and platforms."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - build
    - packaging
    - artifacts
    - distribution
allowed-tools:
  - bash
  - read
  - glob
---

# Artifact Builder

Build and package distributable artifacts from source code.

## Build Process

### Step 1: Detect Build System
Identify the project's build system from config files:
- `package.json` → npm / yarn / pnpm
- `pyproject.toml` → hatch / poetry / setuptools
- `Cargo.toml` → cargo
- `go.mod` → go build
- `build.gradle` → gradle

### Step 2: Clean Build
Always build from clean state:
```bash
# Example for Node
rm -rf dist/ && npm run build

# Example for Python
rm -rf dist/ && python -m build

# Example for Rust
cargo clean && cargo build --release
```

### Step 3: Verify Artifacts
- Check that expected output files exist
- Verify file sizes are reasonable
- Run integrity checks (checksums, signatures) if applicable

### Step 4: Package
- Create compressed archive (tar.gz, zip) if needed
- Generate checksums (sha256sum)
- Tag version in git if releasing

## Related
- See `ci-cd-and-automation` skill for CI/CD pipeline integration

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll just build manually" | Automated builds are reproducible. Manual builds are not. |
| "The build works on my machine" | That is exactly why you need a clean build step. |
