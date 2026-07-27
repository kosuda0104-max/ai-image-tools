"use client";

import StandardImageConversionTool, {
  type StandardImageConversionContent,
} from "@/src/components/StandardImageConversionTool";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "BMPをPNGに変換",
      description:
        "容量が大きくなりやすいBMP画像を、画質を劣化させず扱いやすいPNGへ変換します。複数ファイルをブラウザ内で処理できます。",
      aboutTitle: "BMPをPNGに変換するメリット",
      aboutText:
        "BMPはWindowsで古くから使われてきた画像形式で、圧縮されていないファイルは容量が非常に大きくなることがあります。PNGは可逆圧縮を使うため、文字や線の見た目を保ちながら、ブラウザ、資料、画像編集ソフトで扱いやすいファイルへ変換できます。",
      contentSections: [
        {
          title: "画質を保ちながらBMPの容量を抑えたい場合に向く",
          paragraphs: [
            "BMPとPNGはどちらも画像の細部を保ちやすい形式ですが、PNGは同じ色が続く領域を効率よく圧縮します。そのため、図、アイコン、画面キャプチャ、文字入り画像では、見た目を変えずに容量を小さくできる場合があります。",
            "写真ではPNGにしても容量が十分に小さくならないことがあります。写真をメールやフォームへ送るのが目的なら、BMPをJPGへ変換する方法も比較してください。",
          ],
        },
        {
          title: "PNGにしても透明背景が自動で作られるわけではない",
          paragraphs: [
            "PNGは透明部分を保存できる形式ですが、元のBMPに透明情報がなければ、変換しただけで背景が透明になることはありません。背景を消したい場合は、変換後のPNGを背景透過ツールで別に処理します。",
            "古いBMPには色数や保存方法の違いがあるため、変換後は色、縦横サイズ、文字の輪郭を確認してください。元のBMPを残しておけば、JPGなど別形式への変換もやり直せます。",
          ],
        },
      ],
      listSections: [
        {
          title: "BMPからPNGへ変換する前のチェック",
          items: [
            "画質を保ちたい図や文字入り画像か、軽さを優先したい写真かを確認します。",
            "PNG変換だけでは背景は透明になりません。",
            "変換後の色と縦横サイズを元画像と比較します。",
            "写真で容量を下げたい場合はBMPからJPGへの変換も検討します。",
          ],
        },
      ],
      comparisonTitle: "BMP・PNG・JPGの違い",
      comparisonItems: [
        { label: "BMP", value: "単純な構造で古いWindows環境でも使われますが、容量が大きくなりやすい形式です。" },
        { label: "PNG", value: "可逆圧縮で文字や線を保ちやすく、ブラウザや資料で扱いやすい形式です。" },
        { label: "JPG", value: "写真を小さく共有しやすい一方、保存時に非可逆圧縮が行われます。" },
      ],
      stepsTitle: "使い方",
      steps: [
        "BMP画像をアップロードします",
        "プレビューを確認します",
        "「BMPをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "BMPをPNGにすると画質は落ちますか？",
          answer: "PNGは可逆圧縮のため、通常は圧縮による画質劣化を起こさず保存できます。変換後は古いBMP固有の色設定が正しく再現されているか確認してください。",
        },
        {
          question: "背景は透明になりますか？",
          answer: "元のBMPに透明情報がなければ、PNGへ変換するだけでは透明になりません。背景を消す処理が別に必要です。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでBMPをPNGに変換できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーにアップロードされません。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "BMPをJPGに変換", href: "/tools/bmp-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "画像の背景を透過", href: "/tools/image-background-transparent" },
        { name: "ガイド：画像形式の選び方", href: "/guides/image-format-basics" },
      ],
    },
    ui: {
      emptyTitle: "BMP画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: BMPからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: BMPファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "BMPをPNGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "BMP to PNG Converter",
      description:
        "Convert large BMP images to lossless, widely supported PNG files in your browser. Batch conversion is free and requires no upload.",
      aboutTitle: "Why convert BMP to PNG?",
      aboutText:
        "BMP is a long-standing Windows image format, and uncompressed BMP files can be very large. PNG uses lossless compression, preserving crisp text and lines while making the result easier to use in browsers, documents, and image editors.",
      contentSections: [
        {
          title: "Reduce BMP size without lossy compression",
          paragraphs: [
            "BMP and PNG can both preserve image detail, but PNG compresses repeated colors efficiently. Diagrams, icons, screenshots, and text-heavy images may become much smaller without a visible quality change.",
            "Photographs may still remain large as PNG. If the main goal is a small email attachment or upload, compare BMP to JPG instead.",
          ],
        },
        {
          title: "PNG support does not create transparency automatically",
          paragraphs: [
            "PNG can store transparent pixels, but conversion cannot invent transparency when the BMP has none. Use a separate background transparency tool if the visible background needs to be removed.",
            "Older BMP files vary in color depth and encoding. Review colors, dimensions, and fine edges after conversion, and keep the BMP for another export if needed.",
          ],
        },
      ],
      listSections: [
        {
          title: "BMP to PNG checklist",
          items: [
            "Decide whether the source is line art that needs lossless output or a photo that mainly needs a smaller file.",
            "Converting to PNG does not make the background transparent by itself.",
            "Compare colors and dimensions with the BMP after conversion.",
            "For photo compression, consider BMP to JPG as an alternative.",
          ],
        },
      ],
      comparisonTitle: "BMP vs PNG vs JPG",
      comparisonItems: [
        { label: "BMP", value: "Simple and compatible with older Windows workflows, but often very large." },
        { label: "PNG", value: "Lossless, broadly supported, and effective for text, diagrams, and repeated colors." },
        { label: "JPG", value: "Usually smaller for photos, with lossy compression during export." },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a BMP image",
        "Check the preview",
        "Click the Convert BMP to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will BMP to PNG reduce quality?",
          answer: "PNG uses lossless compression, so it normally preserves image detail. Review the result in case an older BMP uses an unusual color format.",
        },
        {
          question: "Will the background become transparent?",
          answer: "Not unless the source BMP already contains transparency. Removing a visible background requires a separate step.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert BMP to PNG directly in your browser without installing any software.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files are not uploaded to any external server.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "BMP to JPG", href: "/en/tools/bmp-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "Make Image Background Transparent", href: "/en/tools/image-background-transparent" },
        { name: "Guide: How to choose an image format", href: "/en/guides/image-format-basics" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a BMP image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert BMP to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select a BMP file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert BMP to PNG",
      convertingButton: "Converting...",
    },
  },
};

export default function BmpToPngTool({ locale }: Props) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/bmp,.bmp"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) =>
        file.type === "image/bmp" || /\.bmp$/i.test(file.name)
      }
    />
  );
}
