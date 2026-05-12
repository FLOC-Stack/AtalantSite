import { NotFoundPageContent } from "@/components/not-found-page";
import { defaultLocale, isLocale, type AppLocale } from "@/lib/locales";

type Props = {
  params?: Promise<{
    locale: string;
  }>;
};

export default async function NotFoundPage({ params }: Props) {
  const { locale } = (await params) ?? { locale: defaultLocale };
  const validLocale = isLocale(locale) ? locale : defaultLocale;

  return <NotFoundPageContent locale={validLocale as AppLocale} />;
}
