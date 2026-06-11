---
name: kilo-gateway-auth
description: "Adds Kilo Gateway provider support to OpenCode for multi-model routing."
version: 1.0.0
source_url: "https://github.com/JungHoonGhae/opencode-kilo-auth"
trust_level: community
---

## Kilo Gateway Auth

Connect OpenCode to a Kilo Gateway instance for model routing and management.

### How It Works

1. Configure your Kilo Gateway endpoint and credentials
2. Plugin registers the gateway as a provider
3. Models available through the gateway appear in model selection
4. Requests are routed through the gateway's load balancing

### Registration

```json
{
  "auth": {
    "kilo": {
      "type": "api_key",
      "base_url": "https://your-kilo-gateway.example.com"
    }
  }
}
```

### Files

- `plugin.ts` — Plugin implementation stub
