import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "webp-compress",
  jaTitle: "WebP圧縮【Web掲載向けにさらに軽く】",
  jaDescription:
    "WebP画像の容量をブラウザ上でさらに軽くできる無料オンラインツールです。記事画像やバナーの最終調整に使いやすいです。",
  enTitle: "WebP Compressor Free Online",
  enDescription:
    "Compress WebP images online for free. Make files lighter directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="ja" format="webp" />;
}
