import type { ResizeImageContent, ToolLocale } from "./types";

export const webpToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "WebP を JPG に変換",
      description:
        "WebP 画像を JPG に変換できる無料オンラインツールです。互換性を重視したいときや、提出先が JPG 前提のときに使いやすい形式へ整えられます。",
      aboutTitle: "WebP を JPG に変換するメリット",
      aboutText:
        "WebP は Web 向けに軽く配信しやすい形式ですが、すべての業務ツールや提出先で扱いやすいとは限りません。JPG に変換しておくと、古い環境や一般的な画像ワークフローでも使いやすくなり、共有や貼り付けでの手戻りを減らしやすくなります。",
      contentSections: [
        {
          title: "変換が役立つ場面",
          paragraphs: [
            "CMS 入稿、資料貼り付け、クラウド共有、フォーム提出、社内ツールなどで WebP がそのまま扱いにくいときに役立ちます。相手先が JPG に慣れている環境では、先に変換しておくほうが説明や再提出の手間を減らせます。",
            "とくに Web 用に軽くした画像をあとで別用途へ流用するとき、WebP のままだと互換性で困ることがあります。JPG にそろえることで、その後の共有や圧縮も進めやすくなります。",
          ],
        },
        {
          title: "変換前に考えたいこと",
          paragraphs: [
            "WebP は軽さを重視した形式なので、最終公開が Web だけならそのまま使ったほうが合理的な場合があります。一方で、受け取り側の環境が不明な場合は JPG のほうが無難です。",
            "透明背景が必要な画像なら JPG は向きません。ロゴや透過素材では、PNG に変換したほうが扱いやすいケースもあります。",
          ],
        },
      ],
      listSections: [
        {
          title: "知っておきたい注意点",
          items: [
            "JPG は透明背景に対応していないため、透明部分がある画像では用途に注意が必要です。",
            "写真や一般画像の互換性重視なら JPG は扱いやすい形式です。",
            "さらに軽くしたい場合は、JPG 変換後に圧縮を組み合わせると調整しやすくなります。",
            "元の WebP を残しておくと、Web 向け公開と共有用の出し分けがしやすくなります。",
          ],
        },
      ],
      comparisonTitle: "WebP と JPG の違い",
      comparisonItems: [
        {
          label: "主な強み",
          value:
            "WebP は Web 向けの軽量配信、JPG は幅広い互換性と共有しやすさが強みです。",
        },
        {
          label: "向いている場面",
          value:
            "Web 公開専用なら WebP、提出や共有を含む混在ワークフローなら JPG が扱いやすいことがあります。",
        },
        {
          label: "透明対応",
          value:
            "WebP は透明を扱える場合がありますが、JPG は透明非対応です。",
        },
        {
          label: "おすすめの使い分け",
          value:
            "公開用は WebP、互換性重視の共有用は JPG のように分けると判断しやすくなります。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "WebP 画像を選択します",
        "プレビューと画像情報を確認します",
        "「WebP を JPG に変換」ボタンを押します",
        "変換後の JPG 画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebP を JPG にすると何が変わりますか？",
          answer:
            "主に互換性が上がります。多くのアプリやサービスで扱いやすくなる一方、透明情報は保持できません。",
        },
        {
          question: "画質は変わりますか？",
          answer:
            "画像の内容によっては見え方が少し変わることがあります。公開先や提出先で実際の見え方を確認するのがおすすめです。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。変換処理はブラウザ内で行われるため、画像ファイルを外部サーバーへ送らずに利用できます。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "WebP を PNG に変換", href: "/tools/webp-to-png" },
        { name: "JPG を WebP に変換", href: "/tools/jpg-to-webp" },
        { name: "PNG を WebP に変換", href: "/tools/png-to-webp" },
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
      resizeButton: "WebP を JPG に変換",
      resizingButton: "JPG に変換中...",
      resizingStatus: "JPG に変換中...",
      invalidFileError: "エラー: WebP 画像を選択してください。",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "エラー: 変換処理の初期化に失敗しました。",
      resizeError: "エラー: JPG への変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了: JPG 画像をダウンロードしました。",
    },
  },

  en: {
    page: {
      title: "WebP to JPG",
      description: "Convert WebP images to JPG format online for free.",
      aboutTitle: "What is WebP to JPG?",
      aboutText:
        "This free tool converts WebP images into JPG format. JPG is widely supported and easy to share across many devices and services.",
      stepsTitle: "How to use",
      steps: [
        "Upload a WebP image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens when I convert WebP to JPG?",
          answer:
            "JPG is widely compatible and easy to share, though some image quality may change slightly due to compression.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
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

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select a WebP image",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! JPG image saved",
    },
  },
};
