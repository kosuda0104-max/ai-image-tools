import ContactPage from "@/src/components/ContactPage";

export const metadata = {
  title: "お問い合わせ | AI Image Tools",
  description:
    "AI Image Toolsへのお問い合わせページです。ツールの不具合報告や機能追加の要望はこちらから送信できます。",
};

export default function Page() {
  return <ContactPage locale="ja" />;
}