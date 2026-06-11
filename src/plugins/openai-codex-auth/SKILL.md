---
name: openai-codex-auth
description: "Use OpenAI's Codex backend via ChatGPT Plus/Pro OAuth authentication."
version: 1.0.0
source_url: "https://github.com/numman-ali/opencode-openai-codex-auth"
trust_level: community
---

## OpenAI Codex Auth

Use OpenAI's Codex backend through your ChatGPT Plus/Pro subscription, no API key required.

### How It Works

1. Initiates OAuth flow with OpenAI's authentication endpoint
2. Uses your ChatGPT Plus/Pro session to authenticate
3. Routes API calls through the Codex backend
4. Token refresh handled automatically

### Registration

```json
{
  "auth": {
    "codex": {
      "type": "oauth",
      "client_id": "codex-cli",
      "scopes": ["openid", "profile", "email", "api"]
    }
  }
}
```

### Files

- `plugin.ts` — Plugin implementation stub
