import OgpImageMakerTool from "@/src/components/OgpImageMakerTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "ogp-image-maker",
  jaTitle: "OGP画像メーカー【無料・ブラウザ完結】1200×630を作成",
  jaDescription:
    "タイトルと色を入れるだけでOGP画像（1200×630）を作成できる無料ツール。ブログ・Qiita・Zenn・個人開発向け。ロゴ配置対応、アップロード不要でブラウザ内描画。",
  enTitle: "OGP Image Maker Free Online (1200×630)",
  enDescription:
    "Create OGP images (1200×630) by entering a title and colors. Free, for blogs, Qiita, Zenn, and indie projects. Logo support, rendered in your browser with no upload.",
});

export default function Page() {
  return <OgpImageMakerTool locale="ja" />;
}
