import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "All Tools - AI Image Tools",
  description:
    "Browse free online image conversion, image editing, and PDF tools by category.",
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