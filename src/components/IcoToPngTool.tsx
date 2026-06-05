"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "ICOをPNGに変換",
      description: "ICO画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "ICOをPNGに変換とは？",
      aboutText:
        "ICO画像をPNG形式に変換できる無料オンラインツールです。faviconやアイコンファイルを、編集しやすいPNG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "ICO画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "PNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "faviconファイルも変換できますか？",
          answer: "はい。ICO形式のfaviconやアイコンファイルをPNG画像に変換できます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでICOをPNGに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer: "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "ICOをJPGに変換", href: "/tools/ico-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "ICO画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "ICOをPNGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "ICOファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "ICO to PNG Converter",
      description: "Convert ICO images to PNG format online.",
      aboutTitle: "What is ICO to PNG Converter?",
      aboutText:
        "This tool lets you convert ICO files into PNG images directly in your browser. It is useful when you want to edit or reuse favicon and icon files as standard PNG images.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an ICO image",
        "Check the preview",
        "Click convert",
        "Download PNG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert favicon files?",
          answer: "Yes. You can convert ICO favicon and icon files into PNG images.",
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
        { name: "ICO to JPG", href: "/en/tools/ico-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload ICO image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert ICO to PNG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an ICO file.",
      error: "Conversion failed.",
    },
  },
};

export default function IcoToPngTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/x-icon,image/vnd.microsoft.icon,.ico"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => /icon/.test(file.type) || /\.ico$/i.test(file.name)}
    />
  );
}
