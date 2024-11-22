"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({ message: "Introduzca una dirección de correo electrónico válida" }),
  password: z.string().min(1, { message: "Introduzca una contraseña" }),
});

type StaffFormValue = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [displayPassword, setDisplayPassword] = useState(false);

  const defaultValues = { email: "", password: "" };

  const form = useForm<StaffFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: StaffFormValue) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      setLoading(false);

      if (res?.error) {
        setErrorMessage(res?.error || "Credenciales invalidas");
      } else {
        setRedirecting(true)
        router.push("/sd-admin");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setLoading(false);
      setErrorMessage("Ocurrio un error, por favor volver a intentarlo"); // Generic error message
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

            {redirecting && (<span className=" text-primary-600 text-sm">Ingresando....</span>)}
          </div>

          <Button className="ml-auto w-full" type="submit" disabled={loading || redirecting}>
            Inicia sesión
          </Button>
        </form>
      </Form>
    </>
  );
}
