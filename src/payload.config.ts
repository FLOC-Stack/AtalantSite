import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
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
  localization: {
    defaultLocale: "es",
    fallback: true,
    locales: locales.map((locale) => ({
      code: locale,
      label: locale.toUpperCase(),
    })),
  },
  secret: process.env.PAYLOAD_SECRET || "dev-secret",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
