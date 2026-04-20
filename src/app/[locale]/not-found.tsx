import Link from "next/link";
import { buildLocalePath } from "@/lib/routes";
import { defaultLocale, isLocale, type AppLocale } from "@/lib/locales";

const copy: Record<
  AppLocale,
  {
    body: string;
    cta: string;
    title: string;
  }
> = {
  en: {
    body: "The route may not be published yet, or the requested translation is not available.",
    cta: "Back to home",
    title: "This page does not exist.",
  },
  es: {
    body: "Puede que la ruta aún no esté publicada o que la traducción solicitada no esté disponible.",
    cta: "Volver al inicio",
    title: "Esta página no existe.",
  },
  fr: {
    body: "La route n'est peut-être pas encore publiée ou la traduction demandée n'est pas disponible.",
    cta: "Retour à l'accueil",
    title: "Cette page n'existe pas.",
  },
  pt: {
    body: "A rota pode ainda não estar publicada ou a tradução pedida pode não estar disponível.",
    cta: "Voltar ao início",
    title: "Esta página não existe.",
  },
};

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleNotFound({ params }: Props) {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : defaultLocale;
  const text = copy[validLocale];

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        404
      </p>
      <h1 className="mt-4 max-w-2xl text-5xl leading-none tracking-tight text-foreground">
        {text.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-body">
        {text.body}
      </p>
      <Link className="cta-primary mt-8 w-fit" href={buildLocalePath(validLocale)}>
        {text.cta}
      </Link>
    </main>
  );
}
