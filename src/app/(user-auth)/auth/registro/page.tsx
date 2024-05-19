"use client";

import * as z from "zod";
import { useCallback, useState } from "react";
import { UserRole, UserStatus } from "@/app/enum";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/quinisports/general/Logo";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import FileInputPreview, { SIZES_UNIT } from "@/components/quinisports/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { postApi } from "@/lib/api";
import { PutBlobResult } from "@vercel/blob";
import { cleanText } from "@/utils/string";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Correo requerido.",
    })
    .email({ message: "Introduzca una dirección de correo electrónico válida" }),
  password: z.string({
    required_error: "Contraseña requerido.",
  }),
  image: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "El tamaño max es de  1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  name: z.string({
    required_error: "Nombre requerido.",
  }),
});

type UserFormValue = z.infer<typeof formSchema>;

function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.client,
      status: UserStatus.actived,
    },
  });

  const onClick = async (dataForm: UserFormValue) => {
    try {
      setLoading(true);

      const file = dataForm.image;

      const responseImageUpload = await fetch(`/api/images/upload?filename=client-${cleanText(dataForm.name)}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await responseImageUpload.json()) as PutBlobResult;

      const updateDataForm = { ...dataForm, image: newBlob.url ?? "" };

      const response = await postApi("/api/auth/register", updateDataForm);

      toast({
        duration: 3000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Usuario no agregado!" : "Usuario agregado!",
        description: response.isError ? "Error" : `Se agregó el usuario ${dataForm.name}`,
      });

      setLoading(false);

      if (response.isError) {
        alert("Error en el proceso de registro!");
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("🚀 >>  onClick >>  error:", error);
      setLoading(false);
    }
  };

  const [displayPassword, setDisplayPassword] = useState(false);

  const goBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <div className="w-full h-screen ">
      <div className="m-6 fixed ">
        <Logo width={120} />
        <Button variant="secondary" onClick={goBack}>
          <ArrowLeft size={20} />
          <span className="ml-4 ">Atras</span>
        </Button>
      </div>
      <div className="space-y-6 flex items-center justify-center flex-col min-h-screen">
        <h1 className="text-2xl font-semibold tracking-tight">Crea una cuenta</h1>
        {/* <p className="text-sm text-muted-foreground">Ingrese los datos solicitados</p> */}
        <div className="flex justify-center items-center min-w-80">
          <Form {...form}>
            <form className="space-y-2 w-full">
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

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
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
                    <FormLabel>Correo electrónico</FormLabel>
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
                    {/* <FormLabel>
                      Contraseña
                      <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                        {displayPassword ? <Eye /> : <EyeOff />}
                      </div>
                    </FormLabel> */}
                    <FormLabel className="inline-flex items-end w-min">
                      Contraseña
                      <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                        {displayPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                      </div>
                    </FormLabel>
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

              <Button disabled={loading} className="ml-auto w-full" type="button" onClick={form.handleSubmit(onClick)}>
                Crear cuenta
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
