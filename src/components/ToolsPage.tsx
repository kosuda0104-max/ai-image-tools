"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toolsPageContent } from "@/src/data/tools/tools-page";
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

function getIconLabel(tool: ToolItem) {
  const slug = tool.href.split("/").pop() ?? "";
  const name = tool.name.toLowerCase();

  if (slug.includes("pdf") || name.includes("pdf")) return "PDF";
  if (slug.includes("jpg") || name.includes("jpg")) return "JPG";
  if (slug.includes("png") || name.includes("png")) return "PNG";
  if (slug.includes("webp") || name.includes("webp")) return "WEBP";
  if (slug.includes("heic") || name.includes("heic")) return "HEIC";
  if (slug.includes("gif") || name.includes("gif")) return "GIF";
  if (slug.includes("svg") || name.includes("svg")) return "SVG";
  if (slug.includes("avif") || name.includes("avif")) return "AVIF";
  if (slug.includes("bmp") || name.includes("bmp")) return "BMP";
  if (slug.includes("tiff") || name.includes("tiff")) return "TIFF";
  if (slug.includes("ico") || name.includes("ico")) return "ICO";
  if (slug.includes("compress")) return "ZIP";
  if (slug.includes("resize")) return "SIZE";
  if (slug.includes("crop")) return "CROP";
  if (slug.includes("rotate")) return "ROTATE";
  if (slug.includes("flip")) return "FLIP";
  if (slug.includes("watermark")) return "MARK";
  if (slug.includes("grayscale")) return "GRAY";

  return "TOOL";
}

function getIconClasses(tool: ToolItem) {
  const slug = tool.href.split("/").pop() ?? "";
  const name = tool.name.toLowerCase();

  if (slug.includes("pdf") || name.includes("pdf")) {
    return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";
  }
  if (
    slug.includes("jpg") ||
    name.includes("jpg") ||
    slug.includes("jpeg") ||
    name.includes("jpeg")
  ) {
    return "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200";
  }
  if (slug.includes("png") || name.includes("png")) {
    return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
  }
  if (slug.includes("webp") || name.includes("webp")) {
    return "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200";
  }
  if (slug.includes("gif") || name.includes("gif")) {
    return "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-200";
  }
  if (
    slug.includes("heic") ||
    name.includes("heic") ||
    slug.includes("avif") ||
    name.includes("avif")
  ) {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
  }
  if (slug.includes("svg") || name.includes("svg")) {
    return "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200";
  }
  if (
    slug.includes("bmp") ||
    name.includes("bmp") ||
    slug.includes("tiff") ||
    name.includes("tiff") ||
    slug.includes("ico") ||
    name.includes("ico")
  ) {
    return "bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200";
  }
  if (slug.includes("compress")) {
    return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
  }
  if (
    slug.includes("resize") ||
    slug.includes("crop") ||
    slug.includes("rotate") ||
    slug.includes("flip") ||
    slug.includes("watermark") ||
    slug.includes("grayscale")
  ) {
    return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }

  return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";
}

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
      name: "AI Image Tools",
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
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ── コンパクトヘッダー ── */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">{t.hero.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{t.hero.description}</p>
        </div>

        {/* ── 検索 + 並び替え ── */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white sm:w-40"
          >
            <option value="default">{labels.sortDefault}</option>
            <option value="popular">{labels.sortPopular}</option>
            <option value="name">{labels.sortName}</option>
          </select>
        </div>

        {/* ── ツールグリッド ── */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500">
            {labels.noResults}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.title);
              const visibleTools = isExpanded
                ? category.tools
                : category.tools.slice(0, 8);

              return (
                <section key={category.title}>
                  <h2 className="mb-1 text-base font-semibold text-gray-900">
                    {category.title}
                  </h2>
                  <p className="mb-3 text-xs text-gray-500">{category.description}</p>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                    {visibleTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={
                          locale === "en"
                            ? tool.href.replace(/^\/tools/, "/en/tools")
                            : tool.href
                        }
                        className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div
                            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-[10px] font-bold ${getIconClasses(tool)}`}
                          >
                            {getIconLabel(tool)}
                          </div>
                          <span aria-hidden="true" className="text-xs text-gray-300 opacity-0 transition group-hover:opacity-100">→</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 leading-5">{tool.name}</p>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">{tool.description}</p>
                      </Link>
                    ))}
                  </div>

                  {category.tools.length > 8 && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.title)}
                      className="mt-2 text-sm text-gray-500 underline"
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
