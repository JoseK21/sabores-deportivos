import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ACCESS_HEADER } from "@/app/constants";
import { UserRole } from "@/app/enum";
import Header from "@/components/saboresdeportivos/layout/header";
import Sidebar from "@/components/saboresdeportivos/layout/sidebar";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  const role: UserRole = session?.user.role ?? UserRole.unknown;

  if (headers().get(ACCESS_HEADER) != "true") {
    redirect("/en-mantenimiento");
  }

  if (!session?.user?.email) {
    redirect("/sd-admin/iniciar-sesion");
  } else if (role == UserRole.client || role == UserRole.unknown) {
    redirect("/");
  }

  return (
    <>
      <Header session={session} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar role={session?.user.role} />
        <main className="w-full flex-1 space-y-4 px-8 py-24">{children}</main>
      </div>
    </>
  );
};

export default Layout;
