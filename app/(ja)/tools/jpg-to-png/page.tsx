"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;

    return {
      name: image.name,
      type: image.type || "不明",
      size: formatFileSize(image.size),
    };
  }, [image]);

  const handleConvert = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus("PNGに変換中...");

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setStatus("エラー: canvasの初期化に失敗しました");
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus("エラー: PNGへの変換に失敗しました");
              setIsProcessing(false);
              URL.revokeObjectURL(objectUrl);
              return;
            }

            const downloadUrl = URL.createObjectURL(blob);
            const baseName = image.name.replace(/\.(jpg|jpeg)$/i, "");
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${baseName}.png`;
            link.click();

            setStatus(`完了！ ${baseName}.png を保存しました`);
            setIsProcessing(false);

            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(objectUrl);
          },
          "image/png"
        );
      };

      img.onerror = () => {
        setStatus("エラー: 画像の読み込みに失敗しました");
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (e: any) {
      console.error(e);
      setStatus(`エラー: ${e?.message ?? String(e)}`);
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="JPG to PNG"
      description="JPG画像をPNG形式に変換できる無料ツールです。"
      aboutTitle="JPG to PNGとは？"
      aboutText="JPG画像をPNG形式へ変換できる無料ツールです。PNGは劣化しにくく、画像編集や再保存にも向いています。"
      steps={[
        "JPG画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ]}
      faqs={[
        {
          question: "JPGとPNGの違いは？",
          answer:
            "JPGは写真向きで軽量化しやすく、PNGは劣化しにくく文字や図の保存にも向いています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ]}
      relatedTools={[
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ]}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept="image/jpeg,.jpg,.jpeg"
          emptyTitle="JPG画像をドラッグ＆ドロップ"
          onFileSelect={(file) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            const isJpg =
              file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name);

            if (!isJpg) {
              setImage(null);
              setStatus("エラー: JPG画像を選択してください");
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">選択中の画像</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">ファイル名:</span>{" "}
                {fileInfo.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">形式:</span>{" "}
                {fileInfo.type}
              </p>
              <p>
                <span className="font-medium text-gray-800">サイズ:</span>{" "}
                {fileInfo.size}
              </p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">プレビュー</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-80 rounded border object-contain"
            />
          </div>
        )}

        <PrimaryButton
          onClick={handleConvert}
          disabled={!image || isProcessing}
        >
          {isProcessing ? "PNGに変換中..." : "Convert to PNG"}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}