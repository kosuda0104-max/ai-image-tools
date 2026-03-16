import Link from "next/link";

export const metadata = {
  title: "お問い合わせ | AI Image Tools",
  description:
    "AI Image Toolsへのお問い合わせページです。ツールの不具合報告や機能追加の要望はこちらから送信できます。",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="space-y-6">

            <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
              Contact
            </span>

            <h1 className="text-4xl font-bold text-gray-900">
              お問い合わせ
            </h1>

            <p className="text-lg text-gray-600">
              不具合の報告、ツール追加の要望などがあれば
              以下のフォームからご連絡ください。
            </p>

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
              お名前
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
              メールアドレス
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
              対象ツール
            </label>

            <input
              type="text"
              name="tool"
              placeholder="例: PDF to JPG"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900">
              メッセージ
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
            送信する
          </button>

        </form>


        <div className="mt-10 flex gap-3">

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm"
          >
            トップページ
          </Link>

          <Link
            href="/tools"
            className="rounded-xl bg-black px-5 py-3 text-sm text-white"
          >
            ツール一覧
          </Link>

        </div>

      </section>

    </main>
  );
}