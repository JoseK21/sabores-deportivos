import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ACCESS_HEADER, ALLOWER_ROLES_TO_BUSINESS_LOGIC } from "@/app/constants";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sabores Deportivos | Inicio",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (headers().get(ACCESS_HEADER) != "true") {
    redirect("/en-mantenimiento");
  }

  if (session?.user.role && ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(session?.user.role)) {
    redirect("/sd-admin");
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </>
  );
}
