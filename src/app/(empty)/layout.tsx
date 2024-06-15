import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  if (headers().get("quini-access") === "true") {
    redirect("/");
  }
  
  return (
    <section>
      <main className="w-full flex-1 space-y-4 p-8">{children}</main>
    </section>
  );
}
