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

const metadataByLocale: Record<AppLocale, Metadata> = {
  en: {
    title: "Contact · Atalant",
    description:
      "Tell us your needs: volumes, grades, lead times, and logistics bottlenecks. We will respond in less than 24 working hours.",
  },
  es: {
    title: "Contacto · Atalant",
    description:
      "Háblanos de tus necesidades: volúmenes, grados, plazos y retos logísticos. Respondemos en menos de 24 horas laborables.",
  },
  fr: {
    title: "Contact · Atalant",
    description:
      "Dites-nous vos besoins: volumes, grades, délais et points de friction logistiques. Nous répondons sous 24 h ouvrables.",
  },
  pt: {
    title: "Contacto · Atalant",
    description:
      "Diga-nos as suas necessidades: volumes, graus, prazos e gargalos logísticos. Respondemos em menos de 24 horas úteis.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return metadataByLocale[locale as AppLocale];
}

export default async function ContactoRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactoPage locale={locale as AppLocale} />;
}
