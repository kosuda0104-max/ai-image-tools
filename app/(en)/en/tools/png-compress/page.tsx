import SingleFormatCompressTool from "@/src/components/SingleFormatCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "png-compress",
  jaTitle: "PNG圧縮【無料・ブラウザ完結】",
  jaDescription:
    "PNG画像の容量調整をブラウザ上で試せる無料オンラインツールです。",
  enTitle: "PNG Compressor Free Online",
  enDescription:
    "Compress PNG images online for free. Try reducing file size directly in your browser.",
});

export default function Page() {
  return <SingleFormatCompressTool locale="en" format="png" />;
}
