import HeicToJpgTool from "@/src/components/HeicToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "heic-to-jpg",
  jaTitle: "HEICをJPGに変換【iPhone写真をすぐ使える】",
  jaDescription:
    "iPhoneのHEIC画像をJPGに変換できる無料オンラインツールです。Windowsで開きたい写真やアップロード用画像をブラウザだけで手早く変換できます。",
  enTitle: "HEIC to JPG Converter Free (iPhone Supported)",
  enDescription:
    "Convert HEIC images to JPG online for free. Works with iPhone photos, fast and secure.",
});

export default function Page() {
  return <HeicToJpgTool locale="ja" />;
}
