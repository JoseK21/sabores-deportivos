/* eslint-disable @next/next/no-img-element */
"use client";

import { z } from "zod";
import { useCallback, useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { getApi, postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useEventsStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVENT_STATUS } from "@/app/constants";
import { EventStatus } from "@/app/enum";
import { REvent } from "@/relatedTypes/event";
import useFetchSportsData from "@/hooks/useFetchSportsData";
import { RTournament } from "@/relatedTypes/tournament";
import { RLeague } from "@/relatedTypes/league";
import { DateTimePicker } from "@/components/ui/calendar-with-time";
import AnimateSpin from "@/components/AnimateSpin";
import { RTeamLeague } from "@/relatedTypes/teamLeague";
import { RTeamTournament } from "@/relatedTypes/teamTournament";

const EVENT_TYPES = ["Liga", "Torneo"];

const FormSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional().nullable(),
    sportId: z.string().min(1, { message: "Deporte requerido" }),
    eventType: z.string().min(1, { message: "Tipo de evento requerido" }),
    tournamentId: z.string().optional().nullable(),
    leagueId: z.string().optional().nullable(),
    dateTime: z.date({ required_error: "Fecha de inicio requerida." }),
    homeTeamId: z.string().min(1, { message: "Equipo Casa requerido" }),
    awayTeamId: z.string().min(1, { message: "Equipo Visita requerido" }),
    status: z.string().min(1, { message: "Estado requerido" }),
  })
  .superRefine((data, ctx) => {
    console.log("🚀 >>  .superRefine >>  data.eventType:", data.eventType);
    if (data.eventType === EVENT_TYPES[0]) {
      if (!data.leagueId) {
        ctx.addIssue({
          path: ["leagueId"],
          code: z.ZodIssueCode.custom,
          message: "La Liga es requerida",
        });
      }
    } else if (data.eventType === EVENT_TYPES[1]) {
      if (!data.tournamentId) {
        ctx.addIssue({
          path: ["tournamentId"],
          code: z.ZodIssueCode.custom,
          message: "El torneo es requerido",
        });
      }
    }
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
  // NO DEBO LLAAMR A LOS STORES, SOLO LOS FECHTs, ya que a lo interno me obtiene el storage
  const { sports, isLoaded: isLoadedSports } = useFetchSportsData();

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
          tournamentId: null,
          leagueId: null,
          dateTime: new Date(),
          status: "",
          sportId: "",
          homeTeamId: "",
          awayTeamId: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);

  const [loadingLeaguesBySportId, setLoadingLeaguesBySportId] = useState(false);
  const [leaguesBySportId, setLeaguesBySportId] = useState<RLeague[]>([]);

  const fetchLeaguesBySportId = useCallback(async (sportId: string) => {
    try {
      form.setValue("leagueId", null);
      form.setValue("tournamentId", null);
      form.setValue("homeTeamId", "");
      form.setValue("awayTeamId", "");
      setLoadingLeaguesBySportId(true);
      setLeaguesBySportId([]);

      const response = await getApi(`league/bySportId/${sportId}`);

      setLeaguesBySportId(response.isError ? [] : response.data);
      setLoadingLeaguesBySportId(false);
    } catch (error: any) {
      setLeaguesBySportId([]);
      setLoadingLeaguesBySportId(false);
    }
  }, []);

  const [loadingTournamentsBySportId, setLoadingTournamentsBySportId] = useState(false);
  const [tournamentsBySportId, setTournamentsBySportId] = useState<RTournament[]>([]);

  const fetchTournamentBySportId = useCallback(async (sportId: string) => {
    try {
      form.setValue("tournamentId", null);
      form.setValue("leagueId", null);
      form.setValue("homeTeamId", "");
      form.setValue("awayTeamId", "");

      setLoadingTournamentsBySportId(true);
      setTournamentsBySportId([]);

      const response = await getApi(`tournament/bySportId/${sportId}`);

      setTournamentsBySportId(response.isError ? [] : response.data);
      setLoadingTournamentsBySportId(false);
    } catch (error: any) {
      setTournamentsBySportId([]);
      setLoadingTournamentsBySportId(false);
    }
  }, []);

  const [loadingTeamsByLeagueIdOrTournamentId, setLoadingTeamsByLeagueIdOrTournamentId] = useState(false);
  const [teamsByLeagueIdOrTournamentId, setTeamsByLeagueIdOrTournamentId] = useState<RTeamLeague[] | RTeamTournament[]>(
    []
  );

  const fetchTeamsByLeagueIdOrTournamentId = useCallback(async (isLeague: Boolean, id: string) => {
    try {
      form.setValue("homeTeamId", "");
      form.setValue("awayTeamId", "");

      setLoadingTeamsByLeagueIdOrTournamentId(true);
      setTeamsByLeagueIdOrTournamentId([]);

      const response = await getApi(isLeague ? `team-league/byLeagueId/${id}` : `team-tournament/byTournamentId/${id}`);

      setTeamsByLeagueIdOrTournamentId(response.isError ? [] : response.data);
      setLoadingTeamsByLeagueIdOrTournamentId(false);
    } catch (error: any) {
      setTeamsByLeagueIdOrTournamentId([]);
      setLoadingTeamsByLeagueIdOrTournamentId(false);
    }
  }, []);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);
    return 0;
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, form.control._defaultValues, ["eventType"]);

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
                  <FormLabel>
                    Deporte
                    {!isLoadedSports && <AnimateSpin />}
                  </FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
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
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento de</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setEventType(value);

                      form.setValue("leagueId", null);
                      form.setValue("tournamentId", null);
                      form.setValue("homeTeamId", "");
                      form.setValue("awayTeamId", "");

                      setLeaguesBySportId([]);
                      setTournamentsBySportId([]);
                      setTeamsByLeagueIdOrTournamentId([]);

                      const sportId = form.getValues("sportId");

                      if (sportId) {
                        if (value == EVENT_TYPES[0]) {
                          fetchLeaguesBySportId(sportId);
                        } else if (value == EVENT_TYPES[1]) {
                          fetchTournamentBySportId(sportId);
                        }
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading || !form.getValues("sportId")}>
                        <SelectValue placeholder="Seleccione un tipo de evento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EVENT_TYPES.map((eventType) => (
                        <SelectItem key={eventType} value={eventType}>
                          {eventType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {eventType == EVENT_TYPES[0] && (
              <FormField
                name="leagueId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Liga
                      {loadingLeaguesBySportId && <AnimateSpin />}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        fetchTeamsByLeagueIdOrTournamentId(true, value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading || !form.getValues("eventType") || loadingLeaguesBySportId}>
                          <SelectValue placeholder="Seleccione una liga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leaguesBySportId.map((league) => (
                          <SelectItem key={league.id} value={league.id}>
                            {league.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {eventType == EVENT_TYPES[1] && (
              <FormField
                name="tournamentId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Torneo
                      {loadingTournamentsBySportId && <AnimateSpin />}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        fetchTeamsByLeagueIdOrTournamentId(false, value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger
                          disabled={loading || !form.getValues("eventType") || loadingTournamentsBySportId}
                        >
                          <SelectValue placeholder="Seleccione un torneo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tournamentsBySportId.map((tournament) => (
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
            )}

            <FormField
              name="homeTeamId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Equipo Casa
                    {loadingTeamsByLeagueIdOrTournamentId && <AnimateSpin />}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        disabled={
                          loading ||
                          !form.getValues(form.getValues("eventType") == EVENT_TYPES[0] ? "leagueId" : "tournamentId")
                        }
                      >
                        <SelectValue placeholder="Seleccione un equipo casa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teamsByLeagueIdOrTournamentId.map((teamLeague) => (
                        <SelectItem
                          id={teamLeague?.Team?.id}
                          key={teamLeague?.Team?.id}
                          value={`${teamLeague?.Team?.id}`}
                          disabled={!teamLeague?.Team?.id || teamLeague?.Team?.id === form.getValues("awayTeamId")}
                        >
                          <div className="flex gap-2 items-center">
                            <img
                              src={teamLeague?.Team?.logoUrl ?? "/assets/default-team.png"}
                              alt={teamLeague?.Team?.name}
                              className="w-6 h-6"
                            />
                            {teamLeague?.Team?.name}
                          </div>
                        </SelectItem>
                      ))}
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
                  <FormLabel>
                    Equipo Visita
                    {loadingTeamsByLeagueIdOrTournamentId && <AnimateSpin />}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        disabled={
                          loading ||
                          !form.getValues(form.getValues("eventType") == EVENT_TYPES[0] ? "leagueId" : "tournamentId")
                        }
                      >
                        <SelectValue placeholder="Seleccione un equipo visita" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teamsByLeagueIdOrTournamentId.map((teamLeague) => (
                        <SelectItem
                          id={teamLeague?.Team?.id}
                          key={teamLeague?.Team?.id}
                          value={`${teamLeague?.Team?.id}`}
                          disabled={!teamLeague?.Team?.id || teamLeague?.Team?.id === form.getValues("homeTeamId")}
                        >
                          <div className="flex gap-2 items-center">
                            <img
                              src={teamLeague?.Team?.logoUrl ?? "/assets/default-team.png"}
                              alt={teamLeague?.Team?.name}
                              className="w-6 h-6"
                            />
                            {teamLeague?.Team?.name}
                          </div>
                        </SelectItem>
                      ))}
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
                  <DateTimePicker
                    hourCycle={24}
                    value={field.value}
                    onChange={(v) => {
                      console.log("🚀 >>  DateTimePicker:", v);
                      field.onChange(v);
                    }}
                  />
                  {/* <Popover>
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
                        defaultMonth={field.value}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover> */}
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
