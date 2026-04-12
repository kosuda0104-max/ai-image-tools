"use client";

import { usePathname } from "next/navigation";

export function useLocale(): "ja" | "en" {
  const pathname = usePathname();

  if (pathname.startsWith("/en")) {
    return "en";
  }

  return "ja";
}
