"use client";

import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { getApi, postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useSportsStore, useTournamentsStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BOOLEAN_OPTIONS } from "@/app/constants";
import { BooleanOption } from "@/app/enum";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RTournament } from "@/relatedTypes/tournament";
import { getESDate } from "@/utils/date";
import { RLeague } from "@/relatedTypes/league";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nombre requerido" }),
  startDate: z.date({ required_error: "Fecha de inicio requerida." }),
  endDate: z.date({ required_error: "Fecha de fin requerida." }),
  sportId: z.string().min(1, { message: "Deporte requerido" }),
  leagueId: z.string().optional().nullable(),
  enabled: z.boolean(),
});

export default function FormData({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: RTournament;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { tournaments, setData } = useTournamentsStore();

  const { sports } = useSportsStore();

  const dataFromDB = {
    ...data,
    startDate: new Date(data?.startDate || ""),
    endDate: new Date(data?.endDate || ""),
  } as RTournament;

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? dataFromDB || ({} as RTournament)
      : {
          name: "",
          startDate: undefined,
          endDate: undefined,
          sportId: "",
          leagueId: "",
          enabled: true,
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [leaguesBySportId, setLeaguesBySportId] = useState<RLeague[]>([]);

  const fetchLeaguesBySportId = useCallback(async (sportId: string) => {
    try {
      form.setValue("leagueId", null);

      setLeaguesBySportId([]);

      const newData = await getApi(`league/bySportId/${sportId}`);

      setLeaguesBySportId(newData.data);
    } catch (error: any) {
      setLeaguesBySportId([]);
    }
  }, []);

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

        const response = await putApi(`tournament/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = tournaments.map((tournament) => {
            if (tournament.id === response.data.id) {
              return response.data;
            }

            return tournament;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Torneo no actualizado!" : "Torneo actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el torneo ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const updateDataForm = dataForm;

        const response = await postApi("tournament", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...tournaments, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Torneo no agregado!" : "Nuevo Torneo agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el torneo ${dataForm.name}`,
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Inicio</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={loading}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          <span>{getESDate(field.value, "Fecha")}</span>
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
                        // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Fin</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={loading}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          <span>{getESDate(field.value, "Fecha")}</span>
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
                        // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                      fetchLeaguesBySportId(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value ?? undefined}
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
              name="leagueId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liga (Opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                    <FormControl>
                      <SelectTrigger disabled={loading}>
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

            <FormField
              name="enabled"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilitado</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Habilitado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(BOOLEAN_OPTIONS).map((key) => (
                        <SelectItem key={key} value={key}>
                          {BOOLEAN_OPTIONS[key as BooleanOption]}
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
