"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/locales";
import { CONTACT_TOPICS, type ContactTopic } from "@/lib/contact-topics";

type Strings = {
  name: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  topic: string;
  topicPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  errorValidation: string;
  errorRate: string;
  fieldRequired: string;
  emailInvalid: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
};

const COPY: Record<AppLocale, Strings> = {
  es: {
    name: "Nombre completo",
    role: "Rol o cargo",
    phone: "Teléfono",
    email: "Email",
    company: "Empresa",
    topic: "¿Cómo te podemos ayudar?",
    topicPlaceholder: "Selecciona un asunto",
    message: "Cuéntanos un poco más",
    messagePlaceholder:
      "Volúmenes, tipo de polímero, plazos, certificaciones… cuanta más información, mejor.",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    successTitle: "Mensaje enviado",
    successBody:
      "Gracias. Nuestro equipo te responderá lo antes posible al email indicado.",
    errorGeneric: "No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
    errorValidation: "Revisa los campos marcados antes de enviar.",
    errorRate: "Has hecho demasiados envíos seguidos. Espera un minuto y vuelve a intentarlo.",
    fieldRequired: "Campo obligatorio.",
    emailInvalid: "Introduce un email válido.",
    privacyPrefix: "Al enviar este formulario aceptas nuestra",
    privacyLink: "política de privacidad",
    privacySuffix: "y el tratamiento de tus datos para responder a tu consulta.",
  },
  en: {
    name: "Full name",
    role: "Role or position",
    phone: "Phone number",
    email: "Email",
    company: "Company name",
    topic: "How can we help?",
    topicPlaceholder: "Select a topic",
    message: "Tell us a bit more",
    messagePlaceholder:
      "Volumes, polymer types, deadlines, certifications — the more detail, the better.",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Message sent",
    successBody:
      "Thank you. Our team will get back to you as soon as possible at the email provided.",
    errorGeneric: "We couldn't send your message. Please try again in a few minutes.",
    errorValidation: "Please review the highlighted fields before submitting.",
    errorRate: "Too many submissions in a row. Please wait a minute and try again.",
    fieldRequired: "Required field.",
    emailInvalid: "Enter a valid email.",
    privacyPrefix: "By submitting this form you accept our",
    privacyLink: "privacy policy",
    privacySuffix: "and the processing of your data to respond to your enquiry.",
  },
  pt: {
    name: "Nome completo",
    role: "Função ou cargo",
    phone: "Telefone",
    email: "Email",
    company: "Empresa",
    topic: "Como podemos ajudar?",
    topicPlaceholder: "Selecione um assunto",
    message: "Conte-nos um pouco mais",
    messagePlaceholder:
      "Volumes, tipo de polímero, prazos, certificações… quanto mais detalhe, melhor.",
    submit: "Enviar mensagem",
    sending: "A enviar…",
    successTitle: "Mensagem enviada",
    successBody:
      "Obrigado. A nossa equipa responderá assim que possível para o email indicado.",
    errorGeneric: "Não foi possível enviar a sua mensagem. Tente novamente em alguns minutos.",
    errorValidation: "Reveja os campos marcados antes de enviar.",
    errorRate: "Demasiados envios seguidos. Aguarde um minuto e tente novamente.",
    fieldRequired: "Campo obrigatório.",
    emailInvalid: "Introduza um email válido.",
    privacyPrefix: "Ao enviar este formulário aceita a nossa",
    privacyLink: "política de privacidade",
    privacySuffix: "e o tratamento dos seus dados para responder à sua consulta.",
  },
  fr: {
    name: "Nom complet",
    role: "Poste ou fonction",
    phone: "Téléphone",
    email: "Email",
    company: "Entreprise",
    topic: "Comment pouvons-nous vous aider ?",
    topicPlaceholder: "Sélectionnez un sujet",
    message: "Dites-nous en plus",
    messagePlaceholder:
      "Volumes, types de polymères, délais, certifications… plus c'est précis, mieux c'est.",
    submit: "Envoyer le message",
    sending: "Envoi…",
    successTitle: "Message envoyé",
    successBody:
      "Merci. Notre équipe vous répondra dès que possible à l'email indiqué.",
    errorGeneric: "Nous n'avons pas pu envoyer votre message. Réessayez dans quelques minutes.",
    errorValidation: "Veuillez vérifier les champs marqués avant l'envoi.",
    errorRate: "Trop d'envois successifs. Attendez une minute puis réessayez.",
    fieldRequired: "Champ obligatoire.",
    emailInvalid: "Saisissez un email valide.",
    privacyPrefix: "En soumettant ce formulaire, vous acceptez notre",
    privacyLink: "politique de confidentialité",
    privacySuffix: "et le traitement de vos données pour répondre à votre demande.",
  },
};

type Props = { locale: AppLocale };

