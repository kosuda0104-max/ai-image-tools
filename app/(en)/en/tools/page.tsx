import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "All 55 Free Online Tools – Image, PDF & Data Conversion",
  description:
    "Browse 55 free browser-based tools for JPG, PNG, WebP, HEIC, PDF, and data conversion. Compress, resize, crop, merge, split, and convert images, PDFs, CSV, JSON, and Parquet without installing anything.",
  alternates: {
    languages: {
      en: "/en/tools",
      ja: "/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="en" />;
}
