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
  const title = isJa ? "HEIC\u3092PNG\u306b\u5909\u63db" : "HEIC to PNG Converter";
  const description = isJa
    ? "HEIC\u753b\u50cf\u3092PNG\u5f62\u5f0f\u3078\u5909\u63db\u3067\u304d\u308b\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3\u30c4\u30fc\u30eb\u3067\u3059\u3002"
    : "Convert HEIC images to PNG online for free.";

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      type: image.type || (isJa ? "\u4e0d\u660e" : "Unknown"),
      size: formatFileSize(image.size),
    };
  }, [image, isJa]);

  const handleConvert = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(isJa ? "\u5909\u63db\u4e2d\u3067\u3059..." : "Converting...");

      const heic2any = (await import("heic2any")).default;
      const converted = await heic2any({ blob: image, toType: "image/png" });
      const blob = Array.isArray(converted) ? converted[0] : converted;

      if (!(blob instanceof Blob)) {
        setStatus(isJa ? "\u5909\u63db\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002" : "Conversion failed.");
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
          ? `${baseName}.png \u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3057\u305f\u3002`
          : `${baseName}.png has been downloaded.`
      );
    } catch (error) {
      console.error(error);
      setStatus(isJa ? "\u5909\u63db\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002" : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title={title}
      description={description}
      aboutTitle={isJa ? "\u3053\u306e\u30c4\u30fc\u30eb\u306b\u3064\u3044\u3066" : "About this tool"}
      aboutText={
        isJa
          ? "iPhone \u5199\u771f\u306e HEIC \u3092 PNG \u306b\u5909\u63db\u3057\u3066\u3001\u7de8\u96c6\u3057\u3084\u3059\u3044\u5f62\u5f0f\u3067\u6271\u3044\u305f\u3044\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002"
          : "Useful when you want to convert iPhone-friendly HEIC files into a more edit-friendly PNG export."
      }
      contentSections={[
        {
          title: isJa ? "\u4f7f\u3044\u3069\u3053\u308d" : "When HEIC to PNG helps",
          paragraphs: [
            isJa
              ? "\u753b\u8cea\u3092\u91cd\u8996\u3057\u305f\u3044\u3068\u304d\u3084\u3001\u518d\u7de8\u96c6\u3057\u3084\u3059\u3044\u5f62\u5f0f\u3078\u5909\u3048\u305f\u3044\u3068\u304d\u306b\u4fbf\u5229\u3067\u3059\u3002"
              : "A practical option when you want a reusable image export from a HEIC photo.",
          ],
        },
      ]}
      listSections={[
        {
          title: isJa ? "\u5909\u63db\u524d\u306e\u30dd\u30a4\u30f3\u30c8" : "Things to know",
          items: isJa
            ? [
                "PNG \u306f JPG \u3088\u308a\u5bb9\u91cf\u304c\u5927\u304d\u304f\u306a\u308a\u3084\u3059\u3044\u3067\u3059\u3002",
                "\u5171\u6709\u3057\u3084\u3059\u3055\u91cd\u8996\u306a\u3089 HEIC \u304b\u3089 JPG \u3082\u5019\u88dc\u3067\u3059\u3002",
              ]
            : [
                "PNG files can be larger than JPG exports.",
                "If compatibility matters more, HEIC to JPG may be the better choice.",
              ],
        },
      ]}
      stepsTitle={isJa ? "\u4f7f\u3044\u65b9" : "How to Use"}
      steps={
        isJa
          ? ["HEIC\u753b\u50cf\u3092\u9078\u629e\u3057\u307e\u3059", "\u5909\u63db\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u307e\u3059", "PNG\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059"]
          : ["Choose a HEIC image", "Click convert", "Download the PNG file"]
      }
      faqTitle="FAQ"
      faqs={[
        {
          question: isJa ? "\u753b\u50cf\u306f\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3055\u308c\u307e\u3059\u304b\uff1f" : "Are files uploaded?",
          answer: isJa ? "\u3044\u3044\u3048\u3002\u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u884c\u308f\u308c\u307e\u3059\u3002" : "No. Processing stays in your browser.",
        },
      ]}
      relatedTools={
        isJa
          ? [
              { name: "HEIC\u3092JPG\u306b\u5909\u63db", href: "/tools/heic-to-jpg" },
              { name: "\u753b\u50cf\u5727\u7e2e", href: "/tools/image-compress" },
            ]
          : [
              { name: "HEIC to JPG", href: "/en/tools/heic-to-jpg" },
              { name: "Image Compress", href: "/en/tools/image-compress" },
            ]
      }
      relatedToolsTitle={isJa ? "\u95a2\u9023\u30c4\u30fc\u30eb" : "Related Tools"}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept=".heic,image/heic"
          emptyTitle={isJa ? "HEIC\u753b\u50cf\u3092\u30c9\u30e9\u30c3\u30b0\uff06\u30c9\u30ed\u30c3\u30d7\u3001\u307e\u305f\u306f\u9078\u629e" : "Drag and drop a HEIC image here, or select a file"}
          onFileSelect={(file: File | null) => {
            setStatus("");
            if (!file) {
              setImage(null);
              return;
            }
            const isHeic = file.type === "image/heic" || /\.heic$/i.test(file.name);
            if (!isHeic) {
              setImage(null);
              setStatus(isJa ? "HEIC\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002" : "Please select a HEIC file.");
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
          {isProcessing ? (isJa ? "\u5909\u63db\u4e2d..." : "Converting...") : isJa ? "HEIC\u3092PNG\u306b\u5909\u63db" : "Convert HEIC to PNG"}
        </PrimaryButton>

        {status && <StatusMessage status={status} />}
      </div>
    </ToolPageLayout>
  );
}
