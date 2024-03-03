"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import React from "react";
import HomeHeader from "./components/headers/HomeHeader";
import HomeFooter from "./components/footers/HomeFooter";
import EventCard from "./components/general/EventCard";

export default function Home() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="min-h-screen">
      <HomeHeader />
      <main className="max-w-7xl min-h-screen mx-auto">
        <section>
          <div className="flex flex-row justify-between items-center my-4">
            <div className=" flex items-center">
              <h2 className="text-2xl font-semibold">Eventos</h2>
              <h4 className="text-slate-600 ml-2">| Puntos Acumulados: 5Pts</h4>
            </div>
            <div className="flex justify-end ">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Futboll Nacional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
                      {date ? format(date, "PPP") : <span>Fecha</span>}
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
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
