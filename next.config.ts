import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
const serverURLParts = new URL(serverURL);

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  images: {
    localPatterns: [{ pathname: "/media/**" }],
    remotePatterns: [
      {
        hostname: serverURLParts.hostname,
        protocol: serverURLParts.protocol.replace(":", "") as "http" | "https",
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
