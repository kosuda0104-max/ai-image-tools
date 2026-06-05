import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | Filewisp",
  description:
    "Filewisp におけるCookie、Google AdSense広告、アクセス解析、お問い合わせ時の情報の取り扱いについてまとめています。",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">プライバシーポリシー</h1>
            <p className="text-lg leading-8 text-gray-600">
              Filewisp では、安心して利用してもらうために、取得する情報と利用目的を分かりやすく案内しています。Cookie の使用、Google AdSense による広告配信、アクセス解析について説明します。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-10">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Cookieの使用について</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                本サイトでは、アクセス解析や広告配信のために Cookie を使用しています。Cookie とは、ウェブサイトがブラウザに保存する小さなデータファイルで、サイトの利用状況の把握や広告の最適化に利用されます。
              </p>
              <p>
                Cookie の使用を希望しない場合は、ブラウザの設定から無効にすることができます。ただし、一部の機能が利用しにくくなる場合があります。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Google AdSense（広告）について</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                本サイトでは、<strong>Google AdSense</strong> を利用した広告を掲載しています。Google AdSense は Google が提供する広告配信サービスです。
              </p>
              <p>
                Google および Google のパートナー企業は、本サイトへの訪問履歴などの情報に基づいて、利用者の興味に合わせた広告（パーソナライズ広告）を表示するために Cookie（DoubleClick Cookie を含む）を使用することがあります。
              </p>
              <p>
                パーソナライズ広告を無効にしたい場合は、
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google の広告設定ページ
                </a>
                から設定できます。また、
                <a
                  href="https://www.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  aboutads.info
                </a>
                から第三者配信事業者の Cookie を無効にすることもできます。
              </p>
              <p>
                Google のプライバシーポリシーについては、
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google プライバシーポリシー
                </a>
                をご確認ください。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">アクセス解析について</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                本サイトでは、利用状況の把握と改善のためにアクセス解析ツールを利用することがあります。これにより、どのページが多く見られているか、どの導線が使われているかなどを統計的に確認し、改善に役立てます。
              </p>
              <p>
                解析結果は統計的な傾向の把握に利用し、個人を特定する目的では使用しません。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">取得する情報と利用目的</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                本サイトでは、アクセス解析や広告配信のため、ページの閲覧状況・ブラウザ情報・参照元URLなどの情報を取得することがあります。これらは個人を特定するものではありません。
              </p>
              <p>
                お問い合わせフォームを利用した場合には、氏名・メールアドレス・問い合わせ内容を返信や確認の目的で受け取ります。これらは問い合わせ対応以外の目的では使用しません。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">免責事項と見直し</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                本ポリシーの内容は、法令や運営方針の変更に応じて見直すことがあります。変更後はこのページに掲載します。
              </p>
              <p>
                プライバシーに関する質問がある場合は、
                <Link href="/contact" className="text-blue-600 underline">
                  お問い合わせページ
                </Link>
                からご連絡ください。
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
              >
                ツール一覧
              </Link>
              <Link
                href="/guides"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                ガイド
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                このサイトについて
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                お問い合わせ
              </Link>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
