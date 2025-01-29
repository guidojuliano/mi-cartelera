import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Opcionalmente puedes restringir rutas específicas:
        // pathname: "/path-to-images/**",
      },
    ],
  },
};

export default nextConfig;
