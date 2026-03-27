import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { getServerURL } from "@/lib/server-url";
import "./globals.css";

const aeonik = localFont({
  variable: "--font-sans",
  src: [
    { path: "../fonts/Aeonik-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Aeonik-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/Aeonik-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Aeonik-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Aeonik-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Aeonik-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getServerURL()),
  title: "Atalant",
  description:
    "Industrial polymer sourcing, recycled materials, and operational support for European manufacturing buyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${aeonik.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
