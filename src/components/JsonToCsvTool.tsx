"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";
import { jsonToCsvContent } from "@/src/data/tools/json-to-csv";

const PREVIEW_ROWS = 5;

type ParsedData = {
  columns: string[];
  rows: string[][];
  totalRows: number;
};

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey));
    } else if (Array.isArray(val)) {
      result[fullKey] = JSON.stringify(val);
    } else {
      result[fullKey] = val === null || val === undefined ? "" : String(val);
    }
  }
  return result;
}

function jsonToCsvString(jsonData: unknown): { columns: string[]; rows: string[][]; csv: string } {
  let items: Record<string, unknown>[];

  if (Array.isArray(jsonData)) {
    items = jsonData.filter((item) => item !== null && typeof item === "object") as Record<string, unknown>[];
  } else if (jsonData !== null && typeof jsonData === "object") {
    items = [jsonData as Record<string, unknown>];
  } else {
    throw new Error("UNSUPPORTED_FORMAT");
  }

  if (items.length === 0) throw new Error("EMPTY");

  // collect all keys
  const keySet = new Set<string>();
  const flattened = items.map((item) => {
    const flat = flattenObject(item);
    Object.keys(flat).forEach((k) => keySet.add(k));
    return flat;
  });

  const columns = Array.from(keySet);

  const escapeCsvCell = (val: string) => {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const rows = flattened.map((flat) => columns.map((col) => flat[col] ?? ""));

  const csvLines = [
    columns.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(",")),
  ];

  // UTF-8 BOM for Excel compatibility
  const csv = "﻿" + csvLines.join("\r\n");
  return { columns, rows, csv };
}

type Props = {
  locale: "ja" | "en";
};

export default function JsonToCsvTool({ locale }: Props) {
  const { page, ui } = jsonToCsvContent[locale];
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<ParsedData | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [csvBlob, setCsvBlob] = useState<Blob | null>(null);
  const [baseName, setBaseName] = useState("");

  const handleFileSelect = (selected: File | null) => {
    setFile(selected);
    setParsed(null);
    setCsvBlob(null);
    setStatus("");
    if (selected) setBaseName(getBaseName(selected.name));
  };

  const handleConvert = async () => {
    if (!file || isProcessing) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const text = await file.text();
      let jsonData: unknown;
      try {
        jsonData = JSON.parse(text);
      } catch {
        setStatus(ui.parseError);
        return;
      }

      const { columns, rows, csv } = jsonToCsvString(jsonData);

      if (rows.length === 0) {
        setStatus(ui.emptyFileError);
        return;
      }

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      setParsed({ columns, rows: rows.slice(0, PREVIEW_ROWS), totalRows: rows.length });
      setCsvBlob(blob);
      setStatus(ui.successMessage(baseName, rows.length));
    } catch (err) {
      const msg = getErrorMessage(err);
      if (msg === "EMPTY") {
        setStatus(ui.emptyFileError);
      } else if (msg === "UNSUPPORTED_FORMAT") {
        setStatus(ui.parseError);
      } else {
        setStatus(`${ui.unexpectedErrorPrefix}: ${msg}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!csvBlob) return;
    triggerBlobDownload(csvBlob, `${baseName}.csv`);
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
          accept=".json,application/json"
          emptyTitle={ui.emptyTitle}
          onFileSelect={handleFileSelect}
        />

        {file && (
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <div className="font-medium">{ui.selectedFileTitle}</div>
            <div className="text-gray-600">
              <span className="font-medium">{ui.fileNameLabel}:</span> {file.name}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{ui.fileSizeLabel}:</span> {formatFileSize(file.size)}
            </div>
            {parsed && (
              <>
                <div className="text-gray-600">
                  <span className="font-medium">{ui.rowCountLabel}:</span>{" "}
                  {parsed.totalRows.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">{ui.columnCountLabel}:</span>{" "}
                  {parsed.columns.length}
                </div>
              </>
            )}
          </div>
        )}

        {parsed && parsed.rows.length > 0 && (
          <div className="space-y-2">
            <div className="font-medium text-sm">{ui.previewTitle}</div>
            <p className="text-xs text-gray-500">{ui.previewNote(PREVIEW_ROWS)}</p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    {parsed.columns.map((col) => (
                      <th
                        key={col}
                        className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parsed.rows.map((row, i) => (
                    <tr key={i}>
                      {parsed.columns.map((_, colIdx) => (
                        <td
                          key={colIdx}
                          className="px-3 py-2 text-gray-600 whitespace-nowrap max-w-[200px] truncate"
                        >
                          {row[colIdx] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {status && <StatusMessage status={status} />}

        <div className="flex gap-3">
          {!csvBlob ? (
            <PrimaryButton
              onClick={handleConvert}
              disabled={!file || isProcessing}
            >
              {isProcessing ? ui.convertingButton : ui.convertButton}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleDownload}>
              {ui.downloadButton}
            </PrimaryButton>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
