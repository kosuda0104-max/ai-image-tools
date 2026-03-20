import Link from "next/link";
import { toolsPageContent } from "@/src/data/tools/tools-page";

type Props = {
  locale: "ja" | "en";
};

export default function ToolsPage({ locale }: Props) {
  const contactHref = locale === "en" ? "/en/contact" : "/contact";
  const t = toolsPageContent[locale];
  const basePath = locale === "en" ? "/en" : "/";

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
              {t.badge}
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t.hero.title}
            </h1>

            <p className="text-lg leading-8 text-gray-600">
              {t.hero.description}
            </p>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              {t.stats.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {t.categories.map((category) => (
            <section key={category.title} className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={
                      locale === "en"
                        ? tool.href.replace(/^\/tools/, "/en/tools")
                        : tool.href
                    }
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                {t.aboutSection.title}
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
                {t.aboutSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                {t.homeSection.title}
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
                <p>{t.homeSection.description}</p>

                <Link
                  href={basePath}
                  className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {t.homeSection.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              {t.contactSection.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {t.contactSection.description}
            </p>

            <Link
              href={contactHref}
              className="mt-4 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t.contactSection.buttonLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}