import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "ツール一覧 | AI Image Tools",
  description:
    "画像変換、画像圧縮、リサイズ、PDF 変換や結合まで、ブラウザだけで使える無料ツールをまとめた一覧ページです。用途別に探しやすく、関連作業も見つけやすい構成にしています。",
  alternates: {
    languages: {
      ja: "/tools",
      en: "/en/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="ja" />;
}
