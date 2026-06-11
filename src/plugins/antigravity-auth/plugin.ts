import { Plugin } from "@opencode-ai/plugin";

export const AntigravityAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "antigravity",
      methods: [{ type: "oauth", label: "Google Account" }],
    },
  };
};
