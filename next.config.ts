import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backredes-production.up.railway.app",
        port: "8080",
        pathname: "/png/**",
      },
      {
        protocol: "https",
        hostname: "backredes-production.up.railway.app",
        port: "8080",
        pathname: "/pdf/**",
      },
    ],
  },

  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
};

export default nextConfig;
