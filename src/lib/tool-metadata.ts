type Props = {
  locale: "ja" | "en";
  slug: string;
  jaTitle: string;
  jaDescription: string;
  enTitle: string;
  enDescription: string;
};

export function createToolMetadata({
  locale,
  slug,
  jaTitle,
  jaDescription,
  enTitle,
  enDescription,
}: Props) {
  const isJa = locale === "ja";

  const title = isJa ? jaTitle : enTitle;
  const description = isJa ? jaDescription : enDescription;

  return {
    title,
    description,
    alternates: {
      languages: {
        ja: `/tools/${slug}`,
        en: `/en/tools/${slug}`,
      },
    },
  };
}
