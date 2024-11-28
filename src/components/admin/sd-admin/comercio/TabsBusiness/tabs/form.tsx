"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cleanText } from "@/utils/string";
import { BusinessTypes } from "@/app/enum";
import { Business } from "@/types/business";
import { PutBlobResult } from "@vercel/blob";
import { Input } from "@/components/ui/input";
import { deleteApi, putApi } from "@/lib/api";
import { getObjectDiff } from "@/utils/object";
import { useFetchData } from "@/lib/useFetchData";
import { useBusinessStore } from "@/store/sd-admin";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { BUSINESS_TYPES, COUNTRIES } from "@/app/constants";
import { PROVINCE_WITH_CANTONS } from "@/app/costa-rica-constants";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import FileInputPreview, { SIZES_UNIT } from "@/components/saboresdeportivos/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  address: z.string().min(10, { message: "La Dirección al menos de tener 10 letras" }),
  coverImageUrl: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño max es de  1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  logoUrl: z
    .any()
    .refine((file) => file?.size, "Logo requerido")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño max es de  1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  description: z.string().optional(),
  province: z.string().min(1, { message: "Provincia requerida" }),
  canton: z.string().min(1, { message: "Canton requerido" }),
  district: z.string().min(1, { message: "Distrito requerido" }),
  type: z.string().min(1, { message: "Debe seleccionar un tipo de comercio" }),
  country: z.string().min(1, { message: "Por favor indique el pais" }),
});

export default function FormBusiness({ business }: { business?: Business }) {
  const { setData } = useBusinessStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: business || ({} as Business),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useFetchData(async () => {
    if (business?.coverImageUrl) {
      urlToFile((business?.coverImageUrl as string) || "")
        .then((file) => {
          form.setValue("coverImageUrl", file);
        })
        .catch((error) => {
          form.setValue("coverImageUrl", null);
        });
    }
    if (business?.logoUrl) {
      urlToFile((business?.logoUrl as string) || "")
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

      if (dataToEdit?.coverImageUrl) {
        const deletedPhoto = await deleteApi(`images/upload?fileurl=${business?.coverImageUrl as string}`);

        if (deletedPhoto?.isError) {
          toast({
            duration: 7000,
            variant: "warning",
            title: "Error al eliminar la foto anterior!",
            description: "La imagen del administrator no se puso eliminar, consulte con soporte",
          });
        }

        const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
          method: "POST",
          body: dataToEdit.coverImageUrl,
        });

        const newBlob = (await responseImageUpload.json()) as PutBlobResult;

        dataToEdit = { ...dataToEdit, coverImageUrl: newBlob.url ?? "" };
      }

      if (dataToEdit?.logoUrl) {
        const deletedPhoto = await deleteApi(`images/upload?fileurl=${business?.logoUrl as string}`);

        if (deletedPhoto?.isError) {
          toast({
            duration: 7000,
            variant: "warning",
            title: "Error al eliminar la foto anterior!",
            description: "La imagen del administrator no se puso eliminar, consulte con soporte",
          });
        }

        const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
          method: "POST",
          body: dataToEdit.logoUrl,
        });

        const newBlob = (await responseImageUpload.json()) as PutBlobResult;

        dataToEdit = { ...dataToEdit, logoUrl: newBlob.url ?? "" };
      }

      const response = await putApi(`business/${dataForm.id}`, dataToEdit);

      if (response.data) {
        setData(response.data);
      }

      toast({
        duration: 5000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
        description: response.isError
          ? "Hubo un error interno en el servidor"
          : `Se actualizó el comercio ${dataForm.name}`,
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
          <FormField
            name="coverImageUrl"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem className="flex flex-col items-center justify-center my-3">
                  <FormLabel>Imagen Cover</FormLabel>
                  <FormControl>
                    <FileInputPreview
                      name={business?.name}
                      disabled={loading}
                      onChange={onChange}
                      size={SIZES_UNIT.md}
                      src={form.getValues().coverImageUrl}
                      placeholder="/assets/default-image.jpg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            name="logoUrl"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem className="flex flex-col items-center justify-center my-3">
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <FileInputPreview
                      name={business?.name}
                      disabled={loading}
                      onChange={onChange}
                      size={SIZES_UNIT.md}
                      src={form.getValues().logoUrl}
                      placeholder="/assets/default-user-2.webp"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre" {...field} />
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
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Descripcion" {...field} autoComplete="new-email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un tipo de comercio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(BUSINESS_TYPES).map((key) => (
                      <SelectItem key={key} value={key}>
                        {BUSINESS_TYPES[key as BusinessTypes]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map(({ value, label, enabled }) => (
                      <SelectItem key={value} value={value} disabled={!enabled}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="province"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("province");
                    form.setValue("canton", "");
                    form.setValue("district", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione una provincia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(PROVINCE_WITH_CANTONS).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="canton"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canton</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("canton");
                    form.setValue("district", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un canton" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(PROVINCE_WITH_CANTONS?.[(form.getValues().province ?? "") as string] || []).map(
                      (canton) => (
                        <SelectItem key={canton} value={canton}>
                          {canton}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="district"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distrito</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un distrito" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      PROVINCE_WITH_CANTONS?.[(form.getValues().province ?? "") as string]?.[
                        (form.getValues().canton ?? "") as string
                      ] || []
                    ).map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <ButtonLoadingSubmit loading={loading} isEdition={true} />
        </DialogFooter>
      </form>
    </Form>
  );
}
