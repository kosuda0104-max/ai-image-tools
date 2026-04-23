import type { JpgToPngContent, ToolLocale } from "./types";

export const pngToJpgContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "PNGをJPGに変換",
      description:
        "PNG画像をJPG形式に変換できる無料オンラインツールです。アップロード不要で、画像を軽くしたいときに向いています。",
      aboutTitle: "PNGをJPGに変換するとどんなときに便利？",
      aboutText:
        "PNGをJPGに変換すると、ファイルサイズを軽くしやすくなります。ブログ画像、EC商品画像、メール添付、CMS 入稿など、容量を抑えたい場面で使いやすい変換です。",
      contentSections: [
        {
          title: "PNGからJPGへ変換したい代表例",
          paragraphs: [
            "Web 掲載用の画像を軽くしたいとき、商品画像を複数枚アップしたいとき、メールやチャットで送りやすいファイルにしたいときに向いています。",
            "特に写真系の PNG は JPG にすると容量がかなり下がることがあるため、「まず軽くしたい」という場面でおすすめです。",
          ],
        },
        {
          title: "PNGのまま残したほうがよいケース",
          paragraphs: [
            "透過背景が必要な画像、ロゴ、アイコン、スクリーンショット、文字が多い画像では PNG のほうが向いていることがあります。",
            "「軽さを優先するか」「エッジのクリアさや透過を残すか」を先に決めると、JPG にするべきかどうかを判断しやすいです。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "JPG は透過に対応していないため、透過部分は背景色に置き換わります。",
            "細かい文字や線が多い画像では、PNG よりも柔らかく見えることがあります。",
            "後から再編集したい場合は、元の PNG を残しておくと安心です。",
            "さらに軽くしたい場合は、JPG 変換後に画像圧縮を組み合わせると効果的です。",
          ],
        },
      ],
      comparisonTitle: "PNGとJPGの比較",
      comparisonItems: [
        {
          label: "ファイルサイズ",
          value:
            "一般的に JPG のほうが軽く、アップロードや共有をしやすいです。",
        },
        {
          label: "向いている画像",
          value:
            "JPG は写真系の画像、PNG はロゴ、図版、文字が多い画像に向いています。",
        },
        {
          label: "透過",
          value:
            "PNG は透過に対応しますが、JPG は対応していません。",
        },
        {
          label: "おすすめ用途",
          value:
            "軽い画像を作りたいときは JPG、資料用の図版や透過が必要なときは PNG が向いています。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューと画像情報を確認します",
        "「PNGをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PNGをJPGにすると軽くなりますか？",
          answer:
            "多くの場合で軽くなります。特に写真系の画像では容量差が出やすいです。",
        },
        {
          question: "透過はどうなりますか？",
          answer:
            "JPG は透過に対応していないため、透過部分は背景色に変わります。",
        },
        {
          question: "画質は変わりますか？",
          answer:
            "変わることがあります。JPG は圧縮形式なので、文字や線の多い画像は PNG よりも柔らかく見えることがあります。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。変換処理はブラウザ内で行われるため、画像は外部サーバーへ送られません。",
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
      invalidFileError: "エラー: PNG画像を選択してください。",
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
        {
          title: "What usually happens next",
          paragraphs: [
            "After converting PNG to JPG, people often move straight into publishing, CMS uploads, marketplace listings, or lightweight sharing. JPG works well when the goal is delivery rather than further editing.",
            "If the file still feels too large after conversion, compression or resizing usually helps more than repeating the same conversion again.",
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
