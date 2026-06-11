import { Plugin } from "@opencode-ai/plugin";

export const OmnirouteAuth: Plugin = async (ctx) => {
  return {
    auth: {
      provider: "omniroute",
      methods: [{ type: "api_key", label: "API Key" }],
    },
  };
};
