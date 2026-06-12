import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default tool({
  description: "Run the project's coverage tool against a threshold with detection (vitest, jest, pytest, go, cargo-tarpaulin, nyc).",
  args: {
    threshold: tool.schema
      .number()
      .min(0)
      .max(100)
      .default(80)
      .describe("Minimum coverage percentage"),
  },
  async execute({ threshold }) {
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
      command = `npx nyc --reporter=text-summary`;
    } else {
      return JSON.stringify(
        { error: "No supported coverage tool detected (vitest, jest, pytest, go, cargo-tarpaulin, nyc)" },
        null,
        2
      );
    }

    try {
      const output = execSync(command, { encoding: "utf-8", timeout: 120000 });
      return JSON.stringify({ output: output.trim(), passed: true }, null, 2);
    } catch (err: any) {
      return JSON.stringify(
        { output: err.stdout?.trim() ?? "", error: err.stderr?.trim() ?? err.message, passed: false },
        null,
        2
      );
    }
  },
});
