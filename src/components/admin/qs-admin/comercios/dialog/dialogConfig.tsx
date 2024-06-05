import { DialogContent, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormConfig from "../header/formConfig";
import { Business } from "@/types/business";

interface Props {
  open: boolean;
  data?: Business;
  setOpen: (open: boolean) => void;
}

export const DialogConfig = ({ open, setOpen, data }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{"Configuración de Comercio"}</DialogTitle>
        </DialogHeader>
        <FormConfig setOpen={setOpen} data={data} />
      </DialogContent>
    </Dialog>
  );
};
