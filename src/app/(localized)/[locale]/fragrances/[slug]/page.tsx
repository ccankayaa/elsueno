import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getMessages, getSiteUrl, isLocale } from "@/lib/i18n";
import { getPerfume, getPerfumes, perfumeAccents, perfumeImages } from "@/lib/perfumes";

type FragrancePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return [];
  }

  const messages = getMessages(params.locale);
  return getPerfumes(messages).map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: FragrancePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const messages = getMessages(locale);
  const perfume = getPerfume(messages, slug);

  if (!perfume) {
    return {};
  }

  const path = `/${locale}/fragrances/${perfume.id}`;

  return {
    title: perfume.name,
    description: perfume.description,
    alternates: {
      canonical: path,
      languages: {
        tr: `/tr/fragrances/${perfume.id}`,
        en: `/en/fragrances/${perfume.id}`,
        "x-default": `/tr/fragrances/${perfume.id}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: "El Sueño Parfums De Luxe",
      title: `${perfume.name} | El Sueño`,
      description: perfume.description,
      url: path,
      images: [{ url: perfumeImages[perfume.id], alt: perfume.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${perfume.name} | El Sueño`,
      description: perfume.description,
      images: [perfumeImages[perfume.id]],
    },
  };
}

export default async function FragrancePage({ params }: FragrancePageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const messages = getMessages(locale);
  const perfume = getPerfume(messages, slug);

  if (!perfume) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const contactMessage = encodeURIComponent(
    `${perfume.name} — ${messages.collection.order}`,
  );

  return (
    <main id="main-content" className="min-h-screen pt-28">
      <section className="container py-12 md:py-20">
        <Link className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-gold" href={`/${locale}#collection`}>
          <ArrowLeft aria-hidden="true" size={17} />
          {messages.collection.backToCollection}
        </Link>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
            <Image
              alt={perfume.name}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={perfumeImages[perfume.id]}
            />
            <div aria-hidden="true" className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `linear-gradient(135deg, ${perfumeAccents[perfume.id]}, transparent 75%)` }} />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-2"><Sparkles aria-hidden="true" size={15} /> Extrait de Parfum</p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white sm:text-6xl">{perfume.name}</h1>
            <p className="mt-5 font-serif text-xl italic text-neutral-300">{perfume.tagline}</p>
            <p className="mt-8 leading-8 text-neutral-400">{perfume.description}</p>
            <dl className="mt-9 space-y-6 border-t border-white/10 pt-8">
              <div>
                <dt className="font-semibold text-white">{messages.collection.character}</dt>
                <dd className="mt-1 text-neutral-400">{perfume.character}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">{messages.collection.usage}</dt>
                <dd className="mt-1 text-neutral-400">{perfume.usage}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">{messages.collection.sizes}</dt>
                <dd className="mt-1 text-gold">{perfume.sizes}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="text-sm font-semibold text-neutral-300">{messages.collection.inspiration}</dt>
                <dd className="mt-2 text-sm leading-6 text-neutral-400">{perfume.inspiration}</dd>
              </div>
            </dl>
            <a className="button-primary mt-9 w-full sm:w-auto" href={`https://ig.me/m/elsuenoparfum?text=${contactMessage}`} target="_blank" rel="noreferrer noopener">
              {messages.collection.order}
            </a>
          </div>
        </div>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: perfume.name,
        description: perfume.description,
        image: perfumeImages[perfume.id],
        category: "Fragrance",
        brand: {
          "@type": "Brand",
          name: "El Sueño Parfums De Luxe",
        },
        url: new URL(`/${locale}/fragrances/${perfume.id}`, siteUrl).toString(),
      }} />
    </main>
  );
}
