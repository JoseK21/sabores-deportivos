"use client";

import { useState } from "react";
import { FormDialog } from "./dialog";

import { Heading } from "@/components/ui/heading";
import useFetchSportsData from "@/hooks/useFetchSportsData";

export default function TournamentsHeader() {
  const [open, setOpen] = useState(false);

  useFetchSportsData()

  return (
    <div className="flex items-start justify-between">
      <Heading title="Torneos" description="Torneos en el sistema" />
      <FormDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
}
