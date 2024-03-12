import HomeFooter from "@/components/quinisports/footers/HomeFooter";
import HomeHeader from "@/components/quinisports/headers/HomeHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuiniSports | Clientes",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  metadataBase: new URL("https://www.quinisports.com"),
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      <div className="flex overflow-hidden max-w-7xl mx-auto">
        <main className="min-h-screen w-full">{children}</main>
      </div>
      <HomeFooter />
    </>
  );
}
