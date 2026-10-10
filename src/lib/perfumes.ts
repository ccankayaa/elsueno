import type { Messages } from "@/lib/i18n";

export const perfumeImages = {
  "blue-de-sueno": "/images/blue-de-sueno.svg",
  "althair-noir": "/images/althair-noir.svg",
  tigre: "/images/tigre.svg",
  "pacifico-fresco": "/images/pacifico-fresco.svg",
  "erba-fruta": "/images/erba-fruta.svg",
} as const;

export const perfumeAccents: Record<keyof typeof perfumeImages, string> = {
  "blue-de-sueno": "#1e3a8a",
  "althair-noir": "#92400e",
  tigre: "#c2410c",
  "pacifico-fresco": "#0f766e",
  "erba-fruta": "#7e22ce",
};

export type PerfumeId = keyof typeof perfumeImages;
export type Perfume = Messages["product"][PerfumeId] & { id: PerfumeId };

export function getPerfumes(messages: Messages): Perfume[] {
  return (Object.keys(perfumeImages) as PerfumeId[]).map((id) => ({
    id,
    ...messages.product[id],
  }));
}

export function getPerfume(messages: Messages, slug: string): Perfume | undefined {
  if (!Object.hasOwn(perfumeImages, slug)) {
    return undefined;
  }

  return getPerfumes(messages).find((perfume) => perfume.id === slug);
}
