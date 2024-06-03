

"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useState } from "react";
import EventCard from "@/components/quinisports/general/EventCard";

const TEAMS = [
  {
    id: "herediano",
    name: "Herediano",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/862.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "san-carlos",
    name: "San Carlos",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/859.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "alajuelense",
    name: "Alajuelense",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2057.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "municipal-liberia",
    name: "Municipal Liberia",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/9361.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "ad-guanacasteca",
    name: "AD Guanacasteca",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20982.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "saprissa",
    name: "Saprissa",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/858.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "sporting-san-jose",
    name: "Sporting San José",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20705.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "pere-zeledon",
    name: "Perez Zeledon",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/7234.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "cartagines",
    name: "Cartagines",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/7239.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "puntarenas",
    name: "Puntarenas",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/7237.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "grecia",
    name: "Grecia",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/18763.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
  {
    id: "santos",
    name: "Santos",
    abbr: "",
    logoUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/913.png&h=200&w=200",
    colors: ["#000000", "#000000"],
  },
];

const LEAGUES = [
  "Primera División de Costa Rica",
  "Copa América",
  "Eliminatorias CONMEBOL",
  "UEFA Europa League",
  "LALIGA",
  "Serie A de Italia",
  "Liga Portugal",
  "Liga Profesional de Bélgica",
  "Concacaf Nations League",
  "Liga MX",
  "UEFA Champions League",
  "UEFA Champions League",
  "German Bundesliga",
  "Ligue 1 de Francia",
  "Eredivisie de Holanda",
  "Eredivisie de Holanda",
  "Major League Soccer de EE.UU.",
];

export default function Home() {
  const [date, setDate] = useState<Date>();

  return (
    <main>
      <section>
        <div className="flex flex-row justify-between items-center my-4">
          <div className=" flex items-center">
            <h2 className="text-2xl font-semibold">Eventos</h2>
            <h4 className="text-slate-600 ml-2">| Puntos Acumulados: 5 Pts</h4>
          </div>
          <div className="flex justify-end ">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={LEAGUES[0]} />
              </SelectTrigger>
              <SelectContent>
                {LEAGUES.map((value, index) => (
                  <SelectItem key={index} value="light">
                    {value}
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
                    {date ? format(date, "PPP", { locale: es }) : <span>Fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <EventCard team1={TEAMS[0]} team2={TEAMS[1]} />
          <EventCard team1={TEAMS[2]} team2={TEAMS[3]} />
          <EventCard team1={TEAMS[4]} team2={TEAMS[5]} />
          <EventCard team1={TEAMS[6]} team2={TEAMS[7]} />
          <EventCard team1={TEAMS[8]} team2={TEAMS[9]} />
          <EventCard team1={TEAMS[10]} team2={TEAMS[11]} />
          <EventCard team1={TEAMS[6]} team2={TEAMS[1]} />
          <EventCard team1={TEAMS[4]} team2={TEAMS[6]} />
          <EventCard team1={TEAMS[3]} team2={TEAMS[8]} />
        </div>
      </section>
    </main>
  );
}
