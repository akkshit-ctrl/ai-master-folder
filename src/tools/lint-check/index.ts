import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default tool({
  description: "Run the project's linter with framework detection (eslint, ruff, golangci-lint, clippy). Optional auto-fix.",
  args: {
    files: tool.schema
      .array(tool.schema.string())
      .optional()
      .describe("Files to lint (default: all)"),
    fix: tool.schema.boolean().default(false).describe("Auto-fix fixable issues"),
  },
  async execute({ files, fix }) {
    const cwd = process.cwd();
    const safeFiles = files?.filter((f) => /^[\w.\-/\\@]+$/.test(f));
    const targets = safeFiles?.join(" ") ?? ".";
    const fixFlag = fix ? "--fix" : "";
    const out = (obj: unknown) => JSON.stringify(obj, null, 2);

    if (existsSync(join(cwd, "eslint.config.js")) || existsSync(join(cwd, ".eslintrc.js"))) {
      const cmd = `npx eslint ${fixFlag} ${targets} --format json`;
      const parse = (output: string) => {
        const results = JSON.parse(output);
        return out({
          linter: "eslint",
          errorCount: results.reduce((s: number, f: any) => s + f.errorCount, 0),
          warningCount: results.reduce((s: number, f: any) => s + f.warningCount, 0),
          results,
        });
      };
      try {
        return parse(execSync(cmd, { encoding: "utf-8" }));
      } catch (err: any) {
        const output = err.stdout?.trim() ?? "";
        try {
          return parse(output);
        } catch {
          return out({ linter: "eslint", error: output || err.message });
        }
      }
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      const cmd = `ruff check ${fixFlag} ${targets} --output-format json`;
      try {
        return out({ linter: "ruff", results: JSON.parse(execSync(cmd, { encoding: "utf-8" })) });
      } catch (err: any) {
        return out({ linter: "ruff", output: err.stdout?.trim() ?? err.message });
      }
    }

    if (existsSync(join(cwd, ".golangci.yml")) || existsSync(join(cwd, ".golangci.yaml"))) {
      try {
        return out({ linter: "golangci-lint", output: execSync(`golangci-lint run ${targets}`, { encoding: "utf-8" }).trim() });
      } catch (err: any) {
        return out({ linter: "golangci-lint", output: err.stdout?.trim() ?? err.message });
      }
    }

    if (existsSync(join(cwd, "Cargo.toml"))) {
      try {
        return out({ linter: "clippy", output: execSync(`cargo clippy ${targets} 2>&1`, { encoding: "utf-8" }).trim() });
      } catch (err: any) {
        return out({ linter: "clippy", output: err.stdout?.trim() ?? err.message });
      }
    }

    return out({ error: "No supported linter detected (eslint, ruff, golangci-lint, clippy)" });
  },
});
