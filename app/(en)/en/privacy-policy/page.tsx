import StaticContentPage from "@/src/components/StaticContentPage";

export const metadata = {
  title: "Privacy Policy | AI Image Tools",
  description: "Privacy policy for AI Image Tools.",
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title="Privacy Policy"
      description="This page explains how AI Image Tools handles access data, advertising, analytics, and information submitted through the contact form."
      sections={[
        {
          title: "Information we may collect",
          paragraphs: [
            "The site may collect basic access information to understand usage patterns and improve the service.",
            "When visitors use the contact form, we may receive details such as name, email address, and message content for support and follow-up purposes.",
          ],
        },
        {
          title: "Advertising and analytics",
          paragraphs: [
            "The site may use third-party advertising services and analytics tools to understand usage and support site operations.",
            "These services may use cookies or similar technologies to measure traffic and improve relevance.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "The site does not guarantee that all content or tools will always be complete, accurate, or suitable for every purpose.",
            "We are not liable for damages resulting from use of the site or inability to use the site.",
          ],
        },
      ]}
    />
  );
}
