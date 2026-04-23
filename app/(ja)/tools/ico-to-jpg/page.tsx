import IcoToJpgTool from "@/src/components/IcoToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "ico-to-jpg",
  jaTitle: "ICOをJPGに変換【無料】",
  jaDescription: "ICO画像をJPG形式に変換できます。",
  enTitle: "ICO to JPG Converter Free Online",
  enDescription: "Convert ICO to JPG online.",
});

export default function Page() {
  return <IcoToJpgTool locale="ja" />;
}
