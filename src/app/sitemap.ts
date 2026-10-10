import type { MetadataRoute } from "next";
import { getMessages, getSiteUrl, locales } from "@/lib/i18n";
import { getPerfumes } from "@/lib/perfumes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return locales.flatMap((locale) => {
    const messages = getMessages(locale);
    const homeUrl = new URL(`/${locale}`, siteUrl).toString();
    const homeAlternates = {
      languages: {
        tr: new URL("/tr", siteUrl).toString(),
        en: new URL("/en", siteUrl).toString(),
        "x-default": new URL("/tr", siteUrl).toString(),
      },
    };

    return [
      {
        url: homeUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 1,
        alternates: homeAlternates,
      },
      ...getPerfumes(messages).map((perfume) => ({
        url: new URL(`/${locale}/fragrances/${perfume.id}`, siteUrl).toString(),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            tr: new URL(`/tr/fragrances/${perfume.id}`, siteUrl).toString(),
            en: new URL(`/en/fragrances/${perfume.id}`, siteUrl).toString(),
            "x-default": new URL(`/tr/fragrances/${perfume.id}`, siteUrl).toString(),
          },
        },
      })),
    ];
  });
}
