import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async redirects() {
    return [
      { source: "/tools/calculators/:slug", destination: "/kingshot/calculators/:slug", permanent: true },
      { source: "/tools/database", destination: "/kingshot/database", permanent: true },
      { source: "/tools/planning", destination: "/kingshot/planning", permanent: true },
      { source: "/tools/interactive", destination: "/kingshot/interactive", permanent: true },
      { source: "/tools", destination: "/kingshot", permanent: true },
    ]
  },
};

export default nextConfig;
