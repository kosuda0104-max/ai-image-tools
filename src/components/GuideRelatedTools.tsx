import Link from "next/link";
import { getGuideRelatedTools } from "@/src/data/guide-related-tools";
import type { SiteLocale } from "@/src/lib/site-locale";

type Props = {
  locale: SiteLocale;
  slug: string;
};

export default function GuideRelatedTools({ locale, slug }: Props) {
  const tools = getGuideRelatedTools(locale, slug);

  if (tools.length === 0) return null;

  const title = locale === "zh-TW" ? "與本指南相關的工具" : locale === "ja" ? "このガイドに関連するツール" : "Tools related to this guide";
  const allToolsLabel = locale === "zh-TW" ? "查看所有工具" : locale === "ja" ? "ツール一覧を見る" : "Browse all tools";
  const toolsPath = locale === "zh-TW" ? "/zh-tw/tools" : locale === "ja" ? "/tools" : "/en/tools";

  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              {tool.name}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href={toolsPath}
            className="text-sm font-medium text-gray-700 underline decoration-gray-400 underline-offset-4 hover:text-black"
          >
            {allToolsLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
