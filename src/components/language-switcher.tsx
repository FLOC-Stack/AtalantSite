"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { localeLabels, locales, type AppLocale } from "@/lib/locales";
import { switchLocalePath } from "@/lib/routes";

type Props = {
  currentLocale: AppLocale;
};

export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra al hacer click fuera o pulsar Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const currentShort = localeLabels[currentLocale].slice(0, 2);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Idioma: ${localeLabels[currentLocale]}`}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-foreground transition-colors hover:bg-foreground/5"
      >
        {currentShort}
        <ChevronDown
          className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Seleccionar idioma"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-2xl border border-white/60 bg-white/80 p-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md backdrop-saturate-150"
        >
          {locales.map((locale) => {
            const active = locale === currentLocale;
            const href = switchLocalePath(pathname, locale);

            return (
              <Link
                key={locale}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-foreground/5 font-medium text-foreground"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <span>{localeLabels[locale]}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                  {localeLabels[locale].slice(0, 2)}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
