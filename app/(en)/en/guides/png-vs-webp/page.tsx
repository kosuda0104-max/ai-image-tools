import { getGuide } from "@/src/data/guides";
import { generateGuideMetadata } from "@/src/lib/guide-seo";
import GuidePageTemplate from "@/src/components/GuidePageTemplate";

const guide = getGuide("en", "png-vs-webp")!;

export const metadata = generateGuideMetadata(guide, "en");

export default function Page() {
  return <GuidePageTemplate guide={guide} locale="en" />;
}
