import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "JPGとPNGの違い | AI Image Tools",
  description:
    "JPGとPNGの違いを、ファイルサイズ、画質、透明背景、向いている用途から分かりやすく整理します。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="JPGとPNGの違い"
      description="JPGとPNGはどちらもよく使われる画像形式ですが、向いている用途がかなり違います。写真向けか、図版向けか、軽さを優先するかで選び方が変わります。"
      sections={[
        {
          title: "JPGが向いている場面",
          paragraphs: [
            "JPG は写真、ブログ用画像、メール添付、Web掲載など、容量を抑えたい場面に向いています。",
            "ファイルサイズが軽くなりやすく、多くの環境で扱いやすいのが強みです。",
          ],
        },
        {
          title: "PNGが向いている場面",
          paragraphs: [
            "PNG はロゴ、図版、スクリーンショット、透明背景が必要な画像に向いています。",
            "輪郭や文字を保ちやすく、編集前提の画像にも使いやすい形式です。",
          ],
        },
        {
          title: "迷ったときの判断基準",
          paragraphs: [
            "写真や軽さを優先するなら JPG、文字や図形、透過背景を優先するなら PNG と考えると選びやすいです。",
            "途中編集では PNG、公開用には JPG や WebP と使い分ける運用もよく使われます。",
          ],
        },
      ]}
    />
  );
}
