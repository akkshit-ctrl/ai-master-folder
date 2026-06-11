---
name: antigravity-auth
description: "Use Gemini and Anthropic models for free via Google Antigravity IDE authentication."
version: 1.0.0
source_url: "https://github.com/NoeFabris/opencode-antigravity-auth"
trust_level: community
---

## Antigravity Auth

Authenticate with Google's Antigravity IDE to use Gemini and Anthropic models without an API key.

### How It Works

1. You authenticate with your Google account (the same one used for Gemini/Google AI Studio)
2. The plugin intercepts API calls and routes them through Google's Antigravity endpoint
3. Antigravity proxies to Gemini (free) and Anthropic (free tier) models

### Registration

```json
{
  "auth": {
    "antigravity": {
      "type": "oauth",
      "client_id": "antigravity-ide",
      "scopes": ["openid", "https://www.googleapis.com/auth/generative-language"]
    }
  }
}
```

### Usage

Select models prefixed with `antigravity/`:
- `antigravity/gemini-2.5-pro`
- `antigravity/claude-sonnet-4`
- `antigravity/claude-opus-4`

### Files

- `plugin.ts` — Plugin implementation stub
