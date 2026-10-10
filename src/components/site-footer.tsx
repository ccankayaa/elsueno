import { Droplet } from "lucide-react";
import type { Messages } from "@/lib/i18n";

export function SiteFooter({ messages }: { messages: Messages }) {
  return (
    <footer className="border-t border-white/5 bg-black py-10">
      <div className="container text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-white">
          <Droplet aria-hidden="true" className="text-gold" size={19} />
          <span className="font-serif text-xl font-bold">El Sueño</span>
        </div>
        <p className="mx-auto max-w-md text-sm text-neutral-500">{messages.footer.description}</p>
        <p className="mt-6 text-xs text-neutral-600">
          © {new Date().getFullYear()} El Sueño Parfums De Luxe. {messages.footer.rights}
        </p>
      </div>
    </footer>
  );
}
