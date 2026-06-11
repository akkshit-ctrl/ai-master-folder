// SessionStart Hook: Restore previous session context, detect project type
// Fires when a new session begins
// Exit codes: 0 = continue, 2 = block

const fs = require("fs");
const path = require("path");

function getProjectRoot() {
  const cwd = process.cwd();
  const markers = [
    "package.json",
    "pyproject.toml",
    "Cargo.toml",
    "go.mod",
    "Gemfile",
    "build.gradle",
    "CMakeLists.txt",
    "pubspec.yaml",
  ];

  for (const marker of markers) {
    const markerPath = path.join(cwd, marker);
    if (fs.existsSync(markerPath)) {
      return { root: cwd, type: marker };
    }
  }

  return { root: cwd, type: "unknown" };
}

function detectProjectType(marker) {
  const typeMap = {
    "package.json": determineNodeSubtype(),
    "pyproject.toml": "python",
    "Cargo.toml": "rust",
    "go.mod": "go",
    "Gemfile": "ruby",
    "build.gradle": "java",
    "CMakeLists.txt": "cpp",
    "pubspec.yaml": "dart",
  };
  return typeMap[marker] || "unknown";
}

function determineNodeSubtype() {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
    );
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (deps.next) return "node:nextjs";
    if (deps["@angular/core"]) return "node:angular";
    if (deps.react) return "node:react";
    if (deps.electron) return "node:electron";
    if (deps.express) return "node:express";
    return "node:general";
  } catch {
    return "node:general";
  }
}

function restorePreviousSession() {
  const sessionDir = path.join(
    process.env.HOME || process.env.USERPROFILE || ".",
    ".opencode",
    "sessions"
  );
  const sessionFile = path.join(sessionDir, "last-session.json");

  if (fs.existsSync(sessionFile)) {
    try {
      return JSON.parse(fs.readFileSync(sessionFile, "utf-8"));
    } catch {
      return null;
    }
  }
  return null;
}

function main() {
  const project = getProjectRoot();
  const projectType = detectProjectType(project.type);
  const previousSession = restorePreviousSession();

  const context = {
    projectRoot: project.root,
    projectType: projectType,
    detectionMarker: project.type,
    hasPreviousSession: previousSession !== null,
    previousSessionSummary: previousSession?.summary || null,
    timestamp: new Date().toISOString(),
  };

  console.log(
    "[hook:session-start]",
    JSON.stringify(context)
  );

  process.exit(0);
}

main();
