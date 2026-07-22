import StaticContentPage from "@/src/components/StaticContentPage";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";
import { siteUrl } from "@/src/lib/site";

export const metadata = createLocalizedPageMetadata({
  locale: "en",
  title: "About | Filewisp",
  description:
    "What Filewisp does, who runs it, how files are handled, and how the site is maintained.",
  jaPath: "/about",
  enPath: "/en/about",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About | Filewisp",
  description:
    "What Filewisp does, who runs it, how files are handled, and how the site is maintained.",
  url: `${siteUrl}/en/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Filewisp",
    url: siteUrl,
    description:
      "A browser-based site for image conversion, image editing, and practical PDF tasks.",
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
        locale="en"
        title="About Filewisp"
        description="Filewisp is a free collection of browser tools for images, PDFs, and data files. No account is required."
        sections={[
          {
            title: "What this site is for",
            paragraphs: [
              "Filewisp handles small file jobs that should not require installing another app: image conversion, compression, cropping, and PDF cleanup.",
              "Each tool states what it accepts, what it produces, and what may be lost during conversion. Keep the original file when quality, transparency, or metadata matters.",
            ],
          },
          {
            title: "Operator profile",
            paragraphs: [
              "Filewisp is operated by Kosuda, a web engineer born in 1998 with five years of professional experience, mainly in web application development.",
              "I built the site after repeatedly needing to make one small change to an image or PDF during ordinary web work. The interface follows those short, practical jobs.",
            ],
          },
          {
            title: "How the site is maintained",
            paragraphs: [
              "Existing tools are checked for conversion errors, unclear instructions, and missing format details. Those fixes take priority over adding pages for their own sake.",
              "New tools and major fixes are recorded in the update history below.",
            ],
          },
          {
            title: "Contact and transparency",
            paragraphs: [
              "Tools marked 'No upload' process files in the browser and do not send them to an external server.",
              "Bug reports are most useful when they include the device, browser, source format, and exact error message.",
            ],
          },
          {
            title: "Advertising and monetization",
            paragraphs: [
              "The site may display ads to cover operating costs such as the domain and hosting. All tools remain free with no feature restrictions, regardless of advertising.",
              "Ad placements are kept away from tool controls so they never interfere with your work. Cookie usage is described in detail in the privacy policy.",
            ],
          },
          {
            title: "Update history",
            paragraphs: [
              "June 2026: Rebranded to Filewisp with a full redesign. Converters gained multi-file batch processing, progress indicators, and ZIP download; a TIFF conversion bug was fixed; and new problem-solving guides (HEIC, WebP, email attachments, PDF size limits) were published.",
              "March-May 2026: Launched 50 image, PDF, and data tools. In July 2026, added CSV repair, Parquet inspection, background transparency, and converters for DynamoDB, Textract, CloudTrail, S3 Inventory, CloudWatch Logs, and Transcribe, expanding the directory to 67 tools.",
            ],
          },
        ]}
      />
    </>
  );
}
