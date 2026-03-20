import BmpToJpgTool from "@/src/components/BmpToJpgTool";

export const metadata = {
  title: "BMPをJPGに変換【無料・高速・安全】オンラインツール",
  description:
    "BMP画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  alternates: {
    languages: {
      ja: "/tools/bmp-to-jpg",
      en: "/en/tools/bmp-to-jpg",
    },
  },
};

export default function Page() {
  return <BmpToJpgTool locale="ja" />;
}
