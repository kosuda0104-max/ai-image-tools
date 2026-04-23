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

      <div className="hidden md:block">
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
                {t.badge}
              </span>

              <h1 className="text-4xl font-bold text-gray-900">{t.hero.title}</h1>

              <p className="text-lg text-gray-600">{t.hero.description}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[1.9rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(242,239,228,0.8))] p-6 shadow-[0_22px_46px_-32px_rgba(22,32,51,0.52)]">
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-950">
                  {t.seoSpotlightTitle}
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  {t.seoSpotlightDescription}
                </p>
                {t.guideSections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {section.title}
                    </h3>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.6rem] border border-stone-200 bg-white/95 p-5 shadow-[0_16px_30px_-26px_rgba(22,32,51,0.5)]">
                <h3 className="text-lg font-semibold text-slate-950">
                  {t.popularToolsTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.popularToolsDescription}
                </p>
                <div className="mt-4 space-y-3">
                  {t.seoSpotlightTools.map((tool) => (
                    <Link
                      key={`spotlight-${tool.href}`}
                      href={
                        locale === "en"
                          ? tool.href.replace(/^\/tools/, "/en/tools")
                          : tool.href
                      }
                      className="block rounded-2xl border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,248,243,0.96))] p-4 transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_18px_34px_-28px_rgba(22,32,51,0.56)]"
                    >
                      <div className="text-sm font-semibold text-slate-950">
                        {tool.name}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {tool.reason}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-[1.6rem] border border-stone-200 bg-white/95 p-4 shadow-[0_18px_34px_-30px_rgba(22,32,51,0.52)] md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full rounded-xl border border-stone-300 bg-stone-50/70 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                {labels.sortLabel}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-stone-300 bg-stone-50/70 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="default">{labels.sortDefault}</option>
                <option value="popular">{labels.sortPopular}</option>
                <option value="name">{labels.sortName}</option>
              </select>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-stone-300 bg-white/70 px-6 py-12 text-center text-slate-600">
              {labels.noResults}
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <section key={category.title} className="space-y-5">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950">
                      {category.title}
                    </h2>
                    <p className="text-sm leading-6 text-slate-600">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={
                          locale === "en"
                            ? tool.href.replace(/^\/tools/, "/en/tools")
                            : tool.href
                        }
                        className="group rounded-[1.5rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,248,243,0.96))] p-5 shadow-[0_18px_34px_-28px_rgba(22,32,51,0.56)] transition hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_42px_-28px_rgba(22,32,51,0.56)]"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div
                            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-[11px] font-bold tracking-wide ${getIconClasses(
                              tool
                            )}`}
                          >
                            {getIconLabel(tool)}
                          </div>

                          <span
                            aria-hidden="true"
                            className="text-lg text-stone-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-950 transition group-hover:text-slate-800">
                          {tool.name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="block px-4 py-6 md:hidden">
        <div className="mb-6 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t.seoSpotlightTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {t.seoSpotlightDescription}
            </p>
          </div>

          <div className="space-y-3">
            {t.seoSpotlightTools.slice(0, 3).map((tool) => (
              <Link
                key={`mobile-spotlight-${tool.href}`}
                href={
                  locale === "en"
                    ? tool.href.replace(/^\/tools/, "/en/tools")
                    : tool.href
                }
                className="block rounded-xl border border-gray-200 bg-white p-3"
              >
                <div className="text-sm font-semibold text-gray-900">
                  {tool.name}
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  {tool.reason}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-5 space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          >
            <option value="default">{labels.sortDefault}</option>
            <option value="popular">{labels.sortPopular}</option>
            <option value="name">{labels.sortName}</option>
          </select>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-600">
            {labels.noResults}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              {t.guideSections.map((section) => (
                <div key={`mobile-guide-${section.title}`} className="space-y-2">
                  <h2 className="text-base font-bold text-gray-900">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-6 text-gray-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.title);
              const visibleTools = isExpanded
                ? category.tools
                : category.tools.slice(0, 6);

              return (
                <div key={category.title}>
                  <h2 className="mb-3 text-base font-bold text-gray-900">
                    {category.title}
                  </h2>

                  <div className="grid grid-cols-2 gap-2.5">
                    {visibleTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={
                          locale === "en"
                            ? tool.href.replace(/^\/tools/, "/en/tools")
                            : tool.href
                        }
                        className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div
                            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold ${getIconClasses(
                              tool
                            )}`}
                          >
                            {getIconLabel(tool)}
                          </div>
                          <span
                            aria-hidden="true"
                            className="text-sm text-gray-300 opacity-60"
                          >
                            →
                          </span>
                        </div>

                        <p className="text-sm font-medium leading-5 text-gray-900">
                          {tool.name}
                        </p>

                        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {category.tools.length > 6 && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.title)}
                      className="mt-2 block text-sm text-gray-600 underline"
                    >
                      {isExpanded ? labels.less : labels.more}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

