# Architecture

This repository uses a **Profile-Aware Source Registry** architecture.

## Why this design?
1. **Safety:** Keeps the "Source of Truth" (`src/`) entirely isolated from runtime environments. Modifying a broken rule here won't immediately break an active project.
2. **Reusability:** By decoupling the items from the deployment, you can mix and match items using `profiles/` JSON files.
3. **Portability:** If you adopt a non-OpenCode assistant later, this registry can easily be mapped or compiled using a new script.

## The Generation Pipeline
The script `Deploy-OpenCode.ps1` performs two core actions:

1. **Copying Items:** It reads the arrays inside your chosen `profile.json` and selectively copies directories from `src/skills`, `src/commands`, etc., into the target `.opencode` folder.
2. **Light Templating:** It reads `src/AGENTS.md`. When it finds the exact string `<!-- PROFILE_INSTRUCTIONS_INJECT -->`, it pulls the content of every markdown file listed in your profile's `instructions` array and injects it there. This produces a monolithic, highly relevant `AGENTS.md` for the AI to ingest at runtime without you having to maintain a giant blob in this repo.