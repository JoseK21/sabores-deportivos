import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Form_ from "../header/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RTeam } from "@/relatedTypes/team";

interface Props {
  data?: RTeam;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const Dialog_ = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    const { name, logoUrl, shortName, colors } = data || ({} as RTeam);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Equipo</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <Avatar
              className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${
                logoUrl ? "" : " text-3xl"
              }`}
            >
              <AvatarImage
                width={80}
                height={80}
                alt={name || ""}
                src={logoUrl ?? ""}
                className="h-full object-cover"
              />
              <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                {(name || "").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
              {shortName && (
                <span>
                  <strong>Nombre Corto:</strong> {shortName}
                </span>
              )}
              <span>
                <strong>Colors:</strong> {colors ?? "N/A"}
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
          <DialogTitle>{isEdition ? "Edición de Equipo" : "Nuevo Equipo"}</DialogTitle>
        </DialogHeader>
        <Form_ setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
