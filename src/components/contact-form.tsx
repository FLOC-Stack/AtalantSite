"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/locales";

const formCopy: Record<
  AppLocale,
  {
    company: string;
    country: string;
    email: string;
    error: string;
    idle: string;
    message: string;
    name: string;
    sending: string;
    success: string;
  }
> = {
  en: {
    company: "Company",
    country: "Country",
    email: "Email",
    error: "We could not send your request. Please try again.",
    idle: "We will respond as soon as possible.",
    message: "Message",
    name: "Name",
    sending: "Sending...",
    success: "Request sent.",
  },
  es: {
    company: "Empresa",
    country: "País",
    email: "Correo electrónico",
    error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo.",
    idle: "Responderemos lo antes posible.",
    message: "Mensaje",
    name: "Nombre",
    sending: "Enviando...",
    success: "Solicitud enviada.",
  },
  fr: {
    company: "Entreprise",
    country: "Pays",
    email: "E-mail",
    error: "Nous n'avons pas pu envoyer votre demande. Réessayez.",
    idle: "Nous vous répondrons dès que possible.",
    message: "Message",
    name: "Nom",
    sending: "Envoi...",
    success: "Demande envoyée.",
  },
  pt: {
    company: "Empresa",
    country: "País",
    email: "Email",
    error: "Não foi possível enviar o seu pedido. Tente novamente.",
    idle: "Responderemos assim que possível.",
    message: "Mensagem",
    name: "Nome",
    sending: "A enviar...",
    success: "Pedido enviado.",
  },
};

type Props = {
  locale: AppLocale;
  submitLabel: string;
};

export function ContactForm({ locale, submitLabel }: Props) {
  const copy = formCopy[locale];
  const pathname = usePathname();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setSuccess(false);

    const payload = {
      company: String(formData.get("company") || ""),
      country: String(formData.get("country") || ""),
      email: String(formData.get("email") || ""),
      locale,
      message: String(formData.get("message") || ""),
      name: String(formData.get("name") || ""),
      sourcePath: pathname,
    };

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
    } catch {
      setError(copy.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      action={onSubmit}
      className="grid gap-4 rounded-[2rem] border border-foreground/8 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:grid-cols-2"
    >
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">{copy.name}</span>
        <input className="input-field" name="name" required type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">{copy.email}</span>
        <input className="input-field" name="email" required type="email" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">{copy.company}</span>
        <input className="input-field" name="company" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">{copy.country}</span>
        <input className="input-field" name="country" type="text" />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm text-body">{copy.message}</span>
        <textarea className="input-field min-h-36" name="message" required />
      </label>
      <div className="flex items-center justify-between gap-4 md:col-span-2">
        <div className="text-sm text-body">
          {success ? copy.success : error ? error : copy.idle}
        </div>
        <button
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? copy.sending : submitLabel}
        </button>
      </div>
    </form>
  );
}
