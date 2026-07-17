import FAQJsonLd from "@/components/FAQJsonLd";
import AdUnit from "@/components/AdUnit";
import RecentToolTracker from "@/src/components/RecentToolTracker";
import { AD_SLOTS } from "@/src/lib/ads";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildSeoFallbackContent } from "@/src/lib/seo-tool-content";
import {
  isJapaneseText,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";
import { getAllToolItems, getToolItems } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type ToolTextSection = {
  title: string;
  paragraphs: string[];
};

type ToolListSection = {
  title: string;
  items: string[];
};

type ToolComparisonItem = {
  label: string;
  value: string;
};

type WorkflowSuggestion = {
  name: string;
  href: string;
  reason: string;
};

type PracticalChecklist = {
  title: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
};

type Props = {
  slug?: string;
  toolCategory?: "image" | "pdf" | "data";
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  contentSections?: ToolTextSection[];
  listSections?: ToolListSection[];
  comparisonTitle?: string;
  comparisonItems?: ToolComparisonItem[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools?: RelatedToolItem[];
  relatedToolsTitle?: string;
  children: ReactNode;
};

function detectToolCategory(
  title: string,
  explicitCategory?: Props["toolCategory"],
) {
  if (explicitCategory) {
    return explicitCategory;
  }

  const normalized = title.toLowerCase();

  if (normalized.includes("pdf") || title.includes("PDF")) {
    return "pdf";
  }

  if (normalized.includes(" to ") || (title.includes("を") && title.includes("に変換"))) {
    return "conversion";
  }

  return "image";
}

function buildWorkflowSuggestions({
  locale,
  title,
  category: explicitCategory,
}: {
  locale: "ja" | "en";
  title: string;
  category?: Props["toolCategory"];
}): WorkflowSuggestion[] {
  const category = detectToolCategory(title, explicitCategory);

  const suggestionsByCategory: Record<string, { slug: string; jaReason: string; enReason: string }[]> = {
    conversion: [
      {
        slug: "image-compress",
        jaReason: "変換後の画像が重いときに、そのまま軽量化まで進めやすい組み合わせです。",
        enReason: "Useful when the converted file still needs to be lighter before upload or sharing.",
      },
      {
        slug: "resize-image",
        jaReason: "提出先や掲載先のサイズ指定があるときは、変換後に大きさを整える流れが自然です。",
        enReason: "A practical next step when the destination also has width or height requirements.",
      },
      {
        slug: "image-to-pdf",
        jaReason: "変換した画像をそのまま提出資料や共有用 PDF にまとめたいときに続けて使えます。",
        enReason: "Helpful when the converted images eventually need to be packaged into a PDF.",
      },
    ],
    pdf: [
      {
        slug: "merge-pdf",
        jaReason: "複数ファイルをまとめてから提出したいときに、そのまま次の作業につながります。",
        enReason: "A natural follow-up when several files need to end up as one document.",
      },
      {
        slug: "compress-pdf",
        jaReason: "ページ整理のあとに容量だけを整えたいときに続けやすい組み合わせです。",
        enReason: "Useful after cleanup when the final PDF still needs to be smaller.",
      },
      {
        slug: "pdf-remove-pages",
        jaReason: "不要ページを落としてから共有したいときに使い分けしやすい近い作業です。",
        enReason: "A close companion task when the document still contains pages you do not want to send.",
      },
    ],
    data: [
      {
        slug: "csv-encoding-fix",
        jaReason: "ExcelでCSVが文字化けするときに、文字コードを整えてから次の処理へ進めます。",
        enReason: "Fix CSV character encoding before opening the data in Excel or continuing the workflow.",
      },
      {
        slug: "json-to-csv",
        jaReason: "JSONを汎用的なCSVに変えて、表計算ソフトや別システムへ渡せます。",
        enReason: "Turn JSON into a portable CSV for spreadsheets and downstream systems.",
      },
      {
        slug: "parquet-to-csv",
        jaReason: "Parquetの中身をCSVにして、軽い確認や受け渡しに使えます。",
        enReason: "Export Parquet data as CSV for quick inspection and easier sharing.",
      },
    ],
    image: [
      {
        slug: "image-compress",
        jaReason: "見た目を整えたあと、公開前に容量も軽くしたいときに続けやすい流れです。",
        enReason: "A good next step after visual edits when the final file still needs to be lighter.",
      },
      {
        slug: "jpg-to-png",
        jaReason: "編集後の画像を別形式でも持っておきたいときに、そのまま変換へつなげられます。",
        enReason: "Useful if the edited image also needs to be exported into another format for the next workflow.",
      },
      {
        slug: "image-to-pdf",
        jaReason: "整えた画像をまとめて提出や共有に回したいときに相性がいい組み合わせです。",
        enReason: "Helpful when prepared images need to be bundled into a shareable PDF afterward.",
      },
    ],
  };

  const entries = suggestionsByCategory[category] ?? suggestionsByCategory.image;

  return getToolItems(locale, entries.map((entry) => entry.slug)).map((tool, index) => ({
    ...tool,
    reason: locale === "ja" ? entries[index].jaReason : entries[index].enReason,
  }));
}

function buildPracticalChecklist({
  locale,
  title,
  category: explicitCategory,
}: {
  locale: "ja" | "en";
  title: string;
  category?: Props["toolCategory"];
}): PracticalChecklist {
  const category = detectToolCategory(title, explicitCategory);
  const isJa = locale === "ja";

  if (category === "data") {
    return isJa
      ? {
          title: "データ変換前後の確認ポイント",
          beforeTitle: "変換前に確認",
          beforeItems: [
            "元ファイルを残し、文字コードやデータ形式を確認してから変換します。",
            "先頭行が見出しか、列名やキーが期待どおりかを確認します。",
            "個人情報や機密データを含む場合は、処理場所と共有先を確認します。",
          ],
          afterTitle: "変換後に確認",
          afterItems: [
            "プレビューで日本語、列名、行数が正しく読めているか確認します。",
            "Excelや利用先のシステムで開き、日付や長い数値の表示も確認します。",
            "変換後のファイルは別名で保存し、元データと比較できるようにします。",
          ],
        }
      : {
          title: "Checks before and after data conversion",
          beforeTitle: "Before converting",
          beforeItems: [
            "Keep the source file and confirm its encoding and data format.",
            "Check whether the first row contains headers and whether field names look correct.",
            "For personal or sensitive data, confirm where processing happens and who will receive the output.",
          ],
          afterTitle: "After converting",
          afterItems: [
            "Use the preview to verify text, column names, and row counts.",
            "Open the result in Excel or the destination system and check dates and long numbers.",
            "Save the converted file under a new name so it can be compared with the source.",
          ],
        };
  }

  if (category === "pdf") {
    return isJa
      ? {
          title: "失敗しにくいPDF作業のコツ",
          beforeTitle: "作業前に確認",
          beforeItems: [
            "元のPDFを念のため残してから作業します。",
            "ページ順、不要ページ、提出先の容量制限を先に確認します。",
            "機密性の高い書類は、共有前に個人情報や不要なページが残っていないか見直します。",
          ],
          afterTitle: "保存後に確認",
          afterItems: [
            "保存したPDFを一度開き、ページ抜けや順番のズレがないか確認します。",
            "メールやフォームで送る前に、ファイルサイズが制限内か確認します。",
            "画質を落とした場合は、文字が読めるか拡大して確認します。",
          ],
        }
      : {
          title: "How to avoid common PDF mistakes",
          beforeTitle: "Before you start",
          beforeItems: [
            "Keep a copy of the original PDF before editing.",
            "Check page order, unwanted pages, and the file size limit for the destination.",
            "For sensitive documents, review whether personal details or extra pages should be removed.",
          ],
          afterTitle: "After saving",
          afterItems: [
            "Open the saved PDF once and check page order and missing pages.",
            "Before email or form upload, confirm the file size is within the limit.",
            "If compression changed quality, zoom in and confirm the text is still readable.",
          ],
        };
  }

  if (category === "conversion") {
    return isJa
      ? {
          title: "変換で失敗しにくくする確認ポイント",
          beforeTitle: "変換前に確認",
          beforeItems: [
            "提出先やアップロード先が指定している形式を確認します。",
            "透過、アニメーション、画質など、変換で変わりやすい要素を先に確認します。",
            "容量を小さくしたいのか、互換性を上げたいのか、目的を決めてから形式を選びます。",
          ],
          afterTitle: "変換後に確認",
          afterItems: [
            "変換後の画像を開いて、色味や文字のにじみがないか確認します。",
            "ファイルサイズが大きい場合は、続けて圧縮やリサイズを使うと調整しやすいです。",
            "編集途中ならPNG、共有や掲載ならJPGやWebPなど、最後の用途に合わせて保存します。",
          ],
        }
      : {
          title: "Checks that make conversion safer",
          beforeTitle: "Before converting",
          beforeItems: [
            "Confirm the format required by the app, upload form, or person receiving the file.",
            "Check details that may change during conversion, such as transparency, animation, or image quality.",
            "Decide whether your main goal is compatibility, editing, or a smaller file size.",
          ],
          afterTitle: "After converting",
          afterItems: [
            "Open the converted image and check colors, text edges, and visible artifacts.",
            "If the result is too large, continue with compression or resizing.",
            "Use PNG for editing stages, and JPG or WebP when the final goal is sharing or publishing.",
          ],
        };
  }

  return isJa
    ? {
        title: "画像編集で失敗しにくくする確認ポイント",
        beforeTitle: "編集前に確認",
        beforeItems: [
          "元画像を残してから、コピーを編集すると戻しやすくなります。",
          "SNS、ブログ、提出先など、最終的に使う場所のサイズ指定を確認します。",
          "文字やロゴが入っている画像は、切り抜きやリサイズ後に読めるか意識します。",
        ],
        afterTitle: "編集後に確認",
        afterItems: [
          "スマホ表示とPC表示の両方で、見切れや余白を確認します。",
          "容量が大きい場合は、公開前に画像圧縮を使うと扱いやすくなります。",
          "透かしや白黒化などの加工は、元画像と見比べて目的に合っているか確認します。",
        ],
      }
    : {
        title: "Checks that make image editing safer",
        beforeTitle: "Before editing",
        beforeItems: [
          "Keep the original image and edit a copy when possible.",
          "Check the final size requirements for social posts, blogs, forms, or documents.",
          "For images with text or logos, make sure cropping and resizing will keep them readable.",
        ],
        afterTitle: "After editing",
        afterItems: [
          "Preview the result on both mobile and desktop if it will be published online.",
          "If the file is still large, use image compression before publishing or sharing.",
          "Compare visual edits such as watermarking or grayscale with the original to confirm the result fits the goal.",
        ],
      };
}

export default function ToolPageLayout({
  slug,
  toolCategory,
  title,
  description,
  aboutTitle,
  aboutText,
  contentSections = [],
  listSections = [],
  comparisonTitle,
  comparisonItems = [],
  stepsTitle,
  steps,
  faqTitle,
  faqs,
  relatedTools = [],
  relatedToolsTitle = "Related Tools",
  children,
}: Props) {
  const fallback = buildSeoFallbackContent({
    title,
    description,
    relatedTools,
  });
  const resolvedContentSections =
    contentSections.length > 0 ? contentSections : fallback.contentSections;
  const resolvedListSections =
    listSections.length > 0 ? listSections : fallback.listSections;
  const resolvedComparisonTitle = comparisonTitle || fallback.comparisonTitle;
  const resolvedComparisonItems =
    comparisonItems.length > 0 ? comparisonItems : fallback.comparisonItems;
  const resolvedRelatedToolsTitle =
    relatedToolsTitle === "Related Tools"
      ? fallback.relatedToolsTitle
      : relatedToolsTitle;
  const isJapanesePage = isJapaneseText(title);
  const workflowSuggestions = buildWorkflowSuggestions({
    locale: isJapanesePage ? "ja" : "en",
    title,
    category: toolCategory,
  });
  const practicalChecklist = buildPracticalChecklist({
    locale: isJapanesePage ? "ja" : "en",
    title,
    category: toolCategory,
  });
  const workflowSuggestionsTitle = isJapanesePage
    ? "次に続けやすい作業"
    : "Common next steps";
  const basePath = isJapanesePage ? "" : "/en";
  const homePath = basePath || "/";
  const toolsPath = `${basePath}/tools`;
  const guidesPath = `${basePath}/guides`;
  const toolHubUrl = `${siteUrl}${toolsPath}`;
  const locale = isJapanesePage ? "ja" : "en";
  const normalizedTitle = title.toLocaleLowerCase(locale);
  const inferredTool = getAllToolItems(locale)
    .sort((left, right) => right.name.length - left.name.length)
    .find((tool) =>
      normalizedTitle.startsWith(tool.name.toLocaleLowerCase(locale)),
    );
  const toolPath = slug
    ? `${toolsPath}/${slug}`
    : inferredTool?.href ?? toolsPath;
  const toolUrl = `${siteUrl}${toolPath}`;
  const visibleWorkflowSuggestions = workflowSuggestions.filter(
    (tool) => tool.href !== toolPath && tool.name !== title,
  );
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    inLanguage: isJapanesePage ? "ja" : "en",
    dateModified: TOOL_CONTENT_LAST_UPDATED,
    isPartOf: {
      "@type": "WebSite",
      name: "Filewisp",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: toolUrl,
    mainEntityOfPage: toolUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isJapanesePage ? "ホーム" : "Home",
        item: `${siteUrl}${homePath === "/" ? "" : homePath}` || siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isJapanesePage ? "ツール一覧" : "Tools",
        item: toolHubUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: toolUrl,
      },
    ],
  };
  const howToJsonLd =
    steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: title,
          description,
          inLanguage: isJapanesePage ? "ja" : "en",
          step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: `${stepsTitle} ${index + 1}`,
            text: step,
            url: toolUrl,
          })),
        }
      : null;
  const relatedToolsJsonLd =
    relatedTools.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: resolvedRelatedToolsTitle,
          itemListElement: relatedTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${siteUrl}${tool.href}`,
          })),
        }
      : null;

  return (
    <>
      <RecentToolTracker />
      <FAQJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToJsonLd),
          }}
        />
      )}
      {relatedToolsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(relatedToolsJsonLd),
          }}
        />
      )}

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-10">
          <div className="space-y-4">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={homePath} className="transition hover:text-gray-900">
                    {isJapanesePage ? "ホーム" : "Home"}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={toolsPath} className="transition hover:text-gray-900">
                    {isJapanesePage ? "ツール一覧" : "Tools"}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{title}</li>
              </ol>
            </nav>

            <header className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{title}</h1>
              <p className="text-sm leading-6 text-gray-500">{description}</p>
            </header>
          </div>

          <section>{children}</section>

          <AdUnit slot={AD_SLOTS.toolAfterTool} />

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              {practicalChecklist.title}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">1</span>
                  {practicalChecklist.beforeTitle}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
                  {practicalChecklist.beforeItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">2</span>
                  {practicalChecklist.afterTitle}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
                  {practicalChecklist.afterItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {visibleWorkflowSuggestions.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">{workflowSuggestionsTitle}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {visibleWorkflowSuggestions.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-gray-200/70"
                  >
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-700">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {tool.reason}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">{aboutTitle}</h2>
            <p className="text-sm leading-7 text-gray-600">{aboutText}</p>
          </section>

          {resolvedContentSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <div className="space-y-3 text-sm leading-7 text-gray-600">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {resolvedListSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
              {section.items.map((item, index) => (
                <li key={`${section.title}-${index}`}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          {resolvedComparisonTitle && resolvedComparisonItems.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {resolvedComparisonTitle}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {resolvedComparisonItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 border-b border-gray-100 px-5 py-3.5 last:border-b-0 md:grid-cols-[180px,1fr]"
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-sm leading-7 text-gray-600">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{stepsTitle}</h2>
            <ol className="space-y-2.5">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-7 text-gray-600">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{faqTitle}</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {resolvedRelatedToolsTitle}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-teal-300 hover:text-teal-700"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-gray-900">
                  {isJapanesePage
                    ? "使い方に迷ったときはガイドも確認"
                    : "Need help choosing the right workflow?"}
                </h2>
                <p className="text-sm leading-6 text-gray-500">
                  {isJapanesePage
                    ? "画像形式の違い、圧縮のコツ、PDFのまとめ方などをガイドページで整理しています。"
                    : "The guide section covers format differences, compression tips, and common PDF workflows."}
                </p>
              </div>
              <Link
                href={guidesPath}
                className="shrink-0 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                {isJapanesePage ? "ガイド一覧を見る" : "Browse guides"}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
