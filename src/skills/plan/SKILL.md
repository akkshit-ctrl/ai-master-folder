---
name: plan
description: "Implementation planning: requirements decomposition, task breakdown, estimation. Use when breaking down a feature or task before coding, or asked for a plan."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.1.0
  author: "AI Master Folder"
  category: "workflow"
  tags:
    - planning
    - architecture
    - decomposition
    - estimation
  source_url: ".agents/skills/{writing-plans, executing-plans} (superpowers)"
  trust_level: reviewed
allowed-tools: read glob grep
---

# Plan

Create structured implementation plans from requirements or problem descriptions.

Write plans assuming the engineer has zero context for the codebase: document which files to touch, the exact code, the test, and how to verify. Give the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

## Planning Process

### Phase 1: Requirements Analysis
- Identify core requirements and acceptance criteria
- Surface ambiguous or missing requirements
- Identify constraints (time, technology, compatibility)
- Document assumptions

### Phase 2: File Structure
Before defining tasks, map which files are created or modified and what each is responsible for. This is where decomposition gets locked in.
- One clear responsibility per file. Prefer smaller, focused files.
- Files that change together live together — split by responsibility, not technical layer.
- In existing codebases, follow established patterns; don't unilaterally restructure.

### Phase 3: Decomposition
Break the work into independent, ordered steps:

1. **Foundation** — Setup, configuration, scaffolding
2. **Core Logic** — The primary algorithm or flow
3. **Integration** — Connecting to existing systems
4. **Verification** — Tests, validation, edge cases
5. **Polish** — Documentation, cleanup, optimization

### Phase 4: Risk Assessment
- Identify integration points with highest risk
- Flag decisions that are hard to reverse
- Suggest validation checkpoints

## Bite-Sized Tasks

Each step is **one action (2-5 minutes)** with everything the engineer needs inline:

- Write the failing test — step
- Run it to confirm it fails — step
- Write the minimal implementation — step
- Run the tests to confirm they pass — step
- Commit — step

For each task, specify **exact path + change + test + expected output**:

````markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

- [ ] **Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

- [ ] **Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
````

See **tdd-workflow** for the red/green discipline each task follows.

## No Placeholders

Every step must contain the actual content an engineer needs. These are **plan failures** — never write them:
- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code — tasks may be read out of order)
- Steps describing what to do without showing how (code blocks required for code steps)
- References to types, functions, or methods not defined in any task

## Self-Review

After writing the plan, check it against the spec with fresh eyes:
1. **Spec coverage:** Can you point to a task implementing each requirement? List gaps.
2. **Placeholder scan:** Search for the red flags above. Fix them.
3. **Type consistency:** Do signatures and names in later tasks match earlier ones?

Fix issues inline. Add a task for any uncovered requirement.

## Executing the Plan

Execute step-by-step, in batches, with review checkpoints:
1. **Load and review** the plan critically. Raise concerns before starting. Create a todo list.
2. **Execute tasks** — follow each bite-sized step exactly, run every verification as specified, mark complete. Never skip verifications.
3. **Checkpoint between batches** — stop, confirm expected output matched, then continue. Use **verification-loop** before claiming done.

**STOP and ask** (don't guess) when: a step hits a blocker (missing dependency, failing test), an instruction is unclear, or verification fails repeatedly. Never start implementation on main/master without explicit consent.

For multi-task execution prefer **subagent-orchestration** (fresh agent per task, review between). After all tasks pass, hand off to **shipping-and-launch** to merge or open a PR.

## Output Format
```
## Implementation Plan

### Summary
[Brief one-paragraph overview of the approach]

### Steps
1. **Step name** (effort, risk)
   - What: ...
   - Files: ...
   - Depends on: ...

### Risks
- [risk] — [mitigation]

### Checkpoints
- [ ] After step 2: verify with [test/check]
```

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I'll figure it out as I go" | Planning reduces rework by 10x. Invest the 5 minutes. |
| "The task is too simple for a plan" | Even simple plans catch hidden dependencies. |
| "Plans go out of date immediately" | A dated plan is still better than no plan. |
| "I'll add the test code later" | A step without its test/expected output is a plan failure. |

## References
- **tdd-workflow** — red/green/refactor discipline per task
- **subagent-orchestration** — dispatch a fresh agent per task with review
- **verification-loop** — confirm output before claiming complete
- **shipping-and-launch** — finish the branch after all tasks pass
