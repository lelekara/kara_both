import type { NextConfig } from "next"


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hfpehqkwewwhdhfujmmz.supabase.co",
        pathname: "/storage/v1/object/public/uploads/**",
      },
    ],
    minimumCacheTTL: 2678400, // 31 jours
    formats: ["image/webp"], // Limite à webp pour moins de transformations
    // Optionnel : tu peux aussi ajuster les tailles si tu veux
    // deviceSizes: [320, 420, 768, 1024, 1200],
    // imageSizes: [16, 32, 48, 64, 96],
    // qualities: { webp: 75 }, // Qualité réduite si besoin
  },
};

export default nextConfig;
