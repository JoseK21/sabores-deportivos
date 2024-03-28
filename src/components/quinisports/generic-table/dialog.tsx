"use client";

import FormAdmin from "@/components/admin/qs-admin/administradores/header/form";
import { UserRole } from "@/app/enum";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  titleModal: string;
}

const FORMS = {
  [UserRole.admin_rest]: FormAdmin,
};

export default function GenericDialog({ titleModal }: Props) {
  const [open, setOpen] = useState(false);

  const Form = FORMS[UserRole.admin_rest];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm">
          <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{titleModal}</DialogTitle>
        </DialogHeader>
        <Form setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
