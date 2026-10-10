import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof tr;

const dictionaries: Record<Locale, Messages> = { tr, en };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(configuredUrl || "https://el-sueno-parfume.vercel.app");
}
