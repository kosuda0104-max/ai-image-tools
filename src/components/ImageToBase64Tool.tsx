"use client";

import { useState, useRef } from "react";
import FileDropzone from "@/components/FileDropzone";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getErrorMessage } from "@/src/lib/image-conversion";
import { imageToBase64Content } from "@/src/data/tools/image-to-base64";

type Props = {
  locale: "ja" | "en";
};

export default function ImageToBase64Tool({ locale }: Props) {
  const { page, ui } = imageToBase64Content[locale];
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [base64Only, setBase64Only] = useState("");
  const [status, setStatus] = useState("");
  const [copiedKey, setCopiedKey] = useState<"dataUrl" | "base64" | null>(null);
  const dataUrlRef = useRef<HTMLTextAreaElement>(null);
  const base64Ref = useRef<HTMLTextAreaElement>(null);

  const handleFileSelect = (selected: File | null) => {
    setFile(selected);
    setDataUrl("");
    setBase64Only("");
    setStatus("");
    setCopiedKey(null);

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setDataUrl(result);
        const commaIndex = result.indexOf(",");
        setBase64Only(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
      };
      reader.onerror = () => setStatus(`${ui.unexpectedErrorPrefix}: FileReader failed`);
      reader.readAsDataURL(selected);
    } catch (err) {
      setStatus(`${ui.unexpectedErrorPrefix}: ${getErrorMessage(err)}`);
    }
  };

  const copyToClipboard = async (text: string, key: "dataUrl" | "base64") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback: select textarea
      const ref = key === "dataUrl" ? dataUrlRef : base64Ref;
      ref.current?.select();
    }
  };

  return (
    <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      contentSections={page.contentSections}
      listSections={page.listSections}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
      relatedToolsTitle={page.relatedToolsTitle}
    >
      <div className="space-y-4">
        <FileDropzone
          file={file}
          accept="image/*"
          emptyTitle={ui.emptyTitle}
          onFileSelect={handleFileSelect}
        />

        {status && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {status}
          </p>
        )}

        {file && dataUrl && (
          <div className="space-y-4">
            {/* File info */}
            <div className="rounded-xl border bg-gray-50 px-4 py-3 text-sm space-y-1">
              <div className="text-gray-600">
                <span className="font-medium">{ui.fileNameLabel}:</span> {file.name}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">{ui.fileSizeLabel}:</span> {formatFileSize(file.size)}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">{ui.base64LengthLabel}:</span>{" "}
                {base64Only.length.toLocaleString()} chars
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">{ui.previewTitle}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="preview"
                className="max-h-48 rounded-xl border object-contain"
              />
            </div>

            {/* Data URL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-gray-900">{ui.dataUrlLabel}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(dataUrl, "dataUrl")}
                  className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  {copiedKey === "dataUrl" ? ui.copiedLabel : ui.copyDataUrlButton}
                </button>
              </div>
              <textarea
                ref={dataUrlRef}
                readOnly
                value={dataUrl}
                rows={3}
                className="w-full rounded-xl border bg-gray-50 p-3 font-mono text-xs text-gray-700 focus:outline-none"
              />
            </div>

            {/* Base64 only */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-gray-900">{ui.base64OnlyLabel}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(base64Only, "base64")}
                  className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  {copiedKey === "base64" ? ui.copiedLabel : ui.copyBase64Button}
                </button>
              </div>
              <textarea
                ref={base64Ref}
                readOnly
                value={base64Only}
                rows={3}
                className="w-full rounded-xl border bg-gray-50 p-3 font-mono text-xs text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
