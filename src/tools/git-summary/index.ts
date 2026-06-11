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
  }
)
  .args(async ({ scope }) => {
    let diffCommand: string;
    let logCommand: string;

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
        diffCommand = "git diff main...HEAD --stat";
        logCommand = 'git log main...HEAD --oneline';
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
