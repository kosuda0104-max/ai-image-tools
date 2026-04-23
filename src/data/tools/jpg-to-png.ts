import type { JpgToPngContent, ToolLocale } from "./types";

export const jpgToPngContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "JPGをPNGに変換",
      description:
        "JPG画像をPNG形式に変換できる無料オンラインツールです。アップロード不要で、ブラウザだけで手軽に変換できます。",
      aboutTitle: "JPGをPNGに変換するとどんなときに便利？",
      aboutText:
        "JPGをPNGに変換すると、あとから文字を載せたり、画像を再編集したりする場面で扱いやすくなります。特にスクリーンショット、資料用の画像、UIキャプチャ、簡単な図版などを扱うときに向いています。",
      contentSections: [
        {
          title: "JPGからPNGへ変換したくなる代表例",
          paragraphs: [
            "スクリーンショットを資料に貼る前に整えたいとき、画像に追記や装飾を入れる前に扱いやすい形にしたいとき、JPGのまま保存を繰り返すのが不安なときに向いています。",
            "ただし、PNGに変えたからといって、もとのJPGで失われた画質が戻るわけではありません。目的は「これ以上の劣化を抑えながら扱う」ことにあります。",
          ],
        },
        {
          title: "JPGとPNGをどう使い分けるか",
          paragraphs: [
            "JPGは写真を軽く保存するのに向いており、PNGは文字や線の多い画像、スクリーンショット、図版を扱うときに向いています。",
            "公開用の最終ファイルを軽くしたいなら JPG や WebP が向いていますが、編集の途中では PNG で持っておくと安心なことが多いです。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "JPG から PNG への変換で透過背景が自動で作られることはありません。",
            "もとの JPG で失われた細部が回復するわけではありません。",
            "写真は PNG にするとファイルサイズが大きくなりやすいです。",
            "再編集後に公開するなら、最後に JPG や WebP へ出し直すとバランスを取りやすいです。",
          ],
        },
      ],
      comparisonTitle: "JPGとPNGの比較",
      comparisonItems: [
        {
          label: "ファイルサイズ",
          value:
            "一般的に JPG のほうが軽く、PNG のほうが大きくなりやすいです。",
        },
        {
          label: "向いている画像",
          value:
            "JPG は写真、PNG はスクリーンショット、図版、文字が多い画像に向いています。",
        },
        {
          label: "編集のしやすさ",
          value:
            "後から文字や線を載せたり、何度か保存しながら作業したいときは PNG のほうが扱いやすいです。",
        },
        {
          label: "透過対応",
          value:
            "PNG は透過に対応しますが、JPG から変換しただけでは透過は付きません。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "プレビューと画像情報を確認します",
        "「JPGをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "JPGをPNGにすると画質は上がりますか？",
          answer:
            "上がりません。ただし、これ以上の劣化を抑えながら後続の編集をしやすくする効果は期待できます。",
        },
        {
          question: "透過PNGになりますか？",
          answer:
            "なりません。JPG には透過情報がないため、変換だけでは透過は付きません。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザがあればスマホやタブレットでも使えます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。処理はブラウザ内で行われるため、画像ファイルは外部サーバーへアップロードされません。",
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
        {
          title: "What often comes after conversion",
          paragraphs: [
            "After converting, many people continue with markup, layout adjustments, documentation work, or another export into a final delivery format. The value of JPG to PNG is often in making those later steps easier and more predictable.",
            "If the final destination still needs a lightweight file, it is common to edit in PNG first and export a smaller web-friendly format at the end.",
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
