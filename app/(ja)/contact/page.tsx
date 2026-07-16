import ContactPage from "@/src/components/ContactPage";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";

export const metadata = createLocalizedPageMetadata({
  locale: "ja",
  title: "お問い合わせ | Filewisp",
  description:
    "Filewisp へのお問い合わせページです。不具合報告、機能追加の要望、使い方に関する相談はこちらから送れます。",
  jaPath: "/contact",
  enPath: "/en/contact",
});

export default function Page() {
  return <ContactPage locale="ja" />;
}
