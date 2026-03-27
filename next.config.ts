import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
const serverURLParts = new URL(serverURL);

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [{ pathname: "/media/**" }],
    remotePatterns: [
      {
        hostname: serverURLParts.hostname,
        protocol: serverURLParts.protocol.replace(":", "") as "http" | "https",
      },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
