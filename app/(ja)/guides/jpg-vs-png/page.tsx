import { getGuide } from "@/src/data/guides";
import StaticContentPage from "@/src/components/StaticContentPage";

const guide = getGuide("ja", "jpg-vs-png")!;

export const metadata = {
  title: `${guide.title} | AI Image Tools`,
  description: guide.description,
};

export default function Page() {
  return (
    <StaticContentPage
      locale="ja"
      title={guide.title}
      description={guide.description}
      sections={guide.sections}
    />
  );
}

