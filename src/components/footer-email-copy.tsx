"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { AppLocale } from "@/lib/locales";

const COPY: Record<AppLocale, { copy: string; copied: string }> = {
  es: { copy: "Copiar correo", copied: "Copiado" },
  en: { copy: "Copy email", copied: "Copied" },
  pt: { copy: "Copiar email", copied: "Copiado" },
  fr: { copy: "Copier l'email", copied: "Copié" },
};

type Props = {
  email: string;
  locale: AppLocale;
};

// Email + botón de copiar al portapapeles (sin mailto). Da feedback visual
// ("Copiado") durante 2s. Si la Clipboard API no está disponible (http,
// permisos), cae a un mailto para no dejar al usuario sin acción.
export function FooterEmailCopy({ email, locale }: Props) {
  const t = COPY[locale];
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // ignora y cae al fallback
    }
    window.location.href = `mailto:${email}`;
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`${t.copy}: ${email}`}
      className="group inline-flex items-center gap-2 font-sans text-[15px] tracking-[-0.1px] text-white/90 transition-opacity hover:opacity-70"
    >
      <span>{email}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100" aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? t.copied : ""}
      </span>
    </button>
  );
}
