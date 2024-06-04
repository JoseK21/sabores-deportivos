"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ButtonLoadingSubmit from "@/components/quinisports/ButtonLoadingSubmit";
import { useBusinessStore } from "@/store/qs-admin";
import { Schedule } from "@/types/schedule";
import { SCHEDULE } from "@/app/constants";

const FormSchema = z.object({
  mondayOpening: z.number().optional(),
  mondayClose: z.number().optional(),
  tuesdayOpening: z.number().optional(),
  tuesdayClose: z.number().optional(),
  wednesdayOpening: z.number().optional(),
  wednesdayClose: z.number().optional(),
  thursdayOpening: z.number().optional(),
  thursdayClose: z.number().optional(),
  fridayOpening: z.number().optional(),
  fridayClose: z.number().optional(),
  saturdayOpening: z.number().optional(),
  saturdayClose: z.number().optional(),
  sundayOpening: z.number().optional(),
  sundayClose: z.number().optional(),
});

export default function FormBusinessSchedule({ schedule }: { schedule?: Schedule }) {
  const { business, setData } = useBusinessStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: schedule || ({} as Schedule),
  });

  // useEffect(() => {
  //   form.setValue("mondayOpening", business?.Schedule?.mondayOpening ?? 0);
  //   form.setValue("mondayClose", business?.Schedule?.mondayClose ?? 0);
  //   form.setValue("tuesdayOpening", business?.Schedule?.tuesdayOpening ?? 0);
  //   form.setValue("tuesdayClose", business?.Schedule?.tuesdayClose ?? 0);
  //   form.setValue("wednesdayOpening", business?.Schedule?.wednesdayOpening ?? 0);
  //   form.setValue("wednesdayClose", business?.Schedule?.wednesdayClose ?? 0);
  //   form.setValue("thursdayOpening", business?.Schedule?.thursdayOpening ?? 0);
  //   form.setValue("thursdayClose", business?.Schedule?.thursdayClose ?? 0);
  //   form.setValue("fridayOpening", business?.Schedule?.fridayOpening ?? 0);
  //   form.setValue("fridayClose", business?.Schedule?.fridayClose ?? 0);
  //   form.setValue("saturdayOpening", business?.Schedule?.saturdayOpening ?? 0);
  //   form.setValue("saturdayClose", business?.Schedule?.saturdayClose ?? 0);
  //   form.setValue("sundayOpening", business?.Schedule?.sundayOpening ?? 0);
  //   form.setValue("sundayClose", business?.Schedule?.sundayClose ?? 0);
  // }, [business]);

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);
    try {
      setLoading(true);

      let dataToEdit = getObjectDiff(dataForm, schedule ?? ({} as Schedule));

      console.log("🚀 >>  onSubmit >>  dataToEdit:", dataToEdit);

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

      // todo remove
      setLoading(false);

      // const response = await putApi(`/api/business/${data?.id}`, dataToEdit);

      // if (response.data) {
      //   const updateData = response.data;

      //   setData(updateData);
      // }

      // toast({
      //   duration: 5000,
      //   variant: response.isError ? "destructive" : "success",
      //   title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
      //   description: response.isError ? "Hubo un error interno en el servidor" : `Horarios Guardado`,
      // });
      // setLoading(false);
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value + ""}
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
