"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useState } from "react";
import EventCard from "@/components/saboresdeportivos/general/EventCard";
import { getESDate } from "@/utils/date";
import { LEAGUES } from "@/mocks/leagues";
import { TEAMS } from "@/mocks/teams";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main>
      <section>
        <div className="flex flex-row justify-between items-center mb-4">
          <div className=" flex items-center">
            <h2 className="text-2xl font-semibold">Eventos Deportivos</h2>
            <span className="text-slate-600 ml-2">| Puntos Acumulados: 5 Pts</span>
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
