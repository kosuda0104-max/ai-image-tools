import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "このサイトについて | AI Image Tools",
  description:
    "AI Image Tools の目的、運営方針、運営者情報、お問い合わせ先について紹介します。",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title="このサイトについて"
      description="AI Image Tools は、画像変換、画像編集、PDF 作業をブラウザで手軽に進めたい人向けの無料ツールサイトです。実用性の高い機能と、迷いにくい導線を重視して改善を続けています。"
      sections={[
        {
          title: "サイトの目的",
          paragraphs: [
            "AI Image Tools は、画像変換、画像圧縮、リサイズ、PDF 変換などの実用作業を、ソフトのインストールなしで進められるようにするためのサイトです。",
            "JPG、PNG、WebP、HEIC、PDF など、日常業務や個人利用でよく使う形式を中心に、必要な処理へすぐたどり着ける構成を意識しています。",
          ],
        },
        {
          title: "運営者情報",
          paragraphs: [
            "小須田。1998年生まれの Web エンジニアです。主に Web アプリケーション開発に携わっており、実務経験は 5 年です。",
            "このサイトでは、画像変換や画像処理を簡単に行える無料ツールを提供しています。ユーザーが迷わず使えるシンプルな UI と、実用性の高い機能を重視しています。",
          ],
        },
        {
          title: "運営方針",
          paragraphs: [
            "単にツールを並べるだけでなく、関連ツールへの導線、ガイド記事、利用条件、プライバシー情報も公開して、全体として安心して使える状態を目指しています。",
            "今後もツールの拡充と品質向上を進め、より価値のあるサービスとして改善を続けていきます。",
          ],
        },
        {
          title: "お問い合わせ",
          paragraphs: [
            "不具合報告、機能追加の要望、使い方に関する相談は、お問い合わせページよりご連絡ください。",
            "お問い合わせ内容は確認のうえ、必要に応じて改善や返信に活用します。",
          ],
        },
      ]}
    />
  );
}
