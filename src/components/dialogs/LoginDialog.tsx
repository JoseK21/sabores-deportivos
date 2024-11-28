"use client";

import * as z from "zod";
import { UserRole, UserStatus } from "@/app/enum";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import FileInputPreview, { SIZES_UNIT } from "@/components/saboresdeportivos/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getApi, postApi } from "@/lib/api";
import { PutBlobResult } from "@vercel/blob";
import { cleanText } from "@/utils/string";
import { Checkbox } from "@/components/ui/checkbox";

import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import Req from "@/components/saboresdeportivos/general/Req";

import { signIn } from "next-auth/react";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/saboresdeportivos/google-auth-button";
import FacebookSignInButton from "@/components/saboresdeportivos/facebook-auth-button";

const newUserFormSchema = z.object({
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  subscription: z.boolean().optional(),
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

const formSchema = z.object({
  email: z.string().email({ message: "Introduzca una dirección de correo electrónico válida" }),
  password: z.string().min(1, { message: "Introduzca una contraseña" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export function LoginDialog() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const searchParams = useSearchParams(); // Lee los query params
  const router = useRouter(); // Para actualizar la URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // registro
  const [displayPassword, setDisplayPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [displayPasswordLogin, setDisplayPasswordLogin] = useState(false);

  const defaultValues = { email: "", password: "" };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (form: UserFormValue) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const { data, isError } = await getApi(`users/${form.email}`);
      const { isEmailFound, isClient } = data || {};

      if (isError) throw new Error("Error de Server");

      if (!isEmailFound) {
        setErrorMessage("Correo no registrado");
        setLoading(false);

        return;
      }

      if (isClient) {
        const res = await signIn("credentials", { redirect: false, email: form.email, password: form.password });

        setLoading(false);
        if (res?.error) {
          setErrorMessage("Credenciales invalidas");
        } else {
          setRedirecting(true);
          router.push("/");
        }
      } else {
        setLoading(false);
        setErrorMessage("Credenciales invalidas");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setLoading(false);
      setErrorMessage("Ocurrio un error, por favor volver a intentarlo"); // Generic error message
    }
  };

  const { toast } = useToast();

  const form2 = useForm<z.infer<typeof newUserFormSchema>>({
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
        setShowLogin(true);
        form.reset();
      }

      setLoading(false);
    } catch (error) {
      console.error("🚀 >>  onClick >>  error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("modal") === "login") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString()); // Crear una copia de los parámetros actuales
    if (isModalOpen) {
      newSearchParams.set("modal", "login"); // Agregar el nuevo query param
      router.push(`${pathname}?${newSearchParams.toString()}`); // Actualizar la URL
    } else {
      setShowLogin(true);
      newSearchParams.delete("modal"); // Eliminar el query param
      router.push(`${pathname}`); // Actualizar la URL
    }
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Iniciar Sesión
        </Button>
      </DialogTrigger>
      {showLogin ? (
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Inicio de Sesión</h1>
              <p className="text-sm text-muted-foreground">
                Ingrese su correo electrónico y contraseña, luego clic en Iniciar Sesión.
              </p>
            </div>
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
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
                        <FormLabel className=" flex items-end w-min">
                          Contraseña
                          <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                            {displayPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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

                  <div className=" h-4 text-center">
                    {loading && (
                      <svg
                        fill="none"
                        role="status"
                        aria-hidden="true"
                        viewBox="0 0 100 101"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <span className=" text-red-400 text-sm">{errorMessage || ""}</span>

                    {redirecting && <span className=" text-primary-600 text-sm">Ingresando....</span>}
                  </div>

                  <Button className="ml-auto w-full" type="submit" disabled={loading || redirecting}>
                    Inicia sesión
                  </Button>
                </form>

                <span
                  onClick={() => {
                    setShowLogin(false);
                  }}
                  className="text-sm text-muted-foreground text-center"
                >
                  No tienes una cuenta?
                </span>
              </Form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">O CONTINUAR CON</span>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <GoogleSignInButton />

                <FacebookSignInButton />
              </div>
            </>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Al iniciar sesión, aceptas nuestros{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://saboresdeportivos.com/terminos-y-condiciones"
                className="underline underline-offset-4 hover:text-primary"
              >
                Términos & Condiciones
              </a>{" "}
              y la{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://saboresdeportivos.com/politicas-de-privacidad"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de privacidad
              </a>
            </p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <div className="w-full">
            <Form {...form2}>
              <form className="space-y-2 w-full">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">Registro</h1>
                </div>
                <div className="flex items-center flex-col">
                  <FormLabel>
                    Imagen de Perfil <Req />
                  </FormLabel>
                  <FormField
                    name="image"
                    control={form2.control}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <>
                        <FormItem className="flex flex-col items-center justify-center my-3">
                          <FormControl>
                            <FileInputPreview
                              name={""}
                              disabled={loading}
                              onChange={onChange}
                              size={SIZES_UNIT.sm}
                              src={form2.getValues().image}
                              placeholder="/assets/default-user-2.webp"
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
                  control={form2.control}
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
                  control={form2.control}
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
                  control={form2.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className=" flex flex-row pt-1">
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

                <FormField
                  control={form2.control}
                  name="subscription"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Recibir notificaciones por correo electronico, de novedad y asuntos de interes
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter className="flex flex-col sm:flex-col md:flex-col xl:flex-col gap-6">
            <Button
              disabled={loading}
              className="ml-auto w-full"
              type="button"
              onClick={form2.handleSubmit(onNewUserClick)}
            >
              Crear cuenta
            </Button>

            <span
              onClick={() => {
                setShowLogin(true);
              }}
              className="text-sm text-muted-foreground text-center"
            >
              Ya tengo una cuenta!
            </span>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
