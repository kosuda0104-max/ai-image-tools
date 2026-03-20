import BmpToJpgTool from "@/src/components/BmpToJpgTool";

export const metadata = {
  title: "BMP to JPG Converter Free Online",
  description:
    "Convert BMP to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
  alternates: {
    languages: {
      en: "/en/tools/bmp-to-jpg",
      ja: "/tools/bmp-to-jpg",
    },
  },
};

export default function Page() {
  return <BmpToJpgTool locale="en" />;
}
