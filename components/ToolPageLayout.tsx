import FAQJsonLd from "@/components/FAQJsonLd";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildSeoFallbackContent } from "@/src/lib/seo-tool-content";
import {
  isJapaneseText,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";
import { getToolItems } from "@/src/data/tool-directory";
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

function detectToolCategory(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("pdf") || title.includes("PDF")) {
    return "pdf";
  }

  if (normalized.includes(" to ") || (title.includes("を") && title.includes("に変換"))) {
    return "conversion";
  }

  return "editing";
}

function buildWorkflowSuggestions({
  locale,
  title,
}: {
  locale: "ja" | "en";
  title: string;
}): WorkflowSuggestion[] {
  const category = detectToolCategory(title);

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
    editing: [
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

  const entries = suggestionsByCategory[category] ?? suggestionsByCategory.editing;

  return getToolItems(locale, entries.map((entry) => entry.slug)).map((tool, index) => ({
    ...tool,
    reason: locale === "ja" ? entries[index].jaReason : entries[index].enReason,
  }));
}

function buildPracticalChecklist({
  locale,
  title,
}: {
  locale: "ja" | "en";
  title: string;
}): PracticalChecklist {
  const category = detectToolCategory(title);
  const isJa = locale === "ja";

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
  }).filter((tool) => tool.name !== title);
  const practicalChecklist = buildPracticalChecklist({
    locale: isJapanesePage ? "ja" : "en",
    title,
  });
  const workflowSuggestionsTitle = isJapanesePage
    ? "次に続けやすい作業"
    : "Common next steps";
  const basePath = isJapanesePage ? "" : "/en";
  const homePath = basePath || "/";
  const toolsPath = `${basePath}/tools`;
  const guidesPath = `${basePath}/guides`;
  const toolHubUrl = `${siteUrl}${toolsPath}`;
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
      name: "AI Image Tools",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: toolHubUrl,
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
            url: toolHubUrl,
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

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="space-y-8">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={homePath} className="hover:text-neutral-900">
                  {isJapanesePage ? "ホーム" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={toolsPath} className="hover:text-neutral-900">
                  {isJapanesePage ? "ツール一覧" : "Tools"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900">{title}</li>
            </ol>
          </nav>

          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-neutral-600">{description}</p>
          </header>

          <section>{children}</section>

          <section className="rounded-3xl border border-sky-100 bg-sky-50/70 p-6">
            <h2 className="text-2xl font-semibold">
              {practicalChecklist.title}
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 bg-white p-5">
                <h3 className="text-base font-semibold text-neutral-900">
                  {practicalChecklist.beforeTitle}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700">
                  {practicalChecklist.beforeItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white p-5">
                <h3 className="text-base font-semibold text-neutral-900">
                  {practicalChecklist.afterTitle}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700">
                  {practicalChecklist.afterItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-neutral-50 p-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {isJapanesePage
                  ? "使い方に迷ったときはガイドも確認"
                  : "Need help choosing the right workflow?"}
              </h2>
              <p className="text-sm leading-7 text-neutral-700">
                {isJapanesePage
                  ? "画像形式の違い、圧縮のコツ、PDFのまとめ方などをガイドページで整理しています。用途が近い作業をまとめて確認したいときに便利です。"
                  : "The guide section covers format differences, compression tips, and common PDF workflows so you can choose the right tool with more context."}
              </p>
            </div>
            <div className="mt-4">
              <Link
                href={guidesPath}
                className="inline-flex rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                {isJapanesePage ? "ガイド一覧を見る" : "Browse guides"}
              </Link>
            </div>
          </section>

          {workflowSuggestions.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">{workflowSuggestionsTitle}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {workflowSuggestions.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:bg-neutral-50"
                  >
                    <h3 className="text-base font-semibold text-neutral-900">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                      {tool.reason}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">{aboutTitle}</h2>
            <p className="text-sm leading-7 text-neutral-700">{aboutText}</p>
          </section>

          {resolvedContentSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="space-y-3 text-sm leading-7 text-neutral-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {resolvedListSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          {resolvedComparisonTitle && resolvedComparisonItems.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">
                {resolvedComparisonTitle}
              </h2>
              <div className="overflow-hidden rounded-2xl border">
                {resolvedComparisonItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 border-b px-4 py-3 last:border-b-0 md:grid-cols-[180px,1fr]"
                  >
                    <div className="text-sm font-semibold text-neutral-900">
                      {item.label}
                    </div>
                    <div className="text-sm leading-7 text-neutral-700">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">{stepsTitle}</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-neutral-700">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">{faqTitle}</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border p-4">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">
                {resolvedRelatedToolsTitle}
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-full border px-4 py-2 text-sm transition hover:bg-neutral-50"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
