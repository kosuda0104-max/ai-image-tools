import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "All 67 Free Online Tools – Image, PDF & Data",
  description:
    "Browse 67 free browser-based tools for images, PDFs, CSV, Parquet, and AWS data exports without installing anything.",
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
