import Link from "next/link";
import Logo from "@/components/quinisports/general/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link href="/">
            <Logo />{" "}
          </Link>
        </div>
      </nav>

      <div className="flex overflow-hidden">
        <main className="w-full flex-1 space-y-4 p-4">{children}</main>
      </div>
    </div>
  );
}
