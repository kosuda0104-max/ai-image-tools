import Link from "next/link";

export const metadata = {
  title: "\u30ac\u30a4\u30c9 | AI Image Tools",
  description:
    "\u753b\u50cf\u5f62\u5f0f\u306e\u9078\u3073\u65b9\u3001PDF \u30c4\u30fc\u30eb\u306e\u4f7f\u3044\u5206\u3051\u3001\u5909\u63db\u524d\u306b\u77e5\u3063\u3066\u304a\u304d\u305f\u3044\u30dd\u30a4\u30f3\u30c8\u3092\u77ed\u304f\u307e\u3068\u3081\u305f\u89e3\u8aac\u30da\u30fc\u30b8\u3067\u3059\u3002",
};

const guides = [
  {
    title: "\u753b\u50cf\u5f62\u5f0f\u306e\u9078\u3073\u65b9",
    href: "/guides/image-format-basics",
    description:
      "JPG\u3001PNG\u3001WebP\u3001HEIC \u306e\u9055\u3044\u3092\u3001\u5bb9\u91cf\u3001\u4e92\u63db\u6027\u3001\u900f\u904e\u3001\u7de8\u96c6\u3057\u3084\u3059\u3055\u306e\u89b3\u70b9\u304b\u3089\u6574\u7406\u3057\u307e\u3059\u3002",
  },
  {
    title: "JPG \u3068 PNG \u306e\u9055\u3044",
    href: "/guides/jpg-vs-png",
    description:
      "\u5199\u771f\u3001\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3001\u900f\u904e\u3001\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u306e\u9055\u3044\u304b\u3089\u3001\u3069\u3061\u3089\u3092\u9078\u3076\u3079\u304d\u304b\u3092\u898b\u5206\u3051\u3084\u3059\u304f\u3057\u307e\u3059\u3002",
  },
  {
    title: "PNG \u3068 WebP \u306e\u9055\u3044",
    href: "/guides/png-vs-webp",
    description:
      "\u518d\u7de8\u96c6\u5411\u3051\u306e PNG \u3068\u3001\u8efd\u91cf\u914d\u4fe1\u5411\u3051\u306e WebP \u3092\u3069\u3046\u4f7f\u3044\u5206\u3051\u308b\u304b\u3092\u6574\u7406\u3057\u307e\u3059\u3002",
  },
  {
    title: "PDF \u30c4\u30fc\u30eb\u306e\u9078\u3073\u65b9",
    href: "/guides/pdf-workflows",
    description:
      "\u7d50\u5408\u3001\u5206\u5272\u3001\u5909\u63db\u3001\u5727\u7e2e\u3001\u30da\u30fc\u30b8\u6574\u7406\u306a\u3069\u3001PDF \u4f5c\u696d\u3054\u3068\u306b\u3069\u306e\u30c4\u30fc\u30eb\u3092\u4f7f\u3046\u3068\u3088\u3044\u304b\u3092\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900">
            {"\u30ac\u30a4\u30c9"}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {
              "\u30c4\u30fc\u30eb\u3092\u9078\u3076\u524d\u306b\u8003\u3048\u65b9\u3092\u6574\u7406\u3057\u305f\u3044\u4eba\u5411\u3051\u306b\u3001\u5f62\u5f0f\u306e\u9055\u3044\u3084\u4f7f\u3044\u5206\u3051\u3092\u77ed\u304f\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002"
            }
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
