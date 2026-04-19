import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StaticContentPage from "@/src/components/StaticContentPage";
import { getGuide, getGuides } from "@/src/data/guides";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getGuides("en").map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide("en", slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.title} | AI Image Tools`,
    description: guide.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide("en", slug);

  if (!guide) {
    notFound();
  }

  return (
    <StaticContentPage
      locale="en"
      title={guide.title}
      description={guide.description}
      sections={guide.sections}
    />
  );
}

