import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePageTemplate from "@/src/components/GuidePageTemplate";
import { getGuide, getGuides } from "@/src/data/guides";
import { generateGuideMetadata } from "@/src/lib/guide-seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getGuides("ja").map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide("ja", slug);

  if (!guide) {
    return {};
  }

  return generateGuideMetadata(guide, "ja");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide("ja", slug);

  if (!guide) {
    notFound();
  }

  return <GuidePageTemplate guide={guide} locale="ja" />;
}
