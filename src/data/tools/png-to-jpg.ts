import type { JpgToPngContent, ToolLocale } from "./types";

export const pngToJpgContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "PNGをJPGに変換",
      description:
        "PNG画像をJPG形式に変換できる無料オンラインツールです。写真や共有用の画像を軽くしたいときに、ブラウザだけで手軽に使えます。",
      aboutTitle: "PNGをJPGに変換すると何が変わる？",
      aboutText:
        "PNGをJPGに変換すると、画像ファイルを軽くしやすくなります。ブログ掲載用、メール添付、CMS登録、チャット共有などで容量を抑えたいときに便利です。透明背景が不要で、軽さや扱いやすさを優先したいなら JPG が向いています。",
      contentSections: [
        {
          title: "PNGをJPGにしたい場面",
          paragraphs: [
            "Web掲載用の画像、商品写真、資料添付画像、メール送信用のファイルなどでは JPG のほうが扱いやすいことがあります。",
            "とくに、画像の軽さやアップロードしやすさを優先したい場面で使いやすい変換です。",
          ],
        },
        {
          title: "PNGのまま残したほうがよいケース",
          paragraphs: [
            "透明背景が必要な画像、ロゴ、アイコン、スクリーンショット、文字が多い画像では PNG のほうが向いていることがあります。",
            "見た目のシャープさよりも軽さを優先するかどうかで判断すると選びやすいです。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に確認したいポイント",
          items: [
            "JPG は透明背景に対応していません。",
            "文字や細い線が多い画像では、PNG より少しにじんで見えることがあります。",
            "元画像をあとで編集したい場合は、PNG も残しておくと安心です。",
            "さらに軽くしたい場合は、JPG 変換後に画像圧縮も組み合わせると効果的です。",
          ],
        },
      ],
      comparisonTitle: "PNGとJPGの比較",
      comparisonItems: [
        {
          label: "ファイルサイズ",
          value:
            "一般的に JPG のほうが軽く、共有やアップロードに向いています。",
        },
        {
          label: "画質の特徴",
          value:
            "PNG は文字や輪郭を保ちやすく、JPG は写真向きで軽量化しやすい形式です。",
        },
        {
          label: "透明背景",
          value: "PNG は対応、JPG は非対応です。",
        },
        {
          label: "おすすめ用途",
          value:
            "写真や軽い共有用画像なら JPG、ロゴやスクリーンショットなら PNG が向いています。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "「PNGをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PNGをJPGにすると軽くなりますか？",
          answer:
            "多くの場合は軽くなります。とくに写真系の画像ではサイズ差が出やすいです。",
        },
        {
          question: "透明背景はどうなりますか？",
          answer:
            "JPG は透明背景に対応していないため、背景色付きの画像になります。",
        },
        {
          question: "画質は変わりますか？",
          answer:
            "場合によっては変わります。文字や細い線が多い画像では、PNG より柔らかく見えることがあります。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedToolsTitle: "次に使いやすい関連ツール",
      relatedTools: [
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "PNG画像をドラッグ＆ドロップ、または選択",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "PNGをJPGに変換",
      convertingButton: "変換中...",
      convertingStatus: "JPGに変換中です...",
      invalidFileError: "エラー: PNGファイルを選択してください。",
      canvasInitError: "エラー: 画像処理の初期化に失敗しました。",
      convertError: "エラー: PNGからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName: string) =>
        `完了: ${fileName}.jpg をダウンロードしました。`,
    },
  },
  en: {
    page: {
      title: "PNG to JPG Converter",
      description:
        "Convert PNG images to JPG online for free. This is useful when you want smaller image files for upload, sharing, or web publishing.",
      aboutTitle: "What is a PNG to JPG converter?",
      aboutText:
        "PNG to JPG conversion is helpful when file size matters more than keeping every pixel exactly as-is. JPG is often easier to upload, send, or publish, especially for photos and general-purpose images. This tool runs in your browser, so you can convert files quickly without uploading them to an external server.",
      contentSections: [
        {
          title: "Common reasons to convert PNG to JPG",
          paragraphs: [
            "People often use PNG to JPG when preparing blog images, product photos, email attachments, CMS uploads, or image assets that need to stay lightweight.",
            "If the final destination is a website, marketplace listing, shared folder, or messaging app, JPG can be a more practical format than PNG.",
          ],
        },
        {
          title: "When PNG may still be the better choice",
          paragraphs: [
            "PNG is usually better for transparent graphics, logos, icons, line art, diagrams, and screenshots with a lot of text.",
            "Before converting, decide whether your priority is smaller size or sharper edges. That one decision usually tells you which format is better.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things that often surprise people",
          items: [
            "JPG does not support transparency, so transparent areas are replaced with a background color.",
            "Text-heavy images and graphics with sharp edges may look softer after conversion.",
            "If you need to edit the file repeatedly later, keep the original PNG as a master copy.",
            "For even smaller files, convert first and then try image compression as a second step.",
          ],
        },
      ],
      comparisonTitle: "PNG vs JPG",
      comparisonItems: [
        {
          label: "File size",
          value: "JPG is usually smaller and easier to upload or share.",
        },
        {
          label: "Image behavior",
          value:
            "PNG preserves crisp edges better, while JPG is better suited to photos and general lightweight delivery.",
        },
        {
          label: "Transparency",
          value: "PNG supports transparency. JPG does not.",
        },
        {
          label: "Best use",
          value:
            "Use JPG for photos and lightweight output. Use PNG for logos, screenshots, diagrams, and editing masters.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click the Convert PNG to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will PNG to JPG reduce file size?",
          answer:
            "In many cases, yes. JPG is often much smaller than PNG, especially for photos.",
        },
        {
          question: "What happens to transparency?",
          answer:
            "JPG does not support transparency, so transparent areas are replaced with a background color.",
        },
        {
          question: "Will image quality change?",
          answer:
            "It can. JPG uses lossy compression, so text and sharp edges may look softer than in the original PNG.",
        },
        {
          question: "Can I use this tool on mobile?",
          answer:
            "Yes. It works in modern mobile browsers as well as on desktop.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion happens in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools for the next step",
      relatedTools: [
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Upload a PNG image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert PNG to JPG",
      convertingButton: "Converting...",
      convertingStatus: "Converting to JPG...",
      invalidFileError: "Error: Please select a PNG image.",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert to JPG.",
      loadError: "Error: Failed to load the image.",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName: string) =>
        `Done: ${fileName}.jpg has been downloaded.`,
    },
  },
};
