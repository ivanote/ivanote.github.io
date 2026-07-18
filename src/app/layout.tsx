import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://ivanote.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Iván Gallego Vela — Full Stack Developer · Laravel · React / Next.js",
  description:
    "Full Stack Developer con 6 años de experiencia. Backend Laravel sobre microservicios, frontends React / Next.js / TypeScript, Docker y CI/CD. IA integrada en el día a día.",
  keywords: [
    "Iván Gallego Vela",
    "Full Stack Developer",
    "Laravel",
    "React",
    "Next.js",
    "TypeScript",
    "PHP",
    "Docker",
    "Barcelona",
    "Terrassa",
  ],
  authors: [{ name: "Iván Gallego Vela" }],
  openGraph: {
    title: "Iván Gallego Vela — Full Stack Developer",
    description:
      "Backend Laravel · Frontend React/Next.js · TypeScript · Docker · IA. 6 años construyendo software de principio a fin.",
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Iván Gallego Vela — Full Stack Developer",
    description:
      "Backend Laravel · Frontend React/Next.js · TypeScript · Docker · IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mono.variable} ${sans.variable} antialiased`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
