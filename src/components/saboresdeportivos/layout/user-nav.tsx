"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { isEmpty } from "lodash";
import { Session } from "next-auth";
import { UserRole } from "@/app/enum";
import { signOut } from "next-auth/react";
import useDataUserNav from "./useDataUserNav";
import { getFirstChars } from "@/utils/string";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ALLOWER_ROLES_TO_BUSINESS_LOGIC, BUSINESS_TYPES } from "@/app/constants";
import { LogOut, Star } from "lucide-react";
import { LoginDialog } from "@/components/dialogs/LoginDialog";

export function UserNav({ session }: { session: Session }) {
  const { isLoaded, business } = useDataUserNav(session?.user?.idBusiness || "");

  const { user } = session || ({} as Session);

  return user?.email ? (
    <>
      {user.role != UserRole.master && (
        <>
          {isLoaded
            ? !isEmpty(business) && (
                <span className="mr-2 text-sm">
                  {BUSINESS_TYPES[business.type] || "-"} {business.name}
                </span>
              )
            : null}
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
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email || "-"}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(user?.role)&& (
            <DropdownMenuItem onClick={() => {}} className="flex gap-2 items-center">
              <Star size={18} />
              Ver Puntos
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="flex gap-2 items-center"
            onClick={() =>
              signOut({
                callbackUrl: ALLOWER_ROLES_TO_BUSINESS_LOGIC.includes(user?.role) ? "/sd-admin" : "/",
              })
            }
          >
            <LogOut size={18} />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <LoginDialog />
  );
}
