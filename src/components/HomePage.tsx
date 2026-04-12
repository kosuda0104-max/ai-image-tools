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
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const guidesHref = locale === "en" ? "/en/guides" : "/guides";
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
  const profileSnippet =
    locale === "en"
      ? {
          title: "Site Operator",
          name: "Kosuda",
          body: "Web engineer, born in 1998, with five years of professional experience in web application development. This site is built to provide practical free tools with simple, easy-to-follow UI.",
          linkLabel: "About the site",
        }
      : {
          title: "運営者情報",
          name: "小須田",
          body: "1998年生まれの Web エンジニアです。Webアプリケーション開発を中心に実務で5年ほど開発に携わっており、使いやすく実用的な無料ツールを目指してこのサイトを運営しています。",
          linkLabel: "このサイトについて",
        };
  const resourceCards =
    locale === "en"
      ? [
          {
            title: "About the site",
            description:
              "See what the site is for, how it is maintained, and how transparency pages are organized.",
            href: aboutHref,
            label: "About",
          },
          {
            title: "Guides and help",
            description:
              "Read short guides on image formats and PDF workflows before choosing a tool.",
            href: guidesHref,
            label: "Guides",
          },
          {
            title: "Support and requests",
            description:
              "Report bugs, request features, or ask about a workflow through the contact page.",
            href: contactHref,
            label: "Contact",
          },
        ]
      : [
          {
            title: "サイトの方針",
            description:
              "このサイトの目的、運営の考え方、公開している案内ページを確認できます。",
            href: aboutHref,
            label: "このサイトについて",
          },
          {
            title: "ガイドと解説",
            description:
              "画像形式の選び方や PDF 作業の流れを、短い解説ページで確認できます。",
            href: guidesHref,
            label: "ガイドを見る",
          },
          {
            title: "不具合報告と要望",
            description:
              "不具合の報告や、追加してほしいツールの要望をお問い合わせページから送れます。",
            href: contactHref,
            label: "お問い合わせ",
          },
        ];

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
            <div className="mb-6 space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {locale === "en" ? "More Than a Tool List" : "ツール一覧だけで終わらせないために"}
              </h2>
              <p className="text-sm leading-7 text-gray-600">
                {locale === "en"
                  ? "The site also includes policy pages, support routes, and short guides so visitors can understand how the service works."
                  : "運営情報、ガイド、問い合わせ導線も公開して、初めての人でも使い方やサイトの方針が分かるようにしています。"}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {resourceCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-medium text-black underline underline-offset-4">
                    {card.label}
                  </span>
                </Link>
              ))}
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

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    {profileSnippet.title}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileSnippet.name}
                  </h2>
                  <p className="max-w-3xl text-sm leading-7 text-gray-600">
                    {profileSnippet.body}
                  </p>
                </div>

                <Link
                  href={aboutHref}
                  className="inline-flex rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                >
                  {profileSnippet.linkLabel}
                </Link>
              </div>
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
            <div className="grid gap-3">
              {resourceCards.map((card) => (
                <Link
                  key={`mobile-${card.href}`}
                  href={card.href}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                >
                  <h2 className="text-base font-semibold text-gray-900">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {card.description}
                  </p>
                  <span className="mt-3 inline-flex text-sm font-medium text-black underline underline-offset-4">
                    {card.label}
                  </span>
                </Link>
              ))}
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

        <section className="border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                {profileSnippet.title}
              </div>
              <h2 className="mt-2 text-lg font-bold text-gray-900">
                {profileSnippet.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {profileSnippet.body}
              </p>
              <Link
                href={aboutHref}
                className="mt-4 inline-flex rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800"
              >
                {profileSnippet.linkLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}







