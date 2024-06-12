import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserRole } from "@/app/enum";
import Header from "@/components/quinisports/layout/header";
import Sidebar from "@/components/quinisports/layout/sidebar";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (headers().get("quini-access") != "true") {
    redirect("/en-mantenimiento");
  }

  if (!session?.user?.email) {
    redirect("/qs-admin/iniciar-sesion");
  } else if (session?.user.role == UserRole.client) {
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
