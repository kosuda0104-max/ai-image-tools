import Link from "next/link";

type Section = {
  title: string;
  paragraphs: string[];
};

type Props = {
  title: string;
  description: string;
  sections: Section[];
  locale: "ja" | "en";
};

export default function StaticContentPage({
  title,
  description,
  sections,
  locale,
}: Props) {
  const links =
    locale === "en"
      ? {
          tools: "/en/tools",
          contact: "/en/contact",
          about: "/en/about",
          guides: "/en/guides",
          toolsLabel: "Tools",
          contactLabel: "Contact",
          aboutLabel: "About",
          guidesLabel: "Guides",
        }
      : {
          tools: "/tools",
          contact: "/contact",
          about: "/about",
          guides: "/guides",
          toolsLabel: "ツール一覧",
          contactLabel: "お問い合わせ",
          aboutLabel: "このサイトについて",
          guidesLabel: "ガイド",
        };

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg leading-8 text-gray-600">{description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-7 text-gray-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href={links.tools}
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
              >
                {links.toolsLabel}
              </Link>
              <Link
                href={links.guides}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                {links.guidesLabel}
              </Link>
              <Link
                href={links.about}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                {links.aboutLabel}
              </Link>
              <Link
                href={links.contact}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                {links.contactLabel}
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
