import type { JpgToPngContent, ToolLocale } from "./types";

export const imageCompressContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "画像圧縮",
      description:
        "JPG、PNG、WebP 画像のファイルサイズをブラウザ上で軽くできる無料ツールです。アップロード不要で、共有前や公開前の調整を手早く進められます。",
      aboutTitle: "画像圧縮ツールはどんなときに使う？",
      aboutText:
        "画像圧縮は、メール添付、フォーム提出、CMS 入稿、EC 商品画像、ブログ掲載などで容量を抑えたいときに役立ちます。特に『サイズ制限に引っかかった』『複数枚をまとめて送りたい』『表示を少しでも軽くしたい』といった場面で使いやすい作業です。",
      contentSections: [
        {
          title: "圧縮でできることと、できないこと",
          paragraphs: [
            "画像圧縮の目的は、見た目をできるだけ保ちながらファイルサイズを下げることです。軽くなることでアップロードしやすくなり、読み込みも速くなります。写真、ブログ用画像、商品画像のように容量が気になる場面では特に効果が分かりやすいです。",
            "ただし、圧縮で失われた画質をあとから戻すことはできません。また、すでに十分軽い画像や最適化済みの画像では、思ったほど小さくならないこともあります。まずは用途に合う形式かどうかを確認したうえで、圧縮を最後の調整として使うのが現実的です。",
          ],
        },
        {
          title: "形式ごとに見ておきたい違い",
          paragraphs: [
            "JPG や WebP は写真系の画像を軽くしやすく、圧縮の効果が出やすい形式です。一方で PNG は図版、ロゴ、スクリーンショット向きですが、画像の内容によってはサイズ変化が小さいことがあります。特に文字や透過を多く含む PNG は、無理に軽くしようとすると見た目とのバランスが難しくなります。",
            "そのため、写真なら JPG / WebP、スクリーンショットや編集用素材なら PNG のまま保持、公開前だけ必要に応じて軽量化するといった流れが使いやすいです。圧縮だけで解決しにくい場合は、リサイズや形式変換も組み合わせると結果が安定します。",
          ],
        },
      ],
      listSections: [
        {
          title: "圧縮前に知っておきたいポイント",
          items: [
            "すでに最適化された画像は、再圧縮してもあまり軽くならないことがあります。",
            "写真は圧縮効果が出やすい一方、文字や線が多い画像では見た目の変化に注意が必要です。",
            "PNG は画像内容によってはサイズ差が小さいため、形式変換やリサイズのほうが有効な場合があります。",
            "提出や公開前には、軽さだけでなく読みやすさや見た目もあわせて確認するのがおすすめです。",
          ],
        },
      ],
      comparisonTitle: "圧縮時に見比べたい項目",
      comparisonItems: [
        {
          label: "軽くなりやすさ",
          value:
            "写真系の JPG / WebP は効果が出やすく、PNG は画像内容によって差が小さいことがあります。",
        },
        {
          label: "画質への影響",
          value:
            "圧縮率を上げるほど容量は下がりやすいですが、細部の見え方や文字の読みやすさは落ちやすくなります。",
        },
        {
          label: "向いている用途",
          value:
            "メール添付、フォーム提出、Web 掲載前の調整、EC 商品画像の軽量化などで使いやすいです。",
        },
        {
          label: "組み合わせたい作業",
          value:
            "容量が大きすぎる場合は、形式変換やリサイズを先に行うと圧縮結果が安定しやすくなります。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "JPG、PNG、WebP の画像をアップロードします",
        "プレビューとファイル情報を確認します",
        "圧縮ボタンを押して処理を開始します",
        "圧縮後の画像を確認してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな画像でも必ず軽くなりますか？",
          answer:
            "必ずではありません。特にすでに軽い画像や最適化済みの画像では差が小さいことがあります。写真系の JPG / WebP は圧縮効果が出やすい傾向があります。",
        },
        {
          question: "圧縮すると画質は落ちますか？",
          answer:
            "落ちることがあります。見た目を保ちながら軽くするのが目的ですが、圧縮率が高いほど細部の見え方は変わりやすくなります。",
        },
        {
          question: "PNG があまり軽くならないのはなぜですか？",
          answer:
            "PNG は画像内容によって圧縮効果が出にくいことがあります。写真なら JPG / WebP への変換、サイズが大きすぎるならリサイズも検討すると改善しやすいです。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。処理はブラウザ内で行われるため、画像ファイルは外部サーバーへアップロードされません。",
        },
      ],
      relatedToolsTitle: "次に使いやすい関連ツール",
      relatedTools: [
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "JPG を PNG に変換", href: "/tools/jpg-to-png" },
        { name: "PNG を JPG に変換", href: "/tools/png-to-jpg" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "画像を圧縮",
      convertingButton: "画像を圧縮中...",
      convertingStatus: "画像を圧縮中...",
      invalidFileError: "エラー: JPG / PNG / WebP 画像を選択してください。",
      canvasInitError: "エラー: 画像処理の初期化に失敗しました。",
      convertError: "エラー: 画像の圧縮に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName: string) =>
        `完了: ${fileName} をダウンロードしました。`,
    },
  },

  en: {
    page: {
      title: "Image Compress",
      description:
        "Compress JPG, PNG, and WebP images online for free. This tool is useful when you want lighter files for uploads, sharing, publishing, or storage.",
      aboutTitle: "What is Image Compress?",
      aboutText:
        "Image compression helps reduce file size before upload, sharing, or publishing. It is especially useful for blog images, product photos, form attachments, and any workflow where file size limits matter.",
      contentSections: [
        {
          title: "What compression can and cannot do",
          paragraphs: [
            "Compression is mainly about reducing file size while keeping the image good enough for its real destination. Smaller files are easier to upload, send, and load on the web.",
            "Compression does not restore lost quality, and not every file will become dramatically smaller. Already optimized images sometimes show only minor changes, so it helps to think of compression as the final tuning step rather than a magic fix.",
          ],
        },
        {
          title: "Why format still matters",
          paragraphs: [
            "JPG and WebP often compress well for photos, while PNG behaves differently depending on the image content. Screenshots, diagrams, logos, and text-heavy graphics may not shrink much, or they may lose clarity if you push too hard.",
            "That is why a practical workflow often combines format choice, dimensions, and compression. If compression alone is not enough, resizing or converting to a more suitable format can help more than another compression pass.",
          ],
        },
        {
          title: "When compression is not the whole answer",
          paragraphs: [
            "If the main problem is that the image is physically too large, resizing may help more than stronger compression. This is common with smartphone photos and oversized upload images.",
            "For screenshots, diagrams, and design assets, the best result sometimes comes from changing the format first and compressing second. Thinking in terms of workflow, not just file size, usually gives better output.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things worth checking before compressing",
          items: [
            "Already optimized images may not get much smaller.",
            "Photos usually compress more easily than text-heavy graphics.",
            "PNG files sometimes benefit more from resizing or format conversion than from compression alone.",
            "Always compare file size with actual readability and visual quality for the final destination.",
          ],
        },
      ],
      comparisonTitle: "What to compare after compression",
      comparisonItems: [
        {
          label: "Reduction potential",
          value:
            "Photo-oriented JPG and WebP files often shrink more than PNG graphics and screenshots.",
        },
        {
          label: "Quality impact",
          value:
            "Stronger compression can reduce file size more, but it can also soften details and make text harder to read.",
        },
        {
          label: "Best use cases",
          value:
            "Useful for email attachments, form uploads, CMS publishing, blog images, and product image cleanup.",
        },
        {
          label: "Helpful companion steps",
          value:
            "If compression alone is not enough, resizing or converting the format can improve the overall result.",
        },
      ],
      stepsTitle: "How to use",
      steps: [
        "Upload a JPG, PNG, or WebP image",
        "Check the preview and file information",
        "Click the compress button to start processing",
        "Review and download the compressed image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will every image become smaller?",
          answer:
            "Not always. Already optimized files may only shrink a little, while photo-oriented JPG and WebP files often show clearer results.",
        },
        {
          question: "Will image quality decrease?",
          answer:
            "It can. Compression aims to balance quality and size, but stronger compression can make details and text look softer.",
        },
        {
          question: "Why does PNG sometimes stay large?",
          answer:
            "PNG behavior depends heavily on the image content. In some cases resizing or converting the file format works better than another compression pass.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. Processing happens in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools for the next step",
      relatedTools: [
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "Crop Image", href: "/tools/crop-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image, or select a file",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Compress Image",
      convertingButton: "Compressing image...",
      convertingStatus: "Compressing image...",
      invalidFileError: "Error: Please select a JPG / PNG / WebP image.",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to compress the image.",
      loadError: "Error: Failed to load the image.",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName: string) => `Done: ${fileName} has been downloaded.`,
    },
  },
};
