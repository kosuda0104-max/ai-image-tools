import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "PNGとWebPの違い | AI Image Tools",
  description:
    "PNGとWebPの違いを、軽さ、透明背景、互換性、Web掲載向けの観点から整理します。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="PNGとWebPの違い"
      description="PNGとWebPはどちらもWebで使われる画像形式ですが、軽さと互換性のバランスが違います。透明背景が必要か、軽量化を優先したいかで選び方が変わります。"
      sections={[
        {
          title: "PNGが向いている場面",
          paragraphs: [
            "PNG はロゴ、図版、透過画像、スクリーンショットなど、見た目の安定感が大切な場面に向いています。",
            "多くの制作フローで扱いやすく、編集用の元データとしても使いやすい形式です。",
          ],
        },
        {
          title: "WebPが向いている場面",
          paragraphs: [
            "WebP は Web 掲載向けに容量を抑えたいときに強く、ページ表示速度を改善したい場合に便利です。",
            "写真でも図版でも軽量化を狙いやすく、最近のブラウザではかなり広く利用できます。",
          ],
        },
        {
          title: "選び方の目安",
          paragraphs: [
            "編集や互換性を優先するなら PNG、公開用の軽量化を優先するなら WebP を検討すると分かりやすいです。",
            "PNG をそのまま使うか、WebP に変換して軽くするかは、公開先の仕様と見た目の優先度で決めると失敗しにくいです。",
          ],
        },
      ]}
    />
  );
}
