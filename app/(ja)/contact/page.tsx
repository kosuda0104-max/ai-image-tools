import ContactPage from "@/src/components/ContactPage";

export const metadata = {
  title: "お問い合わせ | AI Image Tools",
  description:
    "AI Image Tools へのお問い合わせページです。不具合報告、機能追加の要望、使い方に関する相談はこちらから送れます。",
};

export default function Page() {
  return <ContactPage locale="ja" />;
}
