import { fallbackSiteSettings } from "../src/lib/fallback-content";
import { locales, type AppLocale } from "../src/lib/locales";

type CheckFailure = {
  target: string;
  message: string;
};

type MediaReference = {
  source: string;
  url: string;
};

const defaultTargets = ["https://atalant-site.vercel.app"];
const targetArgs = process.argv.slice(2).filter(Boolean);
const envTargets = process.env.CMS_CHECK_BASE_URLS?.split(",")
  .map((target) => target.trim())
  .filter(Boolean);
const targets = targetArgs.length ? targetArgs : envTargets?.length ? envTargets : defaultTargets;

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function absoluteUrl(baseUrl: string, value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${baseUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

async function fetchJson<T>(baseUrl: string, path: string): Promise<T> {
  const response = await fetch(absoluteUrl(baseUrl, path), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return (await response.json()) as T;
}

async function assertOk(baseUrl: string, path: string, failures: CheckFailure[]) {
  try {
    const response = await fetch(absoluteUrl(baseUrl, path), { method: "HEAD" });
    if (!response.ok) {
      failures.push({
        target: baseUrl,
        message: `${path} returned ${response.status}`,
      });
    }
  } catch (error) {
    failures.push({
      target: baseUrl,
      message: `${path} failed: ${error instanceof Error ? error.message : error}`,
    });
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function collectMedia(value: unknown, source: string, output: MediaReference[]) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectMedia(entry, `${source}[${index}]`, output));
    return;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.url === "string" && record.url.startsWith("/api/media/file/")) {
    output.push({ source, url: record.url });
  }

  for (const [key, nestedValue] of Object.entries(record)) {
    if (nestedValue && typeof nestedValue === "object") {
      collectMedia(nestedValue, `${source}.${key}`, output);
    }
  }
}

function validateSiteSettings(
  baseUrl: string,
  locale: AppLocale,
  settings: Record<string, unknown>,
  failures: CheckFailure[],
) {
  const expected = fallbackSiteSettings[locale];
  const expectedHref = `/${locale}/contacto`;

  for (const [field, expectedValue] of [
    ["brandName", expected.brandName],
    ["contactEmail", expected.contactEmail],
    ["headerCtaHref", expectedHref],
    ["headerCtaLabel", expected.headerCtaLabel],
    ["tagline", expected.tagline],
  ] as const) {
    if (settings[field] !== expectedValue) {
      failures.push({
        target: baseUrl,
        message: `siteSettings ${locale}.${field} expected ${JSON.stringify(
          expectedValue,
        )}, got ${JSON.stringify(settings[field])}`,
      });
    }
  }
}

function validatePageResponse(
  baseUrl: string,
  locale: AppLocale,
  slug: string,
  response: Record<string, unknown>,
  failures: CheckFailure[],
) {
  const docs = Array.isArray(response.docs) ? response.docs : [];
  const page = asRecord(docs[0]);
  if (!page) {
    failures.push({ target: baseUrl, message: `Missing page ${slug} for ${locale}` });
    return;
  }
  if (page._status !== "published") {
    failures.push({
      target: baseUrl,
      message: `Page ${slug} for ${locale} is not published`,
    });
  }
}

function validateFamiliesResponse(
  baseUrl: string,
  locale: AppLocale,
  response: Record<string, unknown>,
  failures: CheckFailure[],
) {
  const docs = Array.isArray(response.docs) ? response.docs : [];
  if (docs.length < 7) {
    failures.push({
      target: baseUrl,
      message: `Expected at least 7 product families for ${locale}, got ${docs.length}`,
    });
  }

  const requiredSlugs = new Set(["pe", "pp", "pvc", "eva", "ps", "pet", "recycled"]);
  for (const doc of docs) {
    const family = asRecord(doc);
    if (typeof family?.slug === "string") requiredSlugs.delete(family.slug);
  }

  if (requiredSlugs.size) {
    failures.push({
      target: baseUrl,
      message: `Missing product families for ${locale}: ${Array.from(requiredSlugs).join(", ")}`,
    });
  }
}

async function validateMedia(
  baseUrl: string,
  references: MediaReference[],
  failures: CheckFailure[],
) {
  const uniqueReferences = Array.from(
    new Map(references.map((reference) => [reference.url, reference])).values(),
  );

  await Promise.all(
    uniqueReferences.map(async (reference) => {
      try {
        const response = await fetch(absoluteUrl(baseUrl, reference.url), { method: "HEAD" });
        if (!response.ok) {
          failures.push({
            target: baseUrl,
            message: `Media ${reference.url} from ${reference.source} returned ${response.status}`,
          });
        }
      } catch (error) {
        failures.push({
          target: baseUrl,
          message: `Media ${reference.url} from ${reference.source} failed: ${
            error instanceof Error ? error.message : error
          }`,
        });
      }
    }),
  );
}

async function checkTarget(rawTarget: string): Promise<CheckFailure[]> {
  const baseUrl = normalizeBaseUrl(rawTarget);
  const failures: CheckFailure[] = [];
  const mediaReferences: MediaReference[] = [];

  await assertOk(baseUrl, "/es", failures);
  await assertOk(baseUrl, "/admin", failures);
  await assertOk(baseUrl, "/sitemap.xml", failures);

  for (const locale of locales) {
    try {
      const settings = await fetchJson<Record<string, unknown>>(
        baseUrl,
        `/api/globals/siteSettings?locale=${locale}&depth=1`,
      );
      validateSiteSettings(baseUrl, locale, settings, failures);
    } catch (error) {
      failures.push({
        target: baseUrl,
        message: `siteSettings ${locale} failed: ${error instanceof Error ? error.message : error}`,
      });
    }

    for (const slug of ["home", "logistica", "nosotros", "sostenibilidad", "financiacion"]) {
      try {
        const pageResponse = await fetchJson<Record<string, unknown>>(
          baseUrl,
          `/api/pages?locale=${locale}&where%5Bslug%5D%5Bequals%5D=${slug}&limit=1&depth=2`,
        );
        validatePageResponse(baseUrl, locale, slug, pageResponse, failures);
        collectMedia(pageResponse, `pages.${locale}.${slug}`, mediaReferences);
      } catch (error) {
        failures.push({
          target: baseUrl,
          message: `Page ${slug} for ${locale} failed: ${
            error instanceof Error ? error.message : error
          }`,
        });
      }
    }

    try {
      const familiesResponse = await fetchJson<Record<string, unknown>>(
        baseUrl,
        `/api/productFamilies?locale=${locale}&limit=100&depth=2`,
      );
      validateFamiliesResponse(baseUrl, locale, familiesResponse, failures);
      collectMedia(familiesResponse, `productFamilies.${locale}`, mediaReferences);
    } catch (error) {
      failures.push({
        target: baseUrl,
        message: `Product families for ${locale} failed: ${
          error instanceof Error ? error.message : error
        }`,
      });
    }
  }

  await validateMedia(baseUrl, mediaReferences, failures);
  return failures;
}

const allFailures = (
  await Promise.all(targets.map((target) => checkTarget(target)))
).flat();

if (allFailures.length) {
  console.error("CMS check failed:");
  for (const failure of allFailures) {
    console.error(`- ${failure.target}: ${failure.message}`);
  }
  process.exit(1);
}

console.log(`CMS check passed for ${targets.map(normalizeBaseUrl).join(", ")}`);
