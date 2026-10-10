import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, MapPin, Phone } from "lucide-react";
import type { Locale, Messages } from "@/lib/i18n";
import { Collection } from "@/components/collection";
import { ContactForm } from "@/components/contact-form";

type HomeContentProps = {
  locale: Locale;
  messages: Messages;
};

export function HomeContent({ locale, messages }: HomeContentProps) {
  return (
    <main id="main-content">
      <section className="hero relative flex min-h-[92svh] items-center justify-center overflow-hidden pt-28 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="glow absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-amber-800/20 blur-[110px]" />
          <div className="glow absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-900/20 blur-[130px]" />
        </div>
        <div className="container relative z-10 flex flex-col items-center">
          <p className="eyebrow mb-7">{messages.hero.eyebrow}</p>
          <h1 className="max-w-5xl font-serif text-5xl font-bold leading-[1.08] text-white sm:text-6xl md:text-8xl">
            {messages.hero.title}
            <br />
            <span className="gold-gradient italic">{messages.hero.highlight}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            {messages.hero.description}
          </p>
          <Link className="button-primary mt-10" href={`/${locale}#collection`}>
            {messages.hero.cta}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <Collection locale={locale} messages={messages} />

      <section className="section overflow-hidden" id="atelier">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-[470px] rounded-full border border-white/10 p-3">
            <div className="absolute inset-0 rounded-full border border-gold/20" />
            <Image
              alt={messages.navigation.atelier}
              className="rounded-full object-cover grayscale transition duration-700 hover:grayscale-0"
              fill
              sizes="(max-width: 1024px) 80vw, 470px"
              src="/images/atelier.svg"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 to-transparent" />
          </div>
          <div>
            <p className="eyebrow">{messages.atelier.eyebrow}</p>
            <h2 className="section-title mt-4 max-w-xl">{messages.atelier.title}</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-neutral-400">
              <p>{messages.atelier.paragraphOne}</p>
              <p>{messages.atelier.paragraphTwo}</p>
              <p className="border-l-2 border-gold pl-5 italic text-neutral-200">{messages.atelier.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/5 bg-neutral-900/70" id="contact">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black p-7 shadow-2xl md:p-12">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="eyebrow">{messages.contact.eyebrow}</p>
              <h2 className="section-title mt-4">{messages.contact.title}</h2>
              <p className="mt-5 text-neutral-400">{messages.contact.description}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-7">
                <a className="contact-link" href="https://instagram.com/elsuenoparfum" target="_blank" rel="noreferrer noopener">
                  <span className="contact-icon"><Camera aria-hidden="true" size={21} /></span>
                  <span><strong>{messages.contact.instagram}</strong><span className="block text-neutral-400">@elsuenoparfum</span></span>
                </a>
                <a className="contact-link" href="https://wa.me/905369600453" target="_blank" rel="noreferrer noopener">
                  <span className="contact-icon"><Phone aria-hidden="true" size={21} /></span>
                  <span><strong>{messages.contact.phone}</strong><span className="block text-neutral-400">+90 536 960 04 53</span></span>
                </a>
                <div className="contact-link">
                  <span className="contact-icon"><MapPin aria-hidden="true" size={21} /></span>
                  <span><strong>{messages.contact.workshop}</strong><span className="block text-sm text-neutral-400">{messages.contact.location}</span></span>
                </div>
              </div>

              <ContactForm messages={messages.contact} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
