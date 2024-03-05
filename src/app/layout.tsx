import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/template/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";

// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
// <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
// <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
// <link rel="manifest" href="/site.webmanifest" />
// <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
// <meta name="msapplication-TileColor" content="#da532c" />
// <meta name="theme-color" content="#ffffff" />
export const metadata: Metadata = {
  title: "QuiniSports",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  robots: "",
  manifest: "",
  metadataBase: new URL('https://www.quinisports.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-SP': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    type: "website",
    url: "https://wwww.quinisports.com",
    title: "QuiniSports",
    description:
      "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
    siteName: "QuiniSports",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );

  // return (
  //   <html lang="es" translate="no">
  //     <Head>
  //       <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  //       <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  //       <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  //       <link rel="manifest" href="/site.webmanifest" />
  //       <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  //       <meta name="msapplication-TileColor" content="#da532c" />
  //       <meta name="theme-color" content="#ffffff" />
  //     </Head>
  //     <body>{children}</body>
  //   </html>
  // );
}
