---
name: openhax-codex
description: "OAuth authentication plugin for personal coding assistance with ChatGPT Plus/Pro subscriptions."
version: 1.0.0
source_url: "https://github.com/open-hax/codex"
trust_level: community
---

## OpenHax Codex

OAuth-based authentication for using ChatGPT Plus/Pro subscriptions with OpenCode.

### How It Works

1. Initiates OAuth flow with OpenHax's authentication endpoint
2. Uses your ChatGPT Plus/Pro session token
3. Proxies API calls through the Codex backend
4. Handles token refresh and session management

### Registration

```json
{
  "auth": {
    "openhax": {
      "type": "oauth",
      "client_id": "openhax-codex"
    }
  }
}
```

### Files

- `plugin.ts` — Plugin implementation stub
