import type { NextConfig } from "next"


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karabooth.lelekara.studio" ,
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "hfpehqkwewwhdhfujmmz.supabase.co",
        pathname: "/storage/v1/object/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;
