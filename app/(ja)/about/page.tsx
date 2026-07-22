import StaticContentPage from "@/src/components/StaticContentPage";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";
import { siteUrl } from "@/src/lib/site";

export const metadata = createLocalizedPageMetadata({
  locale: "ja",
  title: "このサイトについて | Filewisp",
  description:
    "Filewispでできること、運営者、ファイルの扱い、更新方針を記載しています。",
  jaPath: "/about",
  enPath: "/en/about",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "このサイトについて | Filewisp",
  description:
    "Filewispでできること、運営者、ファイルの扱い、更新方針を記載しています。",
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Filewisp",
    url: siteUrl,
    description:
      "画像変換、画像編集、PDF 作業をブラウザだけで進められるオンラインツール集です。",
    foundingDate: "2026",
    founder: {
      "@type": "Person",
      name: "Kosuda",
      jobTitle: "Web Engineer",
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <StaticContentPage
        locale="ja"
        title="このサイトについて"
        description="Filewisp は、画像変換、PDF整理、データ変換をブラウザで処理する無料ツール集です。会員登録は不要です。"
        sections={[
          {
            title: "サイトの目的",
            paragraphs: [
              "JPG、PNG、WebP、HEIC、PDFなどの変換や調整を、追加ソフトなしで済ませるために作りました。圧縮、リサイズ、切り抜き、PDFの結合・分割にも対応しています。",
              "各ツールには、変換で失われる情報や対応形式も書いています。操作前に注意点を確認し、必要なら元ファイルを残して使ってください。",
            ],
          },
          {
            title: "運営者について",
            paragraphs: [
              "運営者は 1998 年生まれの Web エンジニアです。Web アプリケーション開発を中心に約 5 年、業務で画像や PDF を扱う画面や処理の実装に関わってきました。",
              "業務中に画像やPDFを少しだけ直すたび、専用ソフトを開くのが面倒でした。その手間を減らすために、このサイトを作っています。",
            ],
          },
          {
            title: "更新方針",
            paragraphs: [
              "不具合、対応形式、説明文を順に見直しています。検索順位だけを理由にページを増やさず、実際に変換できることと注意点が一致しているかを優先します。",
              "新しいツールを追加した日や大きな修正は、このページの更新履歴へ記録します。",
            ],
          },
          {
            title: "安心して使うために",
            paragraphs: [
              "対象ページに「アップロード不要」とあるツールは、ファイルをブラウザ内で処理します。外部サーバーへ送信しません。",
              "不具合を連絡するときは、端末、ブラウザ、元ファイルの形式、表示されたエラーを書いてください。再現確認に使います。",
            ],
          },
          {
            title: "広告と収益化について",
            paragraphs: [
              "本サイトは、運営費（ドメイン・サーバー代）をまかなうために広告を掲載する場合があります。広告の有無にかかわらず、すべてのツールは無料で利用でき、機能制限もありません。",
              "広告掲載にあたっては、ツールの操作を妨げない配置を心がけています。Cookie の利用については、プライバシーポリシーで詳しく説明しています。",
            ],
          },
          {
            title: "主な更新履歴",
            paragraphs: [
              "2026年6月：サイト名を Filewisp に変更し、デザインを全面刷新しました。変換ツールに複数ファイルの一括変換・進捗表示・ZIP一括ダウンロードを追加し、TIFF 変換の不具合を修正しました。あわせて、HEIC・WebP・メール添付・PDF 容量などの悩み解決ガイドを追加しています。",
              "2026年3〜5月：画像・PDF・データ変換など50種類のツールを公開しました。2026年7月にはCSV文字化け修正、Parquetビューアー、背景透過に加え、DynamoDB、Textract、CloudTrail、S3 Inventory、CloudWatch Logs、Transcribe向け変換を追加し、67種類へ拡充しました。",
            ],
          },
        ]}
      />
    </>
  );
}
