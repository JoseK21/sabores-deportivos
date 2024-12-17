"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { LogOut, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { getFirstChars } from "@/utils/string";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { CalendarIcon, Star } from "lucide-react";
import EventCard from "@/components/saboresdeportivos/general/EventCard";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LoginDialog } from "@/components/dialogs/LoginDialog";

const BASE_URL = "/mi-tierra";

const itemsMenu = [
  { href: "/", title: "Inicio" },
  { href: "/quienes-somos", title: "Quienes Somos" },
  { href: "/contactos", title: "Contactos" },
  { href: "/menu", title: "Menú" },
];

import { getESDate } from "@/utils/date";
import { LEAGUES } from "@/mocks/leagues";
import { TEAMS } from "@/mocks/teams";
import isEmpty from "lodash/isEmpty";
import useFetchSportsData from "@/hooks/useFetchSportsData";
import useUserPointsData from "@/hooks/useUserPointsData";

export function QuinielaDialog({ session }: { session: Session | null }) {
  const { user } = session || ({} as Session);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { sports, isLoaded: isLoadedSports } = useFetchSportsData();

  const points = useUserPointsData(user?.email);

  const pathname = usePathname(); // Obtiene la ruta actual
  const searchParams = useSearchParams(); // Lee los query params
  const router = useRouter(); // Para actualizar la URL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUserLogged = !isEmpty(user);

  useEffect(() => {
    if (searchParams.get("modal-quiniela") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString()); // Crear una copia de los parámetros actuales
    if (isModalOpen) {
      newSearchParams.set("modal-quiniela", "true"); // Agregar el nuevo query param
      router.push(`${pathname}?${newSearchParams.toString()}`); // Actualizar la URL
    } else {
      newSearchParams.delete("modal-quiniela"); // Eliminar el query param
      router.push(`${pathname}`); // Actualizar la URL
    }
  }, [isModalOpen]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString()); // Crear una copia de los parámetros actuales
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");

      if (formattedDate == format(new Date(), "dd-MM-yyyy")) {
        newSearchParams.delete("fecha"); // Eliminar el query param
      } else {
        newSearchParams.set("fecha", formattedDate); // Agregar el nuevo query param
      }
    } else {
      newSearchParams.delete("fecha"); // Eliminar el query param
    }
    router.push(`${pathname}?${newSearchParams.toString()}`); // Actualizar la URL
  }, [date]);

  // to call above useEffect
  useEffect(() => {
    setDate(new Date());
  }, []);

  const openLoginModal = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString()); // Crear una copia de los parámetros actuales
    newSearchParams.set("modal-login", "true"); // Agregar el nuevo query param
    router.push(`${pathname}?${newSearchParams.toString()}`); // Actualizar la URL
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="text-white py-2 px-3 ml-4 flex items-center text-sm font-semibold">
          <Star className="size-4 cursor-pointer mr-2 -mt-1" />
          <span>Ver Quiniela</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-90 h-5/6 overflow-auto">
        <DialogHeader>
          <DialogTitle>Quiniela Deportiva</DialogTitle>
        </DialogHeader>
        <section>
          <div className="flex justify-between mb-8">
            <div>
              {isUserLogged ? (
                <DialogDescription>Puntos Actuales: {points.userPoint.totalPoints - points.userPoint.claimedPoints} pts.</DialogDescription>
              ) : (
                <Alert className="border-yellow-500 text-yellow-600 cursor-pointer shadow-md" onClick={openLoginModal}>
                  <AlertDescription className="gap-4 items-center flex">
                    <p>
                      Inicia sesión para poder <strong>Pronosticar</strong> y unirte a la emoción del evento deportivo.
                    </p>
                    <SquareArrowOutUpRight size={18} />
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex items-end">
              <Select
                onValueChange={(v) => {
                  console.log("V:", v);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={LEAGUES[0]} />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((value, index) => (
                    <SelectItem key={`${value}-${index}`} value={value.id}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="ml-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {getESDate(date, "Fecha")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus defaultMonth={date} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-8">
              <span className="font-bold text-3xl">Concacaf Primera Division</span>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                <EventCard
                  team1={TEAMS[0]}
                  team2={TEAMS[1]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[2]}
                  team2={TEAMS[3]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[4]}
                  team2={TEAMS[5]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[6]}
                  team2={TEAMS[7]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[8]}
                  team2={TEAMS[9]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
              </div>
            </div>
            <div className="mb-8">
              <span className="font-bold text-3xl">Copa del Mundo 2026</span>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                <EventCard
                  team1={TEAMS[6]}
                  team2={TEAMS[1]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[4]}
                  team2={TEAMS[6]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
                <EventCard
                  team1={TEAMS[3]}
                  team2={TEAMS[8]}
                  isUserLogged={isUserLogged}
                  onClickDisabled={openLoginModal}
                />
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @next/next/no-img-element */
const HeaderMiTierra = ({ session }: { session: Session | null }) => {
  const { user } = session || ({} as Session);

  const [openDM, setOpenDM] = useState(false);

  return (
    <header className="flex justify-between items-center container h-20">
      <img
        width={300}
        height={52}
        src="https://mitierrarestaurante.com/wp-content/uploads/2020/10/logotxt_72f33732-7922-4ba3-9d3a-6bb2ecc5b402.png"
        alt="Mi Tierra Restaurante – Cartago"
      ></img>

      <div className="flex items-center">
        <nav>
          <ul className=" text-[#3d1510] space-x-6">
            {itemsMenu.map((item) => (
              <Link key={item.title} href={`${BASE_URL}${item.href}`}>
                {item.title}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="flex gap-4 ml-4 items-center border-l border-l-slate-700">
          <QuinielaDialog session={session} />
          {user ? (
            <DropdownMenu open={openDM} onOpenChange={setOpenDM}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full focus-visible:shadow-none focus-visible:ring-0"
                >
                  <Avatar className="h-8 w-8 border border-primary-600">
                    <AvatarImage
                      alt={"foto-perfil"}
                      src={user?.image ?? "/assets/default-user-2.webp"}
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
                <DropdownMenuItem onClick={() => {}} className="flex gap-2 items-center">
                  <Star size={18} />
                  Ver Puntos
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  onClick={
                    () => signOut()
                    //   {
                    //   // current path / mi-tierra
                    //   callbackUrl: "/",
                    // }
                  }
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginDialog className="border-[#3d1510] text-[#3d1510]" />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMiTierra;
