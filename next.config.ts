import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first for best compression, WebP fallback
    formats: ["image/avif", "image/webp"],
    // Next.js 16 requires an explicit qualities allowlist
    qualities: [70, 82, 90],
  },
};

export default nextConfig;
