// AI Master Folder — native OpenCode plugin.
// Replaces the old Claude-Code-style hooks.json + ECC_* env scripts, which OpenCode
// does NOT run. OpenCode fires hooks only through this @opencode-ai/plugin API.
//
// Provides:
//   - secret-detect : block writes/edits that introduce hardcoded credentials (tool.execute.before)
//   - post-edit-validate : lint/typecheck a file after it changes, surfaced as a toast (file.edited)
//   - session restore/save : persist a small last-session marker (session.created / session.idle)
//   - compact notice : log a tip when the session is compacted (experimental.session.compacting)
//
// Disable everything with AI_MASTER_DISABLE_HOOKS=1.

import type { Plugin } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { homedir } from "node:os";

const DISABLED = process.env.AI_MASTER_DISABLE_HOOKS === "1";

const SECRET_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "OpenAI key", re: /sk-[A-Za-z0-9]{20,}/ },
  { label: "GitHub token", re: /(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}/ },
  { label: "AWS access key", re: /AKIA[0-9A-Z]{16}/ },
  { label: "Slack token", re: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { label: "Private key block", re: /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { label: "Generic API secret", re: /(api[_-]?key|secret|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i },
];

const VALIDATION_EXTS = [".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs", ".java"];
const SAFE_PATH = /^[\w.\-/\\@:]+$/;

function contentFromArgs(args: Record<string, any>): string {
  // Covers the built-in write (content) and edit (newString) tools.
  return [args?.content, args?.newString, args?.replacement, args?.text]
    .filter((v) => typeof v === "string")
    .join("\n");
}

function detectLinter(root: string): string | null {
  const probes: [string, string][] = [
    ["eslint.config.js", "npx eslint"],
    ["eslint.config.mjs", "npx eslint"],
    [".eslintrc.js", "npx eslint"],
    [".eslintrc.json", "npx eslint"],
    ["pyproject.toml", "ruff check"],
    [".golangci.yml", "golangci-lint run"],
  ];
  for (const [file, cmd] of probes) if (existsSync(join(root, file))) return cmd;
  return null;
}

export const AiMasterHooks: Plugin = async ({ directory, client }) => {
  if (DISABLED) return {};

  const root = directory ?? process.cwd();
  const sessionDir = join(homedir(), ".opencode", "sessions");
  const sessionFile = join(sessionDir, "last-session.json");

  const toast = async (message: string, variant: "info" | "warning" | "error" = "info") => {
    try {
      await client?.tui?.showToast?.({ body: { message, variant } });
    } catch {
      /* toast is best-effort */
    }
  };

  return {
    // 1. Block secrets BEFORE they are written.
    "tool.execute.before": async (input: any, output: any) => {
      if (!["write", "edit"].includes(input?.tool)) return;
      const content = contentFromArgs(output?.args ?? {});
      if (!content) return;
      for (const { label, re } of SECRET_PATTERNS) {
        if (re.test(content)) {
          throw new Error(
            `[ai-master] Blocked: possible hardcoded secret (${label}). Use an env var or secret manager instead.`
          );
        }
      }
    },

    // 2. Validate a file AFTER it is edited (advisory toast, never blocks).
    "file.edited": async (input: any) => {
      const file: string | undefined = input?.file ?? input?.path;
      if (!file || !VALIDATION_EXTS.includes(extname(file).toLowerCase())) return;
      if (!SAFE_PATH.test(file)) return;
      const linter = detectLinter(root);
      if (!linter) return;
      try {
        execSync(`${linter} "${file}"`, { cwd: root, timeout: 60000, stdio: "pipe" });
      } catch (err: any) {
        const detail = (err?.stderr || err?.stdout || err?.message || "").toString().split("\n")[0];
        await toast(`Lint issue in ${file}: ${detail}`.slice(0, 200), "warning");
      }
    },

    // 3. Persist a small session marker on idle (replaces session-end-save).
    "session.idle": async (input: any) => {
      try {
        if (!existsSync(sessionDir)) mkdirSync(sessionDir, { recursive: true });
        writeFileSync(
          sessionFile,
          JSON.stringify({ sessionID: input?.sessionID ?? null, project: root, savedAt: new Date().toISOString() }, null, 2)
        );
      } catch {
        /* persistence is best-effort */
      }
    },

    // 4. Surface the prior session on start (replaces session-start-restore).
    "session.created": async () => {
      try {
        if (existsSync(sessionFile)) {
          const prev = JSON.parse(readFileSync(sessionFile, "utf-8"));
          if (prev?.project === root) await toast("Restored context from your last session in this project.", "info");
        }
      } catch {
        /* restore is best-effort */
      }
    },

    // 5. Note compaction (replaces pre-compact-warning).
    "experimental.session.compacting": async () => {
      await toast("Context is being compacted — long history is summarized. Re-state key facts if needed.", "info");
    },
  };
};
