import ToolsPage from "@/src/components/ToolsPage";
import { TOOL_COUNT } from "@/src/data/tool-directory";

export const metadata = {
  title: `ツール一覧 – 画像・PDF・データ変換ツール ${TOOL_COUNT}種類`,
  description:
    `画像背景透過、AVIF・PDF変換、CSV・Parquet・AWSデータ処理など${TOOL_COUNT}種類の無料ツールを提供。登録不要・ブラウザだけで完結します。`,
  alternates: {
    canonical: "/tools",
    languages: {
      ja: "/tools",
      en: "/en/tools",
      "zh-TW": "/zh-tw/tools",
      "x-default": "/tools",
    },
  },
};

export default function Page() {
  return <ToolsPage locale="ja" />;
}
