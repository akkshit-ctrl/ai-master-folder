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
    const safeFiles = files?.filter(f => /^[\w.\-/\\@]+$/.test(f));
    const targets = safeFiles?.join(" ") ?? ".";
    const checkFlag = check ? "--check" : "";

    const prettierConfigs = [".prettierrc", ".prettierrc.json", ".prettierrc.yaml", ".prettierrc.yml", ".prettierrc.toml", "prettier.config.js", "prettier.config.mjs"];
    if (prettierConfigs.some((cfg) => existsSync(join(cwd, cfg)))) {
      const cmd = `npx prettier ${checkFlag} --write ${targets}`;
      const output = execSync(cmd, { encoding: "utf-8" });
      return { formatter: "prettier", output: output.trim() };
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      const cmd = `ruff format ${checkFlag} ${targets}`;
      const output = execSync(cmd, { encoding: "utf-8" });
      return { formatter: "ruff", output: output.trim() };
    }

    if (existsSync(join(cwd, ".go.mod")) || existsSync(join(cwd, "go.mod"))) {
      const cmd = `gofmt ${checkFlag === "--check" ? "-d" : "-w"} ${targets}`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        return { formatter: "gofmt", output: output.trim() };
      } catch (err: any) {
        return { formatter: "gofmt", output: err.stdout?.trim() ?? err.message };
      }
    }

    if (existsSync(join(cwd, "Cargo.toml"))) {
      const cmd = `cargo fmt ${checkFlag} ${targets}`;
      try {
        const output = execSync(cmd, { encoding: "utf-8" });
        return { formatter: "rustfmt", output: output.trim() };
      } catch (err: any) {
        return { formatter: "rustfmt", output: err.stdout?.trim() ?? err.message };
      }
    }

    return { error: "No supported formatter detected (prettier, ruff, gofmt, rustfmt)" };
  });
