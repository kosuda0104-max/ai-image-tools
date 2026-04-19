import Link from "next/link";
import { getGuides } from "@/src/data/guides";

export const metadata = {
  title: "Guides | AI Image Tools",
  description:
    "Guides for image formats, compression, resizing, and PDF workflows to help visitors pick the right tool with less trial and error.",
};

const guides = getGuides("en");

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">Guides</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Practical articles for choosing image formats, planning PDF work,
            and avoiding common conversion mistakes before you start.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/en/guides/${guide.slug}`}
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

