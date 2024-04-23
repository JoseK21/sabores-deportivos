import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormAdmin from "../header/form";
import { User } from "@/types/user";
import { USER_STATUS } from "@/app/constants";
import { Business } from "@/types/business";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  data?: User;
  businesses?: Business[];
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const AdminsDialog = ({ open, setOpen, data, isEdition, isShowing = false, businesses }: Props) => {
  if (isShowing) {
    const { name, email, status, image } = data || ({} as User);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Administrador</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <Avatar
              className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${
                image ? "" : " text-3xl"
              }`}
            >
              <AvatarImage width={80} height={80} alt={name || ""} src={image ?? ""} className="h-full object-cover" />
              <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                {(name || "").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
              <span>
                <strong>Email:</strong> {email}
              </span>
              <span>
                <strong>Estado:</strong> {USER_STATUS.find(({ value }) => value === status)?.label}
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
          <DialogTitle>{isEdition ? "Edición de Administrador" : "Nuevo Administrador"}</DialogTitle>
        </DialogHeader>
        <FormAdmin setOpen={setOpen} isEdition={isEdition} data={data} businesses={businesses} />
      </DialogContent>
    </Dialog>
  );
};
