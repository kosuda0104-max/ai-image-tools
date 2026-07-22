import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import { getAllToolItems } from "@/src/data/tool-directory";
import { AD_SLOTS } from "@/src/lib/ads";
import { siteUrl } from "@/src/lib/site";
import { ToolIcon } from "@/src/lib/tool-visuals";

const dataSlugs = new Set([
  "csv-encoding-fix",
  "parquet-to-csv",
  "dynamodb-json-converter",
  "cloudtrail-log-to-csv",
]);

export default function ZhTwToolDirectory({ home = false }: { home?: boolean }) {
  const tools = getAllToolItems("zh-TW");
  const dataTools = tools.filter((tool) => dataSlugs.has(tool.slug));
  const imageTools = tools.filter((tool) => !dataSlugs.has(tool.slug));
  const pageTitle = home ? "Filewisp 繁體中文" : "所有繁體中文工具";
  const description = home
    ? "免費的圖片、CSV、Parquet 與 AWS 資料轉換工具。檔案只在瀏覽器內處理，不會上傳到外部伺服器。"
    : `目前提供 ${tools.length} 項完整繁體中文工具，可直接在瀏覽器內處理檔案。`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${siteUrl}${tool.href}`,
    })),
  };

  const renderGroup = (title: string, items: typeof tools) => (
    <section aria-labelledby={`${title}-heading`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 id={`${title}-heading`} className="text-xl font-bold text-gray-950">{title}</h2>
        <span className="text-sm text-gray-500">{items.length} 項工具</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white sm:grid sm:grid-cols-2">
        {items.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex min-h-24 items-center gap-4 border-b border-gray-200 px-4 py-4 transition last:border-b-0 hover:bg-teal-50/50 sm:border-r sm:last:border-b"
          >
            <ToolIcon name={tool.name} href={tool.href} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-gray-950 group-hover:text-teal-700">{tool.name}</span>
              <span className="mt-1 block text-sm leading-6 text-gray-600">{tool.description}</span>
            </span>
            <span aria-hidden="true" className="text-xl text-gray-300">›</span>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="text-sm font-semibold text-teal-700">繁體中文（台灣）</p>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-950 sm:text-4xl">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">{description}</p>
          {home ? (
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href="/zh-tw/tools" className="rounded-lg bg-gray-950 px-4 py-2.5 font-semibold text-white">查看所有工具</Link>
              <Link href="/zh-tw/guides/aws-export-file-formats" className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800">查看 AWS 格式指南</Link>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        {!home ? <AdUnit slot={AD_SLOTS.directory} /> : null}
        {renderGroup("資料與 AWS", dataTools)}
        {renderGroup("圖片轉換", imageTools)}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-950">需要先了解 AWS 匯出格式？</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">指南比較 DynamoDB、CloudTrail、S3 Inventory 等服務的檔案結構與適合的輸出格式。</p>
          <Link href="/zh-tw/guides/aws-export-file-formats" className="mt-4 inline-flex text-sm font-semibold text-teal-700 hover:underline">閱讀 AWS 匯出檔案格式指南 →</Link>
        </section>
      </div>
    </main>
  );
}
