import { getGuide } from "@/src/data/guides";
import StaticContentPage from "@/src/components/StaticContentPage";

const guide = getGuide("en", "png-vs-webp")!;

export const metadata = {
  title: `${guide.title} | AI Image Tools`,
  description: guide.description,
};

export default function Page() {
  return (
    <StaticContentPage
      locale="en"
      title={guide.title}
      description={guide.description}
      sections={guide.sections}
    />
  );
}

