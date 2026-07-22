import GuidePageTemplate from "@/src/components/GuidePageTemplate";
import { awsExportFormatsZhTwGuide } from "@/src/data/guides.zh-tw";
import { generateGuideMetadata } from "@/src/lib/guide-seo";

export const metadata = generateGuideMetadata(awsExportFormatsZhTwGuide, "zh-TW");

export default function Page() {
  return <GuidePageTemplate guide={awsExportFormatsZhTwGuide} locale="zh-TW" />;
}
