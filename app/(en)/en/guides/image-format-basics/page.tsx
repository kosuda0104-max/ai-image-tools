import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "How to Choose an Image Format | AI Image Tools",
  description:
    "Learn when to use JPG, PNG, WebP, or HEIC based on file size, transparency, compatibility, and editing needs.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="How to choose an image format"
      description="The right image format depends on what matters most: small file size, broad compatibility, transparency, or easy editing. This short guide explains the basics."
      sections={[
        {
          title: "When JPG is the better choice",
          paragraphs: [
            "JPG is usually the best choice for lightweight photo sharing, uploads, email attachments, and general compatibility.",
            "Because JPG uses lossy compression, it is not always ideal for screenshots, diagrams, or sharp text.",
          ],
        },
        {
          title: "When PNG is the better choice",
          paragraphs: [
            "PNG works well for logos, transparent graphics, screenshots, diagrams, and images you may edit again later.",
            "It often creates larger files than JPG, especially for photos.",
          ],
        },
        {
          title: "How to think about WebP and HEIC",
          paragraphs: [
            "WebP is excellent for modern web delivery, and HEIC is efficient for Apple-device photo storage.",
            "When compatibility matters more than storage efficiency, converting those formats to JPG or PNG is often the simplest solution.",
          ],
        },
      ]}
    />
  );
}
