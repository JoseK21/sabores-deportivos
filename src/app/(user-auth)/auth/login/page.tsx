import Link from "next/link";

import UserAuthForm from "@/components/template/forms/user-auth-form";

import Logo from "@/components/quinisports/general/Logo";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full justify-center flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900 z-20 gap-16">
        <div className="flex items-center justify-center">
          <Logo width={380} fillLabel="#FFF" fillLine="#FFF" />
        </div>
        <div>
          <blockquote className="space-y-2">
            <p className="text-lg text-center">
              &ldquo;Quinisports es una plataforma destacada para participar en quinielas deportivas, donde la emoción
              del deporte se complementa con la colaboración de varios establecimientos comerciales para mejorar la
              experiencia de sus clientes.&rdquo;
            </p>
            <footer className="text-sm text-center">José Núñez. CTO</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Inicio de Sesión</h1>
            <p className="text-sm text-muted-foreground">
              Ingrese su correo electrónico y contraseña, luego clic en Iniciar Sesión.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al iniciar sesión, aceptas nuestra{" "}
            <Link href="/terminos-y-condiciones" className="underline underline-offset-4 hover:text-primary">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/politicas-de-privacidad" className="underline underline-offset-4 hover:text-primary">
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
