# Atalant Florence

Corporate site and catalog for Atalant built with Next.js 16, React 19, Tailwind 4, and Payload CMS 3.

## What is in the repo

- Multilingual public site with locale-prefixed routes:
  - `/es`
  - `/en`
  - `/pt`
  - `/fr`
- Localized product catalog routes:
  - `/es/productos`
  - `/en/products`
  - `/pt/produtos`
  - `/fr/produits`
- Payload admin and API inside the same Next app:
  - `/admin`
  - `/api/*`
- Contact form that stores leads in Payload.
- Payload Media backed by Vercel Blob in deployed environments.

Payload is the runtime source of truth for public content. The public site keeps
local fallback content only as an emergency safety net when the CMS is
unavailable.

## Environment

Copy `.env.example` to `.env` and set:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/atalant
PAYLOAD_SECRET=replace-me
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_AUTO_PUSH=true
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token
SEED_SECRET=optional-local-seed-secret
```

Notes:

- `DATABASE_URL` must point to Postgres.
- `PAYLOAD_SECRET` is required in real environments.
- `PAYLOAD_AUTO_PUSH=true` is the simplest local bootstrap path and lets Payload create or update the schema automatically.
- For stricter environments, turn `PAYLOAD_AUTO_PUSH` off and manage schema changes deliberately.
- `BLOB_READ_WRITE_TOKEN` is required in production and preview so Payload Media persists through Vercel Blob.

### Contact form email (Resend)

The `/contacto` form always stores the lead in Payload (`leadSubmissions`). Email
notifications are sent through [Resend](https://resend.com) and are **optional**:
if `RESEND_API_KEY` or `CONTACT_EMAIL_FROM` are missing, the API skips sending and
just persists the lead (no error).

```bash
RESEND_API_KEY=re_xxxxxxxx                       # Resend API key
CONTACT_EMAIL_FROM=Atalant <noreply@atalant.com> # must be a verified Resend domain
CONTACT_EMAIL_DEFAULT_TO=hi@wearefloc.com        # fallback recipient (default: hi@wearefloc.com)
CONTACT_EMAIL_BCC=hi@wearefloc.com               # master archive BCC (default: hi@wearefloc.com)
```

On each submission the API sends:

1. A **team notification** to the address resolved from the selected topic
   (`recipientForTopic`), with `CONTACT_EMAIL_BCC` as blind copy and `Reply-To`
   set to the visitor's email.
2. A localized **auto-reply** to the visitor, with `Reply-To` pointing at the
   master mailbox.

Per-topic routing overrides (all optional — each falls back to
`CONTACT_EMAIL_DEFAULT_TO`):

```bash
CONTACT_EMAIL_SALES=...
CONTACT_EMAIL_PRODUCTS=...
CONTACT_EMAIL_LOGISTICS=...
CONTACT_EMAIL_FINANCING=...
CONTACT_EMAIL_SUSTAINABILITY=...
CONTACT_EMAIL_PRESS=...
CONTACT_EMAIL_OTHER=...
```

> Until a domain is verified in Resend, the `onboarding@resend.dev` sender can only
> deliver to the email registered on your Resend account. Verify a domain
> (`wearefloc.com` / `atalant.com`) under Resend → Domains to send to any address.

## Local development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000/es`
- Payload admin: `http://localhost:3000/admin`

## Payload workflow

Generate admin imports after changing admin-related config:

```bash
npm run generate:importmap
```

Regenerate Payload types after changing collections or globals:

```bash
npm run generate:types
```

Seed the initial corporate content:

```bash
npm run seed
```

For the first local bootstrap, keep `PAYLOAD_AUTO_PUSH=true` so the schema exists before seeding.

The seed creates or updates critical media, then the canonical localized content:

- `siteSettings`
- localized `pages` entry for the home page
- localized static pages
- localized `productFamilies`

If production has stale Payload media records whose `/api/media/file/*` URLs 404,
re-upload critical media and reseed relations:

```bash
npm run media:sync
```

## Quality checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

Audit the deployed CMS state:

```bash
npm run cms:check
```

Check multiple deployments, for example production and preview:

```bash
npm run cms:check -- https://atalant-site.vercel.app https://your-preview-url.vercel.app
```

The CMS check validates localized settings, required pages, product families and
every referenced Payload media URL. It should pass before sending a deployment
to the client.

## Content model

### Globals

- `siteSettings`
  - brand data
  - contact data
  - default SEO
  - main navigation
  - footer links

### Collections

- `users`
- `media`
- `pages`
- `productFamilies`
- `leadSubmissions`

## Deployment notes

- This app expects Postgres and a valid `DATABASE_URL`.
- Production and preview must both define `DATABASE_URL`, `PAYLOAD_SECRET`,
  `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SERVER_URL`, and the contact email
  variables relevant to the environment.
- Payload Media uses Vercel Blob in deployed environments. Broken
  `/api/media/file/*` URLs mean Blob/media records need to be re-synced.
- The public routes are locale-prefixed by design and `/` redirects to `/es`.
- SEO support includes localized metadata, `robots.txt`, and `sitemap.xml`.
