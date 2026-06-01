import Link from "next/link";
import { NotFoundParticles } from "@/components/not-found-particles";
import { buildLocalePath } from "@/lib/routes";
import { defaultLocale, type AppLocale } from "@/lib/locales";

const copy: Record<
  AppLocale,
  {
    body: string;
    cta: string;
    eyebrow: string;
    title: string;
  }
> = {
  en: {
    body: "The route may not be published yet, or the requested translation is not available.",
    cta: "Back to home",
    eyebrow: "Error / 404",
    title: "This page does not exist.",
  },
  es: {
    body: "Puede que la ruta aún no esté publicada o que la traducción solicitada no esté disponible.",
    cta: "Volver al inicio",
    eyebrow: "Error / 404",
    title: "Esta página no existe.",
  },
  fr: {
    body: "La route n'est peut-être pas encore publiée ou la traduction demandée n'est pas disponible.",
    cta: "Retour à l'accueil",
    eyebrow: "Erreur / 404",
    title: "Cette page n'existe pas.",
  },
  pt: {
    body: "A rota pode ainda não estar publicada ou a tradução pedida pode não estar disponível.",
    cta: "Voltar ao início",
    eyebrow: "Erro / 404",
    title: "Esta página não existe.",
  },
};

type Props = {
  locale?: AppLocale;
};

export function NotFoundPageContent({ locale = defaultLocale }: Props) {
  const text = copy[locale];

  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-background px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-40">
      <div className="mx-auto flex min-h-[calc(100dvh-12rem)] max-w-[1180px] flex-col items-center justify-center">
        <section
          className="relative order-1 h-[300px] w-full max-w-5xl sm:h-[390px] lg:h-[460px]"
          aria-label="404"
        >
          <NotFoundParticles className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-[#1e4bb6]/20 to-transparent" />
        </section>

        <section className="order-2 mt-5 flex max-w-2xl flex-col items-center text-center sm:mt-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#1e4bb6]">
            {text.eyebrow}
          </p>
          <h1 className="mt-5 font-sans text-[clamp(2.6rem,5.4vw,5.8rem)] font-light leading-[0.95] tracking-[-0.045em] text-foreground">
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg font-sans text-base leading-[1.7] tracking-[-0.01em] text-body sm:text-lg">
            {text.body}
          </p>
          <Link className="cta-primary mt-9 w-fit" href={buildLocalePath(locale)}>
            {text.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}
