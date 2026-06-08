"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "SVGをPNGに変換",
      description: "SVG画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "SVGをPNGに変換とは？",
      aboutText:
        "SVG画像をPNG形式に変換できる無料オンラインツールです。ベクター画像を一般的なPNG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "SVG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "PNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "SVGの見た目はそのままですか？",
          answer: "多くの場合はそのままPNGに変換できますが、複雑なSVGでは差が出ることがあります。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでSVGをPNGに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer: "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "SVGをJPGに変換", href: "/tools/svg-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "SVG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "SVGをPNGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "SVGファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "SVG to PNG Converter",
      description: "Convert SVG images to PNG format online.",
      aboutTitle: "What is SVG to PNG Converter?",
      aboutText:
        "This tool lets you convert SVG images into PNG format directly in your browser. It is useful when you want to save vector images as standard PNG files.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an SVG image",
        "Check the preview",
        "Click convert",
        "Download PNG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will the SVG look the same?",
          answer: "In many cases yes, but very complex SVG files may render slightly differently.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser.",
        },
        {
          question: "Can I convert without uploading?",
          answer: "Yes. This tool works entirely in your browser.",
        },
      ],
      relatedTools: [
        { name: "SVG to JPG", href: "/en/tools/svg-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload SVG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert SVG to PNG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an SVG file.",
      error: "Conversion failed.",
    },
  },
};

export default function SvgToPngTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/svg+xml,.svg"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => file.type === "image/svg+xml" || /\.svg$/i.test(file.name)}
    />
  );
}
