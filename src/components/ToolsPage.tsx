import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import ToolFinder from "@/src/components/ToolFinder";
import { toolsPageContent } from "@/src/data/tools/tools-page";
import { getAllToolItems } from "@/src/data/tool-directory";
import { AD_SLOTS } from "@/src/lib/ads";
import { siteUrl } from "@/src/lib/site";
import { ToolIcon } from "@/src/lib/tool-visuals";

type Props = {
  locale: "ja" | "en";
};

export default function ToolsPage({ locale }: Props) {
  const t = toolsPageContent[locale];
  const allTools = getAllToolItems(locale);
  const pageUrl = `${siteUrl}${locale === "en" ? "/en/tools" : "/tools"}`;
  const labels =
    locale === "en"
      ? {
          browseTitle: "Browse all tools by category",
          browseDescription:
            "Open only the category you need. Every tool remains available here.",
          tools: (count: number) => `${count} tools`,
          chooser: "Not sure which category to open?",
        }
      : {
          browseTitle: "カテゴリから全ツールを見る",
          browseDescription:
            "必要なカテゴリだけ開けます。61件すべてのツールはここから利用できます。",
          tools: (count: number) => `${count}件`,
          chooser: "カテゴリを決めきれないとき",
        };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.hero.title,
    description: t.hero.description,
    url: pageUrl,
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
    numberOfItems: allTools.length,
    itemListElement: allTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${siteUrl}${tool.href}`,
    })),
  };

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

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-950 [overflow-wrap:anywhere] sm:text-4xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            {t.hero.description}
          </p>
          <div className="mt-7">
            <ToolFinder locale={locale} tools={allTools} variant="directory" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <AdUnit slot={AD_SLOTS.directory} />

        <section aria-labelledby="all-tools-heading" className="mt-8">
          <div className="mb-5">
            <h2 id="all-tools-heading" className="text-xl font-bold text-gray-950">
              {labels.browseTitle}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {labels.browseDescription}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            {t.categories.map((category) => (
              <details
                key={category.title}
                className="group border-b border-gray-200 last:border-b-0"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-4 py-3 hover:bg-gray-50 sm:px-5">
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-sm font-bold text-gray-950 sm:text-base">
                      {category.title}
                    </span>
                    <span className="mt-0.5 block line-clamp-1 text-xs text-gray-500">
                      {category.description}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-gray-500">
                    {labels.tools(category.tools.length)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-gray-400 transition group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>

                <div className="grid border-t border-gray-200 bg-gray-50 sm:grid-cols-2">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group/tool flex min-h-20 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 transition hover:bg-blue-50/40"
                    >
                      <ToolIcon name={tool.name} href={tool.href} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-gray-900 group-hover/tool:text-blue-700">
                          {tool.name}
                        </span>
                        <span className="mt-0.5 block line-clamp-2 text-xs leading-5 text-gray-500">
                          {tool.description}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-lg text-gray-300">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        <details className="mt-8 rounded-lg border border-gray-200 bg-white">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
            {labels.chooser}
          </summary>
          <div className="grid border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {t.chooserSection.items.map((item) => (
              <section
                key={item.title}
                className="border-b border-gray-100 px-5 py-4 sm:border-r"
              >
                <h2 className="text-sm font-bold text-gray-950">{item.title}</h2>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                  {item.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </details>
      </div>
    </main>
  );
}
