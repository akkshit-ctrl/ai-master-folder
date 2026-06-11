---
name: agent-delegation
description: "When and how to use @mention subagent delegation, orchestrator protocol, and conflict resolution."
category: workflow
priority: high
---

# Agent Delegation

## When to Use @mention Delegation

Delegate to a subagent via `@mention` when the task requires:
- A specialized skill set outside your core capabilities
- A different model or temperature setting
- Restricted tool access (e.g., a tool you shouldn't use directly)
- Independent verification (e.g., reviewing your own work)
- Parallel execution of independent sub-tasks

Do **not** delegate when:
- The task is trivial and can be completed in 1-2 tool calls
- The subagent would need extensive context transfer that outweighs the benefit
- The task is speculative or exploratory

## Orchestrator Protocol

When acting as orchestrator:
1. **Decompose** — Break the request into independent sub-tasks
2. **Route** — Assign each sub-task to the most appropriate subagent
3. **Context** — Provide each subagent with only the context it needs (minimize noise)
4. **Collect** — Gather results from all subagents
5. **Synthesize** — Integrate findings into a coherent response
6. **Resolve** — If subagents conflict, discuss trade-offs rather than overriding

## Output Attribution
When reporting results from subagent delegation:
- State which subagent handled which part: "[@code-reviewer] found 3 issues..."
- Never claim subagent output as your own
- If a subagent fails or times out, fall back to handling the task directly

## Conflict Resolution
If two subagents provide conflicting recommendations:
1. State the conflicting positions clearly
2. Identify the root cause of the disagreement (differing assumptions, incomplete context, etc.)
3. Present the trade-offs to the user with a recommendation
4. Do not silently choose one subagent's output over another's
