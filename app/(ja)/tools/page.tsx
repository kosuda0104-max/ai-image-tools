import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "ツール一覧 - AI Image Tools",
  description:
    "画像変換、画像加工、PDFツールをカテゴリ別に探せる一覧ページです。無料・登録不要でブラウザ上ですぐ使えます。",
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
