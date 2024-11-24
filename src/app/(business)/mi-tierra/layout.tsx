import type { Metadata } from "next";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import "@fontsource/yanone-kaffeesatz"; // Fuente Anone Kaffeesatz

import HeaderMiTierra from "@/components/(business)/mi-tierra/header/header";
import FooterMiTierra from "@/components/(business)/mi-tierra/footer/footer";

export const metadata: Metadata = {
  title: "Mi Tierra",
};

export default async function LayoutMiTierra({ children }: { children: React.ReactNode }) {
  //   const session = await getServerSession(authOptions);
  const session = await getServerSession(authOptions);

  return (
    <div className="">
      <HeaderMiTierra session={session} />
      <main className="min-h-screen w-full">{children}</main>
      <FooterMiTierra />
    </div>
  );
}
