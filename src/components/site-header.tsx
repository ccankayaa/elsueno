"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplet, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale = locale === "tr" ? "en" : "tr";
  const localizedPath = pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${otherLocale}`);
  const collectionHref = `/${locale}#collection`;
  const atelierHref = `/${locale}#atelier`;
  const contactHref = `/${locale}#contact`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-black/75 py-4 backdrop-blur-xl">
      <div className="container flex items-center justify-between">
        <Link href={`/${locale}`} aria-label="El Sueño — home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Droplet aria-hidden="true" size={19} />
          </span>
          <span className="font-serif text-2xl font-bold tracking-wide text-white">El Sueño</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] md:flex">
          <Link className="text-neutral-300 transition hover:text-gold" href={collectionHref}>{messages.navigation.collection}</Link>
          <Link className="text-neutral-300 transition hover:text-gold" href={atelierHref}>{messages.navigation.atelier}</Link>
          <Link className="text-neutral-300 transition hover:text-gold" href={contactHref}>{messages.navigation.contact}</Link>
          <Link className="rounded-full border border-white/15 px-3 py-2 text-neutral-200 transition hover:border-gold hover:text-gold" href={localizedPath} hrefLang={otherLocale}>
            {messages.navigation.language}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link className="text-sm text-neutral-300" href={localizedPath} hrefLang={otherLocale}>{messages.navigation.language}</Link>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? messages.navigation.closeMenu : messages.navigation.menu}
            className="rounded-full p-2 text-white hover:bg-white/10"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="container flex flex-col gap-5 pb-3 pt-6 text-center md:hidden">
          <Link className="text-neutral-200" href={collectionHref} onClick={closeMenu}>{messages.navigation.collection}</Link>
          <Link className="text-neutral-200" href={atelierHref} onClick={closeMenu}>{messages.navigation.atelier}</Link>
          <Link className="text-neutral-200" href={contactHref} onClick={closeMenu}>{messages.navigation.contact}</Link>
        </nav>
      )}
    </header>
  );
}
