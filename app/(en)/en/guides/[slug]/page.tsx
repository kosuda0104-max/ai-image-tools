import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StaticContentPage from "@/src/components/StaticContentPage";
import { getGuide, getGuides } from "@/src/data/guides";
import { siteUrl } from "@/src/lib/site";
import { TOOL_CONTENT_LAST_UPDATED } from "@/src/lib/seo-signals";

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

  const url = `${siteUrl}/en/guides/${guide.slug}`;

  return {
    title: `${guide.title} | AI Image Tools`,
    description: guide.description,
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteUrl}/guides/${guide.slug}`,
        en: url,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: "AI Image Tools",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [`${siteUrl}/og.png`],
    },
    other: {
      "article:published_time": TOOL_CONTENT_LAST_UPDATED,
      "article:modified_time": TOOL_CONTENT_LAST_UPDATED,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide("en", slug);

  if (!guide) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: "en",
    datePublished: TOOL_CONTENT_LAST_UPDATED,
    dateModified: TOOL_CONTENT_LAST_UPDATED,
    author: {
      "@type": "Organization",
      name: "AI Image Tools",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Image Tools",
    },
    mainEntityOfPage: `${siteUrl}/en/guides/${guide.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <StaticContentPage
        locale="en"
        title={guide.title}
        description={guide.description}
        sections={guide.sections}
      />
    </>
  );
}