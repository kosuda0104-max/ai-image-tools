import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "Terms | AI Image Tools",
  description: "Terms of use for AI Image Tools.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="Terms of Use"
      description="These terms describe the basic conditions for using AI Image Tools."
      sections={[
        {
          title: "Service scope",
          paragraphs: [
            "This site provides browser-based tools for image conversion, image editing, and PDF-related tasks.",
            "Tool behavior, features, and availability may change without prior notice.",
          ],
        },
        {
          title: "Prohibited use",
          paragraphs: [
            "Users must not use the site for unlawful activity, abuse, service disruption, or any activity that violates the rights of others.",
            "Use involving illegal content, unauthorized access, or infringement of third-party rights is prohibited.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "The site does not guarantee that all information or tools will always be complete, accurate, or suitable for every purpose.",
            "We are not liable for damages arising from use of the site or inability to use the site.",
          ],
        },
      ]}
    />
  );
}
