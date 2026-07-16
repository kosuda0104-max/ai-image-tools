import ContactPage from "@/src/components/ContactPage";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";

export const metadata = createLocalizedPageMetadata({
  locale: "en",
  title: "Contact | Filewisp",
  description:
    "Contact Filewisp. Send bug reports or feature requests using this form.",
  jaPath: "/contact",
  enPath: "/en/contact",
});

export default function Page() {
  return <ContactPage locale="en" />;
}
