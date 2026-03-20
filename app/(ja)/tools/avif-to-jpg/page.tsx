import AvifToJpgTool from "@/src/components/AvifToJpgTool";

export const metadata = {
  title: "AVIFをJPGに変換【無料・高速・安全】オンラインツール",
  description:
    "AVIF画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  alternates: {
    languages: {
      ja: "/tools/avif-to-jpg",
      en: "/en/tools/avif-to-jpg",
    },
  },
};

export default function Page() {
  return <AvifToJpgTool locale="ja" />;
}
