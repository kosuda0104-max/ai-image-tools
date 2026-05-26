"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";
import { csvToJsonContent } from "@/src/data/tools/csv-to-json";

const PREVIEW_ROWS = 5;

type ParsedCsv = {
  columns: string[];
  rows: string[][];
  totalRows: number;
};

function parseCsv(text: string): { columns: string[]; data: string[][] } {
  const rows: string[][] = [];
  let i = 0;

  while (i < text.length) {
    const row: string[] = [];

    while (i < text.length && text[i] !== "\n" && text[i] !== "\r") {
      if (text[i] === '"') {
        let cell = "";
        i++;
        while (i < text.length) {
          if (text[i] === '"') {
            if (text[i + 1] === '"') {
              cell += '"';
              i += 2;
            } else {
              i++;
              break;
            }
          } else {
            cell += text[i++];
          }
        }
        row.push(cell);
        if (text[i] === ",") i++;
      } else {
        let cell = "";
        while (i < text.length && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
          cell += text[i++];
        }
        row.push(cell);
        if (text[i] === ",") i++;
      }
    }

    if (text[i] === "\r") i++;
    if (text[i] === "\n") i++;

    if (row.length > 0) rows.push(row);
  }

  if (rows.length === 0) return { columns: [], data: [] };
  const columns = rows[0];
  const data = rows.slice(1);
  return { columns, data };
}

type Props = {
  locale: "ja" | "en";
};

export default function CsvToJsonTool({ locale }: Props) {
  const { page, ui } = csvToJsonContent[locale];
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<ParsedCsv | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [jsonBlob, setJsonBlob] = useState<Blob | null>(null);
  const [baseName, setBaseName] = useState("");

  const handleFileSelect = (selected: File | null) => {
    setFile(selected);
    setParsed(null);
    setJsonBlob(null);
    setStatus("");
    if (selected) setBaseName(getBaseName(selected.name));
  };

  const handleConvert = async () => {
    if (!file || isProcessing) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const text = await file.text();
      const { columns, data } = parseCsv(text);

      if (data.length === 0) {
        setStatus(ui.emptyFileError);
        return;
      }

      const jsonArray = data.map((row) => {
        const obj: Record<string, string> = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx] ?? "";
        });
        return obj;
      });

      const jsonString = JSON.stringify(jsonArray, null, 2);
      const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });

      setParsed({ columns, rows: data.slice(0, PREVIEW_ROWS), totalRows: data.length });
      setJsonBlob(blob);
      setStatus(ui.successMessage(baseName, data.length));
    } catch (err) {
      const msg = getErrorMessage(err);
      setStatus(`${ui.unexpectedErrorPrefix}: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!jsonBlob) return;
    triggerBlobDownload(jsonBlob, `${baseName}.json`);
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
          accept=".csv,text/csv"
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
          {!jsonBlob ? (
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
