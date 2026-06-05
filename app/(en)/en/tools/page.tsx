import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "All 45+ Free Online Tools – Image, PDF & Data Conversion",
  description:
    "Browse 45+ free browser-based tools for JPG, PNG, WebP, HEIC, PDF, and data conversion. Compress, resize, crop, merge, split, and convert images and PDFs without installing anything.",
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