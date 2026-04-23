import Link from "next/link";
import { getGuides } from "@/src/data/guides";

export const metadata = {
  title: "ガイド | AI Image Tools",
  description:
    "画像形式の選び方、圧縮の考え方、PDF ツールの使い分けなどを整理した解説ページです。用途から逆算してツールを選びやすくします。",
};

const guides = getGuides("ja");

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">ガイド</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            変換の前に考え方を整理したいとき向けに、画像形式、圧縮、
            PDF作業の使い分けを実務寄りにまとめています。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {guide.cardDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

