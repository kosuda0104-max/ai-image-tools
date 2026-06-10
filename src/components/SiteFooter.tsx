import Link from "next/link";
import SiteLogo from "@/src/components/SiteLogo";

type Locale = "ja" | "en";

type FooterLink = { name: string; href: string };

type FooterColumn = { title: string; links: FooterLink[] };

function getColumns(locale: Locale): FooterColumn[] {
  const p = locale === "en" ? "/en" : "";

  if (locale === "ja") {
    return [
      {
        title: "画像変換",
        links: [
          { name: "HEIC を JPG に変換", href: `${p}/tools/heic-to-jpg` },
          { name: "JPG を PNG に変換", href: `${p}/tools/jpg-to-png` },
          { name: "PNG を JPG に変換", href: `${p}/tools/png-to-jpg` },
          { name: "WebP を JPG に変換", href: `${p}/tools/webp-to-jpg` },
          { name: "JPG を WebP に変換", href: `${p}/tools/jpg-to-webp` },
        ],
      },
      {
        title: "圧縮・編集",
        links: [
          { name: "画像圧縮", href: `${p}/tools/image-compress` },
          { name: "JPG 圧縮", href: `${p}/tools/jpg-compress` },
          { name: "画像リサイズ", href: `${p}/tools/resize-image` },
          { name: "画像切り抜き", href: `${p}/tools/crop-image` },
          { name: "画像に透かしを追加", href: `${p}/tools/watermark-image` },
        ],
      },
      {
        title: "PDF ツール",
        links: [
          { name: "PDF を JPG に変換", href: `${p}/tools/pdf-to-jpg` },
          { name: "画像を PDF に変換", href: `${p}/tools/image-to-pdf` },
          { name: "PDF 結合", href: `${p}/tools/merge-pdf` },
          { name: "PDF 分割", href: `${p}/tools/split-pdf` },
          { name: "PDF 圧縮", href: `${p}/tools/compress-pdf` },
        ],
      },
      {
        title: "サイト情報",
        links: [
          { name: "ツール一覧", href: `${p}/tools` },
          { name: "ガイド", href: `${p}/guides` },
          { name: "このサイトについて", href: `${p}/about` },
          { name: "お問い合わせ", href: `${p}/contact` },
          { name: "プライバシーポリシー", href: `${p}/privacy-policy` },
          { name: "利用規約", href: `${p}/terms` },
        ],
      },
    ];
  }

  return [
    {
      title: "Convert",
      links: [
        { name: "HEIC to JPG", href: `${p}/tools/heic-to-jpg` },
        { name: "JPG to PNG", href: `${p}/tools/jpg-to-png` },
        { name: "PNG to JPG", href: `${p}/tools/png-to-jpg` },
        { name: "WebP to JPG", href: `${p}/tools/webp-to-jpg` },
        { name: "JPG to WebP", href: `${p}/tools/jpg-to-webp` },
      ],
    },
    {
      title: "Compress & Edit",
      links: [
        { name: "Image Compress", href: `${p}/tools/image-compress` },
        { name: "JPG Compress", href: `${p}/tools/jpg-compress` },
        { name: "Resize Image", href: `${p}/tools/resize-image` },
        { name: "Crop Image", href: `${p}/tools/crop-image` },
        { name: "Watermark Image", href: `${p}/tools/watermark-image` },
      ],
    },
    {
      title: "PDF Tools",
      links: [
        { name: "PDF to JPG", href: `${p}/tools/pdf-to-jpg` },
        { name: "Image to PDF", href: `${p}/tools/image-to-pdf` },
        { name: "Merge PDF", href: `${p}/tools/merge-pdf` },
        { name: "Split PDF", href: `${p}/tools/split-pdf` },
        { name: "Compress PDF", href: `${p}/tools/compress-pdf` },
      ],
    },
    {
      title: "Site",
      links: [
        { name: "All Tools", href: `${p}/tools` },
        { name: "Guides", href: `${p}/guides` },
        { name: "About", href: `${p}/about` },
        { name: "Contact", href: `${p}/contact` },
        { name: "Privacy Policy", href: `${p}/privacy-policy` },
        { name: "Terms", href: `${p}/terms` },
      ],
    },
  ];
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const columns = getColumns(locale);
  const description =
    locale === "ja"
      ? "画像変換、画像編集、PDF・データ作業をブラウザだけで完結できる無料ツールサイト。ファイルは外部サーバーに送信されません。"
      : "Free browser-based tools for image conversion, editing, PDF, and data workflows. Your files never leave your device.";
  const langLink =
    locale === "ja"
      ? { name: "English", href: "/en" }
      : { name: "日本語", href: "/" };

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs space-y-4">
            <SiteLogo compact />
            <p className="text-sm leading-6 text-gray-500">{description}</p>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700">
              🔒 {locale === "ja" ? "すべてブラウザ内処理" : "100% browser-side processing"}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="mb-3 text-sm font-semibold text-gray-900">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href + link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Filewisp
          </p>
          <Link
            href={langLink.href}
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            🌐 {langLink.name}
          </Link>
        </div>
      </div>
    </footer>
  );
}
