import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";

export default tool(
  "git-summary",
  "Generate a summary of git changes for commit messages",
  {
    scope: z
      .enum(["staged", "unstaged", "branch"])
      .default("staged")
      .describe("Which changes to summarize"),
    base: z
      .string()
      .optional()
      .describe("Base branch for branch scope"),
  }
)
  .args(async ({ scope, base }) => {
    let diffCommand: string;
    let logCommand: string;
    const defaultBranch = process.env.GIT_DEFAULT_BRANCH ?? "main";
    const safeBase = base && /^[\w.\-/]+$/.test(base) ? base : defaultBranch;

    switch (scope) {
      case "staged":
        diffCommand = "git diff --cached --stat";
        logCommand = 'git log --oneline -1';
        break;
      case "unstaged":
        diffCommand = "git diff --stat";
        logCommand = "";
        break;
      case "branch":
        diffCommand = `git diff ${safeBase}...HEAD --stat`;
        logCommand = `git log ${safeBase}...HEAD --oneline`;
        break;
    }

    const diff = execSync(diffCommand, { encoding: "utf-8" }).trim();
    const log = logCommand ? execSync(logCommand, { encoding: "utf-8" }).trim() : "";

    const files = diff
      .split("\n")
      .filter((l) => l.includes("|"))
      .map((l) => {
        const [file] = l.split("|").map((s) => s.trim());
        return file;
      });

    return {
      files,
      diffSummary: diff,
      recentCommits: log,
      fileCount: files.length,
    };
  });
