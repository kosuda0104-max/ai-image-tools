import ToolsPage from "@/src/components/ToolsPage";

export const metadata = {
  title: "ツール一覧 - AI Image Tools",
  description:
    "画像変換、画像加工、PDF関連の無料オンラインツール一覧です。カテゴリ別に探せます。",
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