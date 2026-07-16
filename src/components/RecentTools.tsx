"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentToolSlugs } from "@/src/lib/recent-tools";
import {
  getToolItem,
  type ToolDirectoryItem,
} from "@/src/data/tool-directory";
import { ToolIcon } from "@/src/lib/tool-visuals";

type Props = {
  locale: "ja" | "en";
};

// "Recently used" quick-access row on the homepage. Renders nothing until
// localStorage has entries, so first-time visitors never see it.
export default function RecentTools({ locale }: Props) {
  const [tools, setTools] = useState<ToolDirectoryItem[]>([]);

  useEffect(() => {
    const items: ToolDirectoryItem[] = [];
    for (const slug of getRecentToolSlugs()) {
      try {
        items.push(getToolItem(locale, slug));
      } catch {
        // Skip slugs that no longer exist.
      }
    }
    // localStorage is only readable after hydration, so the one-time
    // post-mount setState is intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTools(items.slice(0, 4));
  }, [locale]);

  if (tools.length === 0) return null;

  return (
    <div className="mx-auto mt-5 w-full max-w-3xl text-left">
      <p className="text-xs font-semibold text-gray-500">
        {locale === "en" ? "Recently used" : "最近使ったツール"}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition hover:border-blue-300 hover:shadow-sm"
          >
            <ToolIcon name={tool.name} href={tool.href} size="sm" />
            <span className="text-xs font-semibold text-gray-800 group-hover:text-blue-700">
              {tool.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
