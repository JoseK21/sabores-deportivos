import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/template/forms/user-auth-form";
import Logo from "@/components/_/general/logo";

export const metadata: Metadata = {
  title: "QuiniSports | Master",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  manifest: "",
  metadataBase: new URL("https://www.quinisports.com"),
  alternates: {
    canonical: "https://www.quinisports.com",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-tourch-icon.png",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://wwww.quinisports.com",
    title: "QuiniSports",
    description:
      "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
    siteName: "QuiniSports",
    images: [
      {
        url: "https://www.quinisports.com//logo.png",
      },
    ],
  },
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full justify-between flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900 z-20">
        <div className="flex items-center">
          <Logo width={240} fillLabel="#FFF" fill="#FFF" />
        </div>
        <div>
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Quinisports es una plataforma destacada para participar en quinielas deportivas, donde la emoción
              del deporte se complementa con la colaboración de varios establecimientos comerciales para mejorar la
              experiencia de sus clientes.&rdquo;
            </p>
            <footer className="text-sm">José Núñez. CTO</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Crea una cuenta</h1>
            <p className="text-sm text-muted-foreground">
              Ingrese su correo electrónico a continuación para crear su cuenta
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al hacer clic en continuar, aceptas nuestra{" "}
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
