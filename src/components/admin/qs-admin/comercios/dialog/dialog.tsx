import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormAdmin from "../header/form";
import { User } from "@/types/user";
import { BUSINESS_TYPES, FULL_USER_ROLES, USER_STATUS } from "@/app/constants";
import { Business } from "@/types/business";
import Form_ from "../header/form";

interface Props {
  data?: Business;
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
            <DialogTitle>Comercio</DialogTitle>
          </DialogHeader>

          <div className=" rounded-sm bg-slate-200 p-2 flex flex-col">
            <span>
              <strong>Nombre:</strong> {data?.name}
            </span>
            <span>
              <strong>Tipo:</strong> {BUSINESS_TYPES.find(({ value }) => value === (data?.type || ""))?.label}
            </span>
            <span>
              <strong>Ubicación:</strong> {data?.district}, {data?.canton}, {data?.province}, {data?.country}
            </span>
            <div className="w-full h-1 bg-slate-500 my-4"></div>
            <label>Redes Sociales</label>
            {data?.wazeLink && (
              <span>
                <strong>Waze:</strong> {data?.wazeLink}
              </span>
            )}
            {data?.googleMapLink && (
              <span>
                <strong>GoogleMap:</strong> {data?.googleMapLink}
              </span>
            )}
            {data?.facebookLink && (
              <span>
                <strong>Facebook:</strong> {data?.facebookLink}
              </span>
            )}
            {data?.instagramLink && (
              <span>
                <strong>Instagram:</strong> {data?.instagramLink}
              </span>
            )}
            {data?.xLink && (
              <span>
                <strong>X:</strong> {data?.xLink}
              </span>
            )}
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
          <DialogTitle>{isEdition ? "Edición de Comercio" : "Nuevo Comercio"}</DialogTitle>
        </DialogHeader>
        <Form_ setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
