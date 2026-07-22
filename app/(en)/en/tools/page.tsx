import ToolsPage from "@/src/components/ToolsPage";
import { TOOL_COUNT } from "@/src/data/tool-directory";

export const metadata = {
  title: `All ${TOOL_COUNT} Free Online Tools – Image, PDF & Data`,
  description:
    `Browse ${TOOL_COUNT} free browser-based tools for images, PDFs, CSV, Parquet, and AWS data exports without installing anything.`,
  alternates: {
    canonical: "/en/tools",
    languages: {
      en: "/en/tools",
      ja: "/tools",
      "zh-TW": "/zh-tw/tools",
      "x-default": "/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="en" />;
}