type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", true>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactoForm({ locale }: Props) {
  const copy = COPY[locale];
  const pathname = usePathname();
  const mountedAt = useRef<number>(Date.now());

  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Las opciones del select se localizan en cliente — el value que viaja
  // al servidor es siempre estable (sales, products, …).
  const topicOptions = useMemo(
    () => CONTACT_TOPICS.map((t) => ({ value: t.value, label: t.label[locale] })),
    [locale],
  );

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const topic = String(formData.get("topic") || "").trim() as ContactTopic | "";
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || ""); // honeypot

    // Validación cliente — el servidor revalida igualmente.
    const errors: FieldErrors = {};
    if (!name) errors.name = true;
    if (!email || !EMAIL_RE.test(email)) errors.email = true;
    if (!topic || !topicOptions.find((t) => t.value === topic)) errors.topic = true;
    if (!message) errors.message = true;
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setErrorMsg(copy.errorValidation);
      return;
    }

    setFieldErrors({});
    setStatus("pending");
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          phone,
          email,
          company,
          topic,
          message,
          website,
          elapsedMs: Date.now() - mountedAt.current,
          locale,
          sourcePath: pathname || `/${locale}/contacto`,
        }),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMsg(copy.errorRate);
        return;
      }
      if (!response.ok) {
        // Imprime en la consola del navegador el detalle del servidor —
        // así el usuario ve si fue validación, BD u otra cosa.
        const detail = await response.json().catch(() => null);
        console.error("[contact] envío rechazado", response.status, detail);
        throw new Error(`Request failed (${response.status})`);
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(copy.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-[2rem] border border-foreground/8 bg-white/80 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm"
      >
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-primary">
          ✓ {copy.successTitle}
        </span>
        <p className="max-w-[460px] font-sans text-[18px] leading-[28px] tracking-[-0.2px] text-foreground">
          {copy.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 rounded-[2rem] border border-foreground/8 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:grid-cols-2 md:p-8 lg:p-10"
    >
      {/* Honeypot: invisible para humanos, irresistible para bots. */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field
        label={copy.name}
        name="name"
        type="text"
        autoComplete="name"
        required
        invalid={fieldErrors.name}
        errorMessage={copy.fieldRequired}
      />
      <Field
        label={copy.role}
        name="role"
        type="text"
        autoComplete="organization-title"
      />
      <Field
        label={copy.phone}
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
      />
      <Field
        label={copy.email}
        name="email"
        type="email"
        autoComplete="email"
        required
        invalid={fieldErrors.email}
        errorMessage={copy.emailInvalid}
      />
      <Field
        label={copy.company}
        name="company"
        type="text"
        autoComplete="organization"
        className="md:col-span-2"
      />

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
          {copy.topic} <span className="text-primary">*</span>
        </span>
        {/* Wrapper relative: el chevron va absoluto a la derecha. Evita el
            tileado del background-image y el doble icono nativo del <select>. */}
        <div className="relative">
          <select
            name="topic"
            required
            aria-invalid={fieldErrors.topic ? "true" : undefined}
            aria-describedby={fieldErrors.topic ? "contact-topic-error" : undefined}
            defaultValue=""
            className={`input-field w-full appearance-none pr-12 [&::-ms-expand]:hidden ${
              fieldErrors.topic ? "!border-red-500/60 !shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""
            }`}
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            <option value="" disabled>
              {copy.topicPlaceholder}
            </option>
            {topicOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 14 14"
            className="pointer-events-none absolute right-4 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-foreground"
          >
            <path
              d="M3 5.5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {fieldErrors.topic ? (
          <span
            id="contact-topic-error"
            className="font-mono text-[10px] uppercase tracking-[1.4px] text-red-600"
          >
            {copy.fieldRequired}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
          {copy.message} <span className="text-primary">*</span>
        </span>
        <textarea
          name="message"
          required
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          rows={6}
          maxLength={4000}
          placeholder={copy.messagePlaceholder}
          className={`input-field min-h-40 resize-y ${
            fieldErrors.message
              ? "!border-red-500/60 !shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : ""
          }`}
        />
        {fieldErrors.message ? (
          <span
            id="contact-message-error"
            className="font-mono text-[10px] uppercase tracking-[1.4px] text-red-600"
          >
            {copy.fieldRequired}
          </span>
        ) : null}
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[420px] font-sans text-[12px] leading-[18px] tracking-[-0.05px] text-muted">
          {copy.privacyPrefix}{" "}
          <Link
            href={`/${locale}/privacidad`}
            className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {copy.privacyLink}
          </Link>{" "}
          {copy.privacySuffix}
        </p>
        <div className="flex flex-col items-start gap-3 md:items-end">
          {status === "error" && errorMsg ? (
            <p
              role="alert"
              className="font-mono text-[11px] uppercase tracking-[1.5px] text-red-600"
            >
              {errorMsg}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "pending"}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-sans text-[14px] font-medium tracking-[-0.1px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "pending" ? copy.sending : copy.submit}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
};

function Field({
  label,
  name,
  type,
  autoComplete,
  inputMode,
  required,
  invalid,
  errorMessage,
  className,
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
        {label} {required ? <span className="text-primary">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={invalid ? errorId : undefined}
        maxLength={160}
        className={`input-field ${
          invalid ? "!border-red-500/60 !shadow-[0_0_0_4px_rgba(239,68,68,0.12)]" : ""
        }`}
      />
      {invalid && errorMessage ? (
        <span
          id={errorId}
          className="font-mono text-[10px] uppercase tracking-[1.4px] text-red-600"
        >
          {errorMessage}
        </span>
      ) : null}
    </label>
  );
}
