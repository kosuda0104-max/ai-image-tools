import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "PDF ツールの使い分け | AI Image Tools",
  description:
    "PDF の結合、分割、変換、圧縮、ページ整理をどう使い分けるかを作業別に整理します。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="PDF ツールの使い分け"
      description="PDF 作業は目的によって使うツールが変わります。結合したいのか、ページを抜き出したいのか、画像へ変換したいのかを先に整理すると迷いにくくなります。"
      sections={[
        {
          title: "複数の PDF をまとめたいとき",
          paragraphs: [
            "複数ファイルを 1 つにまとめたい場合は Merge PDF が向いています。提出資料や配布資料を 1 本化したいときに使いやすい方法です。",
          ],
        },
        {
          title: "ページを分けたいとき",
          paragraphs: [
            "必要なページだけを抜き出したい場合は Split PDF、不要ページを除きたい場合は PDF Remove Pages が向いています。",
          ],
        },
        {
          title: "画像として使いたいとき",
          paragraphs: [
            "PDF のページを画像として保存したい場合は、PDF to JPG や PDF to PNG を使うと、共有や資料作成に流し込みやすくなります。",
          ],
        },
      ]}
    />
  );
}
