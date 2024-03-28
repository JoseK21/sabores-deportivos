"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { getFirstChars } from "@/utils/string";

export async function UserNav({ session }: { session: any }) {
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full focus-visible:shadow-none focus-visible:ring-0"
        >
          <Avatar className="h-8 w-8 border border-primary-600">
            <AvatarImage src={session?.user?.image ?? ""} alt={"foto-perfil"} referrerPolicy="no-referrer" />
            <AvatarFallback>{getFirstChars(session?.user?.name ?? "-")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name ?? "-"} | {session?.user?.role ?? ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || "-"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/eventos" })}>
          Cerrar Sesión
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="outline">
      <Link href="/auth/login" className="font-semibold">
        Iniciar Sesión
      </Link>
    </Button>
  );
}
