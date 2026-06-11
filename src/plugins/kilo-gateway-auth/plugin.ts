import { Plugin } from "@opencode-ai/plugin";

export const KiloGatewayAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "kilo",
      methods: [{ type: "api_key", label: "API Key" }],
    },
  };
};
