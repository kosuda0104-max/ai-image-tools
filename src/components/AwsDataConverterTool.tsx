"use client";

import { useState } from "react";
import FilesDropzone from "@/components/FilesDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getAwsToolContent } from "@/src/data/aws-tool-content";
import {
  convertAwsFiles,
  type AwsConversionResult,
  type AwsOutputFormat,
  type AwsToolKind,
} from "@/src/lib/aws-converter";
import { getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";

type Locale = "ja" | "en";
const PREVIEW_ROWS = 10;
const PREVIEW_COLUMNS = 12;

export default function AwsDataConverterTool({
  kind,
  locale,
}: {
  kind: AwsToolKind;
  locale: Locale;
}) {
  const content = getAwsToolContent(kind, locale);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<AwsConversionResult | null>(null);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState<AwsOutputFormat>(
    content.ui.formats[0].format,
  );

  const handleFiles = (selected: File[]) => {
    setFiles(selected);
    setResult(null);
    setStatus("");
    setOutput(content.ui.formats[0].format);
  };

  const convert = async () => {
    if (files.length === 0 || processing) return;
    try {
      setProcessing(true);
      setStatus("");
      const next = await convertAwsFiles(kind, files);
      setResult(next);
      setStatus(content.ui.success(next.rowCount));
      if (!next.artifacts.some((artifact) => artifact.format === output)) {
        setOutput(next.artifacts[0].format);
      }
    } catch (error) {
      setResult(null);
      setStatus(`${content.ui.error}: ${getErrorMessage(error)}`);
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    const artifact = result?.artifacts.find((candidate) => candidate.format === output);
    if (artifact) triggerBlobDownload(artifact.blob, artifact.filename);
  };

  const visibleColumns = result?.table.columns.slice(0, PREVIEW_COLUMNS) ?? [];
  const omittedColumns = Math.max(
    0,
    (result?.table.columns.length ?? 0) - visibleColumns.length,
  );

  return (
    <ToolPageLayout
      slug={content.slug}
      toolCategory="data"
      title={content.title}
      description={content.description}
      aboutTitle={content.aboutTitle}
      aboutText={content.aboutText}
      contentSections={content.contentSections}
      listSections={content.listSections}
      comparisonTitle={content.comparisonTitle}
      comparisonItems={content.comparisonItems}
      stepsTitle={content.stepsTitle}
      steps={content.steps}
      faqTitle={content.faqTitle}
      faqs={content.faqs}
      relatedTools={content.relatedTools}
    >
      <div className="space-y-5">
        <FilesDropzone
          files={files}
          accept={content.accept}
          multiple={content.multiple}
          emptyTitle={content.ui.dropTitle}
          emptyDescription={content.ui.dropDescription}
          onFilesSelect={handleFiles}
        />

        {!result ? (
          <PrimaryButton onClick={convert} disabled={files.length === 0 || processing}>
            {processing ? content.ui.converting : content.ui.convert}
          </PrimaryButton>
        ) : null}

        {status ? <StatusMessage status={status} /> : null}

        {result ? (
          <div className="space-y-6">
            <dl className="grid border-y border-gray-200 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(result.stats).map(([key, value]) => (
                <div key={key} className="min-w-0 px-3 py-3 sm:border-r sm:last:border-r-0">
                  <dt className="text-xs text-gray-500">{content.ui.stats[key] ?? key}</dt>
                  <dd className="mt-1 truncate text-base font-semibold text-gray-900">
                    {typeof value === "number" ? value.toLocaleString() : value}
                  </dd>
                </div>
              ))}
            </dl>

            {visibleColumns.length > 0 ? (
              <section className="space-y-2" aria-labelledby="aws-preview-title">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 id="aws-preview-title" className="text-sm font-semibold text-gray-900">
                    {content.ui.preview}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {content.ui.previewNote}
                    {omittedColumns > 0
                      ? locale === "ja"
                        ? ` ほか${omittedColumns}列は保存ファイルに含まれます。`
                        : ` ${omittedColumns} more columns are included in the download.`
                      : ""}
                  </p>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full table-fixed text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        {visibleColumns.map((column) => (
                          <th
                            key={column}
                            className="w-44 truncate px-3 py-2 text-left font-medium text-gray-700"
                            title={column}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.table.rows.slice(0, PREVIEW_ROWS).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {visibleColumns.map((column, columnIndex) => (
                            <td
                              key={`${column}-${columnIndex}`}
                              className="max-w-44 truncate whitespace-nowrap px-3 py-2 text-gray-600"
                              title={String(row[columnIndex] ?? "")}
                            >
                              {String(row[columnIndex] ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <section className="space-y-3" aria-labelledby="aws-output-title">
              <h2 id="aws-output-title" className="text-sm font-semibold text-gray-900">
                {content.ui.outputTitle}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup">
                {content.ui.formats.map((format) => (
                  <label
                    key={format.format}
                    className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors ${
                      output === format.format
                        ? "border-teal-700 bg-teal-50 text-teal-800"
                        : "border-gray-300 bg-white text-gray-700 hover:border-teal-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="aws-output-format"
                      value={format.format}
                      checked={output === format.format}
                      onChange={() => setOutput(format.format)}
                      className="sr-only"
                    />
                    {format.label}
                  </label>
                ))}
              </div>
              <PrimaryButton onClick={download}>
                {content.ui.download} {content.ui.formats.find((format) => format.format === output)?.label}
              </PrimaryButton>
            </section>
          </div>
        ) : null}
      </div>
    </ToolPageLayout>
  );
}
