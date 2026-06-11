import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

export default tool("run-tests", "Run project tests with framework detection", {
  files: z
    .array(z.string())
    .optional()
    .describe("Specific test files to run (default: all)"),
  watch: z
    .boolean()
    .optional()
    .default(false)
    .describe("Run in watch mode"),
  coverage: z
    .boolean()
    .optional()
    .default(false)
    .describe("Generate coverage report"),
})
  .args(async ({ files, watch, coverage }) => {
    const cwd = process.cwd();
    const targets = files?.join(" ") ?? "";
    const watchFlag = watch ? "--watch" : "";
    const coverageFlag = coverage ? "--coverage" : "";

    if (existsSync(join(cwd, "vitest.config.ts")) || existsSync(join(cwd, "vitest.config.js"))) {
      const cmd = `npx vitest run ${watchFlag} ${coverageFlag} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("FAIL") && !output.includes("failed");
      return { framework: "vitest", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "jest.config.js")) || existsSync(join(cwd, "jest.config.ts"))) {
      const cmd = `npx jest ${watchFlag} ${coverageFlag} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("FAIL") && !output.includes("failed");
      return { framework: "jest", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      const cmd = `pytest ${watchFlag} ${coverageFlag} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = output.includes("passed") || output.includes("==");
      return { framework: "pytest", passed, output: output.trim() };
    }

    return { error: "No supported test framework detected (vitest, jest, pytest)" };
  });
