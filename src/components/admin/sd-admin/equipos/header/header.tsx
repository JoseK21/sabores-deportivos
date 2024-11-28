"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { Dialog_ } from "../dialog/dialog";
import useFetchLeaguesData from "@/hooks/useFetchLeaguesData";

export const TeamHeader = () => {
  const [open, setOpen] = useState(false);

  useFetchLeaguesData();

  return (
    <div className="flex items-start justify-between">
      <Heading title="Equipos" description="Administrar equipos del sistema" />
      <Dialog_ open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
};
