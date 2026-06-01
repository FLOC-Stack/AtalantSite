import configPromise from "@payload-config";
import { isLocale, type AppLocale } from "@/lib/locales";
import { getPayload } from "payload";
import {
  CONTACT_TOPICS,
  isContactTopic,
  masterBccAddress,
  recipientForTopic,
  type ContactTopic,
} from "@/lib/contact-topics";

export const runtime = "nodejs";

// === Anti-spam: rate limit en memoria ===
// 5 envíos por IP cada 60s. Map en módulo: sobrevive entre requests del
// mismo worker. En serverless cold start se reinicia, pero detiene los
// ataques sostenidos desde una misma IP en una instancia caliente.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const ipHits = new Map<string, number[]>();

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  // Limpieza esporádica para que el Map no crezca sin parar.
  if (ipHits.size > 5_000) {
    for (const [key, ts] of ipHits) {
      if (ts.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) ipHits.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Validación de email moderada — rechaza basura evidente sin pretender
// cubrir el RFC entero (de eso se ocupa el envío real).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Límites de longitud generosos pero suficientes para frenar payloads
// abusivos. Cualquier exceso → 400.
const LIMITS = {
  name: 120,
  role: 120,
  phone: 40,
  email: 160,
  company: 160,
  country: 80,
  message: 4_000,
} as const;

function asString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length > max) return null;
  return trimmed;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(input: {
  name: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  topic: ContactTopic;
  topicLabel: string;
  message: string;
  locale: string;
  sourcePath: string;
}): string {
  const rows: Array<[string, string]> = [
    ["Nombre", input.name],
    ["Rol", input.role || "—"],
    ["Teléfono", input.phone || "—"],
    ["Email", input.email],
    ["Empresa", input.company || "—"],
    ["Asunto", input.topicLabel],
    ["Idioma", input.locale],
    ["Origen", input.sourcePath],
  ];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;font-family:system-ui,sans-serif;font-size:13px;">${escapeHtml(k)}</td><td style="padding:4px 0;font-family:system-ui,sans-serif;font-size:14px;color:#111;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f7fd;">
    <table style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e8f1;border-radius:12px;padding:24px;font-family:system-ui,sans-serif;">
      <tr><td>
        <h1 style="font-size:18px;font-weight:600;color:#1e4bb6;margin:0 0 16px;">Nueva consulta de contacto</h1>
        <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
        <h2 style="font-size:14px;font-weight:600;color:#111;margin:20px 0 8px;">Mensaje</h2>
        <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#333;margin:0;">${escapeHtml(input.message)}</p>
      </td></tr>
    </table>
  </body></html>`;
}

async function sendEmail(input: {
  to: string;
  bcc?: string;
  replyTo: string;
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !from) {
    // Sin credenciales aún — la lead queda guardada en Payload y un
    // operador puede atenderla manualmente. No es error.
    console.info("[contact] RESEND_API_KEY/CONTACT_EMAIL_FROM no configurados; salto envío");
    return;
  }

  // No incluimos BCC si coincide con el destinatario para evitar duplicados
  // (p. ej. cuando el `to` cae al fallback hi@wearefloc.com).
  const bcc =
    input.bcc && input.bcc.toLowerCase() !== input.to.toLowerCase() ? input.bcc : undefined;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: input.to,
      ...(bcc ? { bcc } : {}),
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[contact] Resend error", response.status, text);
    throw new Error("Email send failed");
  }
}

// === Auto-respuesta al usuario ===
// Confirmación amable, localizada, con copia textual del mensaje para
// que tenga claro qué nos envió. El `reply_to` apunta al buzón maestro
// para que cualquier respuesta del cliente caiga ahí.
type AutoReplyStrings = {
  subject: string;
  greeting: (name: string) => string;
  body: string;
  summary: string;
  signature: string;
  signatureLine: string;
};

const AUTO_REPLY_COPY: Record<AppLocale, AutoReplyStrings> = {
  es: {
    subject: "Hemos recibido tu mensaje · Atalant",
    greeting: (name) => `Hola ${name},`,
    body: "Gracias por contactar con Atalant. Hemos recibido tu mensaje y el equipo te responderá en menos de 24 horas laborables.",
    summary: "Resumen de tu consulta",
    signature: "Equipo Atalant",
    signatureLine: "atalant.com  ·  +34 965 661 828",
  },
  en: {
    subject: "We've received your message · Atalant",
    greeting: (name) => `Hi ${name},`,
    body: "Thanks for getting in touch with Atalant. We have received your message and our team will get back to you within 24 working hours.",
    summary: "Summary of your enquiry",
    signature: "Atalant team",
    signatureLine: "atalant.com  ·  +34 965 661 828",
  },
  pt: {
    subject: "Recebemos a sua mensagem · Atalant",
    greeting: (name) => `Olá ${name},`,
    body: "Obrigado por entrar em contacto com a Atalant. Recebemos a sua mensagem e a nossa equipa responderá em menos de 24 horas úteis.",
    summary: "Resumo da sua consulta",
    signature: "Equipa Atalant",
    signatureLine: "atalant.com  ·  +34 965 661 828",
  },
  fr: {
    subject: "Nous avons bien reçu votre message · Atalant",
    greeting: (name) => `Bonjour ${name},`,
    body: "Merci d'avoir contacté Atalant. Nous avons bien reçu votre message et notre équipe vous répondra sous 24 heures ouvrées.",
    summary: "Résumé de votre demande",
    signature: "Équipe Atalant",
    signatureLine: "atalant.com  ·  +34 965 661 828",
  },
};

function buildAutoReplyHtml(input: {
  locale: AppLocale;
  name: string;
  topicLabel: string;
  message: string;
}): string {
  const t = AUTO_REPLY_COPY[input.locale];
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f7fd;">
    <table style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e8f1;border-radius:12px;padding:32px;font-family:system-ui,sans-serif;color:#1b1c1a;">
      <tr><td>
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${escapeHtml(t.greeting(input.name))}</p>
        <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 24px;">${escapeHtml(t.body)}</p>
        <h2 style="font-size:13px;font-weight:600;color:#1e4bb6;text-transform:uppercase;letter-spacing:1.5px;margin:24px 0 12px;">${escapeHtml(t.summary)}</h2>
        <p style="font-size:13px;color:#555;margin:0 0 4px;">${escapeHtml(input.topicLabel)}</p>
        <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#1b1c1a;background:#f6f7fd;border-radius:8px;padding:16px;margin:8px 0 24px;">${escapeHtml(input.message)}</p>
        <p style="font-size:14px;color:#1b1c1a;margin:32px 0 4px;font-weight:500;">${escapeHtml(t.signature)}</p>
        <p style="font-size:12px;color:#888;margin:0;">${escapeHtml(t.signatureLine)}</p>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (tooManyRequests(ip)) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Honeypot — si el bot rellena el campo oculto, devolvemos 200 para
    // no darle pistas, pero descartamos en silencio.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return Response.json({ ok: true });
    }

    // Guardia temporal — formularios enviados en <2s casi siempre son bots.
    const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
    if (elapsed > 0 && elapsed < 2_000) {
      return Response.json({ ok: true });
    }

    const name = asString(body.name, LIMITS.name);
    const role = asString(body.role, LIMITS.role) ?? "";
    const phone = asString(body.phone, LIMITS.phone) ?? "";
    const email = asString(body.email, LIMITS.email);
    const company = asString(body.company, LIMITS.company) ?? "";
    const country = asString(body.country, LIMITS.country) ?? "";
    const message = asString(body.message, LIMITS.message);
    const localeRaw = typeof body.locale === "string" ? body.locale : "";
    const sourcePathRaw = typeof body.sourcePath === "string" ? body.sourcePath : "";
    const topicRaw = typeof body.topic === "string" ? body.topic : "";

    if (
      !name ||
      !email ||
      !message ||
      !EMAIL_RE.test(email) ||
      !isLocale(localeRaw) ||
      !isContactTopic(topicRaw)
    ) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    // URLs en el nombre o el rol son señal casi inequívoca de spam.
    if (/(https?:\/\/|www\.)/i.test(name) || /(https?:\/\/|www\.)/i.test(role)) {
      return Response.json({ ok: true });
    }

    const topic = topicRaw as ContactTopic;
    const topicLabel =
      CONTACT_TOPICS.find((t) => t.value === topic)?.label.es ?? topic;

    // Si la BD no está configurada, devolvemos un error explícito en vez
    // de explotar dentro de Payload con un stack confuso.
    if (!process.env.DATABASE_URL) {
      console.error("[contact] DATABASE_URL no configurada — no se puede guardar la lead");
      return Response.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    try {
      const payload = await getPayload({ config: configPromise });
      await payload.create({
        collection: "leadSubmissions",
        data: {
          company,
          country,
          email,
          locale: localeRaw,
          message,
          name,
          phone,
          role,
          sourcePath: sourcePathRaw || `/${localeRaw}/contacto`,
          topic,
        },
      });
    } catch (dbError) {
      console.error("[contact] payload.create falló:", dbError);
      return Response.json(
        {
          error: "Persistence failed",
          // En dev exponemos el mensaje real para depurar; en prod no.
          detail:
            process.env.NODE_ENV !== "production" && dbError instanceof Error
              ? dbError.message
              : undefined,
        },
        { status: 500 },
      );
    }

    // === Email al equipo (con BCC a la cuenta maestra) ===
    // No falla la request si Resend está caído — la lead ya está persistida.
    try {
      const recipient = recipientForTopic(topic);
      await sendEmail({
        to: recipient,
        bcc: masterBccAddress(),
        replyTo: email,
        subject: `[Atalant] ${topicLabel} — ${name}`,
        html: buildEmailHtml({
          company,
          email,
          locale: localeRaw,
          message,
          name,
          phone,
          role,
          sourcePath: sourcePathRaw || `/${localeRaw}/contacto`,
          topic,
          topicLabel,
        }),
      });
    } catch (emailError) {
      console.error("[contact] notification email failed", emailError);
    }

    // === Auto-respuesta al usuario que rellenó el formulario ===
    // Confirmación amable en su idioma. El reply_to apunta al buzón
    // maestro para que cualquier respuesta del cliente caiga ahí.
    try {
      const localeTyped = localeRaw as AppLocale;
      const autoReplyTopicLabel =
        CONTACT_TOPICS.find((t) => t.value === topic)?.label[localeTyped] ?? topicLabel;
      await sendEmail({
        to: email,
        replyTo: masterBccAddress(),
        subject: AUTO_REPLY_COPY[localeTyped].subject,
        html: buildAutoReplyHtml({
          locale: localeTyped,
          name,
          topicLabel: autoReplyTopicLabel,
          message,
        }),
      });
    } catch (autoReplyError) {
      console.error("[contact] auto-reply email failed", autoReplyError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
