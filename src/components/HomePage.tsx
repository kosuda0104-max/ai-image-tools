"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  createHomeFaqJsonLd,
  homePageContent,
} from "@/src/data/home-page";
import { getAllToolItems } from "@/src/data/tool-directory";
import { ToolIcon } from "@/src/lib/tool-visuals";
import { siteUrl } from "@/src/lib/site";

type Props = {
  locale: "ja" | "en";
};

type CardTool = {
  name: string;
  href: string;
  description?: string;
};

function ToolCard({
  tool,
  locale,
}: {
  tool: CardTool;
  locale: "ja" | "en";
}) {
  const href =
    locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
    >
      <ToolIcon name={tool.name} href={tool.href} />
      <p className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
        {tool.name}
      </p>
      {tool.description ? (
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
          {tool.description}
        </p>
      ) : null}
    </Link>
  );
}

export default function HomePage({ locale }: Props) {
  const t = homePageContent[locale];
  const faqJsonLd = createHomeFaqJsonLd(locale);
  const basePath = locale === "en" ? "/en" : "";
  const homeUrl = `${siteUrl}${basePath || ""}` || siteUrl;
  const trustMessage =
    locale === "en"
      ? "All processing stays in your browser — files are not stored."
      : "すべてブラウザ内処理・ファイルは保存されません";

  const allTools = useMemo(() => getAllToolItems(locale), [locale]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // 0 = popular, 1+ = categories
  const normalizedSearch = search.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedSearch) return null;
    return allTools.filter((tool) =>
      `${tool.name} ${tool.description} ${tool.href}`.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch, allTools]);

  const totalToolCount = allTools.length;
  const labels =
    locale === "en"
      ? {
          searchPlaceholder: `Search all ${totalToolCount} tools…`,
          resultsCount: (n: number) => `${n} tool${n !== 1 ? "s" : ""} found`,
          noResults: "No tools matched your search.",
          popularTab: "Popular",
          viewAll: "View all tools",
        }
      : {
          searchPlaceholder: `${totalToolCount}ツールを検索…`,
          resultsCount: (n: number) => `${n} 件見つかりました`,
          noResults: "一致するツールが見つかりませんでした。",
          popularTab: "人気",
          viewAll: "すべてのツールを見る",
        };

  const tabs = [
    { label: labels.popularTab, tools: t.popularTools },
    ...t.categories.map((c) => ({ label: c.title, tools: c.tools })),
  ];
  const activeTools = tabs[activeTab]?.tools ?? tabs[0].tools;

  const allToolItems = t.categories.flatMap((c) => c.tools);

  const websiteCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.hero.title,
    description: t.hero.description,
    url: homeUrl,
    isPartOf: { "@type": "WebSite", name: "Filewisp", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      name: locale === "en" ? "Featured tool collection" : "掲載ツール一覧",
      numberOfItems: allToolItems.length,
      itemListElement: allToolItems.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${siteUrl}${locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href}`,
      })),
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Filewisp",
    url: siteUrl,
    description:
      locale === "en"
        ? "A browser-based collection of free image and PDF workflow tools."
        : "ブラウザだけで使える画像変換・画像編集・PDF作業の無料ツール集です。",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCollectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(45rem_22rem_at_50%_-12%,rgba(59,130,246,0.35),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_16rem_at_85%_110%,rgba(99,102,241,0.25),transparent)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
            🔒 {trustMessage}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            {t.hero.description}
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
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
                className="w-full rounded-2xl border border-transparent bg-white py-4 pl-12 pr-11 text-sm shadow-xl shadow-blue-950/40 outline-none transition focus:ring-4 focus:ring-blue-400/40"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Search results ── */}
        {searchResults !== null && (
          <div className="py-10">
            <p className="mb-4 text-sm text-gray-500">
              {searchResults.length > 0
                ? labels.resultsCount(searchResults.length)
                : labels.noResults}
            </p>
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {searchResults.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} locale={locale} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tool grid with tabs (hidden when searching) ── */}
        {searchResults === null && (
          <section className="py-10">
            {/* Tabs */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeTab === index
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {activeTools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} locale={locale} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`${basePath}/tools`}
                className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {labels.viewAll} →
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* ── FAQ ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{t.faqSectionTitle}</h2>
          <div className="space-y-3">
            {t.faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-2xl list-none">
                  {item.question}
                  <span className="ml-2 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▾</span>
                </summary>
                <p className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
