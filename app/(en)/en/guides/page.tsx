import Link from "next/link";

export const metadata = {
  title: "Guides | AI Image Tools",
  description:
    "Short guides for choosing image formats, understanding PDF workflows, and picking the right tool.",
};

const guides = [
  {
    title: "How to choose an image format",
    href: "/en/guides/image-format-basics",
    description:
      "Understand when to use JPG, PNG, WebP, or HEIC based on file size, compatibility, transparency, and editing needs.",
  },
  {
    title: "JPG vs PNG",
    href: "/en/guides/jpg-vs-png",
    description:
      "Compare JPG and PNG for photos, screenshots, transparency, file size, and editing workflows.",
  },
  {
    title: "PNG vs WebP",
    href: "/en/guides/png-vs-webp",
    description:
      "See when PNG is better for source graphics and when WebP is better for lighter web delivery.",
  },
  {
    title: "How to choose the right PDF tool",
    href: "/en/guides/pdf-workflows",
    description:
      "Learn when to merge, split, convert, clean up, or optimize PDFs depending on the task in front of you.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">Guides</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            These short guides help visitors choose the right tool and avoid common format or workflow mistakes.
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
