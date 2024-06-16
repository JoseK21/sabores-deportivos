"use client";

import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  // back
  const routes = useRouter();

  const goBack = useCallback(() => {
    // validar que tenga historial - sino hacer back a comercios-afiliados
    routes.back();
  }, []);

  return (
    <>
      <div className="mt-6 text-gray-700">
        <Button variant="secondary" onClick={goBack}>
          <ArrowLeft size={20} />
          <span className="ml-4">Atras</span>
        </Button>
      </div>

      <main className="max-w-7xl min-h-screen">{children}</main>
    </>
  );
};
export default Layout;
