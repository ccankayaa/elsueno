import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { perfumeAccents, perfumeImages, type Perfume } from "@/lib/perfumes";

type PerfumeCardProps = {
  locale: Locale;
  perfume: Perfume;
  label: string;
};

export function PerfumeCard({ locale, perfume, label }: PerfumeCardProps) {
  return (
    <Link
      className="group block [perspective:1000px]"
      href={`/${locale}/fragrances/${perfume.id}`}
      aria-label={`${label}: ${perfume.name}`}
    >
      <article className="fragrance-card relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl group-hover:border-gold/40">
        <Image
          src={perfumeImages[perfume.id]}
          alt={perfume.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-70"
          style={{ backgroundImage: `linear-gradient(135deg, ${perfumeAccents[perfume.id]}, transparent 75%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <Sparkles aria-hidden="true" size={15} />
            <span>Extrait de Parfum</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">{perfume.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-300">{perfume.tagline}</p>
            </div>
            <span aria-hidden="true" className="shrink-0 rounded-full border border-white/20 p-3 text-white transition group-hover:border-gold group-hover:bg-gold group-hover:text-black">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
