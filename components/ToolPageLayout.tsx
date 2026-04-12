import FAQJsonLd from "@/components/FAQJsonLd";
import Link from "next/link";
import type { ReactNode } from "react";
import { buildSeoFallbackContent } from "@/src/lib/seo-tool-content";
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
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteUrl,
  };

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
        }}
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-neutral-600">{description}</p>
          </header>

          <section>{children}</section>

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
