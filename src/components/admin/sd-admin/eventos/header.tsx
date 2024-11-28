"use client";

import { useState } from "react";
import { FormDialog } from "./dialog";

import { Heading } from "@/components/ui/heading";
import useFetchTournamentsData from "@/hooks/useFetchTournamentsData";

export default function EventsHeader() {
  const [open, setOpen] = useState(false);

  useFetchTournamentsData();

  return (
    <div className="flex items-start justify-between">
      <Heading title="Eventos" description="Eventos en el sistema" />
      <FormDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
}
