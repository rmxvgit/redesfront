import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://backredes-production.up.railway.app/**")],
  },

  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
};

export default nextConfig;
