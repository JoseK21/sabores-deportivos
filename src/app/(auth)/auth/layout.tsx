import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuiniSports | Inicio",
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
      <div className="flex h-screen overflow-hidden">
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </>
  );
}
