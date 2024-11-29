import { DialogContent, Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FormTeams from "../forms/formTeams";
import { RTournament } from "@/relatedTypes/tournament";

interface Props {
  open: boolean;
  data: RTournament;
  setOpen: (open: boolean) => void;
}

export const DialogTeams = ({ open, setOpen, data }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{"Configuración de Equipos"}</DialogTitle>
          <DialogDescription>Torneo: {data?.name ?? "-"}</DialogDescription>
        </DialogHeader>
        <FormTeams data={data} />
      </DialogContent>
    </Dialog>
  );
};
