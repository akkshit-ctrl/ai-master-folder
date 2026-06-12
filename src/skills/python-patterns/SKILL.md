---
name: python-patterns
description: "Python idioms: type hints, PEP 8, pytest, async patterns, project structure. Use when writing or reviewing Python code."
license: MIT
compatibility: "opencode >=1.0.0"
metadata:
  version: 1.0.0
  author: "AI Master Folder"
  category: "development"
  tags:
    - python
    - patterns
    - type-hints
    - pytest
    - async
allowed-tools: read edit bash grep glob
---

# Python Patterns

Python best practices and idiomatic patterns.

## Type Hints
Always use type hints for function signatures:

```python
from typing import Optional, List, Dict, Protocol

def process_items(
    items: List[str],
    max_count: Optional[int] = None,
) -> Dict[str, int]:
    ...
```

## Project Structure
```
src/
├── project_name/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── services/
│   └── utils/
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_services/
├── pyproject.toml
└── README.md
```

## Testing with pytest
```python
# tests/conftest.py
import pytest

@pytest.fixture
def sample_data():
    return {"key": "value"}

# tests/test_services.py
async def test_process_data(sample_data):
    result = await process_data(sample_data)
    assert result.status == "success"
```

## Async Patterns
- Use `asyncio` for I/O-bound operations
- Prefer `anyio` or `asyncio.to_thread` for CPU-bound work
- Use `async with` for resource management
- Use `asyncio.gather` for concurrent tasks
- Use `asyncio.timeout` for timeout handling (3.11+)

## Tooling
- Format: `ruff format`
- Lint: `ruff check`
- Type check: `mypy .`
- Test: `pytest -v --cov=src`

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "Python doesn't need types" | Types catch 15% of bugs at write time. Use them. |
| "I'll format the code before committing" | Format on save. Every time. No exceptions. |
| "Pytest fixtures are over-engineering" | Fixtures make tests cleaner and more maintainable. |
