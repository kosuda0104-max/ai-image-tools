import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "All 61 Free Online Tools – Image, PDF & Data",
  description:
    "Browse 61 free browser-based tools for image background removal, AVIF, TIFF, PDF, CSV, JSONL, and Parquet workflows without installing anything.",
  alternates: {
    canonical: "/en/tools",
    languages: {
      en: "/en/tools",
      ja: "/tools",
      "x-default": "/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="en" />;
}
