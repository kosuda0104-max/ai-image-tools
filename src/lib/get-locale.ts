"use client";

import { usePathname } from "next/navigation";
import type { SiteLocale } from "@/src/lib/site-locale";

export function useLocale(): SiteLocale {
  const pathname = usePathname();

  if (pathname.startsWith("/zh-tw")) {
    return "zh-TW";
  }

  if (pathname.startsWith("/en")) {
    return "en";
  }

  return "ja";
}
