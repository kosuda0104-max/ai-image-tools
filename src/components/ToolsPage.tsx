"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toolsPageContent } from "@/src/data/tools/tools-page";
import { ToolIcon } from "@/src/lib/tool-visuals";
import { siteUrl } from "@/src/lib/site";

type Props = {
  locale: "ja" | "en";
};

type ToolItem = {
  name: string;
  description: string;
  href: string;
};

type ToolCategory = {
  title: string;
  description: string;
  tools: ToolItem[];
};

type SortKey = "default" | "popular" | "name";

function getPopularityScore(tool: ToolItem) {
  const slug = tool.href.split("/").pop() ?? "";

  const popularOrder = [
    "jpg-to-png",
    "png-to-jpg",
    "webp-to-png",
    "webp-to-jpg",
    "heic-to-jpg",
    "heic-to-png",
    "jpg-compress",
    "png-compress",
    "webp-compress",
    "image-compress",
    "pdf-to-jpg",
    "pdf-to-png",
    "image-to-pdf",
    "merge-pdf",
    "split-pdf",
    "compress-pdf",
  ];

  const index = popularOrder.indexOf(slug);
  return index === -1 ? 9999 : index;
}

export default function ToolsPage({ locale }: Props) {
  const t = toolsPageContent[locale];
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const labels =
    locale === "en"
      ? {
          searchPlaceholder: "Search tools...",
          sortLabel: "Sort",
          sortDefault: "Recommended",
          sortPopular: "Popular",
          sortName: "Name",
          more: "View more",
          less: "Show less",
          noResults: "No tools matched your search.",
        }
      : {
          searchPlaceholder: "ツールを検索...",
          sortLabel: "並び順",
          sortDefault: "おすすめ順",
          sortPopular: "人気順",
          sortName: "名前順",
          more: "もっと見る",
          less: "表示を減らす",
          noResults: "検索条件に一致するツールが見つかりませんでした。",
        };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredCategories = useMemo<ToolCategory[]>(() => {
    const categories = t.categories.map((category) => {
      let nextTools = category.tools.filter((tool) => {
        if (!normalizedSearch) return true;

        const target = `${tool.name} ${tool.description} ${tool.href}`.toLowerCase();
        return target.includes(normalizedSearch);
      });

      if (sort === "popular") {
        nextTools = [...nextTools].sort(
          (a, b) => getPopularityScore(a) - getPopularityScore(b)
        );
      } else if (sort === "name") {
        nextTools = [...nextTools].sort((a, b) =>
          a.name.localeCompare(b.name, locale === "ja" ? "ja" : "en")
        );
      }

      return {
        ...category,
        tools: nextTools,
      };
    });

    return categories.filter((category) => category.tools.length > 0);
  }, [locale, normalizedSearch, sort, t.categories]);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.hero.title,
    description: t.hero.description,
    url: `${siteUrl}${locale === "en" ? "/en/tools" : "/tools"}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Filewisp",
      url: siteUrl,
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.hero.title,
    itemListElement: t.categories.flatMap((category, categoryIndex) =>
      category.tools.map((tool, toolIndex) => ({
        "@type": "ListItem",
        position: categoryIndex * 100 + toolIndex + 1,
        name: tool.name,
        url: `${siteUrl}${
          locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href
        }`,
      }))
    ),
  };

  const hintsLabel = locale === "en" ? "Browse by goal / decision table" : "目的から選ぶ / 判断表を見る";

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* ── ヘッダー ── */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{t.hero.title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">{t.hero.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── 検索 + 並び替え ── */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:w-44"
          >
            <option value="default">{labels.sortDefault}</option>
            <option value="popular">{labels.sortPopular}</option>
            <option value="name">{labels.sortName}</option>
          </select>
        </div>

        {/* ── ツールグリッド ── */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-sm text-gray-500">
            {labels.noResults}
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.title);
              const visibleTools = isExpanded
                ? category.tools
                : category.tools.slice(0, 8);

              return (
                <section key={category.title}>
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                  <p className="mb-5 mt-1 text-sm text-gray-500">{category.description}</p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {visibleTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={
                          locale === "en"
                            ? tool.href.replace(/^\/tools/, "/en/tools")
                            : tool.href
                        }
                        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
                      >
                        <ToolIcon name={tool.name} href={tool.href} />
                        <p className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-blue-700">{tool.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{tool.description}</p>
                      </Link>
                    ))}
                  </div>

                  {category.tools.length > 8 && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.title)}
                      className="mt-4 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
                    >
                      {isExpanded ? labels.less : labels.more}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* ── 折りたたみヒントセクション ── */}
        <details className="mt-10 rounded-xl border border-gray-200 bg-gray-50">
          <summary className="cursor-pointer select-none px-5 py-3 text-sm font-medium text-gray-700 hover:text-gray-900">
            {hintsLabel}
          </summary>
          <div className="space-y-6 px-5 pb-6 pt-2">

            {/* 目的から選ぶ */}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.chooserSection.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.chooserSection.items.map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-3">
                    <h3 className="text-xs font-semibold text-gray-900">{item.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tools.map((tool) => (
                        <Link
                          key={`hint-chooser-${tool.href}`}
                          href={locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href}
                          className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-800 hover:bg-white"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 判断表 */}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.decisionMatrix.title}</h2>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                {t.decisionMatrix.items.map((item) => (
                  <div key={item.situation} className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-4 py-3 last:border-b-0">
                    <span className="min-w-0 flex-1 text-xs font-medium text-gray-900">{item.situation}</span>
                    <span className="shrink-0 text-xs font-semibold text-emerald-700">{item.recommended}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((tool) => (
                        <Link
                          key={`hint-decision-${tool.href}`}
                          href={locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-white"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </details>
      </div>
    </main>
  );
}
