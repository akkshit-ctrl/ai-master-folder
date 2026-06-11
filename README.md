# AI Master Folder

Welcome to your AI Operating System. This repository acts as the canonical source of truth for your AI coding assistant configurations, optimized for OpenCode but designed for broad portability.

## Philosophy
- **Registry Layer:** The `src/` directory represents your exact inventory of agents, skills, tools, and commands. You edit these files as your ultimate source of truth.
- **Package Layer:** The `profiles/` directory groups your skills and instructions into deployable packages (e.g., `base`, `web-dev`).
- **Deployment Layer:** The `scripts/Deploy-OpenCode.ps1` script securely copies specific profiles to your global settings or individual project folders.

## How to Use

### 1. Preview a Deployment
See what gets compiled before you touch a real project:
```powershell
.\scripts\Deploy-OpenCode.ps1 -ProfileName "web-dev" -Preview
```
This compiles a `.opencode` folder inside `build/preview/.opencode/`.

### 2. Deploy Globally
Update your machine's default OpenCode behavior:
```powershell
.\scripts\Deploy-OpenCode.ps1 -ProfileName "base" -Global
```

### 3. Deploy to a Specific Project
Give a project a specific set of skills (e.g., web-dev):
```powershell
.\scripts\Deploy-OpenCode.ps1 -ProfileName "web-dev" -TargetPath "C:\Path\To\Your\Project"
```

## Making Changes
Please refer to `docs/CONTRIBUTING.md` for naming conventions and rules before adding new items to `src/`.
