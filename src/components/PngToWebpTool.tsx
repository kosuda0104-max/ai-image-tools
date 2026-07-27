"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "PNGをWebPに変換",
      description:
        "PNG画像を、透過を保てるWebPへ変換します。Web掲載用の容量を抑えたいときに、アップロード不要でまとめて処理できます。",
      aboutTitle: "PNGをWebPに変換するメリット",
      aboutText:
        "PNG画像をWebP形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。WebPはファイルサイズを抑えやすく、Webサイト掲載用の画像を軽くしたいときや、表示速度を改善したいときに便利です。",
      contentSections: [
        {
          title: "透過を残しながらWeb画像を軽くしたいときに使う",
          paragraphs: [
            "PNGはロゴ、アイコン、スクリーンショットのような透明部分やくっきりした線を持つ画像に向いていますが、写真や色数の多い画像では容量が大きくなりやすい形式です。WebPへ変換すると、透過を保ちながら容量を下げられる場合があります。",
            "この変換は画像の縦横サイズを変更しません。表示寸法も小さくしたい場合は、先に画像をリサイズしてからWebPへ変換すると、さらに容量を抑えやすくなります。",
          ],
        },
        {
          title: "変換後は透明部分と文字の輪郭を確認する",
          paragraphs: [
            "WebPは主要な現行ブラウザで表示できますが、古いソフトや一部の入稿システムでは受け付けられない場合があります。掲載先がWebPに対応していることを先に確認してください。",
            "変換後は、透明な背景、細い文字、グラデーションを拡大して元画像と比較します。容量があまり変わらない画像では、PNGのまま使うほうが適切なこともあります。",
          ],
        },
      ],
      listSections: [
        {
          title: "PNGからWebPへ変換する前のチェック",
          items: [
            "掲載先のブラウザやシステムがWebPに対応しているか確認します。",
            "透過背景が必要な画像は、変換後も透明部分を確認します。",
            "縦横サイズは変わらないため、必要なら先にリサイズします。",
            "元のPNGを残し、変換後の見た目と容量を比較します。",
          ],
        },
      ],
      comparisonTitle: "PNGとWebPの違い",
      comparisonItems: [
        { label: "PNG", value: "可逆圧縮で文字や線を保ちやすく、幅広い編集ソフトで扱えます。" },
        { label: "WebP", value: "透過に対応しながら、Web配信時の容量を抑えやすい形式です。" },
        { label: "選び方", value: "編集互換性を優先するならPNG、Web表示の軽さを優先するならWebPを比較します。" },
      ],
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "「PNGをWebPに変換」ボタンを押します",
        "変換後のWebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPにすると軽くなりますか？",
          answer:
            "多くの場合、WebPはPNGよりもファイルサイズを小さくしやすいため、Web掲載用画像の軽量化に役立ちます。",
        },
        {
          question: "透過は維持されますか？",
          answer:
            "はい。元のPNG画像に透過がある場合、WebP変換後も透過を維持できることがあります。",
        },
        {
          question: "インストールは必要ですか？",
          answer:
            "不要です。ブラウザだけでPNGをWebPに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "ガイド：PNGとWebPの違い", href: "/guides/png-vs-webp" },
      ],
    },
    ui: {
      emptyTitle: "PNG画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: PNGからWebPへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.webp をダウンロードしました。`,
      invalidFileError: "エラー: PNGファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "PNGをWebPに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "PNG to WebP Converter",
      description:
        "Convert PNG images to transparency-capable WebP files in your browser. Batch conversion is free and requires no upload.",
      aboutTitle: "Why convert PNG to WebP?",
      aboutText:
        "This free PNG to WebP converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. WebP is useful when you want smaller file sizes for websites, faster page loading, and better image optimization while keeping transparency when supported.",
      contentSections: [
        {
          title: "Reduce web image size while keeping transparency",
          paragraphs: [
            "PNG works well for logos, icons, screenshots, and images with transparent areas, but complex PNG files can become large. WebP can preserve transparency while producing a smaller file for web delivery.",
            "Conversion does not change the image dimensions. If the displayed width and height also need to be smaller, resize first and then convert to WebP for a more effective reduction.",
          ],
        },
        {
          title: "Check transparency and fine detail after conversion",
          paragraphs: [
            "Current major browsers support WebP, but older software and some submission systems may not accept it. Confirm support at the destination before replacing the PNG.",
            "Compare transparent edges, small text, and gradients with the original. If file size barely changes, keeping the PNG may be the more compatible choice.",
          ],
        },
      ],
      listSections: [
        {
          title: "PNG to WebP checklist",
          items: [
            "Confirm that the destination browser or system accepts WebP.",
            "Review transparent areas in the converted file.",
            "Resize separately if the image dimensions also need to change.",
            "Keep the PNG and compare both appearance and file size.",
          ],
        },
      ],
      comparisonTitle: "PNG vs WebP",
      comparisonItems: [
        { label: "PNG", value: "Lossless and broadly editable, with reliable support for crisp lines and transparency." },
        { label: "WebP", value: "Transparency-capable and often smaller for delivery on websites." },
        { label: "Choose based on", value: "Keep PNG for editing compatibility; compare WebP when web delivery size matters." },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click the Convert PNG to WebP button",
        "Download the converted WebP image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will WebP make the image smaller?",
          answer:
            "In many cases, WebP can reduce file size compared with PNG, which makes it useful for websites and faster image delivery.",
        },
        {
          question: "Will transparency be preserved?",
          answer:
            "Yes. If the original PNG image has transparency, the converted WebP can preserve it in many cases.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert PNG to WebP directly in your browser without installing any software.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "Guide: PNG vs WebP", href: "/en/guides/png-vs-webp" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PNG image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert PNG to WebP.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.webp has been downloaded.`,
      invalidFileError: "Error: Please select a PNG file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert PNG to WebP",
      convertingButton: "Converting...",
    },
  },
};

export default function PngToWebpTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/png,.png"
      outputExtension="webp"
      outputType="image/webp"
      quality={0.92}
      isValidFile={(file) => file.type === "image/png" || /\.png$/i.test(file.name)}
    />
  );
}
