"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PreviewImage from "@/components/PreviewImage";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FAQJsonLd from "@/components/FAQJsonLd";

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
    };
  }
> = {
  ja: {
    page: {
      title: "ICOをJPGに変換",
      description: "ICO画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "ICOをJPGに変換とは？",
      aboutText:
        "ICO画像をJPG形式に変換できる無料オンラインツールです。faviconやアイコンファイルを、一般的なJPG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "ICO画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "faviconファイルも変換できますか？",
          answer: "はい。ICO形式のfaviconやアイコンファイルをJPG画像に変換できます。"
        },
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでICOをJPGに変換できます。"
        }
      ],
      relatedTools: [
        { name: "ICOをPNGに変換", href: "/tools/ico-to-png" },
        { name: "PNGをICOに変換", href: "/tools/png-to-ico" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "ICO画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "ICOをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "ICOファイルを選択してください。"
    }
  },
  en: {
    page: {
      title: "ICO to JPG Converter",
      description: "Convert ICO images to JPG format online.",
      aboutTitle: "What is ICO to JPG Converter?",
      aboutText:
        "This tool lets you convert ICO files into JPG images directly in your browser. It is useful when you want to save favicon and icon files as standard JPG images.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an ICO image",
        "Check the preview",
        "Click convert",
        "Download JPG"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert favicon files?",
          answer: "Yes. You can convert ICO favicon and icon files into JPG images."
        },
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser."
        }
      ],
      relatedTools: [
        { name: "ICO to PNG", href: "/en/tools/ico-to-png" },
        { name: "PNG to ICO", href: "/en/tools/png-to-ico" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "Upload ICO image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert ICO to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an ICO file."
    }
  }
};

export default function IcoToJpgTool({ locale }: Props) {
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

    const isIco =
      file.type === "image/x-icon" ||
      file.type === "image/vnd.microsoft.icon" ||
      /\.ico$/i.test(file.name);

    if (!isIco) {
      setStatus(ui.invalidFile);
      return;
    }

    setLoading(true);
    setStatus(ui.loading);

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setLoading(false);
        setStatus("Error");
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          setLoading(false);
          setStatus("Error");
          return;
        }

        const a = document.createElement("a");
        const downloadUrl = URL.createObjectURL(blob);

        a.href = downloadUrl;
        a.download = file.name.replace(/\.ico$/i, "") + ".jpg";
        a.click();

        setLoading(false);
        setStatus(ui.done);

        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, "image/jpeg", 0.92);
    };

    img.onerror = () => {
      setLoading(false);
      setStatus("Error");
      URL.revokeObjectURL(url);
    };
  };

  return (
    <>
      <FAQJsonLd faqs={page.faqs} />
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
        accept="image/x-icon,image/vnd.microsoft.icon,.ico"
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
          <PreviewImage
            src={preview}
            alt={page.title}
            className="max-h-80 rounded border object-contain"
          />
        </div>
      )}

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
    </>
  );
}


