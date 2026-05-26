import StaticContentPage from "@/src/components/StaticContentPage";
import GuideRelatedTools from "@/src/components/GuideRelatedTools";
import { buildGuideArticleJsonLd } from "@/src/lib/guide-seo";
import type { GuideEntry } from "@/src/data/guides";

type Props = {
  guide: GuideEntry;
  locale: "ja" | "en";
};

export default function GuidePageTemplate({ guide, locale }: Props) {
  const articleJsonLd = buildGuideArticleJsonLd(guide, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <StaticContentPage
        locale={locale}
        title={guide.title}
        description={guide.description}
        sections={guide.sections}
      />
      <GuideRelatedTools locale={locale} slug={guide.slug} />
    </>
  );
}
