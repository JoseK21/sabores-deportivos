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
import Link from "next/link";
import { isEmpty } from "lodash";
import { Session } from "next-auth";
import { UserRole } from "@/app/enum";
import { signOut } from "next-auth/react";
import useDataUserNav from "./useDataUserNav";
import { getFirstChars } from "@/utils/string";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ALLOWER_ROLES_TO_BUSINESS_LOGIC, BUSINESS_TYPES, FULL_USER_ROLES } from "@/app/constants";

export function UserNav({ session }: { session: Session }) {
  const { isLoaded, business } = useDataUserNav(session?.user?.idBusiness || "");

  const { user } = session || ({} as Session);

  return user?.email ? (
    <>
      {user.role != UserRole.master && (
        <>
          {isLoaded ? (
            !isEmpty(business) && (
              <span className="mr-2 text-sm">
                {BUSINESS_TYPES[business.type] || "-"} {business.name}
              </span>
            )
          ) : (
            <div className="w-36 h-4 rounded-md animate-pulse bg-slate-200" />
          )}
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full focus-visible:shadow-none focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8 border border-primary-600">
              <AvatarImage
                alt={"foto-perfil"}
                src={user?.image ?? ""}
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>{getFirstChars(user?.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}{" "}
                {user?.role !== UserRole.client && (
                  <>| {FULL_USER_ROLES[user?.role as UserRole] || FULL_USER_ROLES[UserRole.unknown]}</>
                )}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email || "-"}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(user?.role) ? "/sd-admin" : "/",
              })
            }
          >
            Cerrar Sesión
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Button asChild variant="outline">
      <Link href="/iniciar-sesion" className="font-semibold">
        Iniciar Sesión
      </Link>
    </Button>
  );
}
