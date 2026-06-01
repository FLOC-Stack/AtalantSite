import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hasSpamIdentitySignals,
  normalizeContactSubmission,
} from "../src/lib/contact-request";
import {
  isContactTopic,
  masterBccAddress,
  recipientForTopic,
} from "../src/lib/contact-topics";

const validPayload = {
  company: "Atalant",
  email: "buyer@example.com",
  locale: "es",
  message: "Necesitamos cotización para PP reciclado.",
  name: "María García",
  phone: "+34 600 000 000",
  role: "Compras",
  sourcePath: "/es/contacto",
  topic: "sales",
};

describe("contact request validation", () => {
  it("normalizes a valid API payload", () => {
    assert.deepEqual(normalizeContactSubmission(validPayload), {
      company: "Atalant",
      country: "",
      email: "buyer@example.com",
      locale: "es",
      message: "Necesitamos cotización para PP reciclado.",
      name: "María García",
      phone: "+34 600 000 000",
      role: "Compras",
      sourcePath: "/es/contacto",
      topic: "sales",
    });
  });

  it("rejects missing topic because the API requires routing context", () => {
    const payloadWithoutTopic: Record<string, unknown> = { ...validPayload };
    delete payloadWithoutTopic.topic;

    assert.equal(normalizeContactSubmission(payloadWithoutTopic), null);
  });

  it("rejects invalid email and locale values", () => {
    assert.equal(
      normalizeContactSubmission({ ...validPayload, email: "not-an-email" }),
      null,
    );
    assert.equal(
      normalizeContactSubmission({ ...validPayload, locale: "de" }),
      null,
    );
  });

  it("falls back to the locale contact path when sourcePath is missing", () => {
    const result = normalizeContactSubmission({ ...validPayload, sourcePath: "" });

    assert.equal(result?.sourcePath, "/es/contacto");
  });

  it("detects URL spam signals in identity fields", () => {
    assert.equal(hasSpamIdentitySignals("https://spam.example", ""), true);
    assert.equal(hasSpamIdentitySignals("Buyer", "www.spam.example"), true);
    assert.equal(hasSpamIdentitySignals("Buyer", "Purchasing"), false);
  });
});

describe("contact topic routing", () => {
  it("keeps topic values stable for API routing", () => {
    assert.equal(isContactTopic("sales"), true);
    assert.equal(isContactTopic("unknown"), false);
  });

  it("uses per-topic email overrides before default recipients", () => {
    const previousSales = process.env.CONTACT_EMAIL_SALES;
    const previousDefault = process.env.CONTACT_EMAIL_DEFAULT_TO;

    process.env.CONTACT_EMAIL_SALES = "sales@example.com";
    process.env.CONTACT_EMAIL_DEFAULT_TO = "default@example.com";

    assert.equal(recipientForTopic("sales"), "sales@example.com");
    assert.equal(recipientForTopic("products"), "default@example.com");

    if (previousSales === undefined) delete process.env.CONTACT_EMAIL_SALES;
    else process.env.CONTACT_EMAIL_SALES = previousSales;
    if (previousDefault === undefined) delete process.env.CONTACT_EMAIL_DEFAULT_TO;
    else process.env.CONTACT_EMAIL_DEFAULT_TO = previousDefault;
  });

  it("uses the configured master BCC", () => {
    const previousBcc = process.env.CONTACT_EMAIL_BCC;

    process.env.CONTACT_EMAIL_BCC = "archive@example.com";

    assert.equal(masterBccAddress(), "archive@example.com");

    if (previousBcc === undefined) delete process.env.CONTACT_EMAIL_BCC;
    else process.env.CONTACT_EMAIL_BCC = previousBcc;
  });
});
