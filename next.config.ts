import type { NextConfig } from "next"


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karabooth.lelekara.studio" ,
        port: "3001",
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
