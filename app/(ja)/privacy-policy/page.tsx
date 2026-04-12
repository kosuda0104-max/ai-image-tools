import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "プライバシーポリシー | AI Image Tools",
  description: "AI Image Tools のプライバシーポリシーです。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="プライバシーポリシー"
      description="AI Image Tools における、アクセス情報、広告、解析、問い合わせ時の情報の取り扱いについて記載しています。"
      sections={[
        {
          title: "取得する情報について",
          paragraphs: [
            "本サイトでは、アクセス状況の把握やサービス改善のために、閲覧に関する基本的な情報を収集する場合があります。",
            "お問い合わせ時には、返信や内容確認のために、氏名、メールアドレス、メッセージ内容などの情報を受け取ることがあります。",
          ],
        },
        {
          title: "広告と解析について",
          paragraphs: [
            "本サイトでは、第三者配信の広告サービスやアクセス解析ツールを利用する場合があります。",
            "これらのサービスでは、利便性向上や広告最適化のために Cookie などの技術が使われることがあります。",
          ],
        },
        {
          title: "免責事項",
          paragraphs: [
            "本サイトの内容や提供するツールについて、正確性、完全性、特定目的への適合性を常に保証するものではありません。",
            "本サイトの利用または利用不能によって生じた損害について、運営者は責任を負いません。",
          ],
        },
      ]}
    />
  );
}
