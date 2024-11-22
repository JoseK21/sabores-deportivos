"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { FormDialog } from "./dialog";
import useFetchSportsData from "../deportes/useFetchSportsData";

export default function LeaguesHeader() {
  const [open, setOpen] = useState(false);

  useFetchSportsData();

  return (
    <div className="flex items-start justify-between">
      <Heading title="Ligas" description="Ligas en el sistema" />
      <FormDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
}
