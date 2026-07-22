import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "s3-inventory-viewer",
  jaTitle: "S3 Inventoryビューアー・CSV/Excel変換",
  jaDescription: "S3 Inventoryのmanifest.jsonとCSV.GZ・Parquetを読み込み、オブジェクト一覧を表示・結合してCSV/Excelへ変換します。",
  enTitle: "S3 Inventory Viewer & CSV/Excel Converter",
  enDescription: "Open S3 Inventory manifest.json with CSV.GZ or Parquet files, inspect object rows, and export merged CSV or Excel.",
});

export default function Page() {
  return <AwsDataConverterTool kind="s3-inventory" locale="en" />;
}
