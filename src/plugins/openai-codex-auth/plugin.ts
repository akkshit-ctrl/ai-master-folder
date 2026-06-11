import { Plugin } from "@opencode-ai/plugin";

export const OpenAICodexAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "codex",
      methods: [{ type: "oauth", label: "ChatGPT Plus/Pro" }],
    },
  };
};
