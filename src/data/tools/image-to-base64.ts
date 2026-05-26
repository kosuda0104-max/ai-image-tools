import type { ToolLocale, ToolPageContent } from "./types";

type ImageToBase64UiText = {
  emptyTitle: string;
  fileNameLabel: string;
  fileSizeLabel: string;
  base64LengthLabel: string;
  convertButton: string;
  convertingButton: string;
  invalidFileError: string;
  unexpectedErrorPrefix: string;
  dataUrlLabel: string;
  base64OnlyLabel: string;
  copyDataUrlButton: string;
  copyBase64Button: string;
  copiedLabel: string;
  previewTitle: string;
};

export type ImageToBase64Content = {
  page: ToolPageContent;
  ui: ImageToBase64UiText;
};

export const imageToBase64Content: Record<ToolLocale, ImageToBase64Content> = {
  ja: {
    page: {
      title: "画像を Base64 に変換",
      description:
        "画像ファイルをブラウザ上で Base64 文字列に変換できる無料オンラインツールです。アップロード不要・安全。HTML や CSS にインライン画像として埋め込みたいときに使えます。",
      aboutTitle: "Base64 変換はどんなときに使う？",
      aboutText:
        "Base64 は画像データをテキスト文字列として表現する形式です。HTML の <img src='data:image/png;base64,...'> や CSS の background-image で画像ファイルなしに画像を埋め込めます。メール送信での添付画像、Web フォントの埋め込み、JSON や XML の中に画像データを含めたいときなどに使われます。",
      contentSections: [
        {
          title: "Data URL と Base64 の違い",
          paragraphs: [
            "Data URL は「data:image/png;base64,（Base64文字列）」の形式で、そのまま HTML や CSS の src 属性に貼り付けられます。Base64 のみ表記は生の文字列で、API 送信や独自フォーマットへの組み込みに使います。",
            "ブラウザで直接画像として使いたい場合は Data URL を、バックエンドの API や JSON に渡したい場合は Base64 のみを使うのが一般的です。",
          ],
        },
        {
          title: "注意点",
          paragraphs: [
            "Base64 はバイナリデータをテキストに変換するため、元のファイルサイズより約 33% 大きくなります。大きな画像をインライン埋め込みするとページの読み込みが遅くなるため、小さいアイコンやロゴなどに限定して使うのが適切です。",
          ],
        },
      ],
      listSections: [],
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします（JPG、PNG、WebP、GIF、SVG など）",
        "変換後の Data URL または Base64 文字列が表示されます",
        "必要な形式をコピーボタンでクリップボードにコピーします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "HTML でそのまま使うには？",
          answer:
            "<img src='（Data URL をここに貼り付け）'> の形で使えます。Data URL 欄のテキストをそのままコピーして src 属性に入れてください。",
        },
        {
          question: "CSS で背景画像として使うには？",
          answer:
            "background-image: url('（Data URL をここに貼り付け）') の形で使えます。",
        },
        {
          question: "データは安全ですか？",
          answer:
            "はい。変換はすべてブラウザ内で行われ、画像ファイルは外部サーバーへアップロードされません。",
        },
        {
          question: "どの画像形式に対応していますか？",
          answer:
            "JPG、PNG、WebP、GIF、SVG、AVIF など、ブラウザが対応しているすべての画像形式で動作します。",
        },
        {
          question: "ファイルサイズの制限はありますか？",
          answer:
            "ブラウザのメモリ制限に依存します。大きな画像は Base64 文字列も非常に長くなるため、実用的には 1MB 以下の画像での使用を推奨します。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "PNG を WebP に変換", href: "/tools/png-to-webp" },
        { name: "SVG を PNG に変換", href: "/tools/svg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "画像ファイルをドラッグ＆ドロップ、または選択",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "ファイルサイズ",
      base64LengthLabel: "Base64 文字数",
      convertButton: "Base64 に変換",
      convertingButton: "変換中...",
      invalidFileError: "エラー: 画像ファイルを選択してください。",
      unexpectedErrorPrefix: "エラー",
      dataUrlLabel: "Data URL（HTML / CSS に直接貼り付け可）",
      base64OnlyLabel: "Base64 のみ（API 送信などに）",
      copyDataUrlButton: "Data URL をコピー",
      copyBase64Button: "Base64 をコピー",
      copiedLabel: "コピーしました！",
      previewTitle: "プレビュー",
    },
  },
  en: {
    page: {
      title: "Image to Base64 Converter",
      description:
        "Convert image files to Base64 strings online for free. No upload required — runs entirely in your browser. Use the output to embed images inline in HTML, CSS, JSON, or APIs.",
      aboutTitle: "When do you need Base64 encoding?",
      aboutText:
        "Base64 represents binary image data as a text string. This lets you embed images directly in HTML using <img src='data:image/png;base64,...'>, in CSS as background-image values, inside JSON payloads, or in email templates. It is a common technique for icons, logos, and other small images where avoiding an extra HTTP request is worth the size trade-off.",
      contentSections: [
        {
          title: "Data URL vs Base64-only",
          paragraphs: [
            "A Data URL includes the full prefix: data:image/png;base64,... and can be pasted directly into an HTML src attribute or CSS url() value. The Base64-only string is the raw encoded text without the prefix, which is useful for API payloads, JSON fields, and custom systems that add the prefix themselves.",
            "Use the Data URL output when you are working with HTML or CSS directly. Use the Base64-only output when sending the image data through an API or embedding it in a structured format like JSON or XML.",
          ],
        },
        {
          title: "File size consideration",
          paragraphs: [
            "Base64 encoding increases file size by approximately 33% because it represents binary data using only ASCII characters. Embedding large images inline can slow down page load times, so this technique works best for small icons, logos, and decorative elements under 1 MB.",
          ],
        },
      ],
      listSections: [],
      stepsTitle: "How to use",
      steps: [
        "Upload an image file (JPG, PNG, WebP, GIF, SVG, etc.)",
        "The Data URL and Base64 string appear automatically",
        "Copy the format you need using the copy button",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "How do I use this in HTML?",
          answer:
            "Paste the Data URL directly into the src attribute: <img src=\"(paste Data URL here)\">.",
        },
        {
          question: "How do I use this in CSS?",
          answer:
            "Use it as a url() value: background-image: url('(paste Data URL here)').",
        },
        {
          question: "Is my image safe?",
          answer:
            "Yes. All processing runs locally in your browser. Your image is never uploaded to a server.",
        },
        {
          question: "Which image formats are supported?",
          answer:
            "JPG, PNG, WebP, GIF, SVG, AVIF, and any other format your browser can read.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "The limit depends on your browser's memory. For practical use, Base64 encoding works best for images under 1 MB, since larger images produce very long strings.",
        },
      ],
      relatedToolsTitle: "Related tools",
      relatedTools: [
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "SVG to PNG", href: "/en/tools/svg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drop an image file here, or click to select",
      fileNameLabel: "File name",
      fileSizeLabel: "File size",
      base64LengthLabel: "Base64 length",
      convertButton: "Convert to Base64",
      convertingButton: "Converting...",
      invalidFileError: "Error: Please select an image file.",
      unexpectedErrorPrefix: "Error",
      dataUrlLabel: "Data URL (paste directly into HTML or CSS)",
      base64OnlyLabel: "Base64 only (for API payloads and JSON)",
      copyDataUrlButton: "Copy Data URL",
      copyBase64Button: "Copy Base64",
      copiedLabel: "Copied!",
      previewTitle: "Preview",
    },
  },
};
