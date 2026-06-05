"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "ICOをJPGに変換",
      description: "ICO画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "ICOをJPGに変換とは？",
      aboutText:
        "ICO画像をJPG形式に変換できる無料オンラインツールです。faviconやアイコンファイルを、一般的なJPG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "ICO画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "faviconファイルも変換できますか？",
          answer: "はい。ICO形式のfaviconやアイコンファイルをJPG画像に変換できます。",
        },
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでICOをJPGに変換できます。",
        },
      ],
      relatedTools: [
        { name: "ICOをPNGに変換", href: "/tools/ico-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "ICO画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "ICOをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "ICOファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "ICO to JPG Converter",
      description: "Convert ICO images to JPG format online.",
      aboutTitle: "What is ICO to JPG Converter?",
      aboutText:
        "This tool lets you convert ICO files into JPG images directly in your browser. It is useful when you want to save favicon and icon files as standard JPG images.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an ICO image",
        "Check the preview",
        "Click convert",
        "Download JPG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert favicon files?",
          answer: "Yes. You can convert ICO favicon and icon files into JPG images.",
        },
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser.",
        },
      ],
      relatedTools: [
        { name: "ICO to PNG", href: "/en/tools/ico-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload ICO image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert ICO to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an ICO file.",
      error: "Conversion failed.",
    },
  },
};

export default function IcoToJpgTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/x-icon,image/vnd.microsoft.icon,.ico"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) => /icon/.test(file.type) || /\.ico$/i.test(file.name)}
    />
  );
}
