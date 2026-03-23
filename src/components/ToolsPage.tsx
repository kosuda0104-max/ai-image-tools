import Link from "next/link";
import { toolsPageContent } from "@/src/data/tools/tools-page";

type Props = {
  locale: "ja" | "en";
};

export default function ToolsPage({ locale }: Props) {
  const contactHref = locale === "en" ? "/en/contact" : "/contact";
  const t = toolsPageContent[locale];
  const basePath = locale === "en" ? "/en" : "";

  return (
    <main className="min-h-screen bg-white">

      {/* PC */}
      <div className="hidden md:block">

        <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
                {t.badge}
              </span>

              <h1 className="text-4xl font-bold text-gray-900">
                {t.hero.title}
              </h1>

              <p className="text-lg text-gray-600">
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {t.categories.map((category) => (
            <section key={category.title} className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {category.title}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={
                      locale === "en"
                        ? tool.href.replace(/^\/tools/, "/en/tools")
                        : tool.href
                    }
                    className="p-5 border rounded-2xl shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </section>

      </div>

      {/* Mobile */}
      <div className="block md:hidden px-4 py-6 space-y-6">

        {t.categories.map((category) => (
          <div key={category.title}>
            <h2 className="text-lg font-bold mb-2">
              {category.title}
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {category.tools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.href}
                  href={
                    locale === "en"
                      ? tool.href.replace(/^\/tools/, "/en/tools")
                      : tool.href
                  }
                  className="p-3 border rounded-lg shadow-sm"
                >
                  <p className="text-sm font-medium">
                    {tool.name}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href={`${basePath}/tools`}
              className="text-sm text-gray-600 underline mt-2 block"
            >
              もっと見る
            </Link>
          </div>
        ))}

      </div>

    </main>
  );
}