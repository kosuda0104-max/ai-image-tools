import Link from "next/link";
import { getRelatedGuides } from "@/src/data/guide-related-guides";

type Props = {
  locale: "ja" | "en";
  slug: string;
};

export default function GuideRelatedGuides({ locale, slug }: Props) {
  const guides = getRelatedGuides(locale, slug);

  if (guides.length === 0) return null;

  const title = locale === "ja" ? "あわせて読みたいガイド" : "Related guides";
  const allGuidesLabel = locale === "ja" ? "ガイド一覧を見る" : "Browse all guides";
  const guidesPath = locale === "ja" ? "/guides" : "/en/guides";

  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              {guide.title}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href={guidesPath}
            className="text-sm font-medium text-gray-700 underline decoration-gray-400 underline-offset-4 hover:text-black"
          >
            {allGuidesLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
