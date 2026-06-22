import RemoveExifTool from "@/src/components/RemoveExifTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "remove-exif",
  jaTitle: "画像のEXIF・位置情報削除ツール【無料・ブラウザ完結】",
  jaDescription:
    "写真のEXIF・GPS位置情報をブラウザ上で削除できる無料ツールです。アップロード不要・安全。JPEGは画質を落とさずメタデータだけを除去します。",
  enTitle: "Remove EXIF & GPS Metadata from Images Free Online",
  enDescription:
    "Remove EXIF and GPS location data from photos online for free. No upload required, runs in your browser, and JPEG files are cleaned losslessly.",
});

export default function Page() {
  return <RemoveExifTool locale="ja" />;
}
