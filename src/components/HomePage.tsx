"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  createHomeFaqJsonLd,
  homePageContent,
} from "@/src/data/home-page";
import AdUnit from "@/components/AdUnit";
import ToolFinder from "@/src/components/ToolFinder";
import { AD_SLOTS } from "@/src/lib/ads";
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
      className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 transition duration-200 hover:border-blue-200 hover:shadow-md"
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
  const [activeTab, setActiveTab] = useState(0); // 0 = popular, 1+ = categories
  const labels =
    locale === "en"
      ? {
          popularTab: "Popular",
          viewAll: "View all tools",
          categoryTabs: "Tool categories",
        }
      : {
          popularTab: "人気",
          viewAll: "すべてのツールを見る",
          categoryTabs: "ツールカテゴリ",
        };

  const tabs = [
    { label: labels.popularTab, tools: t.popularTools },
    ...t.categories.map((c) => ({ label: c.title, tools: c.tools })),
  ];
  const activeTools = (tabs[activeTab]?.tools ?? tabs[0].tools).slice(0, 8);

  const allToolItems = allTools;

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
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs font-semibold text-emerald-700">
            {trustMessage}
          </p>
          <h1 className="mx-auto mt-4 max-w-5xl text-3xl font-extrabold text-gray-950 [overflow-wrap:anywhere] sm:text-4xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            {t.hero.description}
          </p>
          <div className="mt-7">
            <ToolFinder locale={locale} tools={allTools} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-10">
          <div className="mb-5 text-center">
            <h2 className="text-xl font-bold text-gray-950">
              {locale === "en" ? "Browse by goal" : "目的から選ぶ"}
            </h2>
          </div>
          <div className="overflow-x-auto pb-1">
            <div
              role="tablist"
              aria-label={labels.categoryTabs}
              className="mx-auto flex w-max min-w-full gap-1 rounded-lg bg-gray-200 p-1 sm:min-w-0"
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls="home-tool-panel"
                  onClick={() => setActiveTab(index)}
                  className={`min-h-10 flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${
                    activeTab === index
                      ? "bg-gray-950 text-white shadow-sm"
                      : "text-gray-600 hover:bg-white/70 hover:text-gray-950"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id="home-tool-panel"
            role="tabpanel"
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {activeTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} locale={locale} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`${basePath}/tools`}
              className="inline-flex rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              {labels.viewAll} →
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
          <AdUnit slot={AD_SLOTS.home} />
        </div>
      </div>

      {/* ── Guides ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900">{t.guidesSection.title}</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {t.guidesSection.description}
              </p>
            </div>
            <Link
              href={`${basePath}/guides`}
              className="text-sm font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
            >
              {t.guidesSection.viewAllLabel} →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.guidesSection.guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`${basePath}/guides/${guide.slug}`}
                className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                  {guide.cardDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{t.faqSectionTitle}</h2>
          <div className="space-y-3">
            {t.faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none select-none items-center justify-between rounded-lg px-5 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50">
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
