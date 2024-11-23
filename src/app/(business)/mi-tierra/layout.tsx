import type { Metadata } from "next";

import '@fontsource/yanone-kaffeesatz';  // Fuente Anone Kaffeesatz

export const metadata: Metadata = {
  title: "Mi Tierra",
};

export default async function LayoutMiTierra({ children }: { children: React.ReactNode }) {
  //   const session = await getServerSession(authOptions);

  return (
    <div className="">
      <main className="min-h-screen w-full">{children}</main>
    </div>
  );
}
