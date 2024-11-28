"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cleanText } from "@/utils/string";
import { PutBlobResult } from "@vercel/blob";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useFetchData } from "@/lib/useFetchData";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { useLeaguesStore, useTeamsStore } from "@/store/sd-admin";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import FileInputPreview, { SIZES_UNIT } from "@/components/saboresdeportivos/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { RTeam } from "@/relatedTypes/team";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nombre requerido" }),
  abbrName: z.string().optional().nullable(),
  logoUrl: z
    .any()
    .refine((file) => file?.size, "Logo requerido")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño max es de  1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  colors: z.string().optional().nullable(), // "#436651, #F40035"
  leagueId: z.string().min(1, { message: "Nombre requerido" }),
});

export default function Form_({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: RTeam;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { teams, setData } = useTeamsStore();

  const { leagues } = useLeaguesStore();

  const dataFromDB = {
    ...data,
  } as RTeam;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? dataFromDB || ({} as RTeam)
      : {
          name: "",
          abbrName: "",
          logoUrl: "",
          colors: "",
          leagueId: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useFetchData(async () => {
    if (isEdition && data?.logoUrl) {
      urlToFile((data?.logoUrl as string) || "")
        .then((file) => {
          form.setValue("logoUrl", file);
        })
        .catch((error) => {
          form.setValue("logoUrl", null);
        });
    }
    if (isEdition && data?.logoUrl) {
      urlToFile((data?.logoUrl as string) || "")
        .then((file) => {
          form.setValue("logoUrl", file);
        })
        .catch((error) => {
          form.setValue("logoUrl", null);
        });
    }
  });

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

        if (dataToEdit?.logoUrl) {
          const deletedPhoto = await deleteApi(`images/upload?fileurl=${data?.logoUrl as string}`);

          if (deletedPhoto?.isError) {
            toast({
              duration: 7000,
              variant: "warning",
              title: "Error al eliminar la foto anterior!",
              description: "La imagen del equipo no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.logoUrl,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, logoUrl: newBlob.url ?? "" };
        }

        const response = await putApi(`team/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = teams.map((team) => {
            if (team.id === response.data.id) {
              return response.data;
            }

            return team;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Equipo no actualizado!" : "Equipo actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el equipo ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        let dataToAdd = dataForm;

        const fileLogo = dataToAdd.logoUrl;

        if (fileLogo) {
          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataToAdd.name)}`, {
            method: "POST",
            body: fileLogo,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToAdd = { ...dataToAdd, logoUrl: newBlob.url ?? "" };
        }

        const response = await postApi("team", dataToAdd);

        setOpen(response.isError);

        if (response.data) {
          setData([...teams, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Equipo no agregado!" : "Nuevo equipo agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el equipo ${dataForm.name}`,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormField
          name="logoUrl"
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem className="flex flex-col items-center justify-center my-3">
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <FileInputPreview
                    name={data?.name}
                    disabled={loading}
                    onChange={onChange}
                    size={SIZES_UNIT.sm}
                    src={form.getValues().logoUrl ?? ""}
                    placeholder="/assets/default-team.png"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
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
                <FormLabel>Nombre Abreviado (Opcional)</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre Abreviado" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="colors"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colores (Opcional)</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Colores (#FFF, #000)" {...field} value={field.value ?? ""} />
                </FormControl>
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
                <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
  );
}
