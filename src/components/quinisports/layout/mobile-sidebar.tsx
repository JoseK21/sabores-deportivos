"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { MenuIcon } from "lucide-react";

import { MENU_BY_ROLE } from "@/app/(admin)/qs-admin/constants";
import { DashboardNav } from "@/components/quinisports/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileSidebar({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);

  const { title, items } = { ...(MENU_BY_ROLE[session?.user?.role] || { title: "", items: [] }) };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight">{title}</h2>
              <div className="space-y-1">
                <DashboardNav items={items} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
