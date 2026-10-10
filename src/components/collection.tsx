import type { Locale, Messages } from "@/lib/i18n";
import { getPerfumes } from "@/lib/perfumes";
import { PerfumeCard } from "@/components/perfume-card";

type CollectionProps = {
  locale: Locale;
  messages: Messages;
};

export function Collection({ locale, messages }: CollectionProps) {
  const perfumes = getPerfumes(messages);

  return (
    <section className="section border-y border-white/5 bg-neutral-950" id="collection">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow">{messages.collection.eyebrow}</p>
          <h2 className="section-title">{messages.collection.title}</h2>
          <p className="mt-5 text-neutral-400">{messages.collection.description}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              label={messages.collection.viewDetails}
              locale={locale}
              perfume={perfume}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
