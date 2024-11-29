"use client";

import { z } from "zod";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useEventsStore, useTournamentsStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVENT_STATUS } from "@/app/constants";
import { EventStatus } from "@/app/enum";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { REvent } from "@/relatedTypes/event";
import { getESDate } from "@/utils/date";
import useFetchSportsData from "@/hooks/useFetchSportsData";

const FormSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional().nullable(),
  sportId: z.string().min(1, { message: "Deporte requerido" }),
  tournamentId: z.string().min(1, { message: "Evento requerido" }).nullable(),
  dateTime: z.date({ required_error: "Fecha de inicio requerida." }),
  homeTeamId: z.string().min(1, { message: "Equipo Casa requerido" }),
  awayTeamId: z.string().min(1, { message: "Equipo Visita requerido" }),
  status: z.string().min(1, { message: "Estado requerido" }),
});

export default function FormData({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: REvent;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { events, setData } = useEventsStore();

  const { tournaments } = useTournamentsStore();

  // NO DEBO LLAAMR A LOS STORES, SOLO LOS FECHTs, ya que a lo interno me obtiene el storage
  const { sports } = useFetchSportsData();

  const dataFromDB = {
    ...data,
    dateTime: new Date(data?.dateTime || ""),
  } as REvent;

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? dataFromDB || ({} as REvent)
      : {
          title: "",
          tournamentId: "",
          dateTime: new Date(),
          status: "",
          sportId: "",
          homeTeamId: "",
          awayTeamId: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, form.control._defaultValues);

        if (isEmpty(dataToEdit)) {
          setLoading(false);

          toast({
            duration: 3000,
            variant: "info",
            title: "Sin cambios!",
            description: "No ha nuevos datos por actualizar",
          });

          return 0;
        }

        const response = await putApi(`event/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = events.map((event) => {
            if (event.id === response.data.id) {
              return response.data;
            }

            return event;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Evento no actualizado!" : "Evento actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el evento ${dataForm.title ?? "N/A"}`,
        });
        setLoading(false);
      } else {
        const updateDataForm = dataForm;

        const response = await postApi("event", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...events, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Evento no agregado!" : "Nuevo Evento agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el evento ${dataForm.title ?? "N/A"}`,
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error("🚀 >>  onSubmit >>  error:", error);
      setLoading(false);
      toast({
        duration: 7000,
        variant: "destructive",
        title: "Hubo un error! por favor contactar con soporte",
        description: "Error desconocido",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo (Opcional)</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Titulo" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sportId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deporte</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // TODO call tournamnets or/and leagues
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione un deporte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="tournamentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Torneo</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Busca el objeto completo en el arreglo de torneos
                      const tournament = tournaments.find((t) => t.id === value);
                      if (tournament) {
                        // setSelectedTournament(tournament); // Guarda el objeto en el estado
                        console.log("Objeto completo del torneo:", tournament);

                        // Aquí podrías llamar a la API para obtener equipos según el sportId
                        // fetchTeamsBySportId(tournament.sportId);
                      }
                      field.onChange(value);
                    }}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione un torneo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tournaments.map((tournament) => (
                        <SelectItem key={tournament.id} value={tournament.id}>
                          {tournament.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="homeTeamId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipo Casa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione un equipo casa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {tournaments.map((league) => (
                        <SelectItem key={league.id} value={league.id}>
                          {league.name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="awayTeamId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipo Visita</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione un equipo visita" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {tournaments.map((league) => (
                        <SelectItem key={league.id} value={league.id}>
                          {league.name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dateTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={loading}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {getESDate(field.value, "Fecha")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(EVENT_STATUS).map((key) => (
                        <SelectItem key={key} value={key}>
                          {EVENT_STATUS[key as EventStatus]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
