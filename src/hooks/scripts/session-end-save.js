// SessionEnd Hook: Persist session state, extract learning observations
// Fires when a session ends
// Exit codes: 0 = continue, 2 = block

const fs = require("fs");
const path = require("path");

function getSessionSummary() {
  // Read environment variables or arguments for session metadata
  // In a real deployment, this would be populated by the harness
  return {
    filesModified: process.env.ECC_SESSION_FILES_MODIFIED
      ? process.env.ECC_SESSION_FILES_MODIFIED.split(",")
      : [],
    toolsUsed: process.env.ECC_SESSION_TOOLS_USED
      ? process.env.ECC_SESSION_TOOLS_USED.split(",")
      : [],
    outcome: process.env.ECC_SESSION_OUTCOME || "incomplete",
    duration: process.env.ECC_SESSION_DURATION
      ? parseInt(process.env.ECC_SESSION_DURATION, 10)
      : 0,
  };
}

function saveSession(summary) {
  const sessionDir = path.join(
    process.env.HOME || process.env.USERPROFILE || ".",
    ".opencode",
    "sessions"
  );

  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  const sessionFile = path.join(sessionDir, "last-session.json");
  const sessionData = {
    summary: summary,
    timestamp: new Date().toISOString(),
    version: "0.3.0",
  };

  fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
}

function main() {
  const summary = getSessionSummary();
  saveSession(summary);

  console.log(
    "[hook:session-end]",
    JSON.stringify({
      filesModified: summary.filesModified.length,
      toolsUsed: summary.toolsUsed.length,
      outcome: summary.outcome,
      saved: true,
    })
  );

  process.exit(0);
}

main();
