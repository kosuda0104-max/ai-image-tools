import RelatedTools from "@/components/RelatedTools";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools?: { name: string; href: string }[];
};

export default function ToolPageLayout({
  title,
  description,
  children,
  aboutTitle,
  aboutText,
  stepsTitle,
  steps,
  faqTitle,
  faqs,
  relatedTools = [],
}: Props) {
  return (
    <main className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 text-sm">{description}</p>
      </section>

      {children}

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{aboutTitle}</h2>
          <p className="text-sm text-gray-600 leading-6">{aboutText}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{stepsTitle}</h2>
          <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">{faqTitle}</h2>

          {faqs.map((faq) => (
            <div key={faq.question}>
              <p className="font-medium">{faq.question}</p>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools items={relatedTools} />
    </main>
  );
}