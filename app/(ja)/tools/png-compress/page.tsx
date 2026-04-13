import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "png-compress",
  jaTitle: "PNG圧縮【透過を保ったまま調整】",
  jaDescription:
    "PNG画像の容量調整をブラウザ上で試せる無料オンラインツールです。ロゴや図版、透過付き画像を軽くしたいときに向いています。",
  enTitle: "PNG Compressor Free Online",
  enDescription:
    "Compress PNG images online for free. Try reducing file size directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="ja" format="png" />;
}
