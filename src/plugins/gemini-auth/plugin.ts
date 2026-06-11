import { Plugin } from "@opencode-ai/plugin";

export const GeminiAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "gemini",
      methods: [{ type: "oauth", label: "Google Account" }],
    },
  };
};
