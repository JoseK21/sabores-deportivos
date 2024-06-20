"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { es } from "date-fns/locale";
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

interface Tournament {
  id: string;
  name: string;
}

const LEAGUES_TOURNAMENTS: { [key: string]: Tournament[] } = {
  Football: [
    { id: "40", name: "Primera División de Costa Rica" },
    { id: "41", name: "Copa América" },
    { id: "42", name: "Eliminatorias CONMEBOL" },
  ],
  MLB: [
    { id: "20", name: "World Series" },
    { id: "21", name: "American League Championship Series" },
    { id: "22", name: "National League Championship Series" },
  ],
  NFL: [
    { id: "10", name: "Super Bowl 2024" },
    { id: "11", name: "AFC Championship Game" },
    { id: "12", name: "NFC Championship Game" },
  ],
};

interface Week {
  id: string;
  weekLabel: string;
  prefix: string;
}

const WEEKS: { [key: string]: Week[] } = {
  "2024": [
    { id: "40", weekLabel: "Semana 18", prefix: "01/05 - 07/05" },
    { id: "41", weekLabel: "Semana 17", prefix: "20/04 - 27/04" },
    { id: "42", weekLabel: "Semana 16", prefix: "04/03 - 11/03" },
  ],
  "2023": [
    { id: "20", weekLabel: "Semana 4", prefix: "01/04 - 07/04" },
    { id: "21", weekLabel: "Semana 3", prefix: "25-10 - 31/10" },
  ],
};

export default function Home() {
  const [date, setDate] = useState<Date>();

  const [displayWeekCalendar, setdisplayWeekCalendar] = useState(false);

  return (
    <main>
      <section>
        <div className="flex flex-row justify-between items-center my-4">
          <div className=" flex items-center">
            <h2 className="text-2xl font-semibold">Eventos</h2>
            <span className="text-slate-600 ml-2">| Puntos Acumulados: 5 Pts</span>
          </div>
          <div className="flex justify-end ">
            <Select
              onValueChange={(v) => {
                const idTournament = Number(v);

                console.log(`Valor ID: ${idTournament}`);

                if (idTournament < 15 && idTournament >= 10) {
                  setdisplayWeekCalendar(true);
                } else {
                  setdisplayWeekCalendar(false);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={""} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(LEAGUES_TOURNAMENTS).map((league) => {
                  const tournaments = LEAGUES_TOURNAMENTS[league];
                  return (
                    <SelectGroup key={league}>
                      <SelectLabel className="pl-2">{league}</SelectLabel>
                      {tournaments.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="pl-8">
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="ml-4">
              {displayWeekCalendar ? (
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a timezone" className="contents pr-2" />
                  </SelectTrigger>
                  <SelectContent className="w-[280px]">
                    {Object.keys(WEEKS).map((week) => {
                      const weeks = WEEKS[week];

                      return (
                        <SelectGroup key={week}>
                          <SelectLabel className="pl-2">{week}</SelectLabel>
                          {weeks.map((t) => (
                           
                            <SelectItem key={t.id} value={t.id} className="inline-block w-full">
                              <div className="flex justify-between w-full">
                                <div className="font-semibold">{t.weekLabel}</div>
                                <div className="ml-4">{t.prefix}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : (
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
              )}
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
