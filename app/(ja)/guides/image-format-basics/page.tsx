import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "画像形式の選び方 | AI Image Tools",
  description:
    "JPG、PNG、WebP、HEIC をどう使い分けるかを、容量、互換性、透明背景、編集のしやすさから解説します。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="画像形式の選び方"
      description="画像形式は、容量、互換性、透明背景の有無、編集のしやすさで向き不向きが変わります。ここでは、よく使う形式を判断しやすいように整理しています。"
      sections={[
        {
          title: "JPG が向いている場面",
          paragraphs: [
            "写真の共有、メール添付、資料への貼り付けなど、幅広い環境で扱いやすい画像には JPG が向いています。",
            "透明背景には対応していませんが、互換性が高く、ファイルサイズを抑えやすい点が強みです。",
          ],
        },
        {
          title: "PNG が向いている場面",
          paragraphs: [
            "ロゴ、図版、スクリーンショット、背景を透過したい画像には PNG が向いています。",
            "見た目を保ちやすい一方で、写真ではファイルサイズが大きくなりやすいため、用途に応じて JPG や WebP も検討するとよいです。",
          ],
        },
        {
          title: "WebP と HEIC の考え方",
          paragraphs: [
            "WebP は Web 掲載向けに容量を抑えやすい形式で、HEIC は Apple 系の写真でよく使われる形式です。",
            "互換性を優先したい場面では JPG や PNG へ変換しておくと扱いやすくなります。",
          ],
        },
      ]}
    />
  );
}
