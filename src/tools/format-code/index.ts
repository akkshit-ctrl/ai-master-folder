import { tool } from "@opencode-ai/plugin";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default tool({
  description: "Format code using the project's formatter with detection (prettier, ruff, gofmt, rustfmt). Set check:true to verify without writing.",
  args: {
    files: tool.schema
      .array(tool.schema.string())
      .optional()
      .describe("Files to format (default: all)"),
    check: tool.schema.boolean().default(false).describe("Check formatting without modifying files"),
  },
  async execute({ files, check }) {
    const cwd = process.cwd();
    const safeFiles = files?.filter((f) => /^[\w.\-/\\@]+$/.test(f));
    const targets = safeFiles?.join(" ") ?? ".";
    const checkFlag = check ? "--check" : "";
    const out = (obj: unknown) => JSON.stringify(obj, null, 2);

    const prettierConfigs = [".prettierrc", ".prettierrc.json", ".prettierrc.yaml", ".prettierrc.yml", ".prettierrc.toml", "prettier.config.js", "prettier.config.mjs"];
    if (prettierConfigs.some((cfg) => existsSync(join(cwd, cfg)))) {
      const cmd = check ? `npx prettier --check ${targets}` : `npx prettier --write ${targets}`;
      return out({ formatter: "prettier", output: execSync(cmd, { encoding: "utf-8" }).trim() });
    }

    if (existsSync(join(cwd, "pyproject.toml"))) {
      return out({ formatter: "ruff", output: execSync(`ruff format ${checkFlag} ${targets}`, { encoding: "utf-8" }).trim() });
    }

    if (existsSync(join(cwd, "go.mod"))) {
      try {
        return out({ formatter: "gofmt", output: execSync(`gofmt ${check ? "-d" : "-w"} ${targets}`, { encoding: "utf-8" }).trim() });
      } catch (err: any) {
        return out({ formatter: "gofmt", output: err.stdout?.trim() ?? err.message });
      }
    }

    if (existsSync(join(cwd, "Cargo.toml"))) {
      try {
        return out({ formatter: "rustfmt", output: execSync(`cargo fmt ${checkFlag} ${targets}`, { encoding: "utf-8" }).trim() });
      } catch (err: any) {
        return out({ formatter: "rustfmt", output: err.stdout?.trim() ?? err.message });
      }
    }

    return out({ error: "No supported formatter detected (prettier, ruff, gofmt, rustfmt)" });
  },
});
