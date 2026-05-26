import { getGuide } from "@/src/data/guides";
import { generateGuideMetadata } from "@/src/lib/guide-seo";
import GuidePageTemplate from "@/src/components/GuidePageTemplate";

const guide = getGuide("ja", "jpg-vs-png")!;

export const metadata = generateGuideMetadata(guide, "ja");

export default function Page() {
  return <GuidePageTemplate guide={guide} locale="ja" />;
}
