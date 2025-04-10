import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.st-note.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.st-note.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "notecdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.notecdn.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
