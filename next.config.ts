import type { NextConfig } from "next";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_SERVER_URL || "localhost",
        port: process.env.PORT,
        pathname: process.env.PATH_TO_PHOTOS,
      },
    ],
  },
};

export default nextConfig;
