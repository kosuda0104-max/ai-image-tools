import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "textract-json-to-excel",
  jaTitle: "Amazon Textract JSONをExcel・CSVに変換",
  jaDescription: "TextractのBlockとRelationshipから表・フォーム・本文を復元し、複数シートのExcelまたはCSVへ変換します。",
  enTitle: "Amazon Textract JSON to Excel & CSV",
  enDescription: "Reconstruct tables, forms, and text from Amazon Textract Blocks and export them to multi-sheet Excel or CSV.",
});

export default function Page() {
  return <AwsDataConverterTool kind="textract" locale="en" />;
}
