"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SiteLogo from "@/src/components/SiteLogo";
import type { SiteLocale } from "@/src/lib/site-locale";
import { isZhTwGuideSlug, isZhTwToolSlug } from "@/src/data/zh-tw";

type NavLink = { name: string; href: string };

type NavGroup = {
  label: string;
  links: NavLink[];
  viewAll: NavLink;
};

function getNav(locale: SiteLocale): { groups: NavGroup[]; guides: NavLink; allTools: NavLink; languageLinks: NavLink[] } {
  const p = locale === "en" ? "/en" : locale === "zh-TW" ? "/zh-tw" : "";

  if (locale === "zh-TW") {
    return {
      groups: [
        {
          label: "圖片轉換",
          links: [
            { name: "HEIC 轉 JPG", href: `${p}/tools/heic-to-jpg` },
            { name: "WebP 轉 JPG", href: `${p}/tools/webp-to-jpg` },
          ],
          viewAll: { name: "查看所有圖片工具", href: `${p}/tools` },
        },
        {
          label: "資料與 AWS",
          links: [
            { name: "修復 CSV 亂碼", href: `${p}/tools/csv-encoding-fix` },
            { name: "Parquet 轉 CSV", href: `${p}/tools/parquet-to-csv` },
            { name: "DynamoDB JSON 轉換器", href: `${p}/tools/dynamodb-json-converter` },
            { name: "CloudTrail 日誌轉 CSV", href: `${p}/tools/cloudtrail-log-to-csv` },
          ],
          viewAll: { name: "查看所有資料工具", href: `${p}/tools` },
        },
      ],
      guides: { name: "指南", href: `${p}/guides` },
      allTools: { name: "所有工具", href: `${p}/tools` },
      languageLinks: [
        { name: "日本語", href: "/" },
        { name: "EN", href: "/en" },
      ],
    };
  }

  if (locale === "ja") {
    return {
      groups: [
        {
          label: "画像変換",
          links: [
            { name: "HEIC を JPG に変換", href: `${p}/tools/heic-to-jpg` },
            { name: "JPG を PNG に変換", href: `${p}/tools/jpg-to-png` },
            { name: "PNG を JPG に変換", href: `${p}/tools/png-to-jpg` },
            { name: "WebP を JPG に変換", href: `${p}/tools/webp-to-jpg` },
            { name: "JPG を WebP に変換", href: `${p}/tools/jpg-to-webp` },
          ],
          viewAll: { name: "変換ツールをすべて見る", href: `${p}/tools` },
        },
        {
          label: "圧縮・編集",
          links: [
            { name: "画像圧縮", href: `${p}/tools/image-compress` },
            { name: "JPG 圧縮", href: `${p}/tools/jpg-compress` },
            { name: "画像リサイズ", href: `${p}/tools/resize-image` },
            { name: "画像切り抜き", href: `${p}/tools/crop-image` },
            { name: "透かし追加", href: `${p}/tools/watermark-image` },
          ],
          viewAll: { name: "編集ツールをすべて見る", href: `${p}/tools` },
        },
        {
          label: "PDF",
          links: [
            { name: "PDF を JPG に変換", href: `${p}/tools/pdf-to-jpg` },
            { name: "画像を PDF に変換", href: `${p}/tools/image-to-pdf` },
            { name: "PDF 結合", href: `${p}/tools/merge-pdf` },
            { name: "PDF 分割", href: `${p}/tools/split-pdf` },
            { name: "PDF 圧縮", href: `${p}/tools/compress-pdf` },
          ],
          viewAll: { name: "PDF ツールをすべて見る", href: `${p}/tools` },
        },
      ],
      guides: { name: "ガイド", href: `${p}/guides` },
      allTools: { name: "すべてのツール", href: `${p}/tools` },
      languageLinks: [
        { name: "EN", href: "/en" },
        { name: "繁中", href: "/zh-tw" },
      ],
    };
  }

  return {
    groups: [
      {
        label: "Convert",
        links: [
          { name: "HEIC to JPG", href: `${p}/tools/heic-to-jpg` },
          { name: "JPG to PNG", href: `${p}/tools/jpg-to-png` },
          { name: "PNG to JPG", href: `${p}/tools/png-to-jpg` },
          { name: "WebP to JPG", href: `${p}/tools/webp-to-jpg` },
          { name: "JPG to WebP", href: `${p}/tools/jpg-to-webp` },
        ],
        viewAll: { name: "View all converters", href: `${p}/tools` },
      },
      {
        label: "Compress & Edit",
        links: [
          { name: "Image Compress", href: `${p}/tools/image-compress` },
          { name: "JPG Compress", href: `${p}/tools/jpg-compress` },
          { name: "Resize Image", href: `${p}/tools/resize-image` },
          { name: "Crop Image", href: `${p}/tools/crop-image` },
          { name: "Watermark Image", href: `${p}/tools/watermark-image` },
        ],
        viewAll: { name: "View all editing tools", href: `${p}/tools` },
      },
      {
        label: "PDF",
        links: [
          { name: "PDF to JPG", href: `${p}/tools/pdf-to-jpg` },
          { name: "Image to PDF", href: `${p}/tools/image-to-pdf` },
          { name: "Merge PDF", href: `${p}/tools/merge-pdf` },
          { name: "Split PDF", href: `${p}/tools/split-pdf` },
          { name: "Compress PDF", href: `${p}/tools/compress-pdf` },
        ],
        viewAll: { name: "View all PDF tools", href: `${p}/tools` },
      },
    ],
    guides: { name: "Guides", href: `${p}/guides` },
    allTools: { name: "All Tools", href: `${p}/tools` },
    languageLinks: [
      { name: "日本語", href: "/" },
      { name: "繁中", href: "/zh-tw" },
    ],
  };
}

