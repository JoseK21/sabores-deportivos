import Logo from "@/components/quinisports/general/Logo";
import MasterAuthForm from "@/components/template/forms/master-auth-form";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center w-full md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full justify-center items-center flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900 z-20">
        <Logo width={300} fillLabel="#FFF" fillLine="#FFF" />
        <span className=" text-2xl mt-4">Acceso de Master</span>
      </div>

      <div className="p-4 lg:p-8 h-full flex items-center justify-center flex-col w-full">
        <div className="show lg:hidden items-center justify-between flex flex-row w-full absolute top-2">
          <Logo width={160} fillLabel="#000" fillLine="#000" />
          <span className="text-md mt-4 mr-4 font-semibold">Acceso de Master</span>
        </div>

        <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Inicio de Sesión</h1>
            <p className="text-sm text-muted-foreground">
              Ingrese su correo electrónico y contraseña, luego clic en Iniciar Sesión.
            </p>
          </div>
          <MasterAuthForm />
        </div>
      </div>
    </div>
  );
}
