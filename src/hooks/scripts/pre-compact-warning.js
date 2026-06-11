// PreCompact Hook: Warn when context budget approaches threshold
// Fires before context compaction
// Exit codes: 0 = continue, 2 = block

const fs = require("fs");
const path = require("path");

const WARNING_THRESHOLD = 0.75; // Warn at 75% context usage
const CRITICAL_THRESHOLD = 0.9; // Warn critically at 90%

function getContextMetrics() {
  return {
    tokensUsed: process.env.ECC_CONTEXT_TOKENS_USED
      ? parseInt(process.env.ECC_CONTEXT_TOKENS_USED, 10)
      : null,
    tokensLimit: process.env.ECC_CONTEXT_TOKENS_LIMIT
      ? parseInt(process.env.ECC_CONTEXT_TOKENS_LIMIT, 10)
      : null,
    toolCalls: process.env.ECC_TOOL_CALL_COUNT
      ? parseInt(process.env.ECC_TOOL_CALL_COUNT, 10)
      : null,
  };
}

function getSuggestion() {
  const suggestions = [
    "Summarize completed work and remove resolved discussions from context.",
    "Use /checkpoint to save state before compaction.",
    "Consider splitting the task into smaller sessions.",
    "Archive verbose tool outputs that are no longer needed.",
    "Consolidate multiple file reads into a single operation next time.",
  ];

  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function main() {
  const metrics = getContextMetrics();

  if (metrics.tokensUsed !== null && metrics.tokensLimit !== null) {
    const ratio = metrics.tokensUsed / metrics.tokensLimit;

    if (ratio >= CRITICAL_THRESHOLD) {
      console.warn(
        "[hook:pre-compact-warning] CRITICAL: Context at",
        Math.round(ratio * 100),
        "% capacity"
      );
      console.warn("[hook:pre-compact-warning] Suggestion:", getSuggestion());
    } else if (ratio >= WARNING_THRESHOLD) {
      console.log(
        "[hook:pre-compact-warning] Context approaching limit:",
        Math.round(ratio * 100),
        "% used"
      );
      console.log("[hook:pre-compact-warning] Suggestion:", getSuggestion());
    }
  }

  if (metrics.toolCalls !== null && metrics.toolCalls > 100) {
    console.log(
      "[hook:pre-compact-warning] High tool call count:",
      metrics.toolCalls,
      "— consider checkpointing"
    );
  }

  process.exit(0);
}

main();
