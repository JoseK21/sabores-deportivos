"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/quinisports/general/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const routes = useRouter();

  const goBack = useCallback(() => {
    routes.back();
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
