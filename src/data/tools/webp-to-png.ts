import type { ResizeImageContent, ToolLocale } from "./types";

export const webpToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "WebP を PNG に変換",
      description:
        "WebP 画像を PNG に変換できる無料オンラインツールです。透過を扱いたいときや、再編集しやすい形式へ戻したいときに向いています。",
      aboutTitle: "WebP を PNG に変換したくなる場面",
      aboutText:
        "WebP は軽量配信向きの形式ですが、編集途中の素材としては PNG のほうが扱いやすいことがあります。透過画像を保持したいとき、スクリーンショットや図版を再編集したいとき、ロゴや素材として安定した形式に戻したいときに WebP から PNG への変換が役立ちます。",
      contentSections: [
        {
          title: "PNG に戻すメリット",
          paragraphs: [
            "PNG は文字や線の多い画像、ロゴ、スクリーンショット、図版などで扱いやすく、編集や再利用の前提を立てやすい形式です。公開時に WebP を使っていた画像を、作業用素材として持ち直したいときに便利です。",
            "また、透過を含む画像を別のツールで加工したい場合も、PNG のほうが扱いやすいケースがあります。WebP のままでは流れに乗らない作業を、PNG へ戻すことで進めやすくできます。",
          ],
        },
        {
          title: "変換前に考えたいこと",
          paragraphs: [
            "PNG は再編集向きですが、ファイルサイズは大きくなりやすいです。最終公開用として軽さを重視するなら、変換後にそのまま配るより、必要な作業が終わってから再度 WebP や JPG へ出し直すほうが合理的です。",
            "つまり WebP から PNG への変換は、最終配信用というより、編集や加工の途中段階で役立つことが多いツールと考えると分かりやすいです。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "PNG は透過や再編集に向いていますが、容量は大きくなりやすいです。",
            "公開用の軽さを優先するなら、編集完了後に再度 WebP へ出し直す流れが向いています。",
            "ロゴや図版、スクリーンショットでは PNG のほうが扱いやすいことがあります。",
            "元の WebP を残しておくと、作業用と公開用の出し分けがしやすくなります。",
          ],
        },
      ],
      comparisonTitle: "WebP と PNG の違い",
      comparisonItems: [
        {
          label: "主な役割",
          value:
            "WebP は軽量配信向き、PNG は編集・素材保管向きと考えると整理しやすいです。",
        },
        {
          label: "透過対応",
          value:
            "どちらも透過を扱えることがありますが、PNG のほうが再編集や加工フローで扱いやすいことが多いです。",
        },
        {
          label: "ファイルサイズ",
          value:
            "一般に PNG のほうが大きくなりやすく、WebP のほうが公開時は軽くまとまりやすいです。",
        },
        {
          label: "おすすめの使い分け",
          value:
            "作業途中や素材として持つなら PNG、公開や配信用は WebP と分けると判断しやすくなります。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "WebP 画像を選択します",
        "プレビューと画像情報を確認します",
        "「WebP を PNG に変換」ボタンを押します",
        "変換後の PNG 画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebP とは何ですか？",
          answer:
            "WebP は Google が開発した画像形式で、JPG や PNG より軽く配信しやすい場面が多いのが特徴です。",
        },
        {
          question: "PNG に変換するメリットは何ですか？",
          answer:
            "透過や再編集を含む作業で扱いやすくなり、スクリーンショットや図版を安定した形式で保持しやすくなります。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。変換処理はブラウザ内で行われるため、画像ファイルを外部サーバーへ送らずに利用できます。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "PNG を WebP に変換", href: "/tools/png-to-webp" },
        { name: "JPG を WebP に変換", href: "/tools/jpg-to-webp" },
        { name: "WebP を JPG に変換", href: "/tools/webp-to-jpg" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "WebP 画像をドラッグ＆ドロップ、または選択",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",
      resizeButton: "WebP を PNG に変換",
      resizingButton: "PNG に変換中...",
      resizingStatus: "PNG に変換中...",
      invalidFileError: "エラー: WebP 画像を選択してください。",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "エラー: 変換処理の初期化に失敗しました。",
      resizeError: "エラー: PNG への変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了: PNG 画像をダウンロードしました。",
    },
  },
  en: {
    page: {
      title: "WebP to PNG",
      description: "Convert WebP images to PNG format online for free.",
      aboutTitle: "What is WebP to PNG?",
      aboutText:
        "This free tool converts WebP images into PNG format. PNG is widely supported and suitable for editing and lossless image storage.",
      stepsTitle: "How to use",
      steps: [
        "Upload a WebP image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is WebP?",
          answer:
            "WebP is an image format developed by Google that often provides smaller file sizes compared to JPG and PNG.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a WebP image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      widthLabel: "Unused",
      heightLabel: "Unused",
      widthPlaceholder: "",
      heightPlaceholder: "",
      keepAspectRatioLabel: "Convert",
      keepAspectRatioHint: "",
      resizeButton: "Convert to PNG",
      resizingButton: "Converting to PNG...",
      resizingStatus: "Converting to PNG...",
      invalidFileError: "Error: Please select a WebP image",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to PNG",
      loadError: "Error: Failed to load the image",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! PNG image saved",
    },
  },
};
