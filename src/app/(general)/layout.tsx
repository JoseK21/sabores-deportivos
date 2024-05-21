"use client";

import Logo from "@/components/quinisports/general/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const routes = useRouter();

  const goBack = useCallback(() => {
    routes.back();

    // TODO: redirect back to own page
    // if (document.referrer) {
    //   routes.replace("/");
    // } else {
    //   routes.back();
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link href="/">
            <Logo height={45} showLabel={false}></Logo>
          </Link>
        </div>
      </nav>

      <div className="mt-6 mb-6 text-gray-700">
        <Button variant="secondary" onClick={goBack}>
          <ArrowLeft size={20} />
          <span className="ml-4 ">Atras</span>
        </Button>
      </div>

      <div className="flex overflow-hidden">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
