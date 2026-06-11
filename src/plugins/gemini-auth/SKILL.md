---
name: gemini-auth
description: "Authenticate the OpenCode CLI with your Google account to use your existing Gemini plan."
version: 1.0.0
source_url: "https://github.com/jenslys/opencode-gemini-auth"
trust_level: community
---

## Gemini Auth

Authenticate OpenCode with your Google account to use your existing Gemini subscription.

### How It Works

1. Launches a browser-based OAuth flow to sign in with Google
2. Exchanges the auth code for a refresh token (stored locally)
3. The refresh token is used to get access tokens for the Gemini API
4. No API key required — uses your Gemini plan's quota

### Registration

```json
{
  "auth": {
    "gemini": {
      "type": "oauth",
      "client_id": "google",
      "scopes": ["https://www.googleapis.com/auth/generative-language"]
    }
  }
}
```

### Files

- `plugin.ts` — Plugin implementation stub
