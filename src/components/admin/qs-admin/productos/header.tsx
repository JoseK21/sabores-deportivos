"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { FormDialog } from "./dialog";
import useData from "../tipos-de-productos/useData";

export const ProductsHeader = ({ idBusiness }: { idBusiness: string | undefined }) => {
  const [open, setOpen] = useState(false);

  const { productTypes } = useData();

  return (
    <div className="flex items-start justify-between">
      <Heading title="Productos" description="Productos en el sistema" />
      <FormDialog
        open={open}
        setOpen={setOpen}
        isEdition={false}
        isShowing={false}
        idBusiness={idBusiness}
        productTypes={productTypes}
      />
    </div>
  );
};
