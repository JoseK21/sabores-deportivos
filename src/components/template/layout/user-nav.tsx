"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { getFirstChars } from "@/utils/string";

export function UserNav() {
  // Validar que es una persona logeada
  const { data: session } = useSession();

  console.log("🚀 >>  UserNav >>  session:", session);

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible:shadow-none focus-visible:ring-0">
          <Avatar className="h-8 w-8 border border-primary-600">
            <AvatarImage src={session?.user?.image ?? ""} alt={"foto-perfil"} referrerPolicy="no-referrer" />
            <AvatarFallback>{getFirstChars(session?.user?.name ?? "-")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name ?? "-"}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || "-"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>Puntos Obtenidos</DropdownMenuItem>
          <DropdownMenuItem>Facturacion</DropdownMenuItem>
          <DropdownMenuItem>Configuración</DropdownMenuItem>
        </DropdownMenuGroup> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/eventos" })}>
          Cerrar Sesión
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="outline">
      <Link href="/auth/login" className="font-semibold">
        Iniciar Session
      </Link>
    </Button>
  );
}
