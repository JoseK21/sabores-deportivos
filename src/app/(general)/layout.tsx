/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap items-center justify-between p-4">
          <Link href="/">
            <img src="/logo-horizontal-black.png" className="w-44 mb-5" alt="Logo - Sabores Deportivos" />

          </Link>
        </div>
      </nav>

      <div className="flex overflow-hidden">
        <main className="w-full flex-1 space-y-4 p-4">{children}</main>
      </div>
    </div>
  );
}
