// PostToolUse Hook: Run linter + typecheck + test on edited files
// Fires after Edit/Write tool use
// Exit codes: 0 = continue (validation passed), 2 = block (validation failed)

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const VALIDATION_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs", ".java"];

function getChangedFiles() {
  // Read from environment variable set by the harness
  const files = process.env.ECC_TOOL_TARGET_FILES;
  if (!files) return [];
  return files.split(",").filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return VALIDATION_EXTENSIONS.includes(ext);
  });
}

function runCommand(cmd, cwd) {
  try {
    const output = execSync(cmd, {
      cwd,
      timeout: 60000,
      stdio: "pipe",
      encoding: "utf-8",
    });
    return { success: true, output: output.trim() };
  } catch (err) {
    return {
      success: false,
      output: err.stderr ? err.stderr.trim() : err.message,
    };
  }
}

function detectLinter(projectRoot) {
  const configs = [
    { file: ".eslintrc.js", cmd: "npx eslint" },
    { file: ".eslintrc.json", cmd: "npx eslint" },
    { file: ".eslintrc", cmd: "npx eslint" },
    { file: "eslint.config.js", cmd: "npx eslint" },
    { file: "eslint.config.mjs", cmd: "npx eslint" },
    { file: ".prettierrc", cmd: "npx prettier --check" },
    { file: "pyproject.toml", cmd: "ruff check" },
    { file: ".ruff.toml", cmd: "ruff check" },
    { file: ".golangci.yml", cmd: "golangci-lint run" },
    { file: "clippy.toml", cmd: "cargo clippy" },
  ];

  for (const config of configs) {
    if (fs.existsSync(path.join(projectRoot, config.file))) {
      return config.cmd;
    }
  }
  return null;
}

function detectTypeChecker(projectRoot) {
  const configs = [
    { file: "tsconfig.json", cmd: "npx tsc --noEmit" },
    { file: "pyproject.toml", cmd: "mypy ." },
    { file: "mypy.ini", cmd: "mypy ." },
  ];

  for (const config of configs) {
    if (fs.existsSync(path.join(projectRoot, config.file))) {
      return config.cmd;
    }
  }
  return null;
}

function main() {
  const projectRoot = process.cwd();
  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    process.exit(0);
  }

  const results = {
    linter: null,
    typechecker: null,
    errors: [],
  };

  // Run linter on changed files
  const linterCmd = detectLinter(projectRoot);
  if (linterCmd) {
    const targetFiles = changedFiles.join(" ");
    const result = runCommand(`${linterCmd} ${targetFiles}`, projectRoot);
    results.linter = {
      command: `${linterCmd} ${targetFiles}`,
      passed: result.success,
      output: result.output,
    };
    if (!result.success) {
      results.errors.push("linter");
    }
  }

  // Run typechecker on changed files
  const typeCheckerCmd = detectTypeChecker(projectRoot);
  if (typeCheckerCmd && changedFiles.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"))) {
    const result = runCommand(typeCheckerCmd, projectRoot);
    results.typechecker = {
      command: typeCheckerCmd,
      passed: result.success,
      output: result.output,
    };
    if (!result.success) {
      results.errors.push("typechecker");
    }
  }

  console.log("[hook:post-edit-validate]", JSON.stringify(results));

  // Block on validation failures
  if (results.errors.length > 0) {
    console.warn(
      "[hook:post-edit-validate] Validation failed — blocking",
      results.errors.join(", ")
    );
    process.exit(2);
  }

  process.exit(0);
}

main();
