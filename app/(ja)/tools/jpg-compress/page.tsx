import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "jpg-compress",
  jaTitle: "JPG圧縮【無料・高速】",
  jaDescription:
    "JPG画像の容量をブラウザ上で軽くできる無料オンラインツールです。",
  enTitle: "JPG Compressor Free Online",
  enDescription:
    "Compress JPG images online for free. Reduce file size directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="ja" format="jpg" />;
}
