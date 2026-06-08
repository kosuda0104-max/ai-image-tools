"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "SVGをJPGに変換",
      description: "SVG画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "SVGをJPGに変換とは？",
      aboutText:
        "SVG画像をJPG形式に変換できる無料オンラインツールです。ベクター画像を一般的なJPG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "SVG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "SVGの見た目はそのままですか？",
          answer: "多くの場合はそのままJPGに変換できますが、複雑なSVGでは差が出ることがあります。",
        },
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer: "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "SVGをPNGに変換", href: "/tools/svg-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "SVG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "SVGをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "SVGファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "SVG to JPG Converter",
      description: "Convert SVG images to JPG format online.",
      aboutTitle: "What is SVG to JPG Converter?",
      aboutText:
        "This tool lets you convert SVG images into JPG format directly in your browser. It is useful when you want to save vector images as standard JPG files.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an SVG image",
        "Check the preview",
        "Click convert",
        "Download JPG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will the SVG look the same?",
          answer: "In many cases yes, but very complex SVG files may render slightly differently.",
        },
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background.",
        },
        {
          question: "Can I convert without uploading?",
          answer: "Yes. This tool works entirely in your browser.",
        },
      ],
      relatedTools: [
        { name: "SVG to PNG", href: "/en/tools/svg-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Upload SVG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert SVG to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an SVG file.",
      error: "Conversion failed.",
    },
  },
};

export default function SvgToJpgTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/svg+xml,.svg"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) => file.type === "image/svg+xml" || /\.svg$/i.test(file.name)}
    />
  );
}
