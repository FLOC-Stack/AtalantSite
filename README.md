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
- Local media storage under `public/media`.

The public site can render from Payload data or fall back to local seed content if the CMS is not available yet.

## Environment

Copy `.env.example` to `.env` and set:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/atalant
PAYLOAD_SECRET=replace-me
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_AUTO_PUSH=true
SEED_SECRET=optional-local-seed-secret
```

Notes:

- `DATABASE_URL` must point to Postgres.
- `PAYLOAD_SECRET` is required in real environments.
- `PAYLOAD_AUTO_PUSH=true` is the simplest local bootstrap path and lets Payload create or update the schema automatically.
- For stricter environments, turn `PAYLOAD_AUTO_PUSH` off and manage schema changes deliberately.
- Media storage is local. Production deploys need persistent disk or this should be swapped later to object storage.

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

The seed creates or updates:

- `siteSettings`
- localized `pages` entry for the home page
- localized `productFamilies`

## Quality checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

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
- Payload uploads write to `public/media`, so production needs persistent storage.
- The public routes are locale-prefixed by design and `/` redirects to `/es`.
- SEO support includes localized metadata, `robots.txt`, and `sitemap.xml`.
