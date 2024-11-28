"use client";

import { z } from "zod";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { Tournament } from "@/types/tournament";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useLeaguesStore, useTournamentsStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BOOLEAN_OPTIONS, TOURNAMENT_STATUS } from "@/app/constants";
import { BooleanOption, TournamentStatus } from "@/app/enum";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { es } from "date-fns/locale";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nombre requerido" }),
  abbrName: z.string().min(1, { message: "Nombre Abreviado requerido" }),
  description: z.string().optional(),
  startDate: z.date({ required_error: "Fecha de inicio requerida." }),
  endDate: z.date({ required_error: "Fecha de fin requerida." }),
  leagueId: z.string().min(1, { message: "Liga requerido" }),
  enabled: z.boolean(),
  status: z.string().min(1, { message: "Estado requerido" }),
});

export default function FormData({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: Tournament;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { tournaments, setData } = useTournamentsStore();

  const { leagues } = useLeaguesStore();

  const dataFromDB = {
    ...data,
    startDate: new Date(data?.startDate || ""),
    endDate: new Date(data?.endDate || ""),
  } as Tournament;

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? dataFromDB || ({} as Tournament)
      : {
          name: "",
          abbrName: "",
          description: "",
          startDate: new Date(),
          endDate: new Date(),
          leagueId: "",
          enabled: true,
          status: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, form.control._defaultValues, ["id"]);

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
              name="abbrName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Abreviado</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre Abreviado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Descripción" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Fecha de Inicio</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={loading}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
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
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
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
              name="enabled"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilitado</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value === "true")} defaultValue="">
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
                      {Object.keys(TOURNAMENT_STATUS).map((key) => (
                        <SelectItem key={key} value={key}>
                          {TOURNAMENT_STATUS[key as TournamentStatus]}
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
                  <FormLabel>Liga</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Seleccione una liga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leagues.map((league) => (
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
          </div>
          <DialogFooter>
            <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
