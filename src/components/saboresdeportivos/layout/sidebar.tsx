"use client";

import { DashboardNav } from "@/components/saboresdeportivos/dashboard-nav";
import { cn } from "@/lib/utils";
import { MENU_BY_ROLE } from "@/app/(admin)/sd-admin/constants";
import { UserRole } from "@/app/enum";

export default function Sidebar({ role }: { role: UserRole }) {
  const { title, items } = { ...(MENU_BY_ROLE[role] || { title: "", items: [] }) };

  return (
    <nav className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">{title}</h2>
            <DashboardNav items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
}
