import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { getMessages, getSiteUrl, isLocale, locales } from "@/lib/i18n";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const messages = getMessages(locale);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: siteUrl,
    title: {
      default: messages.metadata.title,
      template: `%s | El Sueño`,
    },
    description: messages.metadata.description,
    applicationName: "El Sueño Parfums De Luxe",
    keywords: locale === "tr"
      ? ["El Sueño", "butik parfüm", "niş parfüm", "Extrait de Parfum"]
      : ["El Sueño", "artisan fragrance", "niche perfume", "Extrait de Parfum"],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        en: "/en",
        "x-default": "/tr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      siteName: "El Sueño Parfums De Luxe",
      title: messages.metadata.title,
      description: messages.metadata.description,
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const messages = getMessages(locale);
  const siteUrl = getSiteUrl();

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">{locale === "tr" ? "İçeriğe geç" : "Skip to content"}</a>
        <SiteHeader locale={locale} messages={messages} />
        {children}
        <SiteFooter messages={messages} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "El Sueño Parfums De Luxe",
          url: new URL(`/${locale}`, siteUrl).toString(),
          sameAs: ["https://instagram.com/elsuenoparfum"],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-536-960-04-53",
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
          },
        }} />
      </body>
    </html>
  );
}
