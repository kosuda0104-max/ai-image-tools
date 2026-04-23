import AvifToPngTool from "@/src/components/AvifToPngTool";

export const metadata = {
  title: "AVIF to PNG Converter Free Online",
  description:
    "Convert AVIF to PNG online for free. No upload required, fast, secure, and easy to use in your browser.",
  alternates: {
    languages: {
      en: "/en/tools/avif-to-png",
      ja: "/tools/avif-to-png",
    },
  },
};

export default function Page() {
  return <AvifToPngTool locale="en" />;
}
