export type SiteLocale = "ja" | "en" | "zh-TW";

export function getLocaleBasePath(locale: SiteLocale) {
  if (locale === "en") return "/en";
  if (locale === "zh-TW") return "/zh-tw";
  return "";
}

export function getHtmlLang(locale: SiteLocale) {
  return locale === "zh-TW" ? "zh-Hant-TW" : locale;
}
