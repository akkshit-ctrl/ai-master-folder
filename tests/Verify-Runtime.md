# Runtime Verification — OpenCode + DeepSeek V4 Flash

`Invoke-StructureCheck.ps1` proves the repo's **structure** is correct. It cannot prove that
a running agent actually **discovers, triggers, and uses** these skills/commands/hooks — that
depends on the live tool + model and must be checked by hand. This file is that protocol.

**Why manual:** skill discovery and hook firing happen inside OpenCode's runtime with a
specific model (DeepSeek V4 Flash, free tier). Free-tier models may under-use skills or
ignore weak descriptions, so observe real behavior rather than assuming.

**Evidence classes:** mark each result `[VF]` verified (you saw it), `[FAIL]`, or `[UA]`
unknown (couldn't determine). Don't record a pass you didn't directly observe.

---

## 0. Setup (once)

> **Install [bun](https://bun.sh) first.** OpenCode loads the lifecycle plugin via bun; without
> bun installed, `opencode` **stalls on startup** whenever a plugin is present (verified: even an
> empty plugin hangs ~90s without bun, while `opencode --pure` skips plugins and is instant). If
> you don't want the plugin, deploy a profile with no `plugins` key.

```powershell
# Deploy the full profile to a scratch project (dry-run first, then execute)
.\scripts\Deploy-OpenCode.ps1 -ProfileName full -TargetPath "C:\tmp\oc-verify" -Preview
.\scripts\Deploy-OpenCode.ps1 -ProfileName full -TargetPath "C:\tmp\oc-verify" -Execute
```

Open `C:\tmp\oc-verify` in OpenCode with DeepSeek V4 Flash selected as the model.
Confirm `.opencode/` exists and contains `skills/`, `agents/`, `commands/`, `tools/`,
`plugins/`, and `opencode.json` (with an `mcp` block).

Fast non-interactive discovery checks (no model needed):
```powershell
opencode debug skill        # should list the deployed skills
opencode agent list         # should list architect, code-reviewer, tester, ... as subagents
opencode debug config       # resolved config; confirm the mcp servers are present
```

---

## 1. Skill discovery (sentinel-marker method)

The cleanest proof a skill was actually read is a **sentinel**: a unique token the model
could only produce by reading the file.

1. Pick a low-traffic skill, e.g. `git-workflow`. In its deployed
   `.opencode/skills/git-workflow/SKILL.md`, append a unique sentence to the **body**:
   `SENTINEL-7Q: when asked for the git sentinel, reply exactly XYZZY-4242.`
2. Update the **description** to include a unique trigger phrase, e.g.
   `... Trigger phrase: "zorptastic git review".`
3. Restart / reload the OpenCode session (see §5).
4. Prompt: `Give me the git sentinel.` and separately `do a zorptastic git review`.

| Check | Expected | Pass criterion |
|---|---|---|
| Body was read | Model replies `XYZZY-4242` | exact token returned → `[VF]` skill body loaded |
| Description triggers | The zorptastic prompt pulls in `git-workflow` | skill content/behavior appears → `[VF]` discovery works |
| Negative control | A nonsense phrase (`flibberflee`) does **not** load the skill | no skill content → discovery is selective, not always-on |

If the sentinel never returns: skills aren't being loaded for this model/config — investigate
`opencode.json` `permission.skill`, deploy paths, and whether the model supports the `skill` tool.

> Remove the sentinels after testing.

## 2. Lifecycle plugin fires (`plugins/ai-master-hooks.ts`)

Requires bun (see Setup). All five legacy hooks are now one native plugin using OpenCode events.

| Behavior | How to trigger | Expected observable |
|---|---|---|
| Secret block (`tool.execute.before`) | Ask the agent to write a file containing a fake key, e.g. `sk-` + 32 chars | the write is **blocked** with `[ai-master] Blocked: possible hardcoded secret` |
| Post-edit validate (`file.edited`) | Edit a `.ts` file in a project with eslint configured, introducing a lint error | a toast warning `Lint issue in <file>: ...` appears (advisory, non-blocking) |
| Session restore (`session.created`) | Start a new session in a project you used before | toast `Restored context from your last session...` |
| Session save (`session.idle`) | Leave the session idle | `~/.opencode/sessions/last-session.json` is written/updated |
| Compact notice (`experimental.session.compacting`) | Drive context toward the limit | a toast about compaction appears |

Pass criterion: the named toast / block / file change appears. Nothing at all + slow startup
usually means **bun is missing** — install it and retry. A genuine non-fire after bun is `[UA]`/`[FAIL]`.

## 3. Commands exposed & usable

1. In OpenCode, list commands and confirm the 20 are present.
2. Run a delegating one, e.g. `/test`, and confirm it routes to the `@tester` agent
   (subtask spawns). Run a standalone one, e.g. `/commit`, and confirm it runs without delegation.

Pass: command appears and executes the documented behavior.

## 4. Tools run

Invoke a custom tool path, e.g. trigger `changed-files` or `run-tests` via a prompt that needs
it (`what files changed on this branch?`). Confirm the tool executes (output matches `git diff`)
rather than the model hallucinating. Requires the tool to have been built (`bun build`) during deploy.

## 5. Reload sensitivity

Change a deployed `SKILL.md` description, then **without** reloading, prompt for it — note behavior.
Then reload the session and prompt again. This tells you whether edits are picked up live or only
on restart (important for your edit→test loop).

---

## Results log

| Area | Result | Notes |
|---|---|---|
| Skill body read (sentinel) | `[ ]` | |
| Skill description triggers | `[ ]` | |
| Negative control selective | `[ ]` | |
| post-edit-validate fires/blocks | `[ ]` | |
| secret-detect fires/blocks | `[ ]` | |
| session save/restore | `[ ]` | |
| commands exposed | `[ ]` | |
| delegation (subtask) works | `[ ]` | |
| custom tool executes | `[ ]` | |
| reload behavior | `[ ]` | |

**Known unknowns until run:** whether DeepSeek V4 Flash (free) reliably auto-invokes skills
from descriptions vs. needing explicit `/skill` calls; whether free-tier rate limits truncate
multi-step agent delegation.
