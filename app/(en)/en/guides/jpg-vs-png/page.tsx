import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "JPG vs PNG | AI Image Tools",
  description:
    "Understand the difference between JPG and PNG based on file size, quality, transparency, and real-world use cases.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="JPG vs PNG"
      description="JPG and PNG are both common image formats, but they are best for different jobs. The right choice depends on whether you care more about file size, sharp graphics, transparency, or editing stability."
      sections={[
        {
          title: "When JPG is the better choice",
          paragraphs: [
            "JPG is usually better for photos, blog images, email attachments, and lightweight web publishing.",
            "It keeps files smaller and is widely accepted across apps, websites, and office tools.",
          ],
        },
        {
          title: "When PNG is the better choice",
          paragraphs: [
            "PNG is better for logos, diagrams, screenshots, transparent graphics, and files you may keep editing.",
            "It is especially useful when sharp edges, text clarity, or transparency matter more than raw file size.",
          ],
        },
        {
          title: "A simple way to decide",
          paragraphs: [
            "Choose JPG for photos and smaller files. Choose PNG for graphics, screenshots, transparency, and editing workflows.",
            "Many teams also edit in PNG first and export lighter formats later for delivery.",
          ],
        },
      ]}
    />
  );
}
