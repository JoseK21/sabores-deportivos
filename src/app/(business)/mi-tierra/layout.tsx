import type { Metadata } from "next";

import "@fontsource/yanone-kaffeesatz"; // Fuente Anone Kaffeesatz
import HeaderMiTierra from "@/components/(business)/mi-tierra/header/header";
import FooterMiTierra from "@/components/(business)/mi-tierra/footer/footer";

export const metadata: Metadata = {
  title: "Mi Tierra",
};

export default async function LayoutMiTierra({ children }: { children: React.ReactNode }) {
  //   const session = await getServerSession(authOptions);

  return (
    <div className="">
      <HeaderMiTierra />
      <main className="min-h-screen w-full">{children}</main>
      <FooterMiTierra />
    </div>
  );
}
