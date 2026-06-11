import { Plugin } from "@opencode-ai/plugin";

export const OpenHaxCodexAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "openhax",
      methods: [{ type: "oauth", label: "ChatGPT Plus/Pro" }],
    },
  };
};
