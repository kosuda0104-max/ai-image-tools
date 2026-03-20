"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
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
      title: "SVGをJPGに変換",
      description: "SVG画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "SVGをJPGに変換とは？",
      aboutText:
        "SVG画像をJPG形式に変換できる無料オンラインツールです。ベクター画像を一般的なJPG画像として保存したいときに便利です。ブラウザ上で処理するため、アップロード不要で安全に使えます。",
      stepsTitle: "使い方",
      steps: [
        "SVG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "SVGの見た目はそのままですか？",
          answer: "多くの場合はそのままJPGに変換できますが、複雑なSVGでは差が出ることがあります。"
        },
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。"
        },
        {
          question: "アップロードなしで変換できますか？",
          answer: "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。"
        }
      ],
      relatedTools: [
        { name: "SVGをPNGに変換", href: "/tools/svg-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "SVG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "SVGをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "SVGファイルを選択してください。"
    }
  },
  en: {
    page: {
      title: "SVG to JPG Converter",
      description: "Convert SVG images to JPG format online.",
      aboutTitle: "What is SVG to JPG Converter?",
      aboutText:
        "This tool lets you convert SVG images into JPG format directly in your browser. It is useful when you want to save vector images as standard JPG files.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an SVG image",
        "Check the preview",
        "Click convert",
        "Download JPG"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will the SVG look the same?",
          answer: "In many cases yes, but very complex SVG files may render slightly differently."
        },
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background."
        },
        {
          question: "Can I convert without uploading?",
          answer: "Yes. This tool works entirely in your browser."
        }
      ],
      relatedTools: [
        { name: "SVG to PNG", href: "/en/tools/svg-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "Upload SVG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert SVG to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an SVG file."
    }
  }
};

export default function SvgToJpgTool({ locale }: Props) {
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

    const isSvg =
      file.type === "image/svg+xml" || /\.svg$/i.test(file.name);

    if (!isSvg) {
      setStatus(ui.invalidFile);
      return;
    }

    setLoading(true);
    setStatus(ui.loading);

    const reader = new FileReader();

    reader.onload = () => {
      const svgText = reader.result;
      if (typeof svgText !== "string") {
        setLoading(false);
        setStatus("Error");
        return;
      }

      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width || 1000;
        canvas.height = img.height || 1000;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setLoading(false);
          setStatus("Error");
          URL.revokeObjectURL(url);
          return;
        }

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((jpgBlob) => {
          if (!jpgBlob) {
            setLoading(false);
            setStatus("Error");
            URL.revokeObjectURL(url);
            return;
          }

          const a = document.createElement("a");
          const downloadUrl = URL.createObjectURL(jpgBlob);

          a.href = downloadUrl;
          a.download = file.name.replace(/\.svg$/i, "") + ".jpg";
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

      img.src = url;
    };

    reader.onerror = () => {
      setLoading(false);
      setStatus("Error");
    };

    reader.readAsText(file);
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
        accept="image/svg+xml,.svg"
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
          <img src={preview} className="max-h-80 rounded border object-contain" />
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


