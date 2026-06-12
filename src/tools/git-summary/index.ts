import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";

export default tool({
  description: "Generate a summary of git changes (diffstat + recent commits) for commit messages.",
  args: {
    scope: tool.schema
      .enum(["staged", "unstaged", "branch"])
      .default("staged")
      .describe("Which changes to summarize"),
    base: tool.schema
      .string()
      .optional()
      .describe("Base branch for branch scope"),
  },
  async execute({ scope, base }) {
    let diffCommand: string;
    let logCommand: string;
    const defaultBranch = process.env.GIT_DEFAULT_BRANCH ?? "main";
    const safeBase = base && /^[\w.\-/]+$/.test(base) ? base : defaultBranch;

    switch (scope) {
      case "staged":
        diffCommand = "git diff --cached --stat";
        logCommand = "git log --oneline -1";
        break;
      case "unstaged":
        diffCommand = "git diff --stat";
        logCommand = "";
        break;
      case "branch":
      default:
        diffCommand = `git diff ${safeBase}...HEAD --stat`;
        logCommand = `git log ${safeBase}...HEAD --oneline`;
        break;
    }

    const diff = execSync(diffCommand, { encoding: "utf-8" }).trim();
    const log = logCommand ? execSync(logCommand, { encoding: "utf-8" }).trim() : "";

    const files = diff
      .split("\n")
      .filter((l) => l.includes("|"))
      .map((l) => l.split("|")[0].trim());

    return JSON.stringify(
      { files, diffSummary: diff, recentCommits: log, fileCount: files.length },
      null,
      2
    );
  },
});
