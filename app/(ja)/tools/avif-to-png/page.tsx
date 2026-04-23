import AvifToPngTool from "@/src/components/AvifToPngTool";

export const metadata = {
  title: "AVIFをPNGに変換【無料・高速・安全】オンラインツール",
  description:
    "AVIF画像をPNG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  alternates: {
    languages: {
      ja: "/tools/avif-to-png",
      en: "/en/tools/avif-to-png",
    },
  },
};

export default function Page() {
  return <AvifToPngTool locale="ja" />;
}
