"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";
import { parquetToCsvContent } from "@/src/data/tools/parquet-to-csv";

const PREVIEW_ROWS = 5;

type ParsedData = {
  columns: string[];
  rows: Record<string, unknown>[];
  totalRows: number;
};

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rowsToCsv(columns: string[], rows: Record<string, unknown>[]): string {
  const header = columns.map(escapeCell).join(",");
  const body = rows.map((row) => columns.map((col) => escapeCell(row[col])).join(","));
  return [header, ...body].join("\n");
}

type Props = {
  locale: "ja" | "en";
};

export default function ParquetToCsvTool({ locale }: Props) {
  const { page, ui } = parquetToCsvContent[locale];
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

    if (!file.name.toLowerCase().endsWith(".parquet")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const arrayBuffer = await file.arrayBuffer();
      const asyncBuffer = {
        byteLength: arrayBuffer.byteLength,
        slice: (start: number, end?: number) =>
          Promise.resolve(arrayBuffer.slice(start, end)),
      };

      const { parquetReadObjects } = await import("hyparquet");
      const rows = (await parquetReadObjects({ file: asyncBuffer })) as Record<string, unknown>[];

      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      const csvText = rowsToCsv(columns, rows);
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

      setParsed({ columns, rows: rows.slice(0, PREVIEW_ROWS), totalRows: rows.length });
      setCsvBlob(blob);
      setStatus(ui.successMessage(baseName, rows.length));
    } catch (err) {
      const msg = getErrorMessage(err);
      setStatus(`${ui.unexpectedErrorPrefix}: ${msg}`);
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
          accept=".parquet"
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
                      {parsed.columns.map((col) => (
                        <td
                          key={col}
                          className="px-3 py-2 text-gray-600 whitespace-nowrap max-w-[200px] truncate"
                        >
                          {row[col] === null || row[col] === undefined
                            ? ""
                            : String(row[col])}
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
