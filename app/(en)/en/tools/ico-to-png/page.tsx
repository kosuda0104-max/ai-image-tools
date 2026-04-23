import IcoToPngTool from "@/src/components/IcoToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "ico-to-png",
  jaTitle: "ICOをPNGに変換【無料】",
  jaDescription: "ICO画像をPNG形式に変換できます。",
  enTitle: "ICO to PNG Converter Free Online",
  enDescription: "Convert ICO to PNG online.",
});

export default function Page() {
  return <IcoToPngTool locale="en" />;
}
