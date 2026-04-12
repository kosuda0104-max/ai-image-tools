import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "About | AI Image Tools",
  description:
    "Learn what AI Image Tools is for, who runs it, how the site is maintained, and how to get in touch.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="About AI Image Tools"
      description="AI Image Tools is a free browser-based site for image conversion, image editing, and PDF tasks. The goal is to provide practical tools people can actually use, not just thin pages built for search or ads."
      sections={[
        {
          title: "What this site is for",
          paragraphs: [
            "AI Image Tools is designed to help with common real-world tasks such as image conversion, image cleanup, PDF preparation, and lightweight file optimization.",
            "The focus is on practical workflows around formats like JPG, PNG, WebP, HEIC, and PDF, without requiring software installation.",
          ],
        },
        {
          title: "Operator profile",
          paragraphs: [
            "AI Image Tools is operated by Kosuda, a web engineer born in 1998 with five years of professional experience, mainly in web application development.",
            "The site focuses on free tools for image conversion and image processing, with an emphasis on simple UI and practical features that visitors can use without confusion.",
          ],
        },
        {
          title: "How the site is maintained",
          paragraphs: [
            "The site is updated by improving existing tools, adding clearer explanations, expanding format support, and making the overall workflow easier to understand.",
            "The goal is to keep expanding the toolset and improving quality over time so the service becomes more useful and reliable.",
          ],
        },
        {
          title: "Contact and transparency",
          paragraphs: [
            "Contact, privacy policy, and terms pages are published so visitors can understand how the site works and how to get in touch.",
            "Advertising may appear on the site, but pages are built to be useful before ads are considered.",
          ],
        },
      ]}
    />
  );
}
