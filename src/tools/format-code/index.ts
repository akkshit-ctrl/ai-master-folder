import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

export default tool("format-code", "Format code using project formatter", {
  files: z
    .array(z.string())
    .optional()
    .describe("Files to format (default: all)"),
  check: z
    .boolean()
    .optional()
    .default(false)
    .describe("Check formatting without modifying"),
})
  .args(async ({ files, check }) => {
    const cwd = process.cwd();
    const targets = files?.join(" ") ?? ".";
    const checkFlag = check ? "--check" : "";

    if (existsSync(join(cwd, ".prettierrc"))) {
      const cmd = `npx prettier ${checkFlag} --write ${targets}`;
      const output = execSync(cmd, { encoding: "utf-8" });
      return { formatter: "prettier", output: output.trim() };
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      const cmd = `ruff format ${checkFlag} ${targets}`;
      const output = execSync(cmd, { encoding: "utf-8" });
      return { formatter: "ruff", output: output.trim() };
    }

    return { error: "No supported formatter detected (prettier, ruff)" };
  });
