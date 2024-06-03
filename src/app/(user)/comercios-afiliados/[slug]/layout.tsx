import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="mt-6 text-gray-700">
        <Button asChild variant="secondary">
          <Link href="/comercios-afiliados">
            <ArrowLeft size={20} />
            <span className="ml-4 ">Atras</span>
          </Link>
        </Button>
      </div>

      <main className="max-w-7xl min-h-screen">{children}</main>
    </>
  );
};
export default Layout;
