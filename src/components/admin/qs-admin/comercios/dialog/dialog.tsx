import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormAdmin from "../header/form";
import { User } from "@/types/user";
import { BUSINESS_TYPES, FULL_USER_ROLES, USER_STATUS } from "@/app/constants";
import { Business } from "@/types/business";
import Form_ from "../header/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  data?: Business;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const Dialog_ = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    const {
      name,
      type,
      canton,
      country,
      coverImageUrl,
      district,
      province,
      xLink,
      wazeLink,
      facebookLink,
      googleMapLink,
      instagramLink,
    } = data || ({} as Business);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Comercio</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <Avatar
              className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${
                coverImageUrl ? "" : " text-3xl"
              }`}
            >
              <AvatarImage
                width={80}
                height={80}
                alt={name || ""}
                src={coverImageUrl ?? ""}
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
              <span>
                <strong>Tipo:</strong> {BUSINESS_TYPES.find(({ value }) => value === (type || ""))?.label}
              </span>
              <span>
                <strong>Ubicación:</strong> {district}, {canton}, {province}, {country}
              </span>
              {wazeLink ||
                googleMapLink ||
                facebookLink ||
                instagramLink ||
                (xLink && (
                  <>
                    <div className="w-full h-1 bg-slate-500 my-4"></div>
                    <label>Redes Sociales</label>
                    {wazeLink && (
                      <span>
                        <strong>Waze:</strong> {wazeLink}
                      </span>
                    )}
                    {googleMapLink && (
                      <span>
                        <strong>GoogleMap:</strong> {googleMapLink}
                      </span>
                    )}
                    {facebookLink && (
                      <span>
                        <strong>Facebook:</strong> {facebookLink}
                      </span>
                    )}
                    {instagramLink && (
                      <span>
                        <strong>Instagram:</strong> {instagramLink}
                      </span>
                    )}
                    {xLink && (
                      <span>
                        <strong>X:</strong> {xLink}
                      </span>
                    )}
                  </>
                ))}
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
          <DialogTitle>{isEdition ? "Edición de Comercio" : "Nuevo Comercio"}</DialogTitle>
        </DialogHeader>
        <Form_ setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
