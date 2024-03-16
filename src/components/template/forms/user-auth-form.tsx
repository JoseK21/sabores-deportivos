"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../google-auth-button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import FacebookSignInButton from "../facebook-auth-button";

const formSchema = z.object({
  email: z.string().email({ message: "Introduzca una dirección de correo electrónico válida" }),
  password: z.string().min(1, { message: "Introduzca una contraseña" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  const [loading, setLoading] = useState(false);

  const [displayPassword, setDisplayPassword] = useState(false);

  const defaultValues = { email: "", password: "" };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    console.log("🚀 >>  onSubmit >>  data:", data);
    console.log("🚀 >>  onSubmit >>  callbackUrl:", callbackUrl);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? "/auth/login",
    });

    console.log("Res: ", res);

    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/master");
    }
  };

  return (
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
                  <Input type="email" placeholder="Introduce tu correo electrónico..." disabled={loading} {...field} />
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

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Inicia sesión
          </Button>
        </form>

        <span className="text-sm text-muted-foreground text-center">
          No tienes una cuenta?
          <Link href={"/auth/registro"} className="ml-2 text-blue-500 ">
            Registrar
          </Link>
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
  );
}
