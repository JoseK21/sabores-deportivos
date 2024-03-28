import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ALLOWER_ROLES_TO_BUSINESS_LOGIC } from "@/app/constants";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role && ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(session?.user.role)) {
    redirect("/qs-admin");
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </>
  );
}
