"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserRole } from "@/app/enum";
import Logo from "@/components/quinisports/general/Logo";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Correo requerido.",
    })
    .email({ message: "Introduzca una dirección de correo electrónico válida" }),
  password: z.string({
    required_error: "Contraseña requerido.",
  }),
  role: z.nativeEnum(UserRole),
  name: z.string({
    required_error: "Nombre requerido.",
  }),
});

type UserFormValue = z.infer<typeof formSchema>;

function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: "jcnv21@gmail.com",
    password: "",
    name: "",
    role: UserRole.unknown,
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onClick = async (data: UserFormValue) => {
    console.log("🚀 >>  onClick >>  data:", data);

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("🚀 >>  onClick >>  res:", res);

      setLoading(false);

      if (res.ok) {
        router.push("/auth/login");
      } else {
        alert("Error en el proceso de registro!");
      }
    } catch (error) {
      console.log("🚀 >>  onClick >>  error:", error);
      setLoading(false);
    }
  };

  const [displayPassword, setDisplayPassword] = useState(false);

  return (
    <div className="w-full h-screen ">
      <div className="m-6 fixed ">
        <Logo width={120} />
      </div>
      <div className="space-y-6 flex items-center justify-center flex-col min-h-screen">
        <h1 className="text-2xl font-semibold tracking-tight">Crea una cuenta</h1>
        {/* <p className="text-sm text-muted-foreground">Ingrese los datos solicitados</p> */}
        <div className="flex justify-center items-center min-w-80">
          <Form {...form}>
            <form className="space-y-2 w-full">
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
                    <FormLabel>
                      Contraseña
                      <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                        {displayPassword ? <Eye /> : <EyeOff />}
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
