import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";

export default tool("changed-files", "Get list of changed files from git", {
  scope: z
    .enum(["staged", "unstaged", "branch", "all"])
    .default("unstaged")
    .describe("Which files to return"),
  base: z
    .string()
    .optional()
    .describe("Base branch for branch scope"),
})
  .args(async ({ scope, base }) => {
    let command: string;
    const defaultBranch = process.env.GIT_DEFAULT_BRANCH ?? "main";

    switch (scope) {
      case "staged":
        command = "git diff --cached --name-only";
        break;
      case "unstaged":
        command = "git diff --name-only";
        break;
      case "branch":
        command = `git diff --name-only ${base ?? defaultBranch}...HEAD`;
        break;
      case "all":
        command =
          'git diff --cached --name-only && echo "---" && git diff --name-only';
        break;
    }

    const output = execSync(command, { encoding: "utf-8" }).trim();
    const files = output
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f && f !== "---");

    return { files };
  });
