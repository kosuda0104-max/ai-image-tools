"use client";

import Link from "next/link";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

const content = {
  ja: {
    badge: "Contact",
    heading: "お問い合わせ",
    subtext:
      "不具合の報告、ツール追加の要望などがあれば以下のフォームからご連絡ください。",
    name: "お名前",
    email: "メールアドレス",
    tool: "対象ツール",
    message: "メッセージ",
    submit: "送信する",
    placeholder: "例: PDF to JPG",
    home: "トップページ",
    tools: "ツール一覧",
    homeHref: "/",
    toolsHref: "/tools",
  },
  en: {
    badge: "Contact",
    heading: "Contact",
    subtext:
      "If you have any bug reports or feature requests, please contact us using the form below.",
    name: "Name",
    email: "Email",
    tool: "Tool",
    message: "Message",
    submit: "Send",
    placeholder: "e.g. PDF to JPG",
    home: "Home",
    tools: "Tools",
    homeHref: "/en",
    toolsHref: "/en/tools",
  },
} as const;

export default function ContactPage({ locale }: Props) {
  const t = content[locale];

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
              {t.badge}
            </span>

            <h1 className="text-4xl font-bold text-gray-900">{t.heading}</h1>

            <p className="text-lg text-gray-600">{t.subtext}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <form
          action="https://formspree.io/f/xreybdaa"
          method="POST"
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="text-sm font-medium text-gray-900">
              {t.name}
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900">
              {t.email}
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900">
              {t.tool}
            </label>
            <input
              type="text"
              name="tool"
              placeholder={t.placeholder}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900">
              {t.message}
            </label>
            <textarea
              name="message"
              rows={6}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="inline-flex rounded-xl bg-black px-6 py-3 text-white hover:opacity-90"
          >
            {t.submit}
          </button>
        </form>

        <div className="mt-10 flex gap-3">
          <Link
            href={t.homeHref}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm"
          >
            {t.home}
          </Link>

          <Link
            href={t.toolsHref}
            className="rounded-xl bg-black px-5 py-3 text-sm text-white"
          >
            {t.tools}
          </Link>
        </div>
      </section>
    </main>
  );
}