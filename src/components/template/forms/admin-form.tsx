"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/app/enum";
import axios from "axios";

// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string(),
// });

// export const IMG_MAX_LIMIT = 1;

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre del administrador debe tener al menos 3 caracteres." }),
  // imageUrl: z.string().min(1, { message: "Debe agregar una imagen" }),
  // imageUrl: z
  //   .array(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
  //   .min(1, { message: "At least one image must be added." }),
  email: z.string().email({ message: "Introduzca una dirección de correo electrónico válida" }),
  role: z.string().min(1, { message: "Por favor seleccione un rol" }),
  businessId: z.string().min(1, { message: "Por favor seleccione un comercio" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const AdminForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Editar administrador" : "Crear administrador";
  const description = initialData ? "Editar un administrador." : "Crear un nuevo administrador";
  const toastMessage = initialData ? "Administrador actualizado." : "Administrador creado.";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData
    ? initialData
    : { name: "", description: "", price: 0, imageUrl: "", role: UserRole.admin_rest };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-administrador/${initialData._id}`, data);
      } else {
        // TODO use apiBaseUrl.ts
        const res = await axios.post(`/api/products/create-administrador`, data);
        console.log("administrador", res);

        if (res) {
          router.refresh();
          router.push(`/qs-admin/admin`);

          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params?.storeId || "-"}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger("imageUrl");

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          {/* 
          role
          name
          password
          email
          imageUrl
          */}

          {/* <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image de Perfil</FormLabel>
                  <FormControl>
                    <FileUpload onChange={field.onChange} value={field.value} onRemove={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre Completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Correo Electrónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comercio</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Seleccione un comercio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {[{ value: "1", label: "Rest. Los Molinos" }].map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
