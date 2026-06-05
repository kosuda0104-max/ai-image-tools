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
  compact = false,
}: {
  tool: CardTool;
  locale: "ja" | "en";
  compact?: boolean;
}) {
  const href =
    locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
    >
      <ToolIcon name={tool.name} href={tool.href} size={compact ? "sm" : "md"} />
      <p className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
        {tool.name}
      </p>
      {!compact && tool.description ? (
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
  const contactHref = locale === "en" ? "/en/contact" : "/contact";
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const guidesHref = locale === "en" ? "/en/guides" : "/guides";
  const homeUrl = `${siteUrl}${basePath || ""}` || siteUrl;
  const trustMessage =
    locale === "en"
      ? "All processing stays in your browser — files are not stored."
      : "すべてブラウザ内処理・ファイルは保存されません";

  const allTools = useMemo(() => getAllToolItems(locale), [locale]);
  const [search, setSearch] = useState("");
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
        }
      : {
          searchPlaceholder: `${totalToolCount}ツールを検索…`,
          resultsCount: (n: number) => `${n} 件見つかりました`,
          noResults: "一致するツールが見つかりませんでした。",
        };

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

  const resourceCards =
    locale === "en"
      ? [
          { title: "About the site", description: "How the site is built and maintained.", href: aboutHref, label: "About →" },
          { title: "Guides", description: "Short guides on formats and workflows.", href: guidesHref, label: "Guides →" },
          { title: "Contact", description: "Report bugs or request new tools.", href: contactHref, label: "Contact →" },
        ]
      : [
          { title: "サイトについて", description: "運営方針と透明性ページのご案内。", href: aboutHref, label: "詳細を見る →" },
          { title: "ガイド", description: "形式の選び方や作業フローの解説。", href: guidesHref, label: "ガイドを見る →" },
          { title: "お問い合わせ", description: "不具合報告や機能要望はこちら。", href: contactHref, label: "送る →" },
        ];

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCollectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/60 to-gray-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-10%,rgba(59,130,246,0.18),transparent)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            🔒 {trustMessage}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {t.hero.description}
          </p>

          {/* Search */}
          <div className="mx-auto mt-7 max-w-xl">
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
                className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-11 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
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

          {/* Stats */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {t.stats.map((stat) => (
              <span
                key={stat.value}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs text-gray-600 backdrop-blur"
              >
                <span className="font-semibold text-gray-900">{stat.value}</span>
                {stat.label}
              </span>
            ))}
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

        {/* ── Normal layout (hidden when searching) ── */}
        {searchResults === null && (
          <>
            {/* Popular tools */}
            <section className="py-10">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{t.popularToolsTitle}</h2>
                </div>
                <Link href={`${basePath}/tools`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {t.toolsPageLinkLabel} →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {t.popularTools.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} locale={locale} compact />
                ))}
              </div>
            </section>

            {/* All categories */}
            <div className="space-y-12 pb-12">
              {t.categories.map((category) => (
                <section key={category.title}>
                  <div className="mb-5">
                    <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {category.tools.map((tool) => (
                      <ToolCard key={tool.href} tool={tool} locale={locale} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Resource links (always visible) ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
              >
                <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{card.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-blue-600">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Guides ── */}
      {searchResults === null && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t.guidesSection.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{t.guidesSection.description}</p>
              </div>
              <Link href={guidesHref} className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-800">
                {t.guidesSection.viewAllLabel} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.guidesSection.guides.map((guide) => {
                const href = locale === "en" ? `/en/guides/${guide.slug}` : `/guides/${guide.slug}`;
                return (
                  <Link
                    key={guide.slug}
                    href={href}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
                  >
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{guide.title}</p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500">{guide.cardDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
