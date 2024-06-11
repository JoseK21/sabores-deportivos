import FormData from "./form";

import { Plus } from "lucide-react";
import { Sport } from "@/types/sport";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  data?: Sport;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    const { name, abbrName, League } = data || ({} as Sport);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Deporte</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
              <span>
                <strong>Nombre Abreviado:</strong> {abbrName}
              </span>
              <span>
                <strong>Ligas:</strong>
              </span>
            </div>
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
          <DialogTitle>{isEdition ? "Edición de Deporte" : "Nuevo Deporte"}</DialogTitle>
        </DialogHeader>
        <FormData setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
