"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      slug: "svg-to-webp",
      title: "SVG を WebP に変換",
      description:
        "SVG画像をWebP形式に変換できる無料オンラインツールです。Web掲載用の軽い画像をブラウザだけで作成できます。",
      aboutTitle: "SVG を WebP に変換とは？",
      aboutText:
        "SVG画像をWebPに変換して、Webサイトやブログで扱いやすいラスター画像として保存できます。ブラウザ上で処理するため、ファイルは外部サーバーに送信されません。",
      stepsTitle: "使い方",
      steps: [
        "SVG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "WebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "SVGの見た目はそのままですか？",
          answer:
            "多くの場合はそのままWebPに変換できますが、外部フォントや複雑なSVGでは見た目が少し変わることがあります。",
        },
        {
          question: "WebPは何に向いていますか？",
          answer:
            "WebPはWeb掲載向けに軽くしやすい形式です。アイコンや図版を画像として配布したいときにも使えます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。変換はブラウザ内で行われるため、SVGファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "SVG を PNG に変換", href: "/tools/svg-to-png" },
        { name: "SVG を JPG に変換", href: "/tools/svg-to-jpg" },
        { name: "PNG を WebP に変換", href: "/tools/png-to-webp" },
      ],
    },
    ui: {
      emptyTitle: "SVG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "SVG を WebP に変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "SVGファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      slug: "svg-to-webp",
      title: "SVG to WebP Converter",
      description:
        "Convert SVG images to WebP online. Create lightweight browser-ready images without uploading files to a server.",
      aboutTitle: "What is SVG to WebP Converter?",
      aboutText:
        "This tool turns SVG images into WebP files directly in your browser. It is useful when vector artwork needs to be exported as a lightweight image for websites or blogs.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an SVG image",
        "Check the preview",
        "Click convert",
        "Download WebP",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will the SVG look the same?",
          answer:
            "Usually yes, but external fonts or very complex SVG files may render slightly differently.",
        },
        {
          question: "What is WebP good for?",
          answer:
            "WebP is useful for lightweight web images, including exported icons, diagrams, and illustrations.",
        },
        {
          question: "Is the SVG uploaded?",
          answer:
            "No. The conversion runs in your browser, so the SVG file is not sent to an external server.",
        },
      ],
      relatedTools: [
        { name: "SVG to PNG", href: "/en/tools/svg-to-png" },
        { name: "SVG to JPG", href: "/en/tools/svg-to-jpg" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
      ],
    },
    ui: {
      emptyTitle: "Upload SVG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert SVG to WebP",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an SVG file.",
      error: "Conversion failed.",
    },
  },
};

export default function SvgToWebpTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/svg+xml,.svg"
      outputExtension="webp"
      outputType="image/webp"
      isValidFile={(file) => file.type === "image/svg+xml" || /\.svg$/i.test(file.name)}
    />
  );
}
