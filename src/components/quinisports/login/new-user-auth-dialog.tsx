"use client";

import * as z from "zod";
import { useState } from "react";
import { UserRole, UserStatus } from "@/app/enum";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/image";
import FileInputPreview, { SIZES_UNIT } from "@/components/quinisports/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { postApi } from "@/lib/api";
import { PutBlobResult } from "@vercel/blob";
import { cleanText } from "@/utils/string";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Req from "@/components/quinisports/general/Req";

const newUserFormSchema = z.object({
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  email: z.string({ required_error: "Correo requerido." }).email({ message: "Correo electrónico inválido" }),
  password: z.string().min(3, { message: "La contraseña debe menor al menos 3 letras" }),
  image: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "El tamaño max es de  1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function NewUserAuthDialog() {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onNewUserClick = async (dataForm: z.infer<typeof newUserFormSchema>) => {
    try {
      setLoading(true);

      const file = dataForm.image;

      const responseImageUpload = await fetch(`/api/images/upload?filename=client-${cleanText(dataForm.name)}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await responseImageUpload.json()) as PutBlobResult;

      const updateDataForm = {
        ...dataForm,
        image: newBlob.url ?? "",
        role: UserRole.client,
        status: UserStatus.actived,
      };

      const response = await postApi("auth/register", updateDataForm);

      toast({
        duration: 3000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Usuario no agregado!" : "Usuario agregado!",
        description: response.isError ? "Error" : `Se agregó el usuario ${dataForm.name}`,
      });

      if (!response.isError) {
        setOpen(false);
        form.reset();
      }

      setLoading(false);
    } catch (error) {
      console.error("🚀 >>  onClick >>  error:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="px-1">Registrarse ahora!</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registro</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form className="space-y-2 w-full">
              <div className="flex items-center flex-col">
                <FormLabel>
                  Imagen de Perfil <Req />
                </FormLabel>
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem className="flex flex-col items-center justify-center my-3">
                        <FormControl>
                          <FileInputPreview
                            name={""}
                            disabled={loading}
                            onChange={onChange}
                            size={SIZES_UNIT.md}
                            src={form.getValues().image}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre Completo <Req />
                    </FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Introduce el nombre..." disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Correo electrónico <Req />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Introduce tu correo electrónico..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className=" flex flex-row">
                      <FormLabel>
                        Contraseña <Req />
                      </FormLabel>
                      <div className="ml-2" onClick={() => setDisplayPassword(!displayPassword)}>
                        {displayPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        type={displayPassword ? "text" : "password"}
                        placeholder="Introduce la contraseña..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            className="ml-auto w-full"
            type="button"
            onClick={form.handleSubmit(onNewUserClick)}
          >
            Crear cuenta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
