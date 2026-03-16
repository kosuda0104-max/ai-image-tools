"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FormSection from "@/components/FormSection";

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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            const baseName = image.name.replace(/\.bmp$/i, "");
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${baseName}.png`;
            link.click();

            setStatus(`完了！ ${baseName}.png を保存しました`);
            setIsProcessing(false);

            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
            }, 1000);

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
    } catch (e: unknown) {
      console.error(e);
      const message = e instanceof Error ? e.message : String(e);
      setStatus(`エラー: ${message}`);
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="BMP to PNG"
      description="BMP画像をPNG形式に変換できる無料ツールです。"
      aboutTitle="BMP to PNGとは？"
      aboutText="BMP画像をPNG形式へ変換できる無料ツールです。PNGは画質を保ちやすく、多くのアプリや端末で扱いやすい画像形式です。"
      steps={[
        "BMP画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ]}
      faqs={[
        {
          question: "BMPをPNGにすると何が良いですか？",
          answer:
            "PNGはBMPより扱いやすく、画質を保ちながら保存しやすい形式です。Webやデザイン用途でも広く使われています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ]}
    >
      <FormSection>
        <FileDropzone
          file={image}
          accept="image/bmp,.bmp"
          emptyTitle="BMP画像をドラッグ＆ドロップ"
          onFileSelect={(file) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            const isBmp =
              file.type === "image/bmp" ||
              file.type === "image/x-ms-bmp" ||
              /\.bmp$/i.test(file.name);

            if (!isBmp) {
              setImage(null);
              setStatus("エラー: BMP画像を選択してください");
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
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
      </FormSection>
    </ToolPageLayout>
  );
}