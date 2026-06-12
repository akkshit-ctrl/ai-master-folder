import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";

export default tool({
  description: "Get list of changed files from git (staged, unstaged, branch, or all).",
  args: {
    scope: tool.schema
      .enum(["staged", "unstaged", "branch", "all"])
      .default("unstaged")
      .describe("Which files to return"),
    base: tool.schema
      .string()
      .optional()
      .describe("Base branch for branch scope"),
  },
  async execute({ scope, base }) {
    let command: string;
    const defaultBranch = process.env.GIT_DEFAULT_BRANCH ?? "main";
    const safeBase = base && /^[\w.\-/]+$/.test(base) ? base : defaultBranch;

    switch (scope) {
      case "staged":
        command = "git diff --cached --name-only";
        break;
      case "unstaged":
        command = "git diff --name-only";
        break;
      case "branch":
        command = `git diff --name-only ${safeBase}...HEAD`;
        break;
      case "all":
      default:
        command =
          'git diff --cached --name-only && echo "---" && git diff --name-only';
        break;
    }

    const output = execSync(command, { encoding: "utf-8" }).trim();
    const files = output
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f && f !== "---");

    return JSON.stringify({ files }, null, 2);
  },
});