function getLanguageHref(pathname: string, languageHome: string) {
  const localPath = pathname.replace(/^\/(?:en|zh-tw)(?=\/|$)/, "") || "/";

  if (languageHome === "/zh-tw") {
    const toolMatch = localPath.match(/^\/tools\/([^/]+)$/);
    const guideMatch = localPath.match(/^\/guides\/([^/]+)$/);
    const hasZhTwPage =
      localPath === "/" ||
      localPath === "/tools" ||
      localPath === "/guides" ||
      (toolMatch ? isZhTwToolSlug(toolMatch[1]) : false) ||
      (guideMatch ? isZhTwGuideSlug(guideMatch[1]) : false);

    return hasZhTwPage
      ? `/zh-tw${localPath === "/" ? "" : localPath}`
      : "/zh-tw";
  }

  if (languageHome === "/en") {
    return `/en${localPath === "/" ? "" : localPath}`;
  }

  return localPath;
}

export default function SiteHeader({ locale }: { locale: SiteLocale }) {
  const nav = getNav(locale);
  const pathname = usePathname();
  const homeHref = locale === "en" ? "/en" : locale === "zh-TW" ? "/zh-tw" : "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={homeHref} className="shrink-0" onClick={() => setMobileOpen(false)}>
          <SiteLogo tone="dark" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.groups.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {group.label}
                <svg className="h-3.5 w-3.5 text-slate-400 transition group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/60">
                  {group.links.map((link) => (
                    <Link
                      key={link.href + link.name}
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-teal-50 hover:text-teal-700"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-gray-100 pt-1">
                    <Link
                      href={group.viewAll.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                    >
                      {group.viewAll.name} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link
            href={nav.guides.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            {nav.guides.name}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href={nav.allTools.href}
            className="hidden rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-400 sm:inline-flex"
          >
            {nav.allTools.name}
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {nav.languageLinks.map((link) => (
              <Link
                key={link.href}
                href={getLanguageHref(pathname, link.href)}
                className="rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-200 lg:hidden"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-900 px-4 pb-6 pt-3 lg:hidden">
          <Link
            href={nav.allTools.href}
            onClick={() => setMobileOpen(false)}
            className="mb-4 block rounded-xl bg-teal-500 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            {nav.allTools.name}
          </Link>
          <div className="space-y-5">
            {nav.groups.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-x-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href + link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg py-1.5 text-sm text-slate-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href={nav.guides.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-slate-200"
            >
              {nav.guides.name}
            </Link>
            <div className="flex gap-2 border-t border-slate-800 pt-4 sm:hidden">
              {nav.languageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLanguageHref(pathname, link.href)}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
