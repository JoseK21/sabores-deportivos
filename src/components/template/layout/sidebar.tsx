"use client";

import { DashboardNav } from "@/components//template/dashboard-nav";
import { cn } from "@/lib/utils";
import { useRoleStore } from "@/store/zustand";
import { Role } from "@/app/enum";
import { MENU_BY_ROLE } from "@/app/(staff-rest)/qs-staff-rest/constants";

export default function Sidebar() {
  // TODO: Fix store in server
  const role = useRoleStore((state) => state.role) || Role.master;

  const { title, items } = { ...(MENU_BY_ROLE[role] || MENU_BY_ROLE[Role.unknowen]) };

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
