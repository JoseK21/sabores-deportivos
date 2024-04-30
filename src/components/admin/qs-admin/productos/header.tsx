"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { FormDialog } from "./dialog";

export const ProductTypesHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <Heading title="Tipos de productos" description="Tipos de productos en el sistema" />
      <FormDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} />
    </div>
  );
};
