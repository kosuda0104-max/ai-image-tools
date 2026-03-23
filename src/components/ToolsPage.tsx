"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toolsPageContent } from "@/src/data/tools/tools-page";

type Props = {
  locale: "ja" | "en";
};

type ToolItem = {
  name: string;
  description: string;
  href: string;
};

type ToolCategory = {
  title: string;
  tools: ToolItem[];
};

type SortKey = "default" | "popular" | "name";

function getIconLabel(tool: ToolItem) {
  const slug = tool.href.split("/").pop() ?? "";
  const name = tool.name.toLowerCase();

  if (slug.includes("pdf") || name.includes("pdf")) return "PDF";
  if (slug.includes("jpg") || name.includes("jpg")) return "JPG";
  if (slug.includes("png") || name.includes("png")) return "PNG";
  if (slug.includes("webp") || name.includes("webp")) return "WEBP";
  if (slug.includes("heic") || name.includes("heic")) return "HEIC";
  if (slug.includes("gif") || name.includes("gif")) return "GIF";
  if (slug.includes("svg") || name.includes("svg")) return "SVG";
  if (slug.includes("avif") || name.includes("avif")) return "AVIF";
  if (slug.includes("bmp") || name.includes("bmp")) return "BMP";
  if (slug.includes("tiff") || name.includes("tiff")) return "TIFF";
  if (slug.includes("ico") || name.includes("ico")) return "ICO";
  if (slug.includes("compress")) return "ZIP";
  if (slug.includes("resize")) return "SIZE";
  if (slug.includes("crop")) return "CROP";
  if (slug.includes("rotate")) return "ROTATE";
  if (slug.includes("flip")) return "FLIP";
  if (slug.includes("watermark")) return "MARK";
  if (slug.includes("grayscale")) return "GRAY";

  return "TOOL";
}

function getPopularityScore(tool: ToolItem) {
  const slug = tool.href.split("/").pop() ?? "";

  const popularOrder = [
    "jpg-to-png",
    "png-to-jpg",
    "webp-to-png",
    "webp-to-jpg",
    "heic-to-jpg",
    "image-compress",
    "pdf-to-jpg",
    "pdf-to-png",
    "image-to-pdf",
    "merge-pdf",
    "split-pdf",
    "compress-pdf"
  ];

  const index = popularOrder.indexOf(slug);
  return index === -1 ? 9999 : index;
}

export default function ToolsPage({ locale }: Props) {
  const t = toolsPageContent[locale];
  const basePath = locale === "en" ? "/en" : "";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const labels =
    locale === "en"
      ? {
          searchPlaceholder: "Search tools...",
          sortLabel: "Sort",
          sortDefault: "Recommended",
          sortPopular: "Popular",
          sortName: "Name",
          more: "View more",
          noResults: "No tools matched your search."
        }
      : {
          searchPlaceholder: "ツールを検索...",
          sortLabel: "並び替え",
          sortDefault: "おすすめ順",
          sortPopular: "人気順",
          sortName: "名前順",
          more: "もっと見る",
          noResults: "一致するツールがありません。"
        };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredCategories = useMemo<ToolCategory[]>(() => {
    const categories = t.categories.map((category) => {
      let nextTools = category.tools.filter((tool) => {
        if (!normalizedSearch) return true;

        const target = `${tool.name} ${tool.description} ${tool.href}`.toLowerCase();
        return target.includes(normalizedSearch);
      });

      if (sort === "popular") {
        nextTools = [...nextTools].sort(
          (a, b) => getPopularityScore(a) - getPopularityScore(b)
        );
      } else if (sort === "name") {
        nextTools = [...nextTools].sort((a, b) =>
          a.name.localeCompare(b.name, locale === "ja" ? "ja" : "en")
        );
      }

      return {
        ...category,
        tools: nextTools
      };
    });

    return categories.filter((category) => category.tools.length > 0);
  }, [locale, normalizedSearch, sort, t.categories]);

  return (
    <main className="min-h-screen bg-white">
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

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {labels.sortLabel}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              >
                <option value="default">{labels.sortDefault}</option>
                <option value="popular">{labels.sortPopular}</option>
                <option value="name">{labels.sortName}</option>
              </select>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-600">
              {labels.noResults}
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
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
                        className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="mb-3 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gray-600">
                          {getIconLabel(tool)}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-gray-700">
                          {tool.name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="block md:hidden px-4 py-6">
        <div className="mb-5 space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          >
            <option value="default">{labels.sortDefault}</option>
            <option value="popular">{labels.sortPopular}</option>
            <option value="name">{labels.sortName}</option>
          </select>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-600">
            {labels.noResults}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.title}>
                <h2 className="mb-3 text-base font-bold text-gray-900">
                  {category.title}
                </h2>

                <div className="grid grid-cols-2 gap-2.5">
                  {category.tools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.href}
                      href={
                        locale === "en"
                          ? tool.href.replace(/^\/tools/, "/en/tools")
                          : tool.href
                      }
                      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                    >
                      <div className="mb-2 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                        {getIconLabel(tool)}
                      </div>

                      <p className="text-sm font-medium leading-5 text-gray-900">
                        {tool.name}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-gray-500 line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`${basePath}/tools`}
                  className="mt-2 block text-sm text-gray-600 underline"
                >
                  {labels.more}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
