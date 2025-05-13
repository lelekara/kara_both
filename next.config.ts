import type { NextConfig } from "next"


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karabooth.lelekara.studio" ,
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
