import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "ツール一覧 – JPG・PNG・WebP・HEIC・PDF 変換ツール 45種類",
  description:
    "JPG・PNG・WebP・HEIC・PDF・CSV など45種類以上の変換・圧縮・編集ツールを提供。登録不要・ブラウザだけで完結・ファイルはサーバーに送信されません。",
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
