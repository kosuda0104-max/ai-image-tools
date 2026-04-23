"use client";

import { useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function HeicToPngTool({ locale }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isJa = locale === "ja";
  const title = isJa ? "HEICをPNGに変換" : "HEIC to PNG Converter";
  const description = isJa
    ? "HEIC画像をPNG形式へ変換できる無料オンラインツールです。"
    : "Convert HEIC images to PNG online for free.";

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      type: image.type || (isJa ? "不明" : "Unknown"),
      size: formatFileSize(image.size),
    };
  }, [image, isJa]);

  const handleConvert = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(isJa ? "変換中です..." : "Converting...");

      const heic2any = (await import("heic2any")).default;
      const converted = await heic2any({ blob: image, toType: "image/png" });
      const blob = Array.isArray(converted) ? converted[0] : converted;

      if (!(blob instanceof Blob)) {
        setStatus(isJa ? "変換に失敗しました。" : "Conversion failed.");
        setIsProcessing(false);
        return;
      }

      const downloadUrl = URL.createObjectURL(blob);
      const baseName = image.name.replace(/\.heic$/i, "");
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${baseName}.png`;
      link.click();
      URL.revokeObjectURL(downloadUrl);

      setStatus(
        isJa
          ? `${baseName}.png をダウンロードしました。`
          : `${baseName}.png has been downloaded.`
      );
    } catch (error) {
      console.error(error);
      setStatus(isJa ? "変換に失敗しました。" : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title={title}
      description={description}
      aboutTitle={isJa ? "このツールについて" : "About this tool"}
      aboutText={
        isJa
          ? "iPhone 写真の HEIC を PNG に変換して、編集しやすい形式で扱いたいときに向いています。"
          : "Useful when you want to convert iPhone-friendly HEIC files into a more edit-friendly PNG export."
      }
      contentSections={[
        {
          title: isJa ? "使いどころ" : "When HEIC to PNG helps",
          paragraphs: [
            isJa
              ? "画質を重視したいときや、再編集しやすい形式へ変えたいときに便利です。"
              : "A practical option when you want a reusable image export from a HEIC photo.",
          ],
        },
      ]}
      listSections={[
        {
          title: isJa ? "変換前のポイント" : "Things to know",
          items: isJa
            ? [
                "PNG は JPG より容量が大きくなりやすいです。",
                "共有しやすさ重視なら HEIC から JPG も候補です。",
              ]
            : [
                "PNG files can be larger than JPG exports.",
                "If compatibility matters more, HEIC to JPG may be the better choice.",
              ],
        },
      ]}
      stepsTitle={isJa ? "使い方" : "How to Use"}
      steps={
        isJa
          ? ["HEIC画像を選択します", "変換ボタンを押します", "PNGをダウンロードします"]
          : ["Choose a HEIC image", "Click convert", "Download the PNG file"]
      }
      faqTitle="FAQ"
      faqs={[
        {
          question: isJa ? "画像はアップロードされますか？" : "Are files uploaded?",
          answer: isJa ? "いいえ。処理はブラウザ内で行われます。" : "No. Processing stays in your browser.",
        },
      ]}
      relatedTools={
        isJa
          ? [
              { name: "HEICをJPGに変換", href: "/tools/heic-to-jpg" },
              { name: "画像圧縮", href: "/tools/image-compress" },
            ]
          : [
              { name: "HEIC to JPG", href: "/en/tools/heic-to-jpg" },
              { name: "Image Compress", href: "/en/tools/image-compress" },
            ]
      }
      relatedToolsTitle={isJa ? "関連ツール" : "Related Tools"}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept=".heic,image/heic"
          emptyTitle={isJa ? "HEIC画像をドラッグ＆ドロップ、または選択" : "Drag and drop a HEIC image here, or select a file"}
          onFileSelect={(file: File | null) => {
            setStatus("");
            if (!file) {
              setImage(null);
              return;
            }
            const isHeic = file.type === "image/heic" || /\.heic$/i.test(file.name);
            if (!isHeic) {
              setImage(null);
              setStatus(isJa ? "HEICファイルを選択してください。" : "Please select a HEIC file.");
              return;
            }
            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-700">
              {fileInfo.name} / {fileInfo.type} / {fileInfo.size}
            </div>
          </div>
        )}

        <PrimaryButton onClick={handleConvert} disabled={!image || isProcessing}>
          {isProcessing ? (isJa ? "変換中..." : "Converting...") : isJa ? "HEICをPNGに変換" : "Convert HEIC to PNG"}
        </PrimaryButton>

        {status && <StatusMessage status={status} />}
      </div>
    </ToolPageLayout>
  );
}
