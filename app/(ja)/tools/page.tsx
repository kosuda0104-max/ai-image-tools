import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "ツール一覧 – 画像・PDF・データ変換ツール 61種類",
  description:
    "画像背景透過、AVIF・TIFF・PDF変換、CSV・JSONL・Parquet処理など61種類の無料ツールを提供。登録不要・ブラウザだけで完結します。",
  alternates: {
    canonical: "/tools",
    languages: {
      ja: "/tools",
      en: "/en/tools",
      "x-default": "/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="ja" />;
}
