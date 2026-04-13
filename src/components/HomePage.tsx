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

  if (n.includes("jpg")) return "bg-orange-50 text-orange-700 ring-1 ring-orange-100";
  if (n.includes("png")) return "bg-blue-50 text-blue-700 ring-1 ring-blue-100";
  if (n.includes("pdf")) return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
  if (n.includes("webp")) return "bg-violet-50 text-violet-700 ring-1 ring-violet-100";
  return "bg-stone-100 text-slate-700 ring-1 ring-stone-200";
}

function getToolBadgeLabel(
  name: string,
  href: string,
  locale: "ja" | "en",
) {
  const slug = href.split("/").pop() ?? "";
  const lowerName = name.toLowerCase();

  if (slug.includes("pdf") || lowerName.includes("pdf")) return "PDF";
  if (slug.includes("jpg") || lowerName.includes("jpg")) return "JPG";
  if (slug.includes("png") || lowerName.includes("png")) return "PNG";
  if (slug.includes("webp") || lowerName.includes("webp")) return "WebP";
  if (slug.includes("heic") || lowerName.includes("heic")) return "HEIC";
  if (slug.includes("gif") || lowerName.includes("gif")) return "GIF";
  if (slug.includes("svg") || lowerName.includes("svg")) return "SVG";
  if (slug.includes("avif") || lowerName.includes("avif")) return "AVIF";
  if (slug.includes("bmp") || lowerName.includes("bmp")) return "BMP";
  if (slug.includes("tiff") || lowerName.includes("tiff")) return "TIFF";
  if (slug.includes("ico") || lowerName.includes("ico")) return "ICO";
  if (slug.includes("compress")) return locale === "ja" ? "画像" : "Image";
  if (slug.includes("resize")) return locale === "ja" ? "サイズ" : "Size";
  if (slug.includes("crop")) return locale === "ja" ? "切り抜き" : "Crop";
  if (slug.includes("rotate")) return locale === "ja" ? "回転" : "Rotate";
  if (slug.includes("flip")) return locale === "ja" ? "反転" : "Flip";
  if (slug.includes("watermark")) return locale === "ja" ? "透かし" : "Mark";
  if (slug.includes("grayscale")) return locale === "ja" ? "白黒" : "Gray";

  return locale === "ja" ? "ツール" : "Tool";
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
    <main className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* PC */}
      <div className="hidden md:block">
        <section className="border-b border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-[linear-gradient(135deg,rgba(255,253,250,0.98),rgba(240,245,255,0.9))] px-8 py-10 shadow-[0_24px_80px_-40px_rgba(22,32,51,0.35)]">
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(31,94,255,0.14),transparent_58%),radial-gradient(circle_at_top_right,rgba(31,122,92,0.14),transparent_44%)]" />
              <div className="relative max-w-3xl space-y-6">
              <span className="inline-flex rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-sm text-slate-600 shadow-sm">
                {t.badge}
              </span>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {t.hero.title}
              </h1>

              <p className="text-lg leading-8 text-slate-600">
                {t.hero.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-sm text-emerald-800 shadow-sm">
                <span aria-hidden="true">🔒</span>
                <span>{trustMessage}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${basePath}/tools`}
                  className="inline-flex rounded-xl bg-[linear-gradient(135deg,#1f5eff,#2850c4)] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_30px_-18px_rgba(31,94,255,0.9)] transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  {t.hero.primaryButtonLabel}
                </Link>

                <Link
                  href={contactHref}
                  className="inline-flex rounded-xl border border-stone-300 bg-white/90 px-5 py-3 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-stone-50"
                >
                  {t.hero.secondaryButtonLabel}
                </Link>
              </div>

              <div className="grid gap-4 pt-6 sm:grid-cols-3">
                {t.stats.map((stat) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-[0_16px_30px_-24px_rgba(22,32,51,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-26px_rgba(22,32,51,0.55)]"
                  >
                    <div className="text-2xl font-bold text-slate-950">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-950">
                {t.popularToolsTitle}
              </h2>

              <Link
                href={`${basePath}/tools`}
                className="text-sm font-medium text-slate-700 underline decoration-stone-300 underline-offset-4 hover:text-slate-950"
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
                  className="group rounded-[1.6rem] border border-stone-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,248,243,0.96))] p-5 shadow-[0_20px_35px_-26px_rgba(22,32,51,0.6)] transition hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_28px_45px_-26px_rgba(22,32,51,0.58)]"
                >
                  <div
                    className={`inline-flex rounded px-2 py-1 text-xs font-bold mb-2 ${getIconClasses(tool.name)}`}
                  >
                    {getToolBadgeLabel(tool.name, tool.href, locale)}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950 transition group-hover:text-slate-800">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
                  <h2 className="text-2xl font-bold text-slate-950">
                    {category.title}
                  </h2>

                  <p className="text-slate-600">{category.description}</p>
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
                      className="group rounded-[1.5rem] border border-stone-200/90 bg-white/90 p-5 shadow-[0_18px_34px_-28px_rgba(22,32,51,0.56)] transition hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_42px_-28px_rgba(22,32,51,0.56)]"
                    >
                      <div
                        className={`inline-flex rounded px-2 py-1 text-xs font-bold mb-2 ${getIconClasses(tool.name)}`}
                      >
                        {getToolBadgeLabel(tool.name, tool.href, locale)}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-950 transition group-hover:text-slate-800">
                        {tool.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.7rem] border border-stone-200 bg-white/92 p-6 shadow-[0_22px_44px_-32px_rgba(22,32,51,0.52)]">
                <h2 className="text-xl font-bold text-slate-950">
                  {t.aboutSection.title}
                </h2>

                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {t.aboutSection.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,240,255,0.52))] p-6 shadow-[0_22px_44px_-32px_rgba(22,32,51,0.52)]">
                <h2 className="text-xl font-bold text-slate-950">
                  {t.toolsSection.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                  <p>{t.toolsSection.description}</p>

                  <Link
                    href={`${basePath}/tools`}
                    className="inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    {t.toolsSection.buttonLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 space-y-2">
              <h2 className="text-2xl font-bold text-slate-950">
                {locale === "en" ? "More Than a Tool List" : "ツール一覧だけで終わらせないために"}
              </h2>
              <p className="text-sm leading-7 text-slate-600">
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
                  className="rounded-[1.6rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(242,239,228,0.76))] p-6 shadow-[0_18px_34px_-28px_rgba(22,32,51,0.56)] transition hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_42px_-28px_rgba(22,32,51,0.56)]"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-medium text-slate-950 underline decoration-stone-400 underline-offset-4">
                    {card.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-[1.7rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(242,239,228,0.72))] p-6 shadow-[0_20px_40px_-30px_rgba(22,32,51,0.55)]">
              <h2 className="text-2xl font-bold text-slate-950">
                {t.faqSectionTitle}
              </h2>

              <div className="mt-6 space-y-4">
                {t.faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-stone-200 bg-white/92 p-5"
                  >
                    <h3 className="text-base font-semibold text-slate-950">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[1.7rem] border border-stone-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(223,239,232,0.76))] p-6 text-center shadow-[0_20px_40px_-30px_rgba(22,32,51,0.55)]">
              <h2 className="text-lg font-semibold text-slate-950">
                {t.contactSection.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {t.contactSection.description}
              </p>

              <Link
                href={contactHref}
                className="mt-4 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {t.contactSection.buttonLabel}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200/70 bg-transparent">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[1.7rem] border border-stone-200 bg-white/92 p-6 shadow-[0_22px_44px_-34px_rgba(22,32,51,0.54)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {profileSnippet.title}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    {profileSnippet.name}
                  </h2>
                  <p className="max-w-3xl text-sm leading-7 text-slate-600">
                    {profileSnippet.body}
                  </p>
                </div>

                <Link
                  href={aboutHref}
                  className="inline-flex rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:bg-stone-50"
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







