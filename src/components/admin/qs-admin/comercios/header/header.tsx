"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { Dialog_ } from "../dialog/dialog";

export const BusinessHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <Heading title="Comercios" description="Administrar comercios del sistema" />
      <Dialog_ open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
};
