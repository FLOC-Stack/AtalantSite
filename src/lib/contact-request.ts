import { isLocale, type AppLocale } from "@/lib/locales";
import { buildContactoPath } from "@/lib/routes";
import { isContactTopic, type ContactTopic } from "@/lib/contact-topics";

export const CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  name: 120,
  role: 120,
  phone: 40,
  email: 160,
  company: 160,
  country: 80,
  message: 4_000,
} as const;

export type NormalizedContactSubmission = {
  company: string;
  country: string;
  email: string;
  locale: AppLocale;
  message: string;
  name: string;
  phone: string;
  role: string;
  sourcePath: string;
  topic: ContactTopic;
};

export function asContactString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length > max) return null;
  return trimmed;
}

export function hasSpamIdentitySignals(name: string, role: string): boolean {
  return /(https?:\/\/|www\.)/i.test(name) || /(https?:\/\/|www\.)/i.test(role);
}

export function normalizeContactSubmission(
  body: Record<string, unknown>,
): NormalizedContactSubmission | null {
  const name = asContactString(body.name, CONTACT_LIMITS.name);
  const role = asContactString(body.role, CONTACT_LIMITS.role) ?? "";
  const phone = asContactString(body.phone, CONTACT_LIMITS.phone) ?? "";
  const email = asContactString(body.email, CONTACT_LIMITS.email);
  const company = asContactString(body.company, CONTACT_LIMITS.company) ?? "";
  const country = asContactString(body.country, CONTACT_LIMITS.country) ?? "";
  const message = asContactString(body.message, CONTACT_LIMITS.message);
  const localeRaw = typeof body.locale === "string" ? body.locale : "";
  const sourcePathRaw = typeof body.sourcePath === "string" ? body.sourcePath.trim() : "";
  const topicRaw = typeof body.topic === "string" ? body.topic : "";

  if (
    !name ||
    !email ||
    !message ||
    !CONTACT_EMAIL_RE.test(email) ||
    !isLocale(localeRaw) ||
    !isContactTopic(topicRaw)
  ) {
    return null;
  }

  return {
    company,
    country,
    email,
    locale: localeRaw,
    message,
    name,
    phone,
    role,
    sourcePath: sourcePathRaw || buildContactoPath(localeRaw),
    topic: topicRaw,
  };
}
