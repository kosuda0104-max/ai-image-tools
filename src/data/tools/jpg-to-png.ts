import type { JpgToPngContent, ToolLocale } from "./types";

export const jpgToPngContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "JPGをPNGに変換",
      description:
        "JPG画像をPNG形式に変換できる無料オンラインツールです。ブラウザだけで安全に変換でき、編集用や資料用の画像づくりに役立ちます。",
      aboutTitle: "JPGをPNGに変換すると何が変わる？",
      aboutText:
        "JPGをPNGに変換すると、あとで編集や保存を繰り返す場面で画像を扱いやすくなります。写真そのものの失われた情報が戻るわけではありませんが、注釈追加、資料貼り付け、画面キャプチャ管理などの用途では PNG が便利なことがあります。",
      contentSections: [
        {
          title: "JPGをPNGにしたい場面",
          paragraphs: [
            "スクリーンショット風に扱いたい画像、資料に貼る参考画像、あとから文字や図形を重ねる画像などでは、PNG にしておくと扱いやすいことがあります。",
            "とくに、一度変換した画像をさらに編集したり、複数のツールをまたいで使ったりする場合に向いています。",
          ],
        },
        {
          title: "変換前に知っておきたいこと",
          paragraphs: [
            "JPG はもともと軽量な写真向け形式なので、PNG にするとファイルサイズが大きくなることがあります。",
            "一方で、今後の編集工程で画質の劣化を重ねたくない場合には PNG にしておく意味があります。",
          ],
        },
      ],
      listSections: [
        {
          title: "こんな使い方に向いています",
          items: [
            "資料やスライドに貼る画像を編集しやすい形にしたい",
            "図解や注釈を入れる前の下準備をしたい",
            "JPG のままでは扱いづらいワークフローに合わせたい",
            "変換後に画像圧縮やリサイズも続けて行いたい",
          ],
        },
      ],
      comparisonTitle: "JPGとPNGの違い",
      comparisonItems: [
        {
          label: "向いている画像",
          value:
            "JPG は写真向け、PNG は図版・スクリーンショット・編集前提の画像向けです。",
        },
        {
          label: "ファイルサイズ",
          value:
            "一般的に JPG のほうが軽く、PNG のほうが大きくなりやすいです。",
        },
        {
          label: "編集のしやすさ",
          value:
            "あとから加工や保存を繰り返すなら PNG のほうが扱いやすい場面があります。",
        },
        {
          label: "透明背景",
          value:
            "PNG は透明背景に対応しますが、JPG から変換しただけでは透明にはなりません。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "プレビューを確認します",
        "「JPGをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "JPGをPNGにすると画質は上がりますか？",
          answer:
            "いいえ。元の JPG で失われた情報が戻るわけではありません。ただし、その後の編集工程では扱いやすくなることがあります。",
        },
        {
          question: "透明背景のPNGになりますか？",
          answer:
            "なりません。透明背景が必要な場合は、別途背景削除などの処理が必要です。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホやタブレットでも利用できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedToolsTitle: "次に使いやすい関連ツール",
      relatedTools: [
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "JPG画像をドラッグ＆ドロップ、または選択",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "JPGをPNGに変換",
      convertingButton: "変換中...",
      convertingStatus: "変換中です...",
      invalidFileError: "エラー: JPGファイルを選択してください。",
      canvasInitError: "エラー: 画像処理の初期化に失敗しました。",
      convertError: "エラー: JPGからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName: string) =>
        `完了: ${fileName}.png をダウンロードしました。`,
    },
  },
  en: {
    page: {
      title: "JPG to PNG Converter",
      description:
        "Convert JPG images to PNG online for free. The conversion runs in your browser, so it is fast, private, and easy to use.",
      aboutTitle: "What is a JPG to PNG converter?",
      aboutText:
        "Converting JPG to PNG is useful when you want an image that is easier to keep stable during later editing and saving. It works well for screenshots, diagrams, document assets, and design handoff files. This tool processes everything locally in your browser, so your files are not uploaded to an external server.",
      contentSections: [
        {
          title: "When JPG to PNG makes sense",
          paragraphs: [
            "JPG is great for lightweight photos, but it uses lossy compression. PNG is better when you want to avoid extra loss after future edits, exports, or repeated saves.",
            "That makes JPG to PNG useful for screenshots, charts, UI captures, reference images in presentations, and any file you plan to edit again later.",
          ],
        },
        {
          title: "Who should use this tool",
          paragraphs: [
            "Designers, content editors, marketers, and office users often convert JPG to PNG before adding text, annotations, or layout changes.",
            "If your main goal is a smaller file for publishing, JPG or WebP may still be the better final format. PNG is more about editing stability and compatibility than file size.",
          ],
        },
      ],
      listSections: [
        {
          title: "Important things to know before converting",
          items: [
            "Converting to PNG does not recover detail already lost in the original JPG.",
            "JPG files do not contain transparency, so the conversion will not create a transparent background automatically.",
            "Photos often become larger as PNG files.",
            "A practical workflow is to edit in PNG, then export a lighter format such as JPG or WebP when needed.",
          ],
        },
      ],
      comparisonTitle: "JPG vs PNG",
      comparisonItems: [
        {
          label: "Compression",
          value:
            "JPG uses lossy compression, while PNG uses lossless compression. JPG is usually smaller, while PNG is better for preserving changes over time.",
        },
        {
          label: "Best for",
          value:
            "JPG is usually best for photos. PNG is usually better for screenshots, text-heavy graphics, diagrams, and logos.",
        },
        {
          label: "Transparency",
          value:
            "PNG supports transparency, but converting a JPG will not magically create transparent areas because the source file does not contain that data.",
        },
        {
          label: "File size",
          value:
            "PNG files are often larger than JPG files, especially for photos and complex images.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a JPG image",
        "Check the preview",
        "Click the Convert JPG to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is the difference between JPG and PNG?",
          answer:
            "JPG is usually better for photos and smaller file sizes, while PNG is better for preserving image detail during editing and saving.",
        },
        {
          question: "Will converting JPG to PNG improve image quality?",
          answer:
            "No. It will not restore quality already lost in the JPG, but it can help prevent additional loss in later editing steps.",
        },
        {
          question: "Can I create a transparent PNG from JPG?",
          answer:
            "Not by conversion alone. You would need a separate background removal step.",
        },
        {
          question: "Can I use this tool on mobile?",
          answer:
            "Yes. You can use it on phones and tablets in a modern browser without installing anything.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion happens in your browser, so your file is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools people often use next",
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a JPG image here, or select a file",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert JPG to PNG",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a JPG file.",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert JPG to PNG.",
      loadError: "Error: Failed to load image.",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName: string) =>
        `Done: ${fileName}.png has been downloaded.`,
    },
  },
};
