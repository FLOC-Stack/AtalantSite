import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContactoPage } from "@/components/contacto-page";
import { isLocale, type AppLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Contacto · Atalant",
    description:
      "Habla con el equipo de Atalant: volúmenes, grados, plazos o retos logísticos. Respondemos en menos de 24 horas laborables.",
  };
}

export default async function ContactoRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactoPage locale={locale as AppLocale} />;
}
