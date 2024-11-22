import HomeFooter from "@/components/saboresdeportivos/footers/HomeFooter";
import HomeHeader from "@/components/saboresdeportivos/headers/HomeHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { ACCESS_HEADER, ALLOWER_ROLES_TO_BUSINESS_LOGIC } from "@/app/constants";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role && ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(session?.user.role)) {
    redirect("/sd-admin");
  }

  if (headers().get(ACCESS_HEADER) != "true") {
    redirect("/en-mantenimiento");
  }

  return (
    <>
      <HomeHeader session={session} />
      <div className="flex overflow-hidden max-w-7xl mx-auto p-4 pt-32">
        <main className="min-h-screen w-full">{children}</main>
      </div>
      <HomeFooter />
    </>
  );
}
