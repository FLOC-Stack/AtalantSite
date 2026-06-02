import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { locales } from "./lib/locales";
import { LeadSubmissions } from "./payload/collections/LeadSubmissions";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { ProductFamilies } from "./payload/collections/ProductFamilies";
import { Users } from "./payload/collections/Users";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Media, Pages, ProductFamilies, LeadSubmissions],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: process.env.PAYLOAD_AUTO_PUSH === "true",
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  i18n: {
    fallbackLanguage: "es",
    supportedLanguages: {
      en,
      es,
    },
  },
  localization: {
    defaultLocale: "es",
    fallback: true,
    locales: locales.map((locale) => ({
      code: locale,
      label: locale.toUpperCase(),
    })),
  },
  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "dev-secret",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
