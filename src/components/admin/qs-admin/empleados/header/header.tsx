"use client";

import { Heading } from "@/components/ui/heading";
import { useState } from "react";

import { EmployeeDialog } from "../dialog/dialog";
import { User } from "@/types/user";

export const EmployerHeader = ({ idBusiness }: { idBusiness: string | undefined }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <Heading title="Empleados" description="Administrar empleados del sistema" />
      <EmployeeDialog open={open} setOpen={setOpen} isEdition={false} isShowing={false} data={{ idBusiness } as User} />
    </div>
  );
};
