import Link from "next/link";
import {
  createHomeFaqJsonLd,
  homePageContent,
} from "@/src/data/home-page";

type Props = {
  locale: "ja" | "en";
};


function getIconClasses(name: string) {
  const n = name.toLowerCase();

  if (n.includes("jpg")) return "bg-orange-50 text-orange-700";
  if (n.includes("png")) return "bg-blue-50 text-blue-700";
  if (n.includes("pdf")) return "bg-red-50 text-red-700";
  if (n.includes("webp")) return "bg-violet-50 text-violet-700";
  return "bg-gray-100 text-gray-700";
}
export default function HomePage({ locale }: Props) {
  const contactHref = locale === "en" ? "/en/contact" : "/contact";
  const t = homePageContent[locale];
  const faqJsonLd = createHomeFaqJsonLd(locale);
  const trustMessage =
    locale === "en"
      ? "All processing stays in your browser. Files are not stored."
      : "すべてブラウザ内処理・ファイルは保存されません";

  const basePath = locale === "en" ? "/en" : "";

  const popularTools = t.popularTools.slice(0, 4);
  const mobileCategories = t.categories.map((category) => ({
    ...category,
    tools: category.tools.slice(0, 4),
  }));
  const mobileFaqItems = t.faqItems.slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* PC */}
      <div className="hidden md:block">
        <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                <span aria-hidden="true">🔒</span>
                <span>{trustMessage}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${basePath}/tools`}
                  className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  {t.hero.primaryButtonLabel}
                </Link>

                <Link
                  href={contactHref}
                  className="inline-flex rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  {t.hero.secondaryButtonLabel}
                </Link>
              </div>

              <div className="grid gap-4 pt-6 sm:grid-cols-3">
                {t.stats.map((stat) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="text-2xl font-bold ">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold ">
                {t.popularToolsTitle}
              </h2>

              <Link
                href={`${basePath}/tools`}
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                {t.toolsPageLinkLabel}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.popularTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={
                    locale === "en"
                      ? tool.href.replace(/^\/tools/, "/en/tools")
                      : tool.href
                  }
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                >
                  <div className={`inline-flex px-2 py-1 rounded text-xs font-bold mb-2 ${getIconClasses(tool.name)}`}>{tool.name.split(" ")[0]}</div><h3 className="text-lg font-semibold text-gray-900">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {t.categories.map((category) => (
              <section key={category.title} className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold ">
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
                      <div className={`inline-flex px-2 py-1 rounded text-xs font-bold mb-2 ${getIconClasses(tool.name)}`}>{tool.name.split(" ")[0]}</div><h3 className="text-lg font-semibold text-gray-900">
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
                  {t.toolsSection.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
                  <p>{t.toolsSection.description}</p>

                  <Link
                    href={`${basePath}/tools`}
                    className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {t.toolsSection.buttonLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold ">
                {t.faqSectionTitle}
              </h2>

              <div className="mt-6 space-y-4">
                {t.faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
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
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="px-4 py-8">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                {t.badge}
              </span>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {t.hero.title}
              </h1>

              <p className="text-sm leading-7 text-gray-600">
                {t.hero.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                <span aria-hidden="true">🔒</span>
                <span>{trustMessage}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`${basePath}/tools`}
                  className="inline-flex items-center justify-center rounded-lg bg-black px-3 py-3 text-sm font-semibold text-white"
                >
                  {t.hero.primaryButtonLabel}
                </Link>

                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-800"
                >
                  {t.hero.secondaryButtonLabel}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {t.stats.map((stat) => (
                  <div
                    key={`mobile-${stat.value}-${stat.label}`}
                    className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                  >
                    <div className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[11px] leading-4 text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white">
          <div className="px-4 py-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {t.popularToolsTitle}
              </h2>

              <Link
                href={`${basePath}/tools`}
                className="text-sm font-medium text-gray-700"
              >
                {t.toolsPageLinkLabel}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {popularTools.map((tool) => (
                <Link
                  key={`mobile-popular-${tool.name}`}
                  href={
                    locale === "en"
                      ? tool.href.replace(/^\/tools/, "/en/tools")
                      : tool.href
                  }
                  className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <h3 className="text-base font-semibold leading-5 text-gray-900">
                    {tool.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="space-y-8 px-4 py-8">
            {mobileCategories.map((category) => (
              <section key={`mobile-${category.title}`} className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold ">
                    {category.title}
                  </h2>
                  <p className="text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {category.tools.map((tool) => (
                    <Link
                      key={`mobile-${tool.href}`}
                      href={
                        locale === "en"
                          ? tool.href.replace(/^\/tools/, "/en/tools")
                          : tool.href
                      }
                      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                    >
                      <h3 className="text-base font-semibold leading-5 text-gray-900">
                        {tool.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <div>
                  <Link
                    href={`${basePath}/tools`}
                    className="text-sm font-medium text-gray-700 underline underline-offset-4"
                  >
                    {t.toolsPageLinkLabel}
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-8">
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                {t.aboutSection.title}
              </h2>

              <div className="space-y-3 text-sm leading-7 text-gray-600">
                {t.aboutSection.paragraphs.slice(0, 2).map((paragraph) => (
                  <p key={`mobile-about-${paragraph}`}>{paragraph}</p>
                ))}
              </div>

              <Link
                href={`${basePath}/tools`}
                className="inline-flex rounded-lg bg-black px-4 py-3 text-sm font-medium text-white"
              >
                {t.toolsSection.buttonLabel}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white">
          <div className="px-4 py-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                {t.faqSectionTitle}
              </h2>

              <div className="mt-4 space-y-3">
                {mobileFaqItems.map((item) => (
                  <div
                    key={`mobile-faq-${item.question}`}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white">
          <div className="px-4 py-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center shadow-sm">
              <h2 className="text-base font-semibold text-gray-900">
                {t.contactSection.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t.contactSection.description}
              </p>

              <Link
                href={contactHref}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium text-white"
              >
                {t.contactSection.buttonLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}







