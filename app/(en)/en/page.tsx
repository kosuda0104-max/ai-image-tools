import Link from "next/link";

export const metadata = {
  title: "AI Image Tools - Free Online Image & PDF Tools",
  description:
    "Free online tools to convert JPG, PNG, WebP and PDF files. Compress, resize and edit images directly in your browser.",
};

const popularTools = [
  { name: "JPG to PNG", href: "/tools/jpg-to-png" },
  { name: "PNG to JPG", href: "/tools/png-to-jpg" },
  { name: "Image Compress", href: "/tools/image-compress" },
  { name: "Resize Image", href: "/tools/resize-image" },
  { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
  { name: "Merge PDF", href: "/tools/merge-pdf" },
];

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
              AI Image Tools
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Online Image & PDF Tools
            </h1>

            <p className="text-lg leading-8 text-gray-600">
              Convert JPG, PNG, WebP and PDF files online for free. Compress,
              resize and edit images directly in your browser without uploading
              files to external servers.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/en/tools"
                className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Browse All Tools
              </Link>

              <Link
                href="/contact"
                className="inline-flex rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
              >
                Contact
              </Link>
            </div>

            <div className="grid gap-4 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">35 Tools</div>
                <div className="text-sm text-gray-600">Image and PDF utilities</div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">Free</div>
                <div className="text-sm text-gray-600">No registration required</div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">Secure</div>
                <div className="text-sm text-gray-600">Processed in your browser</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
            <Link
              href="/en/tools"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {tool.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}