"use client";

import type { FormEvent } from "react";
import type { Messages } from "@/lib/i18n";

type ContactFormProps = {
  messages: Messages["contact"];
};

export function ContactForm({ messages }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `${messages.name}: ${String(data.get("name") ?? "").trim()}`,
      `${messages.email}: ${String(data.get("email") ?? "").trim()}`,
      `${messages.message}: ${String(data.get("message") ?? "").trim()}`,
    ].join("\n");

    window.open(
      `https://wa.me/905369600453?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="contact-name">{messages.name}</label>
      <input autoComplete="name" className="form-field" id="contact-name" name="name" placeholder={messages.name} required />
      <label className="sr-only" htmlFor="contact-email">{messages.email}</label>
      <input autoComplete="email" className="form-field" id="contact-email" name="email" placeholder={messages.email} required type="email" />
      <label className="sr-only" htmlFor="contact-message">{messages.message}</label>
      <textarea className="form-field min-h-32 resize-y" id="contact-message" name="message" placeholder={messages.message} required />
      <button className="button-primary w-full" type="submit">{messages.send}</button>
      <p className="text-xs text-neutral-500">{messages.formNote}</p>
    </form>
  );
}
