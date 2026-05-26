import { getGuide } from "@/src/data/guides";
import { generateGuideMetadata } from "@/src/lib/guide-seo";
import GuidePageTemplate from "@/src/components/GuidePageTemplate";

const guide = getGuide("en", "jpg-vs-png")!;

export const metadata = generateGuideMetadata(guide, "en");

export default function Page() {
  return <GuidePageTemplate guide={guide} locale="en" />;
}
