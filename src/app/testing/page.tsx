"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Page() {
  const fechaActual = new Date();

  // Resta 4 días
  fechaActual.setDate(fechaActual.getDate() - 4);

  const [date, setDate] = useState<Date | undefined>(fechaActual);

  return (
    <main>
      {/* FIX: use defaultMonth={field.value} */}
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    </main>
  );
}
