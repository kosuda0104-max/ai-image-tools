import type { JpgToPngContent, ToolLocale } from "./types";

export const imageCompressContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "Image Compress",
      description: "画像ファイルを軽量化できる無料ツールです。",
      aboutTitle: "Image Compressとは？",
      aboutText:
        "画像をブラウザ内で再圧縮してファイルサイズを軽くできる無料ツールです。Web掲載用の画像を軽くしたい時や、アップロードしやすくしたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "圧縮率を調整します",
        "Compress Imageボタンを押します",
        "圧縮後の画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな画像でも軽くなりますか？",
          answer:
            "JPEGやWebPは軽くしやすいです。PNGは画像内容によってはあまりサイズが変わらないことがあります。",
        },
        {
          question: "画質は落ちますか？",
          answer:
            "JPEGやWebPでは圧縮率を上げるほど画質が下がる場合があります。用途に合わせて調整してください。",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "Compress Image",
      convertingButton: "画像を圧縮中...",
      convertingStatus: "画像を圧縮中...",
      invalidFileError: "エラー: JPG / PNG / WebP 画像を選択してください",
      canvasInitError: "エラー: canvasの初期化に失敗しました",
      convertError: "エラー: 画像の圧縮に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName) => `完了！ ${fileName}`,
    },
  },

  en: {
    page: {
      title: "Image Compress",
      description: "A free online tool to reduce image file size.",
      aboutTitle: "What is Image Compress?",
      aboutText:
        "This free tool recompresses images in your browser to reduce file size. It is useful when you want lighter images for web use or easier uploads.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image.",
        "Adjust the compression level.",
        "Click the Compress Image button.",
        "Download the compressed image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will every image become smaller?",
          answer:
            "JPEG and WebP are usually easier to compress. PNG files may not shrink much depending on the image content.",
        },
        {
          question: "Will image quality decrease?",
          answer:
            "With JPEG and WebP, higher compression can reduce image quality. Adjust it based on your needs.",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Compress Image",
      convertingButton: "Compressing image...",
      convertingStatus: "Compressing image...",
      invalidFileError: "Error: Please select a JPG / PNG / WebP image",
      canvasInitError: "Error: Failed to initialize canvas",
      convertError: "Error: Failed to compress the image",
      loadError: "Error: Failed to load the image",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName) => `Done! Saved ${fileName}`,
    },
  },
};