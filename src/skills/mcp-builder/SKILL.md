---
name: mcp-builder
description: "Create, test, and configure MCP (Model Context Protocol) servers for tool integration."
version: 1.0.0
license: MIT
compatibility:
  - opencode: ">=1.0.0"
metadata:
  author: "AI Master Folder"
  category: "development"
  tags:
    - mcp
    - servers
    - protocol
    - tools
allowed-tools:
  - read
  - write
  - edit
  - bash
  - glob
  - grep
---

# MCP Builder

Create and configure MCP servers for extending AI agent capabilities.

## MCP Server Types

### stdio
Local servers run as subprocesses. Preferred for local-only tools:
```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@org/mcp-server-name"],
  "description": "What this server does"
}
```

### HTTP
Remote servers accessed via HTTP API:
```json
{
  "type": "http",
  "url": "https://api.example.com/mcp",
  "headers": {
    "Authorization": "Bearer ${API_TOKEN}"
  },
  "description": "What this server does"
}
```

## Configuration

MCP configs are stored in `src/mcp/<name>/mcp.json`. Follow these rules:
- Use environment variable references (`${VAR_NAME}`) for secrets
- Keep descriptions concise but informative
- Test the server before adding it to a profile

## Testing MCP Servers

```bash
# For stdio servers, verify the server starts and responds
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | npx @org/mcp-server-name
```

## Common Pitfalls
- Hardcoding secrets in mcp.json instead of using env var references
- Using HTTP type when stdio would be simpler and more secure
- Not testing the server before adding it to a profile
- Forgetting that the MCP host must have the server's dependencies installed

## Related

- See existing MCP configs in `src/mcp/` for examples

## Rationalizations

| Excuse | Rebuttal |
|--------|----------|
| "I can just use the tool directly" | MCP standardizes tool access across different AI agents. |
| "MCP is complex to set up" | A basic stdio MCP server is 10 lines of config. |
