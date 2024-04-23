import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { User } from "@/types/user";
import { USER_STATUS } from "@/app/constants";
import Form_ from "../header/form";

interface Props {
  data?: User;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const Dialog_ = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Empleado</DialogTitle>
          </DialogHeader>

          <div className=" rounded-sm bg-slate-200 p-2 flex flex-col">
            <span>
              <strong>Nombre:</strong> {data?.name}
            </span>
            <span>
              <strong>Email:</strong> {data?.email}
            </span>
            <span>
              <strong>Estado:</strong> {USER_STATUS.find(({ value }) => value === (data?.["status"] || ""))?.label}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdition && (
        <DialogTrigger asChild>
          <Button className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEdition ? "Edición de Empleado" : "Nuevo Empleado"}</DialogTitle>
        </DialogHeader>
        <Form_ setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
