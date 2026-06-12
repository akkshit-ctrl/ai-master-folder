import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

export default tool("lint-check", "Run linter on project files", {
  files: z
    .array(z.string())
    .optional()
    .describe("Files to lint (default: all)"),
  fix: z
    .boolean()
    .optional()
    .default(false)
    .describe("Auto-fix fixable issues"),
})
  .args(async ({ files, fix }) => {
    const cwd = process.cwd();
    const safeFiles = files?.filter(f => /^[\w.\-/\\@]+$/.test(f));
    const targets = safeFiles?.join(" ") ?? ".";
    const fixFlag = fix ? "--fix" : "";

    if (existsSync(join(cwd, "eslint.config.js")) || existsSync(join(cwd, ".eslintrc.js"))) {
      const cmd = `npx eslint ${fixFlag} ${targets} --format json`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        const results = JSON.parse(output);
        const totalErrors = results.reduce(
          (sum: number, f: any) => sum + f.errorCount,
          0
        );
        const totalWarnings = results.reduce(
          (sum: number, f: any) => sum + f.warningCount,
          0
        );
        return {
          linter: "eslint",
          errorCount: totalErrors,
          warningCount: totalWarnings,
          results,
        };
      } catch (err: any) {
        const output = err.stdout?.trim() ?? "";
        try {
          const results = JSON.parse(output);
          return {
            linter: "eslint",
            errorCount: results.reduce(
              (sum: number, f: any) => sum + f.errorCount,
              0
            ),
            warningCount: results.reduce(
              (sum: number, f: any) => sum + f.warningCount,
              0
            ),
            results,
          };
        } catch {
          return { linter: "eslint", error: output || err.message };
        }
      }
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      const cmd = `ruff check ${fixFlag} ${targets} --output-format json`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        return { linter: "ruff", results: JSON.parse(output) };
      } catch (err: any) {
        return { linter: "ruff", output: err.stdout?.trim() ?? err.message };
      }
    }

    if (existsSync(join(cwd, ".golangci.yml")) || existsSync(join(cwd, ".golangci.yaml"))) {
      const cmd = `golangci-lint run ${targets}`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        return { linter: "golangci-lint", output: output.trim() };
      } catch (err: any) {
        return { linter: "golangci-lint", output: err.stdout?.trim() ?? err.message };
      }
    }

    if (existsSync(join(cwd, "Cargo.toml"))) {
      const cmd = `cargo clippy ${targets} 2>&1`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        return { linter: "clippy", output: output.trim() };
      } catch (err: any) {
        return { linter: "clippy", output: err.stdout?.trim() ?? err.message };
      }
    }

    return { error: "No supported linter detected (eslint, ruff, golangci-lint, clippy)" };
  });
