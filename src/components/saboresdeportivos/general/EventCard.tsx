import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import TeamInfo from "./TeamInfo";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Team } from "@/types/team";

interface Props {
  team1: Team;
  team2: Team;
}

const EventCard = ({ team1, team2 }: Props) => {
  return (
    <Card className=" w-auto min-w-72">
      <CardHeader>
        <CardDescription className="flex justify-between">
          <span>3:00PM</span>
          <span className=" text-primary-600 font-semibold">+ 3Pts</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center">
        <div className="flex items-center justify-between w-full">
          <TeamInfo {...team1} />
          <span className="text-sm font-semibold leading-none text-center">VS</span>
          <TeamInfo {...team2} />
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full">
              Pronosticar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Pronostico</DialogTitle>
              <DialogDescription>
                Por favor, anotar el marcador que considere correcto. No olvide reclamar sus puntos en caja, una vez
                finalice el evento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="team1" className="col-span-2">
                  {team1.name}
                </Label>
                <Input type="number" id="team1" defaultValue="0" className="col-span-2" />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="team2" className="col-span-2">
                  {team2.name}
                </Label>
                <Input type="number" id="team2" defaultValue="o" className="col-span-2" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enviar Pronostico</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>

      {/* Modal */}
    </Card>
  );
};
export default EventCard;
