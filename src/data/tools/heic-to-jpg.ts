import type { ResizeImageContent, ToolLocale } from "./types";

export const heicToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "HEIC を JPG に変換",
      description:
        "iPhone 写真でよく使われる HEIC 画像を、幅広い環境で扱いやすい JPG に変換できる無料オンラインツールです。ブラウザだけで手軽に使えます。",
      aboutTitle: "HEIC を JPG に変換すると便利な場面",
      aboutText:
        "HEIC は iPhone や Apple 系の環境では扱いやすい形式ですが、社内ツール、応募フォーム、EC 管理画面、古い Windows 環境などではそのまま使いにくいことがあります。JPG に変換しておくと、共有、アップロード、資料貼り付けがしやすくなり、相手の環境を選びにくくなります。",
      contentSections: [
        {
          title: "変換をおすすめしやすいケース",
          paragraphs: [
            "仕事で提出する写真、フォーム添付、クラウド共有、社内チャット、Web 入稿などでは、JPG のほうが相手先の環境でそのまま使えることが多くあります。HEIC のままだと表示できない、受け付けてもらえない、といったトラブルを避けやすくなります。",
            "とくに複数人でやり取りする案件では、自分の端末で開けるかどうかより、相手先でも確実に扱えるかが重要です。まず JPG にそろえることで、その後の圧縮やリサイズも進めやすくなります。",
          ],
        },
        {
          title: "HEIC のままでもよい場面",
          paragraphs: [
            "個人の写真保管や、Apple 製品同士で完結するやり取りでは、HEIC のままでも特に困らないことがあります。容量効率が良く、日常の写真管理には向いている形式です。",
            "ただし、後から別環境に渡す可能性があるなら、必要なタイミングで JPG を作れるようにしておくと安心です。保管用は HEIC、共有用は JPG と分ける運用も現実的です。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "JPG にすると互換性は上がりますが、HEIC 固有の効率のよさは引き継がれません。",
            "提出先やアップロード先の要件が JPG 指定なら、最初から JPG にしておくほうが手戻りを減らせます。",
            "さらに軽くしたい場合は、JPG 変換のあとに圧縮やリサイズを組み合わせると効果的です。",
            "元の HEIC を手元に残しておくと、あとで別形式へ出し分けたいときに便利です。",
          ],
        },
      ],
      comparisonTitle: "HEIC と JPG の違い",
      comparisonItems: [
        {
          label: "互換性",
          value:
            "JPG はほとんどのサービスや端末で扱いやすく、HEIC は環境によっては読み込みにくいことがあります。",
        },
        {
          label: "主な用途",
          value:
            "HEIC は iPhone 写真の保管向き、JPG は共有・提出・アップロード向きと考えると整理しやすいです。",
        },
        {
          label: "ファイルサイズ",
          value:
            "HEIC は効率が良いことがありますが、互換性を優先するなら JPG のほうが実務で扱いやすいことが多いです。",
        },
        {
          label: "おすすめの流れ",
          value:
            "保管は HEIC、共有や提出の直前だけ JPG に変換する運用にすると、扱いやすさと効率の両方を取りやすくなります。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "HEIC 画像を選択します",
        "プレビューと画像情報を確認します",
        "「HEIC を JPG に変換」ボタンを押します",
        "変換後の JPG 画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "HEIC とは何ですか？",
          answer:
            "HEIC は主に iPhone や Apple 製品で使われる画像形式です。比較的軽いサイズで写真を保存しやすいのが特徴です。",
        },
        {
          question: "なぜ JPG に変換するのですか？",
          answer:
            "JPG は対応アプリやサービスが広く、共有、アップロード、提出で使いやすいためです。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザがあればスマホやタブレットでも利用できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。変換処理はブラウザ内で行われるため、画像ファイルを外部サーバーへ送信せずに使えます。",
        },
      ],
      relatedToolsTitle: "次に使いやすい関連ツール",
      relatedTools: [
        { name: "JPG を PNG に変換", href: "/tools/jpg-to-png" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "PNG を JPG に変換", href: "/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "HEIC 画像をドラッグ＆ドロップ、または選択",
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
      resizeButton: "HEIC を JPG に変換",
      resizingButton: "JPG に変換中...",
      resizingStatus: "JPG に変換中...",
      invalidFileError: "エラー: HEIC 画像を選択してください。",
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
      title: "HEIC to JPG",
      description: "Convert HEIC images to JPG format online for free.",
      aboutTitle: "What is HEIC to JPG?",
      aboutText:
        "This free tool converts HEIC images into JPG format. It is useful when you want to convert iPhone HEIC photos into a more compatible JPG format.",
      stepsTitle: "How to use",
      steps: [
        "Upload a HEIC image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is HEIC?",
          answer:
            "HEIC is an image format commonly used on iPhones and other Apple devices, designed to keep good quality with smaller file sizes.",
        },
        {
          question: "Why convert HEIC to JPG?",
          answer:
            "JPG is widely supported by many apps and services, making it easier to share and edit.",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a HEIC image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select a HEIC image",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize conversion library",
      resizeError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! JPG image saved",
    },
  },
};
