import FAQJsonLd from "@/components/FAQJsonLd";
import Link from "next/link";
import type { ReactNode } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type Props = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools?: RelatedToolItem[];
  children: ReactNode;
};

export default function ToolPageLayout({
  title,
  description,
  aboutTitle,
  aboutText,
  stepsTitle,
  steps,
  faqTitle,
  faqs,
  relatedTools = [],
  children,
}: Props) {
  return (
    <>
      <FAQJsonLd faqs={faqs} />

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
              <h2 className="text-2xl font-semibold">Related Tools</h2>
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