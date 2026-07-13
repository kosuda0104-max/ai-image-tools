import CsvDelimiterConverterTool from "@/src/components/CsvDelimiterConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "csv-delimiter-converter",
  jaTitle: "CSV区切り文字変換｜セミコロン・タブをカンマへ",
  jaDescription: "CSV・TSVのカンマ、セミコロン、タブ、パイプ区切りを自動判定し、別の区切り形式へ変換できる無料ツールです。",
  enTitle: "CSV Delimiter Converter - Comma, Semicolon, Tab",
  enDescription: "Detect and convert comma, semicolon, tab, and pipe-delimited CSV or text files. Supports UTF-8, Shift-JIS, and UTF-16 input.",
});

export default function Page() {
  return <CsvDelimiterConverterTool locale="ja" />;
}
