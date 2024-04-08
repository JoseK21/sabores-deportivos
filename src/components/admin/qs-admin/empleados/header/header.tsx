"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { Dialog_ } from "../dialog/dialog";

export const BusinessHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <Heading title="Empleados" description="Administrar empleados del sistema" />
      <Dialog_ open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
};
