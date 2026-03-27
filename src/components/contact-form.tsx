"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/locales";

type Props = {
  locale: AppLocale;
  submitLabel: string;
};

export function ContactForm({ locale, submitLabel }: Props) {
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
      setError("We could not send your request. Please try again.");
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
        <span className="text-sm text-body">Name</span>
        <input className="input-field" name="name" required type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">Email</span>
        <input className="input-field" name="email" required type="email" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">Company</span>
        <input className="input-field" name="company" type="text" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-body">Country</span>
        <input className="input-field" name="country" type="text" />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm text-body">Message</span>
        <textarea className="input-field min-h-36" name="message" required />
      </label>
      <div className="flex items-center justify-between gap-4 md:col-span-2">
        <div className="text-sm text-body">
          {success ? "Request sent." : error ? error : "We will respond as soon as possible."}
        </div>
        <button
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? "Sending..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
