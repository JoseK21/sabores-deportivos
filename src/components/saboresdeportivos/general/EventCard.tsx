"use cliente";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { z } from "zod";

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
import { RTeam } from "@/relatedTypes/team";
import TeamInfo from "./TeamInfo";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { EXCEPT_SYMBOLS_INPUT_NUMBER } from "@/constants/constants-system";
import { CustomButtonLoadingSubmit } from "../ButtonLoadingSubmit";
import { EventStatus } from "@prisma/client";
import { ALLOW_FORCAST_EVENT_STATUS, EVENT_STATUS } from "@/app/constants";
import { keys, values } from "lodash";

const FormSchema = z.object({
  scoreTeam1: z.number(),
  scoreTeam2: z.number(),
});

interface Props {
  team1: RTeam;
  team2: RTeam;
  isUserLogged?: boolean;
  onClickDisabled?: () => void;
}

const EventCard = ({ team1, team2, onClickDisabled, isUserLogged = false }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { scoreTeam1: 0, scoreTeam2: 0 },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<EventStatus>(EventStatus.incoming);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        setIsModalOpen(false);

        toast({
          duration: 3000,
          title: "Listo",
          variant: "success",
          description: "Pronostico realizado con exito!",
        });
      }, 5000);

      // const response = await postApi("contact", dataForm);

      // setLoading(false);
      // if (response.isError) throw new Error(`response status: ${response.error}`);

      // form.reset();

      // toast({
      //   duration: 3000,
      //   title: "Listo",
      //   variant: "success",
      //   description: "Pronostico realizado con exito!",
      // });
    } catch (err) {
      setLoading(false);

      console.error(err);

      toast({
        duration: 3000,
        title: "Error",
        variant: "destructive",
        description: "Envio de pronostico fallido!",
      });
    }
  }

  useEffect(() => {
    var i: number = 1;
    for (const key in EVENT_STATUS) {
      i += 1;

      setTimeout(() => {
        setCurrentStatus(key as EventStatus);
      }, 4000 * i);
    }
  }, []);

  return (
    <Card className=" w-auto min-w-72 shadow-sm">
      <CardHeader>
        <CardDescription className="flex justify-between">
          <EventCardStatus status={currentStatus} />
          <span>3:00PM</span>
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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {isUserLogged ? (
            currentStatus == EventStatus.incoming ? (
              <DialogTrigger asChild>
                <Button variant="default" className="w-full">
                  Pronosticar
                </Button>
              </DialogTrigger>
            ) : (
              <Button
                variant="outline"
                className="w-full cursor-not-allowed opacity-50"
                onClick={() => {
                  alert("Ya no se pueden realizar pronosticos..!")
                }}
              >
                Pronosticar
              </Button>
            )
          ) : (
            <Button
              variant="outline"
              className="w-full cursor-not-allowed opacity-50"
              onClick={() => (onClickDisabled ? onClickDisabled() : null)}
            >
              Pronosticar
            </Button>
          )}

          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <DialogHeader>
                  <DialogTitle>Pronostico</DialogTitle>
                  <DialogDescription>
                    Por favor, anotar el marcador que considere correcto. No olvide reclamar sus puntos en caja, una vez
                    finalice el evento.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                  <FormField
                    name="scoreTeam1"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-4 flex-1 items-center">
                        <img src={team1.logoUrl ?? "/assets/default-team.png"} alt={team1.name} className="w-10 h-10" />
                        <FormLabel>{team1.name}</FormLabel>
                        <FormControl>
                          <Input
                            autoFocus={false}
                            id="team1"
                            type="number"
                            disabled={loading}
                            className="col-span-2 text-center font-medium"
                            {...field}
                            onKeyDown={(e) => EXCEPT_SYMBOLS_INPUT_NUMBER.includes(e.key) && e.preventDefault()}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(Number(parseFloat(e.target.value)));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="scoreTeam2"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-4 flex-1 items-center">
                        <img src={team2.logoUrl ?? "/assets/default-team.png"} alt={team2.name} className="w-10 h-10" />
                        <FormLabel>{team2.name}</FormLabel>
                        <FormControl>
                          <Input
                            id="team2"
                            type="number"
                            disabled={loading}
                            className="col-span-2 text-center font-medium"
                            {...field}
                            onKeyDown={(e) => EXCEPT_SYMBOLS_INPUT_NUMBER.includes(e.key) && e.preventDefault()}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(Number(parseFloat(e.target.value)));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <CustomButtonLoadingSubmit
                    loading={loading}
                    text="Enviar Pronostico"
                    textLoading="Enviando Pronostico.."
                    textEdit=""
                    textLoadingEdit=""
                    isEdition={false}
                  />
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const EventCardStatus = ({ status }: { status: EventStatus }) => {
  var bg = "";

  switch (status) {
    case EventStatus.incoming:
      bg = "bg-blue-600";
      break;
    case EventStatus.live:
      bg = "bg-primary-500";
      break;
    case EventStatus.finished:
      bg = "bg-neutral-900";
      break;
    case EventStatus.canceled:
      bg = "bg-red-400";
      break;
    case EventStatus.pending:
      bg = "bg-neutral-500";
      break;
    case EventStatus.postponed:
      bg = "bg-yellow-600";
      break;
    default:
      break;
  }

  return bg.length == 0 ? (
    <></>
  ) : (
    <div className={`${bg} py-1 px-2 rounded-sm`}>
      <span className="text-white font-medium">{EVENT_STATUS[status]}</span>
    </div>
  );
};

export default EventCard;
