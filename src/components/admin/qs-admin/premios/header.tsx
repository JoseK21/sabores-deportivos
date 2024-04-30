"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { FormDialog } from "./dialog";

export const PrizeHeader = ({ idBusiness }: { idBusiness: string | undefined }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <Heading title="Premios" description="Premios en el sistema" />
      <FormDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} idBusiness={idBusiness} />
    </div>
  );
};
