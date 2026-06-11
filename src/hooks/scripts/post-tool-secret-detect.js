// PostToolUse Hook: Scan Write/Edit output for secrets, tokens, credentials
// Fires after Edit/Write tool use
// Exit codes: 0 = clean (no secrets found), 2 = secrets detected (block)

const fs = require("fs");
const path = require("path");

const SECRET_PATTERNS = [
  // API Keys and tokens
  { pattern: /(?i)(api[_-]?key|apikey)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/, severity: "critical", label: "API Key" },
  { pattern: /(?i)(sk-[A-Za-z0-9]{32,}|sk-[A-Za-z0-9]{20,})/, severity: "critical", label: "OpenAI Key" },
  { pattern: /(?i)(ghp_|gho_|ghu_|ghs_|ghr_)[A-Za-z0-9_]{36}/, severity: "critical", label: "GitHub Token" },
  { pattern: /(?i)AKIA[0-9A-Z]{16}/, severity: "critical", label: "AWS Access Key" },
  { pattern: /(?i)-----BEGIN\s+(RSA|EC|DSA|OPENSSH|PRIVATE)\s+KEY-----/, severity: "critical", label: "Private Key" },
  { pattern: /(?i)xox[abarpos]-[A-Za-z0-9]{10,}/, severity: "critical", label: "Slack Token" },

  // Generic secrets
  { pattern: /(?i)(secret|password|passwd|pwd|token|credential)\s*[:=]\s*['"][^'"]{8,}['"]/, severity: "high", label: "Generic Secret" },
  { pattern: /(?i)(DATABASE_URL|MONGODB_URI|REDIS_URL)\s*[:=]\s*['"].*[^'"]+\.[^'"]+\.[^'"]+['"]/, severity: "high", label: "Database URL" },
  { pattern: /(?i)JWT_SECRET\s*[:=]\s*['"][^'"]{8,}['"]/, severity: "high", label: "JWT Secret" },
];

function getChangedFiles() {
  const files = process.env.ECC_TOOL_TARGET_FILES;
  if (!files) return [];
  return files.split(",").filter(Boolean);
}

function scanFile(filePath) {
  const findings = [];

  if (!fs.existsSync(filePath)) return findings;

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    for (const { pattern, severity, label } of SECRET_PATTERNS) {
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i])) {
          findings.push({
            file: filePath,
            line: i + 1,
            severity: severity,
            label: label,
            snippet: lines[i].trim().substring(0, 80),
          });
        }
      }
    }
  } catch (err) {
    // Skip files that can't be read
  }

  return findings;
}

function main() {
  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    process.exit(0);
  }

  const allFindings = [];
  for (const file of changedFiles) {
    const findings = scanFile(file);
    allFindings.push(...findings);
  }

  if (allFindings.length > 0) {
    console.warn(
      "[hook:post-tool-secret-detect] SECURITY WARNING: Potential secrets detected"
    );
    console.warn(JSON.stringify(allFindings, null, 2));

    const criticalCount = allFindings.filter((f) => f.severity === "critical").length;
    if (criticalCount > 0) {
      console.error(
        `[hook:post-tool-secret-detect] Blocking: ${criticalCount} critical secret(s) detected`
      );
      process.exit(2);
    }
  }

  console.log(
    "[hook:post-tool-secret-detect] Clean — no secrets detected in",
    changedFiles.length,
    "files"
  );
  process.exit(0);
}

main();
