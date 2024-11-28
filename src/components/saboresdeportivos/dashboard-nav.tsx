"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav-items";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const { href, disabled, title } = item;
        return (
          href && (
            <Link
              key={index}
              href={disabled ? "/" : href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === href ? "bg-accent" : "transparent",
                  disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.icon && <item.icon size={18} />}

                <span>{title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
