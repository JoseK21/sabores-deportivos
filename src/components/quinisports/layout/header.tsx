import { cn } from "@/lib/utils";

import Logo from "@/components/quinisports/general/Logo";

import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session }) {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between pl-4 pr-8">
        <div className="hidden lg:flex items-center">
          <Logo showLabel={false} width={90} height={40} />
          {/* <h1 className="ml-4 text-xl">QuiniSports</h1> */}
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar session={session} />
        </div>

        <div className="flex items-center gap-2">
          <UserNav session={session} />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
