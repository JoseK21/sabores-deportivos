import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserRole } from "@/app/enum";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthAdminRest({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  console.log("🚀 >>  AuthAdminRest >>  session?.user.role:", session, session?.user.role);

  if (session?.user.role == UserRole.client) {
    redirect("/");
  }

  if (session?.user.role == UserRole.master) {
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
