"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  createHomeFaqJsonLd,
  homePageContent,
} from "@/src/data/home-page";
import { getAllToolItems } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";

type Props = {
  locale: "ja" | "en";
};

function getBadgeClasses(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("jpg") || n.includes("jpeg")) return "bg-orange-100 text-orange-700";
  if (n.includes("png")) return "bg-blue-100 text-blue-700";
  if (n.includes("pdf")) return "bg-rose-100 text-rose-700";
  if (n.includes("webp")) return "bg-violet-100 text-violet-700";
  if (n.includes("heic")) return "bg-emerald-100 text-emerald-700";
  if (n.includes("gif")) return "bg-pink-100 text-pink-700";
  if (n.includes("svg")) return "bg-sky-100 text-sky-700";
  return "bg-gray-100 text-gray-600";
}

function getToolBadgeLabel(name: string, href: string, locale: "ja" | "en"): string {
  const slug = href.split("/").pop() ?? "";
  const n = name.toLowerCase();
  if (slug.includes("pdf") || n.includes("pdf")) return "PDF";
  if (slug.includes("jpg") || n.includes("jpg")) return "JPG";
  if (slug.includes("png") || n.includes("png")) return "PNG";
  if (slug.includes("webp") || n.includes("webp")) return "WebP";
  if (slug.includes("heic") || n.includes("heic")) return "HEIC";
  if (slug.includes("gif") || n.includes("gif")) return "GIF";
  if (slug.includes("svg") || n.includes("svg")) return "SVG";
  if (slug.includes("avif") || n.includes("avif")) return "AVIF";
  if (slug.includes("bmp") || n.includes("bmp")) return "BMP";
  if (slug.includes("tiff") || n.includes("tiff")) return "TIFF";
  if (slug.includes("ico") || n.includes("ico")) return "ICO";
  if (slug.includes("base64")) return "B64";
  if (slug.includes("compress")) return locale === "ja" ? "圧縮" : "ZIP";
  if (slug.includes("resize")) return locale === "ja" ? "リサイズ" : "Size";
  if (slug.includes("crop")) return locale === "ja" ? "切抜" : "Crop";
  if (slug.includes("rotate")) return locale === "ja" ? "回転" : "Rotate";
  if (slug.includes("flip")) return locale === "ja" ? "反転" : "Flip";
  if (slug.includes("watermark")) return locale === "ja" ? "透かし" : "Mark";
  if (slug.includes("grayscale")) return locale === "ja" ? "白黒" : "Gray";
  if (slug.includes("parquet")) return "Parquet";
  if (slug.includes("json")) return "JSON";
  if (slug.includes("csv")) return "CSV";
  return locale === "ja" ? "ツール" : "Tool";
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
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCollectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* ── Hero ── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t.hero.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            {t.hero.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`${basePath}/tools`}
              className="inline-flex rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              {t.hero.primaryButtonLabel}
            </Link>
            <Link
              href={contactHref}
              className="inline-flex rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t.hero.secondaryButtonLabel}
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {t.stats.map((stat) => (
              <span
                key={stat.value}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500"
              >
                <span className="font-semibold text-gray-800">{stat.value}</span>
                {stat.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700">
              🔒 {trustMessage}
            </span>
          </div>
        </div>
      </section>

      {/* ── Search bar ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-9 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Search results ── */}
      {searchResults !== null && (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs text-gray-500">
            {searchResults.length > 0
              ? labels.resultsCount(searchResults.length)
              : labels.noResults}
          </p>
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className={`mb-2 inline-flex h-5 items-center rounded px-1.5 text-[10px] font-bold ${getBadgeClasses(tool.name)}`}>
                    {getToolBadgeLabel(tool.name, tool.href, locale)}
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-5 group-hover:text-blue-700">{tool.name}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-400">{tool.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Normal layout (hidden when searching) ── */}
      {searchResults === null && (
        <>
          {/* Popular tools */}
          <section className="border-b border-gray-100">
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">{t.popularToolsTitle}</h2>
                <Link href={`${basePath}/tools`} className="text-xs text-gray-400 hover:text-gray-700">
                  {t.toolsPageLinkLabel} →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {t.popularTools.map((tool) => {
                  const href = locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href;
                  return (
                    <Link
                      key={tool.href}
                      href={href}
                      className="group rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
                    >
                      <div className={`mb-1.5 inline-flex h-5 items-center rounded px-1.5 text-[10px] font-bold ${getBadgeClasses(tool.name)}`}>
                        {getToolBadgeLabel(tool.name, tool.href, locale)}
                      </div>
                      <p className="text-xs font-medium text-gray-900 leading-4 group-hover:text-blue-700">{tool.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* All categories */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 py-8">
              {t.categories.map((category) => (
                <section key={category.title}>
                  <div className="mb-3">
                    <h2 className="text-base font-semibold text-gray-900">{category.title}</h2>
                    <p className="mt-0.5 text-xs text-gray-400">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {category.tools.map((tool) => {
                      const href = locale === "en" ? tool.href.replace(/^\/tools/, "/en/tools") : tool.href;
                      return (
                        <Link
                          key={tool.href}
                          href={href}
                          className="group rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
                        >
                          <div className={`mb-2 inline-flex h-5 items-center rounded px-1.5 text-[10px] font-bold ${getBadgeClasses(tool.name)}`}>
                            {getToolBadgeLabel(tool.name, tool.href, locale)}
                          </div>
                          <p className="text-sm font-medium text-gray-900 leading-5 group-hover:text-blue-700">{tool.name}</p>
                          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-400">{tool.description}</p>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Resource links (always visible) ── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{card.description}</p>
                <span className="mt-2 inline-block text-xs font-medium text-blue-600">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Guides ── */}
      {searchResults === null && (
        <div className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">{t.guidesSection.title}</h2>
                <p className="mt-0.5 text-xs text-gray-400">{t.guidesSection.description}</p>
              </div>
              <Link href={guidesHref} className="text-xs text-gray-400 hover:text-gray-700">
                {t.guidesSection.viewAllLabel} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {t.guidesSection.guides.map((guide) => {
                const href = locale === "en" ? `/en/guides/${guide.slug}` : `/guides/${guide.slug}`;
                return (
                  <Link
                    key={guide.slug}
                    href={href}
                    className="group rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
                  >
                    <p className="text-sm font-medium text-gray-900 leading-5 group-hover:text-blue-700">{guide.title}</p>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-400">{guide.cardDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── FAQ ── */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-base font-semibold text-gray-900">{t.faqSectionTitle}</h2>
        <div className="space-y-2">
          {t.faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-gray-200 bg-white"
            >
              <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl list-none">
                {item.question}
                <span className="ml-2 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▾</span>
              </summary>
              <p className="border-t border-gray-100 px-4 py-3 text-sm leading-6 text-gray-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
