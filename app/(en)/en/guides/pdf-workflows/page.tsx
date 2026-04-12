import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "How to Choose the Right PDF Tool | AI Image Tools",
  description:
    "Learn when to merge, split, compress, convert, or clean up PDFs depending on the task you need to complete.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="How to choose the right PDF tool"
      description="PDF workflows become much easier when you choose the tool based on the exact task: merging, splitting, cleanup, conversion, or optimization."
      sections={[
        {
          title: "When you need one combined file",
          paragraphs: [
            "Use Merge PDF when you want to join multiple files into one document, especially before sharing or submitting a final version.",
          ],
        },
        {
          title: "When you only need part of a document",
          paragraphs: [
            "Use Split PDF when you want to extract selected pages, and use PDF Remove Pages when you want to clean a file by deleting pages you do not need.",
          ],
        },
        {
          title: "When you need images instead of a PDF",
          paragraphs: [
            "Use PDF to JPG or PDF to PNG when you need page previews, reusable graphics, document screenshots, or image-based sharing.",
          ],
        },
      ]}
    />
  );
}
