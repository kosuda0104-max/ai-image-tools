"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

type Locale = "ja" | "en";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type Props = {
  locale: Locale;
};

const content: Record<
  Locale,
  {
    page: {
      title: string;
      description: string;
      aboutTitle: string;
      aboutText: string;
      stepsTitle: string;
      steps: string[];
      faqTitle: string;
      faqs: FAQItem[];
      relatedTools: RelatedToolItem[];
    };
    ui: {
      emptyTitle: string;
      emptyDescription: string;
      selectButtonLabel: string;
      button: string;
      loading: string;
      done: string;
      invalidFile: string;
      error: string;
    };
  }
> = {
  ja: {
    page: {
      title: "PNGをICOに変換",
      description: "PNG画像をICO形式に変換できる無料オンラインツールです。",
      aboutTitle: "PNGをICOに変換とは？",
      aboutText:
        "PNG画像をICO形式に変換できる無料オンラインツールです。faviconやアプリアイコン用のICOファイルを作りたいときに便利です。ブラウザ上で処理されます。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "ICOファイルをダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "favicon用にも使えますか？",
          answer: "はい。PNG画像からICOファイルを作成できるため、favicon用途にも使えます。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで変換できます。"
        },
        {
          question: "画像はアップロードされますか？",
          answer: "いいえ。変換はブラウザ内で行われます。"
        }
      ],
      relatedTools: [
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" }
      ]
    },
    ui: {
      emptyTitle: "PNG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "PNGをICOに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "PNGファイルを選択してください。",
      error: "変換に失敗しました。"
    }
  },
  en: {
    page: {
      title: "PNG to ICO Converter",
      description: "Convert PNG images to ICO format online for free.",
      aboutTitle: "What is PNG to ICO Converter?",
      aboutText:
        "This free online tool converts PNG images into ICO format directly in your browser. It is useful when you want to create favicon or icon files from PNG images.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click convert",
        "Download the ICO file"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I use it for favicons?",
          answer: "Yes. You can create ICO files from PNG images for favicon use."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser."
        },
        {
          question: "Are my images uploaded?",
          answer: "No. Files are processed locally in your browser."
        }
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" }
      ]
    },
    ui: {
      emptyTitle: "Upload PNG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert PNG to ICO",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a PNG file.",
      error: "Conversion failed."
    }
  }
};

function createIcoBlobFromCanvas(canvas: HTMLCanvasElement): Blob {
  const pngDataUrl = canvas.toDataURL("image/png");
  const base64 = pngDataUrl.split(",")[1];
  const binary = atob(base64);
  const pngBytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    pngBytes[i] = binary.charCodeAt(i);
  }

  const headerSize = 6;
  const dirEntrySize = 16;
  const imageOffset = headerSize + dirEntrySize;
  const totalSize = imageOffset + pngBytes.length;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);

  bytes[6] = canvas.width >= 256 ? 0 : canvas.width;
  bytes[7] = canvas.height >= 256 ? 0 : canvas.height;
  bytes[8] = 0;
  bytes[9] = 0;
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, pngBytes.length, true);
  view.setUint32(18, imageOffset, true);

  bytes.set(pngBytes, imageOffset);

  return new Blob([buffer], { type: "image/x-icon" });
}

export default function PngToIcoTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const convert = () => {
    if (!file) return;

    const isPng =
      file.type === "image/png" || /\.png$/i.test(file.name);

    if (!isPng) {
      setStatus(ui.invalidFile);
      return;
    }

    setLoading(true);
    setStatus(ui.loading);

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setLoading(false);
        setStatus(ui.error);
        URL.revokeObjectURL(imageUrl);
        return;
      }

      ctx.clearRect(0, 0, size, size);

      const scale = Math.min(size / img.width, size / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (size - drawWidth) / 2;
      const y = (size - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      const icoBlob = createIcoBlobFromCanvas(canvas);
      const downloadUrl = URL.createObjectURL(icoBlob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = file.name.replace(/\.png$/i, "") + ".ico";
      a.click();

      URL.revokeObjectURL(downloadUrl);
      URL.revokeObjectURL(imageUrl);

      setLoading(false);
      setStatus(ui.done);
    };

    img.onerror = () => {
      setLoading(false);
      setStatus(ui.error);
      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;
  };

  return (
    <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
    >
      <FileDropzone
        file={file}
        accept="image/png,.png"
        emptyTitle={ui.emptyTitle}
        emptyDescription={ui.emptyDescription}
        selectButtonLabel={ui.selectButtonLabel}
        onFileSelect={(selected) => {
          setStatus("");
          setFile(selected);
        }}
      />

      {preview && (
        <div className="space-y-2">
          <img src={preview} alt={page.title} className="max-h-80 rounded border object-contain" />
        </div>
      )}

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
  );
}