"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

async function heicToPngFile(file: File): Promise<File> {
  const heic2any = (await import("heic2any")).default;
  const out = await heic2any({ blob: file, toType: "image/png" });
  const blob = Array.isArray(out) ? out[0] : out;
  const name = file.name.replace(/\.(heic|heif)$/i, "") + ".png";
  return new File([blob], name, { type: "image/png" });
}

function isHeic(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.(heic|heif)$/i.test(file.name)
  );
}

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "HEICをJPGに変換",
      description:
        "HEIC画像をJPG形式に変換できる無料オンラインツールです。iPhone写真を共有しやすいJPGへ、ブラウザだけで安全に変換できます。",
      aboutTitle: "HEICをJPGに変換とは？",
      aboutText:
        "HEICをJPGに変換すると、iPhoneやApple製デバイスで撮影した写真を、より多くのアプリやサービスで扱いやすい形式にできます。メール添付、Webアップロード、資料作成、画像編集ソフトへの取り込みなど、互換性が必要な場面で特に便利です。",
      contentSections: [
        {
          title: "HEICをJPGに変換したい代表例",
          paragraphs: [
            "iPhone写真をWindowsで開きたいとき、Webフォームにアップロードしたいとき、取引先や同僚に送りたいとき、対応アプリが限られる環境で画像を使いたいときに役立ちます。",
            "HEICのまま保存効率を活かす使い方もありますが、共有先や提出先が幅広いほどJPGのほうがトラブルを避けやすいです。",
          ],
        },
        {
          title: "このツールが向いているユーザー",
          paragraphs: [
            "iPhoneユーザー、Web担当者、営業資料や報告書に画像を貼ることが多い人、画像提出のフォーマット指定がある人に向いています。",
            "とくに、HEICに対応していないCMSやチャットツール、社内システムを使っている場合に効果を感じやすいです。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "JPGは互換性が高い一方、HEICよりファイルサイズが大きくなることがあります。",
            "繰り返し編集する予定なら、元のHEICファイルも残しておくと安心です。",
            "写真をさらに軽くしたい場合は、JPG変換後に画像圧縮を使うと効果的です。",
            "Live Photos などの特殊情報は静止画として扱われる場合があります。",
          ],
        },
      ],
      comparisonTitle: "HEICとJPGの比較",
      comparisonItems: [
        {
          label: "互換性",
          value:
            "JPGは多くのアプリやサービスで標準的に使えます。HEICはApple系では扱いやすい一方、環境によっては対応差があります。",
        },
        {
          label: "ファイルサイズ",
          value:
            "HEICは高画質のまま軽く保存しやすい形式です。JPGは互換性重視で使われることが多いです。",
        },
        {
          label: "共有のしやすさ",
          value:
            "メール添付、Webアップロード、資料作成ではJPGのほうが無難な場面が多いです。",
        },
        {
          label: "おすすめ用途",
          value:
            "保存効率重視ならHEIC、提出や共有や一般利用ならJPGが向いています。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "HEIC画像をアップロードします",
        "画像情報を確認します",
        "「HEICをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "iPhoneの写真も変換できますか？",
          answer: "はい。HEIC形式のiPhone写真をJPGへ変換できます。",
        },
        {
          question: "なぜHEICをJPGに変換するのですか？",
          answer:
            "JPGのほうが対応アプリや共有先が多く、画像提出やアップロードで失敗しにくいためです。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでHEICをJPGに変換できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーにアップロードされません。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedToolsTitle: "一緒に使いやすい関連ツール",
      relatedTools: [
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "AVIFをJPGに変換", href: "/tools/avif-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "HEIC画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: HEICからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: HEICファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "HEICをJPGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "HEIC to JPG Converter",
      description:
        "Convert HEIC images to JPG online for free. This is especially useful for making iPhone photos easier to open, share, and upload.",
      aboutTitle: "What is HEIC to JPG Converter?",
      aboutText:
        "A HEIC to JPG converter helps you turn iPhone and Apple device photos into a format that works more reliably across apps, websites, office workflows, and upload forms. JPG is still one of the most widely accepted image formats, so converting can remove compatibility friction quickly.",
      contentSections: [
        {
          title: "When HEIC to JPG is most useful",
          paragraphs: [
            "Use it when you need to upload iPhone photos to a website, attach them to email, add them to documents, or share them with people using software that does not fully support HEIC.",
            "It is also useful when your client, form, CMS, or internal workflow explicitly asks for JPG files.",
          ],
        },
        {
          title: "Who benefits from this tool",
          paragraphs: [
            "This is especially useful for iPhone users, office teams, marketers, support staff, and anyone moving photos between Apple devices and mixed software environments.",
            "If compatibility matters more than storage efficiency, JPG is usually the safer delivery format.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know before converting",
          items: [
            "JPG may be larger than HEIC for the same photo.",
            "If you may need the original later, keep the HEIC file as your master copy.",
            "If you want smaller JPG files afterward, you can run image compression as a second step.",
            "Special photo behaviors such as Live Photo context are not preserved as rich media in a simple JPG export.",
          ],
        },
      ],
      comparisonTitle: "HEIC vs JPG",
      comparisonItems: [
        {
          label: "Compatibility",
          value:
            "JPG is accepted by far more apps, websites, and office tools. HEIC can be excellent but still hits compatibility gaps.",
        },
        {
          label: "Storage efficiency",
          value:
            "HEIC is often more efficient for storing high-quality photos. JPG is more about broad usability.",
        },
        {
          label: "Best use",
          value:
            "Keep HEIC when storage matters and your workflow supports it. Convert to JPG when sharing or submitting files widely.",
        },
        {
          label: "Typical workflow",
          value:
            "Many users keep original HEIC files for backup and create JPG copies only when needed for uploads or sharing.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a HEIC image",
        "Check the file details",
        "Click the Convert HEIC to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert iPhone photos?",
          answer: "Yes. This tool can convert HEIC photos from iPhone to JPG.",
        },
        {
          question: "Why convert HEIC to JPG?",
          answer:
            "JPG is easier to upload, share, and open in many apps and services, especially outside Apple-focused workflows.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert HEIC to JPG directly in your browser without installing any software.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files are not uploaded to any external server.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedToolsTitle: "Related tools people often use next",
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "AVIF to JPG", href: "/en/tools/avif-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a HEIC image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert HEIC to JPG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select a HEIC file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert HEIC to JPG",
      convertingButton: "Converting...",
    },
  },
};

export default function HeicToJpgTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept=".heic,.heif,image/heic,image/heif"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={isHeic}
      preprocess={heicToPngFile}
    />
  );
}
