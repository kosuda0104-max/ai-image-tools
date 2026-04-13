import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "webp-compress",
  jaTitle: "WebP圧縮【無料・高速】",
  jaDescription:
    "WebP画像の容量をブラウザ上でさらに軽くできる無料オンラインツールです。",
  enTitle: "WebP Compressor Free Online",
  enDescription:
    "Compress WebP images online for free. Make files lighter directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="en" format="webp" />;
}
