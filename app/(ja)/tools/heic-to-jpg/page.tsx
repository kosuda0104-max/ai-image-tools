import HeicToJpgTool from "@/src/components/HeicToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "heic-to-jpg",
  jaTitle: "HEICをJPGに変換【iPhone対応・無料】",
  jaDescription:
    "iPhoneのHEIC画像をJPGに変換できる無料オンラインツール。アップロード不要・高速・安全。",
  enTitle: "HEIC to JPG Converter Free (iPhone Supported)",
  enDescription:
    "Convert HEIC images to JPG online for free. Works with iPhone photos, fast and secure.",
});

export default function Page() {
  return <HeicToJpgTool locale="ja" />;
}
