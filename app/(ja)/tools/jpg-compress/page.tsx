import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "jpg-compress",
  jaTitle: "JPG圧縮【写真を軽くする】",
  jaDescription:
    "JPG画像のファイルサイズをブラウザ上で軽くできる無料オンラインツールです。写真のアップロードやWeb掲載前の最適化に向いています。",
  enTitle: "JPG Compressor Free Online",
  enDescription:
    "Compress JPG images online for free. Reduce file size directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="ja" format="jpg" />;
}
