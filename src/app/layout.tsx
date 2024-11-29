import "./globals.css";

import { Noto_Sans_Bengali } from "next/font/google";

const fontSystem = Noto_Sans_Bengali({ subsets: ["latin"] });

import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { __DESCRIPTION, __NAME, __URL } from "./seo";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/saboresdeportivos/layout/providers";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { ErrorHandler } from "@/components/saboresdeportivos/_error-handlers";
import NextTopLoader from "nextjs-toploader";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: __NAME,
  other: { google: "notranslate" },
  authors: [{ name: "JDataByte", url: "https://jdatabyte.com" }],
  robots: { index: true, follow: true },
  verification: { google: "UmbI5KqAodg61vnQqbekEgSHPh5EsX_VzS2YrWVhh_M" },
  description: __DESCRIPTION,
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  creator: "JDataByte",
  metadataBase: new URL(__URL),
  alternates: { canonical: __URL },
  icons: { icon: "/new-logo.png", shortcut: "/new-logo.png", apple: "/new-logo.png" },
  openGraph: {
    url: __URL,
    title: __NAME,
    type: "website",
    siteName: __NAME,
    description: __DESCRIPTION,
    images: [{ url: "/new-logo.png" }],
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
        <NextTopLoader
          color="#3daa47"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />
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
