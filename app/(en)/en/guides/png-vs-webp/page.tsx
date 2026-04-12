import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "PNG vs WebP | AI Image Tools",
  description:
    "Compare PNG and WebP based on file size, transparency, compatibility, and web publishing needs.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="PNG vs WebP"
      description="PNG and WebP are both common web image formats, but they solve slightly different problems. The better choice depends on whether you care more about editing stability, transparency, compatibility, or smaller files."
      sections={[
        {
          title: "When PNG is a better fit",
          paragraphs: [
            "PNG is often better for logos, diagrams, screenshots, transparent graphics, and source files you still plan to edit.",
            "It is easy to work with in many design and content workflows.",
          ],
        },
        {
          title: "When WebP is a better fit",
          paragraphs: [
            "WebP is usually better when you want smaller files for web delivery while keeping decent image quality.",
            "It works well for both photos and many graphics in modern browser environments.",
          ],
        },
        {
          title: "How to choose",
          paragraphs: [
            "Use PNG when editing and compatibility matter most. Use WebP when page speed and smaller delivery files matter most.",
            "A common workflow is to keep a PNG source file and publish a lighter WebP version.",
          ],
        },
      ]}
    />
  );
}
