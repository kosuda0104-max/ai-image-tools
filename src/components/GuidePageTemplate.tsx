import StaticContentPage from "@/src/components/StaticContentPage";
import GuideRelatedTools from "@/src/components/GuideRelatedTools";
import GuideRelatedGuides from "@/src/components/GuideRelatedGuides";
import GuideHero from "@/src/components/GuideHero";
import { buildGuideArticleJsonLd } from "@/src/lib/guide-seo";
import { AD_SLOTS } from "@/src/lib/ads";
import type { GuideEntry } from "@/src/data/guides";
import type { SiteLocale } from "@/src/lib/site-locale";

type Props = {
  guide: GuideEntry;
  locale: SiteLocale;
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
        hero={<GuideHero slug={guide.slug} />}
        adSlot={AD_SLOTS.guideInArticle}
        sources={guide.sources}
      />
      <GuideRelatedGuides locale={locale} slug={guide.slug} />
      <GuideRelatedTools locale={locale} slug={guide.slug} />
    </>
  );
}
