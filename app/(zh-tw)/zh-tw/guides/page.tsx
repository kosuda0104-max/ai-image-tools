import Link from "next/link";
import { awsExportFormatsZhTwGuide } from "@/src/data/guides.zh-tw";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";

export const metadata = createLocalizedPageMetadata({
  locale: "zh-TW",
  title: "繁體中文指南｜AWS 匯出格式與資料轉換",
  description: "了解 DynamoDB、CloudTrail、S3 Inventory 等 AWS 匯出檔案的結構、轉換方式與檢查重點。",
  jaPath: "/guides",
  enPath: "/en/guides",
  zhTwPath: "/zh-tw/guides",
});

export default function Page() {
  const guide = awsExportFormatsZhTwGuide;
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-950 sm:text-4xl">指南</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">從 AWS 服務特有的檔案結構開始，選擇正確的轉換與檢查方式。</p>
          <p className="mt-2 text-sm text-gray-500">目前提供 1 篇完整繁體中文指南</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Link href={`/zh-tw/guides/${guide.slug}`} className="block max-w-3xl rounded-lg border border-gray-200 bg-white p-6 transition hover:border-teal-300 hover:shadow-sm">
          <h2 className="text-xl font-semibold text-gray-950">{guide.title}</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">{guide.cardDescription}</p>
          <span className="mt-4 inline-flex text-sm font-semibold text-teal-700">閱讀指南 →</span>
        </Link>
      </section>
    </main>
  );
}
