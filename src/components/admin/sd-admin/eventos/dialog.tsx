/* eslint-disable @next/next/no-img-element */
import FormData from "./form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EVENT_STATUS } from "@/app/constants";
import { isEmpty } from "lodash";
import { REvent } from "@/relatedTypes/event";
import { getESDate, getShortDateTime } from "@/utils/date";

interface Props {
  data?: REvent;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    const { title, Tournament, dateTime, status, HomeTeam, AwayTeam } = data || ({} as REvent);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Evento</DialogTitle>
          </DialogHeader>

          {!isEmpty(data) && (
            <>
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <img src={HomeTeam?.logoUrl ?? "/assets/default-team.png"} alt={HomeTeam?.name} className="w-8 h-8" />
                  <span>{HomeTeam?.name}</span>
                </div>
                <strong>VS</strong>
                <div className="flex gap-2 items-center flex-row-reverse">
                  <img src={AwayTeam?.logoUrl ?? "/assets/default-team.png"} alt={AwayTeam?.name} className="w-8 h-8" />
                  <span>{AwayTeam?.name}</span>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
                  {title && (
                    <span>
                      <strong>Titulo:</strong> {title }
                    </span>
                  )}
                  <span>
                    <strong>Torneo</strong> {Tournament?.name}
                  </span>
                  <span>
                    <strong>Fecha:</strong> {getShortDateTime(dateTime)}
                  </span>
                  <span>
                    <strong>Estado:</strong> {EVENT_STATUS[status] ?? "-"}
                  </span>
                </div>
              </div>
            </>
          )}
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
          <DialogTitle>{isEdition ? "Edición de Evento" : "Nuevo Evento"}</DialogTitle>
        </DialogHeader>
        <FormData setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
