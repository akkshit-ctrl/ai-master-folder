---
name: omniroute-auth
description: "Connect and automatically fetch models from your Omniroute instance."
version: 1.0.0
source_url: "https://github.com/Alph4d0g/opencode-omniroute-auth"
trust_level: community
---

## Omniroute Auth

Connect OpenCode to an Omniroute instance for unified model access across providers.

### How It Works

1. Configure your Omniroute instance URL and API key
2. Plugin discovers available models from Omniroute
3. Routes requests through Omniroute's unified API
4. Supports all providers configured in your Omniroute instance

### Registration

```json
{
  "auth": {
    "omniroute": {
      "type": "api_key",
      "base_url": "https://your-instance.omniroute.dev"
    }
  }
}
```

### Files

- `plugin.ts` — Plugin implementation stub
