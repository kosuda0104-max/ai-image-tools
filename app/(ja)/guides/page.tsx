import Link from "next/link";

export const metadata = {
  title: "ガイド | AI Image Tools",
  description:
    "画像形式の選び方、比較記事、PDFツールの使い分けを短く整理した解説ページをまとめています。",
};

const guides = [
  {
    title: "画像形式の選び方",
    href: "/guides/image-format-basics",
    description:
      "JPG、PNG、WebP、HEIC をどう使い分けるかを、容量、互換性、透明背景、編集のしやすさから整理します。",
  },
  {
    title: "JPGとPNGの違い",
    href: "/guides/jpg-vs-png",
    description:
      "写真向きか、図版向きか、容量や編集のしやすさはどう違うかを比較します。",
  },
  {
    title: "PNGとWebPの違い",
    href: "/guides/png-vs-webp",
    description:
      "Web掲載向けに軽さを優先するべきか、透明背景や互換性を重視するべきかを整理します。",
  },
  {
    title: "PDF ツールの使い分け",
    href: "/guides/pdf-workflows",
    description:
      "結合、分割、変換、圧縮、ページ整理など、PDF 作業でどのツールを使うべきかをまとめています。",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">ガイド</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            ツールを選ぶ前に知っておくと便利な考え方や、よく比較される形式の違いを短い解説ページとしてまとめています。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
