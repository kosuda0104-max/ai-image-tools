"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordRecentTool } from "@/src/lib/recent-tools";

// Records the current tool page in localStorage. Rendered by ToolPageLayout
// so every tool page is tracked without per-tool wiring.
export default function RecentToolTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname?.match(/^(?:\/en)?\/tools\/([a-z0-9-]+)$/);
    if (match) recordRecentTool(match[1]);
  }, [pathname]);

  return null;
}
