"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";
const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      slug: "avif-to-webp",
      title: "AVIFをWebPに変換",
      description: "AVIF画像をWebPへ変換し、Web掲載や古い編集環境で扱いやすい画像として保存できます。",
      aboutTitle: "AVIFをWebPに変換とは？",
      aboutText: "高圧縮なAVIF画像を、Webで広く使われるWebPへ変換します。ブラウザ内で複数ファイルをまとめて処理できます。",
      contentSections: [{ title: "AVIFの軽さを保ちながらWebPへ", paragraphs: ["AVIFに未対応のCMSや画像編集ツールへ渡すとき、JPGより新しく透過にも対応するWebPが使いやすい場合があります。"] }],
      listSections: [{ title: "WebPが向いている場面", items: ["AVIFを受け付けないCMS", "Webサイト用画像", "透過を残したい画像", "複数AVIFの一括変換"] }],
      stepsTitle: "使い方",
      steps: ["AVIF画像を追加します", "変換ボタンを押します", "変換結果を確認します", "WebPまたはZIPをダウンロードします"],
      faqTitle: "よくある質問",
      faqs: [
        { question: "AVIFよりWebPのほうが対応環境は広いですか？", answer: "一般にWebPはAVIFより長く使われており、古いCMSや編集ツールでも扱いやすい場合があります。" },
        { question: "透過は維持できますか？", answer: "元AVIFに透過があり、ブラウザが正しく読み取れる場合はWebPへ保持できます。" },
        { question: "画像はアップロードされますか？", answer: "いいえ。変換はブラウザ内で行います。" },
      ],
      relatedTools: [{ name: "AVIFをJPGに変換", href: "/tools/avif-to-jpg" }, { name: "AVIFをPNGに変換", href: "/tools/avif-to-png" }, { name: "WebPを圧縮", href: "/tools/webp-compress" }],
    },
    ui: { emptyTitle: "AVIF画像を追加", unknownType: "不明", convertingStatus: "変換中です...", canvasInitError: "エラー: Canvasの初期化に失敗しました。", convertError: "エラー: AVIFからWebPへの変換に失敗しました。", loadError: "エラー: AVIF画像を読み込めませんでした。", unexpectedErrorPrefix: "エラー", successMessage: (name) => `完了: ${name}.webp に変換しました。`, invalidFileError: "エラー: AVIFファイルを選択してください。", selectedImageTitle: "選択中の画像", fileNameLabel: "ファイル名", fileTypeLabel: "形式", fileSizeLabel: "サイズ", previewLabel: "プレビュー", convertButton: "AVIFをWebPに変換", convertingButton: "変換中..." },
  },
  en: {
    page: {
      slug: "avif-to-webp",
      title: "AVIF to WebP Converter",
      description: "Convert AVIF images to WebP for wider CMS, editing, and web-publishing compatibility directly in your browser.",
      aboutTitle: "What is AVIF to WebP Converter?",
      aboutText: "Turn highly compressed AVIF images into widely used WebP files. Multiple images can be converted locally in one batch.",
      contentSections: [{ title: "Keep modern compression with wider compatibility", paragraphs: ["WebP is useful when a CMS or editing tool cannot open AVIF but you still want a lightweight web format with transparency support."] }],
      listSections: [{ title: "When WebP is useful", items: ["CMS platforms that reject AVIF", "Website image delivery", "Images that need transparency", "Batch AVIF conversion"] }],
      stepsTitle: "How to use",
      steps: ["Add AVIF images", "Click convert", "Review the results", "Download WebP files or a ZIP"],
      faqTitle: "FAQ",
      faqs: [
        { question: "Is WebP more widely supported than AVIF?", answer: "WebP has been available longer and may work in older CMS and editing tools that do not accept AVIF." },
        { question: "Can transparency be preserved?", answer: "Yes, when the source AVIF has transparency and the browser can decode it correctly." },
        { question: "Are images uploaded?", answer: "No. Conversion runs in your browser." },
      ],
      relatedTools: [{ name: "AVIF to JPG", href: "/en/tools/avif-to-jpg" }, { name: "AVIF to PNG", href: "/en/tools/avif-to-png" }, { name: "Compress WebP", href: "/en/tools/webp-compress" }],
    },
    ui: { emptyTitle: "Add AVIF images", unknownType: "Unknown", convertingStatus: "Converting...", canvasInitError: "Error: Failed to initialize canvas.", convertError: "Error: Failed to convert AVIF to WebP.", loadError: "Error: Failed to load the AVIF image.", unexpectedErrorPrefix: "Error", successMessage: (name) => `Done: ${name}.webp was created.`, invalidFileError: "Error: Please select an AVIF file.", selectedImageTitle: "Selected images", fileNameLabel: "File name", fileTypeLabel: "Type", fileSizeLabel: "Size", previewLabel: "Preview", convertButton: "Convert AVIF to WebP", convertingButton: "Converting..." },
  },
};

export default function AvifToWebpTool({ locale }: { locale: Locale }) {
  return <StandardImageConversionTool content={content[locale]} accept="image/avif,.avif" outputExtension="webp" outputType="image/webp" quality={0.9} isValidFile={(file) => file.type === "image/avif" || /\.avif$/i.test(file.name)} />;
}
