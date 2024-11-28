import FormData from "./form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EVENT_STATUS } from "@/app/constants";
import { isEmpty } from "lodash";
import { REvent } from "@/relatedTypes/event";


interface Props {
  data?: REvent;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, isShowing = false }: Props) => {
  if (isShowing) {
    const { title, Tournament, dateTime, status, homeTeam, awayTeam } = data || ({} as REvent);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Evento</DialogTitle>
          </DialogHeader>

          {!isEmpty(data) && (
            <div className="flex flex-row gap-4">
              <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
                <span>
                  <strong>Titulo:</strong> {title || "N/A"}
                </span>
                <span>
                  <strong>Equipos:</strong> {homeTeam?.name || "-"} vs {awayTeam?.name || "-"}
                </span>
                <span>
                  <strong>Torneo</strong> {Tournament?.name}
                </span>
                <span>
                  <strong>Fecha:</strong> {dateTime.toDateString()}
                </span>
                <span>
                  <strong>Estado:</strong> {EVENT_STATUS[status] ?? "-"}
                </span>
              </div>
            </div>
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
