import RotatePdfTool from "@/src/components/RotatePdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "rotate-pdf",
  jaTitle: "PDF回転ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFの指定ページを回転して新しいPDFを作成できる無料オンラインツールです。右90度・左90度・180度回転に対応しています。",
  enTitle: "Rotate PDF Tool Free Online",
  enDescription:
    "Rotate selected PDF pages and create a new PDF online for free. Supports right 90°, left 90°, and 180° rotation.",
});

export default function Page() {
  return <RotatePdfTool locale="en" />;
}
