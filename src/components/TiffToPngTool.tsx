"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";
import { tiffToPngFile } from "@/src/lib/tiff-decode";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "TIFFをPNGに変換",
      description:
        "TIFF（TIF）画像の先頭ページを、画質を保ちやすいPNGへ変換します。インストール不要で、ファイルはブラウザ内で処理されます。",
      aboutTitle: "TIFFをPNGに変換するのが向いている場面",
      aboutText:
        "TIFFはスキャナー、印刷、業務用画像で使われることが多い形式ですが、ブラウザやチャット、資料作成ソフトではそのまま表示できない場合があります。PNGにすると、文字や線をくっきり保ちながら一般的な環境で開きやすくなります。このツールはTIFFの先頭ページをPNGとして保存します。",
      contentSections: [
        {
          title: "写真より、スキャン・図面・文字入り画像に向く変換",
          paragraphs: [
            "PNGは可逆圧縮のため、文字、線画、図表、画面キャプチャの輪郭を保ちやすい形式です。スキャンした申請書や図面を資料へ貼る場合、写真向けのJPGよりPNGが扱いやすいことがあります。",
            "一方、写真中心のTIFFをメールで軽く送りたい場合は、PNGよりJPGのほうが小さくなることがあります。用途が閲覧・共有だけなら、TIFFをJPGに変換する方法とも比較してください。",
          ],
        },
        {
          title: "複数ページTIFFは先頭ページのみ変換",
          paragraphs: [
            "TIFFには1ファイル内に複数ページを持つものがあります。このページのPNG変換では先頭ページだけを出力します。全ページを残したい書類やFAX画像には、複数ページTIFFをPDFへ変換するツールが適しています。",
            "変換後はPNGを開き、必要なページか、文字や細い線が読めるかを確認してから共有してください。元のTIFFも消さずに残しておくと、別形式へやり直せます。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に確認すること",
          items: [
            "拡張子が.tifまたは.tiffであることを確認します。",
            "複数ページのファイルでは、先頭ページだけがPNGになります。",
            "透明情報や特殊な色設定は、変換後の見え方を確認してください。",
            "写真を小さく共有する目的なら、TIFFからJPGへの変換も比較します。",
          ],
        },
      ],
      comparisonTitle: "TIFF・PNG・JPGの使い分け",
      comparisonItems: [
        { label: "TIFF", value: "スキャン、印刷、保存用の高品質画像に使われますが、一般的なブラウザでは開きにくい場合があります。" },
        { label: "PNG", value: "文字や線を保ちやすく、資料への貼り付けやWeb表示に向いています。" },
        { label: "JPG", value: "写真を軽く共有したい場合に向きますが、保存時に圧縮による変化が生じます。" },
      ],
      stepsTitle: "使い方",
      steps: [
        "TIFF画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "PNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画質は落ちますか？",
          answer: "PNGは可逆圧縮のため、通常は変換時の圧縮で画質が失われません。ただし、TIFF固有の色空間や高いビット深度は一般的なPNG表示に合わせて変わる場合があります。",
        },
        {
          question: "複数ページのTIFFも変換できますか？",
          answer: "このツールがPNGにするのは先頭ページです。全ページを残す場合は、TIFFからPDFへの変換をご利用ください。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで使えます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "TIFFをJPGに変換", href: "/tools/tiff-to-jpg" },
        { name: "複数ページTIFFをPDFに変換", href: "/tools/tiff-to-pdf" },
        { name: "ガイド：TIFFとは？開けないときの対処法", href: "/guides/what-is-tiff" },
        { name: "BMPをPNGに変換", href: "/tools/bmp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "TIFF画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "TIFFをPNGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "TIFFファイルを選択してください。",
      error: "変換に失敗しました。TIFFファイルが破損していないかご確認ください。",
    },
  },
  en: {
    page: {
      title: "TIFF to PNG Converter",
      description:
        "Convert the first page of a TIFF or TIF image to PNG in your browser. No upload or software installation is required.",
      aboutTitle: "When converting TIFF to PNG makes sense",
      aboutText:
        "TIFF is common in scanning, print, and archival workflows, but many browsers, chat apps, and document tools cannot preview it directly. PNG is easier to open while preserving crisp text, lines, and diagrams. This tool saves the first TIFF page as a PNG.",
      contentSections: [
        {
          title: "Best for scans, diagrams, and text-heavy images",
          paragraphs: [
            "PNG uses lossless compression, which makes it a practical output for forms, diagrams, line art, and scanned pages that need crisp edges. It is also widely supported in browsers and office documents.",
            "For photo-heavy TIFF files where a smaller attachment matters more than lossless output, JPG may be the better choice. Compare the destination and file-size requirement before converting.",
          ],
        },
        {
          title: "Multi-page TIFF files use the first page",
          paragraphs: [
            "A TIFF file can contain several pages. This PNG converter outputs the first page only. Use the TIFF to PDF tool when every page in a scanned document or fax needs to stay together.",
            "Open the PNG after conversion and verify that it is the page you expected and that fine text remains readable. Keep the source TIFF so you can export a different format later.",
          ],
        },
      ],
      listSections: [
        {
          title: "Before you convert",
          items: [
            "Confirm the file uses the .tif or .tiff extension.",
            "For multi-page files, only the first page becomes PNG.",
            "Review special color profiles or high-bit-depth images after conversion.",
            "For smaller photo files, compare TIFF to JPG instead.",
          ],
        },
      ],
      comparisonTitle: "TIFF vs PNG vs JPG",
      comparisonItems: [
        { label: "TIFF", value: "Useful for high-quality scans, print, and archiving, but not universally previewed." },
        { label: "PNG", value: "Good for crisp text, diagrams, and broad browser or document compatibility." },
        { label: "JPG", value: "Often smaller for photographs, with lossy compression applied during export." },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a TIFF image",
        "Check the preview",
        "Click convert",
        "Download PNG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Does quality decrease?",
          answer: "PNG is lossless, so its compression does not normally discard image detail. TIFF-specific color spaces or high bit depth may still be normalized for standard PNG display.",
        },
        {
          question: "Can it convert every page in a multi-page TIFF?",
          answer: "This tool converts the first page. Use TIFF to PDF when you need to preserve every page.",
        },
        {
          question: "Do I need to install?",
          answer: "No, everything works in your browser.",
        },
        {
          question: "Can I convert without uploading?",
          answer: "Yes. This tool works entirely in your browser.",
        },
      ],
      relatedTools: [
        { name: "TIFF to JPG", href: "/en/tools/tiff-to-jpg" },
        { name: "Multi-page TIFF to PDF", href: "/en/tools/tiff-to-pdf" },
        { name: "Guide: What is TIFF?", href: "/en/guides/what-is-tiff" },
        { name: "BMP to PNG", href: "/en/tools/bmp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload TIFF image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert TIFF to PNG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a TIFF file.",
      error: "Conversion failed. Please check that the TIFF file is not corrupted.",
    },
  },
};

export default function TiffToPngTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/tiff,.tif,.tiff"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => file.type === "image/tiff" || /\.tiff?$/i.test(file.name)}
      preprocess={tiffToPngFile}
    />
  );
}
