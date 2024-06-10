"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SCHEDULE } from "@/app/constants";
import { Schedule } from "@/types/schedule";
import { Business } from "@/types/business";
import { postApi, putApi } from "@/lib/api";
import { getObjectDiff } from "@/utils/object";
import { useBusinessStore } from "@/store/qs-admin";
import { useToast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import ButtonLoadingSubmit from "@/components/quinisports/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchema = z.object({
  mondayOpening: z.union([z.number(), z.null()]).optional(),
  mondayClose: z.union([z.number(), z.null()]).optional(),
  tuesdayOpening: z.union([z.number(), z.null()]).optional(),
  tuesdayClose: z.union([z.number(), z.null()]).optional(),
  wednesdayOpening: z.union([z.number(), z.null()]).optional(),
  wednesdayClose: z.union([z.number(), z.null()]).optional(),
  thursdayOpening: z.union([z.number(), z.null()]).optional(),
  thursdayClose: z.union([z.number(), z.null()]).optional(),
  fridayOpening: z.union([z.number(), z.null()]).optional(),
  fridayClose: z.union([z.number(), z.null()]).optional(),
  saturdayOpening: z.union([z.number(), z.null()]).optional(),
  saturdayClose: z.union([z.number(), z.null()]).optional(),
  sundayOpening: z.union([z.number(), z.null()]).optional(),
  sundayClose: z.union([z.number(), z.null()]).optional(),
});

export default function FormBusinessSchedule({ business }: { business?: Business }) {
  const { id: idBusiness, BusinessScheduled: schedule } = business ?? ({} as Business);

  const { setData } = useBusinessStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: schedule || ({} as Schedule),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    const isEdition = Boolean(schedule?.id);

    try {
      setLoading(true);
      let dataToEditOrAdd = { idBusiness, ...getObjectDiff(dataForm, schedule ?? ({} as Schedule)) };

      if (isEmpty(dataToEditOrAdd)) {
        setLoading(false);

        toast({
          duration: 3000,
          variant: "info",
          title: "Sin cambios!",
          description: isEdition ? "No ha nuevos datos por actualizar" : "No hay datos por agregar",
        });

        return 0;
      }

      const response = isEdition
        ? await putApi(`business_schedule/${schedule?.id}`, dataToEditOrAdd)
        : await postApi(`business_schedule`, dataToEditOrAdd);

      if (response.data) {
        const updateData = response.data;

        setData({ ...business, BusinessScheduled: updateData } as Business);
      }

      toast({
        duration: 5000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError
          ? `Horario no ${isEdition ? "actualizado" : "creado"}!`
          : `Horario ${isEdition ? "actualizado" : "creado"}!`,
        description: response.isError ? "Hubo un error interno en el servidor" : `Horario Guardado`,
      });

      setLoading(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Lunes</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="mondayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Selecione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="mondayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Selecione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Martes</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="tuesdayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tuesdayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Miercoles</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="wednesdayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="wednesdayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Jueves</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="thursdayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="thursdayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Viernes</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="fridayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="fridayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Sabado</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="saturdayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="saturdayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col bg-slate-50 p-2 rounded-sm">
            <span>Domingo</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <FormField
                name="sundayOpening"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apertura</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="sundayClose"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cierre</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value) || null);
                      }}
                      defaultValue={`${field.value ?? "null"}`}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading}>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SCHEDULE.map((schedule) => (
                          <SelectItem key={`${schedule.value}`} value={`${schedule.value}`}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <ButtonLoadingSubmit loading={loading} isEdition={true} />
        </DialogFooter>
      </form>
    </Form>
  );
}
