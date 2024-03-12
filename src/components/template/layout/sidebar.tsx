import { DashboardNav } from "@/components//template/dashboard-nav";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav-items";

export default function Sidebar({ title, items }: { title: string; items: NavItem[] }) {
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
