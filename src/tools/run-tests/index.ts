import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default tool({
  description: "Run project tests with automatic framework detection (vitest, jest, pytest, mocha, cypress, playwright, ava, go, cargo).",
  args: {
    files: tool.schema
      .array(tool.schema.string())
      .optional()
      .describe("Specific test files to run (default: all)"),
    watch: tool.schema.boolean().default(false).describe("Run in watch mode"),
    coverage: tool.schema.boolean().default(false).describe("Generate coverage report"),
  },
  async execute({ files, watch, coverage }) {
    const cwd = process.cwd();
    const safeFiles = files?.filter((f) => /^[\w.\-/\\@]+$/.test(f));
    const targets = safeFiles?.join(" ") ?? "";
    const watchFlag = watch ? "--watch" : "";
    const coverageFlag = coverage ? "--coverage" : "";
    const run = (cmd: string) => execSync(cmd, { encoding: "utf-8", timeout: 120000 });
    const result = (framework: string, passed: boolean, output: string) =>
      JSON.stringify({ framework, passed, output: output.trim() }, null, 2);

    if (existsSync(join(cwd, "vitest.config.ts")) || existsSync(join(cwd, "vitest.config.js"))) {
      const output = run(`npx vitest run ${watchFlag} ${coverageFlag} ${targets}`.trim());
      return result("vitest", !output.includes("FAIL") && !output.includes("failed"), output);
    }
    if (existsSync(join(cwd, "jest.config.js")) || existsSync(join(cwd, "jest.config.ts")) || existsSync(join(cwd, "jest.config.mjs"))) {
      const output = run(`npx jest ${watchFlag} ${coverageFlag} ${targets}`.trim());
      return result("jest", !output.includes("FAIL") && !output.includes("failed"), output);
    }
    if (existsSync(join(cwd, "pyproject.toml"))) {
      const output = run(`pytest ${watchFlag} ${coverageFlag} ${targets}`.trim());
      return result("pytest", output.includes("passed") || output.includes("=="), output);
    }
    if (existsSync(join(cwd, ".mocharc.js")) || existsSync(join(cwd, ".mocharc.json")) || existsSync(join(cwd, ".mocharc.yml"))) {
      const output = run(`npx mocha ${watch ? "--watch" : ""} ${targets}`.trim());
      return result("mocha", !output.includes("failing") && !output.includes("0 passing"), output);
    }
    if (existsSync(join(cwd, "cypress.config.ts")) || existsSync(join(cwd, "cypress.config.js"))) {
      const output = run(`npx cypress run ${coverageFlag} ${targets}`.trim());
      return result("cypress", !output.includes("failed") && !output.includes("Failures"), output);
    }
    if (existsSync(join(cwd, "playwright.config.ts")) || existsSync(join(cwd, "playwright.config.js"))) {
      const output = run(`npx playwright test ${targets}`.trim());
      return result("playwright", !output.includes("failed") && output.includes("passed"), output);
    }
    if (existsSync(join(cwd, "ava.config.js")) || existsSync(join(cwd, "ava.config.ts"))) {
      const output = run(`npx ava ${watchFlag} ${targets}`.trim());
      return result("ava", !output.includes("failed"), output);
    }
    if (existsSync(join(cwd, "go.mod"))) {
      const output = run(`go test ${coverageFlag} ./${targets}`.trim());
      return result("go-test", !output.includes("FAIL"), output);
    }
    if (existsSync(join(cwd, "Cargo.toml"))) {
      const output = run(`cargo test ${targets}`.trim());
      return result("cargo-test", output.includes("test result: ok"), output);
    }

    return JSON.stringify(
      { error: "No supported test framework detected (vitest, jest, pytest, mocha, cypress, playwright, ava, go-test, cargo-test)" },
      null,
      2
    );
  },
});
