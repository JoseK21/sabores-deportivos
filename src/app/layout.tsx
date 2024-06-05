import "./globals.css";

import { Noto_Sans_Bengali } from "next/font/google";

const fontSystem = Noto_Sans_Bengali({ subsets: ["latin"] });

import Providers from "@/components/template/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { ErrorHandler } from "@/components/quinisports/_error-handlers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const __URL = "https://www.quinisports.com";
const __NAME = "QuiniSports";
const __DESCRIPTION =
  "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!";

export const metadata = {
  title: __NAME,
  other: { google: "notranslate" },
  authors: [{ name: "JDataByte" }],
  robots: { index: true, follow: true },
  verification: { google: "UmbI5KqAodg61vnQqbekEgSHPh5EsX_VzS2YrWVhh_M" },
  description: __DESCRIPTION,
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  metadataBase: new URL(__URL),
  alternates: { canonical: __URL },
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
  openGraph: {
    url: __URL,
    title: __NAME,
    type: "website",
    siteName: __NAME,
    description: __DESCRIPTION,
    images: [{ url: "/logo.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${fontSystem.className} antialiased`}>
        <ErrorHandler />
        <Providers session={session}>
          <Toaster />
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
