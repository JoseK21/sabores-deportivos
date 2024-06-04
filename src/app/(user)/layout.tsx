import HomeFooter from "@/components/quinisports/footers/HomeFooter";
import HomeHeader from "@/components/quinisports/headers/HomeHeader";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { ALLOWER_ROLES_TO_BUSINESS_LOGIC } from "../constants";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "QuiniSports",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  metadataBase: new URL("https://www.quinisports.com"),
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://wwww.quinisports.com",
    title: "QuiniSports",
    description:
      "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
    siteName: "QuiniSports",
    images: [{ url: "/logo.png" }],
  },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role && ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(session?.user.role)) {
    redirect("/qs-admin");
  }

  if (headers().get("quini-access") != "true") {
    redirect("/en-mantenimiento");
  }

  return (
    <>
      <HomeHeader session={session} />
      <div className="flex overflow-hidden max-w-7xl mx-auto">
        <main className="min-h-screen w-full">{children}</main>
      </div>
      <HomeFooter />
    </>
  );
}
