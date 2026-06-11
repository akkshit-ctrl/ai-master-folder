import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

export default tool("check-coverage", "Check test coverage for the project", {
  threshold: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .default(80)
    .describe("Minimum coverage percentage"),
})
  .args(async ({ threshold }) => {
    const cwd = process.cwd();
    let command: string;

    if (existsSync(join(cwd, "vitest.config.ts")) || existsSync(join(cwd, "vitest.config.js"))) {
      command = `npx vitest run --coverage --coverage.thresholds.statements=${threshold}`;
    } else if (existsSync(join(cwd, "jest.config.js")) || existsSync(join(cwd, "jest.config.ts")) || existsSync(join(cwd, "jest.config.mjs"))) {
      command = `npx jest --coverage --coverageThreshold='{"global":{"statements":${threshold}}}'`;
    } else if (existsSync(join(cwd, "pyproject.toml"))) {
      command = `pytest --cov=src --cov-fail-under=${threshold}`;
    } else if (existsSync(join(cwd, "go.mod"))) {
      command = `go test -cover -coverprofile=coverage.out ./...`;
    } else if (existsSync(join(cwd, "Cargo.toml"))) {
      command = `cargo tarpaulin --out Xml`;
    } else if (existsSync(join(cwd, ".nycrc")) || existsSync(join(cwd, ".nycrc.json"))) {
      command = `npx nyc --reporter=text-summary ${threshold}`;
    } else {
      return {
        error: "No supported coverage tool detected (vitest, jest, pytest, go, cargo-tarpaulin, nyc)",
      };
    }

    try {
      const output = execSync(command, { encoding: "utf-8", timeout: 120000 });
      return { output: output.trim(), passed: true };
    } catch (err: any) {
      return {
        output: err.stdout?.trim() ?? "",
        error: err.stderr?.trim() ?? err.message,
        passed: false,
      };
    }
  });
