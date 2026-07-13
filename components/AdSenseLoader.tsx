"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_LOADER_SRC } from "@/src/lib/ads";

const AD_FREE_PATHS = new Set([
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/en/about",
  "/en/contact",
  "/en/privacy-policy",
  "/en/terms",
]);

export default function AdSenseLoader() {
  const pathname = usePathname();

  if (AD_FREE_PATHS.has(pathname)) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-loader"
      src={ADSENSE_LOADER_SRC}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
