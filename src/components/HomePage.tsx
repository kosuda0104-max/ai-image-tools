import Link from "next/link";
import {
  createHomeFaqJsonLd,
  homePageContent,
} from "@/src/data/home-page";
import AdUnit from "@/components/AdUnit";
import ToolFinder from "@/src/components/ToolFinder";
import RecentTools from "@/src/components/RecentTools";
import WispMascot from "@/src/components/WispMascot";
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

function ToolCard({ tool }: { tool: CardTool }) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 transition duration-200 hover:border-teal-200 hover:shadow-md"
    >
      <ToolIcon name={tool.name} href={tool.href} />
      <p className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-teal-700">
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

function CompactToolCard({ tool }: { tool: CardTool }) {
  return (
    <Link
      href={tool.href}
      className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition hover:border-teal-200 hover:shadow-sm"
    >
      <ToolIcon name={tool.name} href={tool.href} size="sm" />
      <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900 group-hover:text-teal-700">
        {tool.name}
      </span>
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

  const allTools = getAllToolItems(locale);
  const labels =
    locale === "en"
      ? {
          popularTitle: "Popular tools",
          allByCategory: "All tools by category",
          viewAll: "View all tools",
        }
      : {
          popularTitle: "よく使われるツール",
          allByCategory: "すべてのツール（カテゴリ別）",
          viewAll: "ツール一覧ページへ",
        };

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
      numberOfItems: allTools.length,
      itemListElement: allTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${siteUrl}${tool.href}`,
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

      {/* ── Hero: drop a file and get routed to the right tool ── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8">
          <WispMascot size={64} className="mx-auto" />
          <p className="mt-2 text-xs font-semibold text-teal-700">
            {trustMessage}
          </p>
          <h1 className="mx-auto mt-3 max-w-5xl text-2xl font-extrabold text-gray-950 [overflow-wrap:anywhere] sm:text-3xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-gray-600">
            {t.hero.description}
          </p>
          <div className="mt-6">
            <ToolFinder locale={locale} tools={allTools} />
          </div>
          <RecentTools locale={locale} />
        </div>
      </section>

      {/* ── Search-proven problems: direct paths from a symptom to a solution ── */}
      <section className="border-b border-gray-200 bg-teal-50/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-gray-950">
              {t.problemGuidesSection.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {t.problemGuidesSection.description}
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {t.problemGuidesSection.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-teal-100 bg-white p-4 transition hover:border-teal-300 hover:shadow-sm"
              >
                <h3 className="text-sm font-semibold leading-6 text-gray-900 group-hover:text-teal-800">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
                <span className="mt-3 inline-flex text-xs font-semibold text-teal-700" aria-hidden="true">
                  {locale === "en" ? "See the fix" : "原因と解決方法を見る"} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular tools ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-10">
          <h2 className="text-center text-xl font-bold text-gray-950">
            {labels.popularTitle}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {t.popularTools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
          <AdUnit slot={AD_SLOTS.home} />
        </div>
      </div>

      {/* ── All tools, always visible by category ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-gray-950">
            {labels.allByCategory}
          </h2>
          <div className="mt-8 space-y-10">
            {t.categories.map((category) => {
              const visibleTools = category.tools.slice(0, 6);
              const foldedTools = category.tools.slice(6);
              return (
                <section key={category.title}>
                  <h3 className="text-base font-bold text-gray-950">
                    {category.title}
                  </h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleTools.map((tool) => (
                      <CompactToolCard key={tool.href} tool={tool} />
                    ))}
                  </div>
                  {foldedTools.length > 0 ? (
                    <details className="group/fold mt-2">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-md px-1 py-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900">
                        <span className="group-open/fold:hidden">
                          {locale === "en"
                            ? `Show ${foldedTools.length} more`
                            : `残り${foldedTools.length}件を表示`}
                        </span>
                        <span className="hidden group-open/fold:inline">
                          {locale === "en" ? "Show less" : "折りたたむ"}
                        </span>
                        <span aria-hidden="true" className="transition group-open/fold:rotate-180">▾</span>
                      </summary>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {foldedTools.map((tool) => (
                          <CompactToolCard key={tool.href} tool={tool} />
                        ))}
                      </div>
                    </details>
                  ) : null}
                </section>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`${basePath}/tools`}
              className="inline-flex rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-teal-300 hover:text-teal-800"
            >
              {labels.viewAll} →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Guides ── */}
      <div className="border-t border-gray-200 bg-gray-50">
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
              className="text-sm font-medium text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-900"
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
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-700">
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
