import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormAdmin from "./form";

interface Props {
  isNew: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  // any props that come into the component
}

export const AdminsDialog = ({ isNew, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm">
          <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isNew ? "Nuevo Administrador" : "Edicion de Administrador"}</DialogTitle>
        </DialogHeader>
        <FormAdmin setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
