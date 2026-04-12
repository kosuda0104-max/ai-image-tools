import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "利用規約 | AI Image Tools",
  description: "AI Image Tools の利用規約です。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="利用規約"
      description="AI Image Tools を利用する際の基本的な条件と注意事項をまとめています。"
      sections={[
        {
          title: "サービスの内容",
          paragraphs: [
            "本サイトは、画像変換、画像編集、PDF 関連のブラウザベースツールを提供しています。",
            "ツールの機能、内容、提供状況は、予告なく変更または終了する場合があります。",
          ],
        },
        {
          title: "禁止事項",
          paragraphs: [
            "違法行為、権利侵害、サービス妨害、または第三者へ不利益を与える目的で本サイトを利用してはいけません。",
            "不正アクセス、違法コンテンツの取り扱い、第三者の権利を侵害する用途での利用は禁止します。",
          ],
        },
        {
          title: "免責事項",
          paragraphs: [
            "本サイトの情報やツールについて、常に完全性、正確性、有用性を保証するものではありません。",
            "本サイトの利用または利用不能により発生した損害について、運営者は責任を負いません。",
          ],
        },
      ]}
    />
  );
}
