import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.158.210",
        port: "3001",
        pathname: "/png/**",
      },
      {
        protocol: "http",
        hostname: "192.168.158.210",
        port: "3001",
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
