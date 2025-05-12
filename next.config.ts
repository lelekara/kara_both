import type { NextConfig } from "next";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "78.129.77.194",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
