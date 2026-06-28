import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
const serverURLParts = new URL(serverURL);
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  async redirects() {
    return [
      {
        destination: "/es",
        permanent: true,
        source: "/es/inicio",
      },
      {
        destination: "/en",
        permanent: true,
        source: "/en/home",
      },
      {
        destination: "/fr",
        permanent: true,
        source: "/fr/accueil",
      },
      {
        destination: "/pt",
        permanent: true,
        source: "/pt/inicio",
      },
    ];
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    localPatterns: [
      { pathname: "/api/media/file/**" },
      { pathname: "/media/**" },
      { pathname: "/imgsrc/**" },
    ],
    remotePatterns: [
      {
        hostname: serverURLParts.hostname,
        protocol: serverURLParts.protocol.replace(":", "") as "http" | "https",
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
