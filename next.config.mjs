/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },

  async headers() {
    return [
      {
        source: "/:path*(svg|jpg|png|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // This instructs the browser to cache those files for one year. So, if your Next.js site relies on some static resources, you should download and place them inside /public.
          }
        ]
      }
    ];
  },
  // Add these new configurations
  poweredByHeader: false, // false to remove the X-Powered-By header for security
  compress: true
};

export default nextConfig;
