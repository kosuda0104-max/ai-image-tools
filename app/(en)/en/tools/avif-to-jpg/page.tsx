import AvifToJpgTool from "@/src/components/AvifToJpgTool";

export const metadata = {
  title: "AVIF to JPG Converter Free Online",
  description:
    "Convert AVIF to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
  alternates: {
    languages: {
      en: "/en/tools/avif-to-jpg",
      ja: "/tools/avif-to-jpg",
    },
  },
};

export default function Page() {
  return <AvifToJpgTool locale="en" />;
}
