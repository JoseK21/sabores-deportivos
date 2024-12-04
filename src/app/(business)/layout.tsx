import { headers } from "next/headers";
import { BannerDialog } from "@/components/dialogs/BannerDialog";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const url = headers().get("next-url");

  const session = await getServerSession(authOptions);

  console.log("🚀 >>  BusinessLayout >>  url:", url);

  console.log("🚀 >>  BusinessLayout >>  session?.user.role:", session?.user.role);

  if (!(!session?.user.role || session?.user.role == UserRole.client || session?.user.role == UserRole.unknown)) {
    redirect("/");
  }

  return (
    <>
      <BannerDialog url={url} />
      {children}
    </>
  );
}
