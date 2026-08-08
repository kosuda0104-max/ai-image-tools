import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // The root layout is Japanese by default. Send an explicit response-level
      // language signal for translated routes so crawlers do not collapse them
      // into the Japanese canonical when evaluating near-duplicate pages.
      {
        source: "/en/:path*",
        headers: [{ key: "Content-Language", value: "en" }],
      },
      {
        source: "/zh-tw/:path*",
        headers: [{ key: "Content-Language", value: "zh-TW" }],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
