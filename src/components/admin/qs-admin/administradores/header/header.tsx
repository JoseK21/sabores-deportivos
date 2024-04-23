"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";
import { AdminsDialog } from "../dialog/dialog";
import { useBusinessStore } from "@/store/businessStore";
import useBusinessData from "../../comercios/table/useBusinessData";

export const AdminsHeader = () => {
  const [open, setOpen] = useState(false);

  useBusinessData();

  const { businesses } = useBusinessStore();

  return (
    <div className="flex items-start justify-between">
      <Heading title="Administradores" description="Administrar administradores del sistema" />
      <AdminsDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} businesses={businesses} />
    </div>
  );
};
