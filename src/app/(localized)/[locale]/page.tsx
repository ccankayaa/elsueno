import { notFound } from "next/navigation";
import { HomeContent } from "@/components/home-content";
import { getMessages, isLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  return (
    <HomeContent locale={rawLocale} messages={getMessages(rawLocale)} />
  );
}
