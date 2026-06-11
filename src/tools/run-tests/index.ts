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

    if (existsSync(join(cwd, "jest.config.js")) || existsSync(join(cwd, "jest.config.ts")) || existsSync(join(cwd, "jest.config.mjs"))) {
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

    if (existsSync(join(cwd, ".mocharc.js")) || existsSync(join(cwd, ".mocharc.json")) || existsSync(join(cwd, ".mocharc.yml"))) {
      const cmd = `npx mocha ${watchFlag === "--watch" ? "--watch" : ""} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("failing") && !output.includes("0 passing");
      return { framework: "mocha", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "cypress.config.ts")) || existsSync(join(cwd, "cypress.config.js"))) {
      const cmd = `npx cypress run ${coverageFlag} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("failed") && !output.includes("Failures");
      return { framework: "cypress", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "playwright.config.ts")) || existsSync(join(cwd, "playwright.config.js"))) {
      const cmd = `npx playwright test ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("failed") && output.includes("passed");
      return { framework: "playwright", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "ava.config.js")) || existsSync(join(cwd, "ava.config.ts"))) {
      const cmd = `npx ava ${watchFlag} ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("failed");
      return { framework: "ava", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "go.mod"))) {
      const cmd = `go test ${coverageFlag} ./${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = !output.includes("FAIL");
      return { framework: "go-test", passed, output: output.trim() };
    }

    if (existsSync(join(cwd, "Cargo.toml"))) {
      const cmd = `cargo test ${targets}`.trim();
      const output = execSync(cmd, { encoding: "utf-8", timeout: 120000 });
      const passed = output.includes("test result: ok");
      return { framework: "cargo-test", passed, output: output.trim() };
    }

    return { error: "No supported test framework detected (vitest, jest, pytest, mocha, cypress, playwright, ava, go-test, cargo-test)" };
  });
