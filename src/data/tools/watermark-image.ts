import type { ResizeImageContent, ToolLocale } from "./types";

export const watermarkImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Watermark Image",
      description: "画像に透かし文字を追加できる無料ツールです。",
      aboutTitle: "Watermark Imageとは？",
      aboutText:
        "画像に文字の透かしを追加して保存できる無料ツールです。著作権表示やSNS投稿用の簡単なウォーターマークを入れたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "透かし文字を入力します",
        "Watermark Imageボタンを押します",
        "透かし入り画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな文字でも入れられますか？",
          answer:
            "はい。短い英数字や日本語テキストなど、一般的な文字列を透かしとして追加できます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Grayscale Image", href: "/tools/grayscale-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "透かし文字",
      heightLabel: "未使用",
      widthPlaceholder: "例: Sample",
      heightPlaceholder: "",

      keepAspectRatioLabel: "透かし文字を入力",
      keepAspectRatioHint:
        "入力した文字が画像の右下に半透明で追加されます。",

      resizeButton: "Watermark Image",
      resizingButton: "透かしを追加中...",
      resizingStatus: "透かしを追加中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",
      validationNoSize: "エラー: 透かし文字を入力してください",
      validationInvalidSize: "エラー: 透かし文字を入力してください",
      validationInvalidResultSize: "エラー: 透かし文字を入力してください",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 透かし追加に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ 透かし入り画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Watermark Image",
      description: "A free online tool to add text watermarks to images.",
      aboutTitle: "What is Watermark Image?",
      aboutText:
        "This free tool lets you add a text watermark to an image and save the result. It is useful for copyright notices or simple branding on shared images.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image.",
        "Enter watermark text.",
        "Click the Watermark Image button.",
        "Download the watermarked image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I use any text as a watermark?",
          answer:
            "Yes. You can add ordinary text such as short English words, numbers, or simple phrases as a watermark.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Grayscale Image", href: "/tools/grayscale-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Watermark text",
      heightLabel: "Unused",
      widthPlaceholder: "Example: Sample",
      heightPlaceholder: "",

      keepAspectRatioLabel: "Enter watermark text",
      keepAspectRatioHint:
        "The entered text will be added semi-transparently to the bottom-right of the image.",

      resizeButton: "Watermark Image",
      resizingButton: "Adding watermark...",
      resizingStatus: "Adding watermark...",

      invalidFileError: "Error: Please select an image file",
      validationNoSize: "Error: Please enter watermark text",
      validationInvalidSize: "Error: Please enter watermark text",
      validationInvalidResultSize: "Error: Please enter watermark text",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to add watermark",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the watermarked image",
    },
  },
};