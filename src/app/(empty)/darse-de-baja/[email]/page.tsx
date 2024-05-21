import { deleteApi } from "@/lib/api";
import { notFound } from "next/navigation";

const unsubscribeUserByEmail = async (email: string) => {
  const response = await deleteApi(`/api/subscription/${email}`);

  return !response.isError;
};

const Page = async ({ params }: { params: { email: string } }) => {
  const { email } = params;

  if (!email) notFound();

  const success = await unsubscribeUserByEmail(email);

  if (!success) notFound();

  if (!success) {
    if (typeof window !== "undefined") {
      return (
        <section>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
            <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
              ERROR AL DERSE DE BAJA
            </span>
            <p>El correo no existe o ya fue removido de los emails con suscripción de emails informativos..</p>
          </div>
        </section>
      );
    }
    return null;
  }

  return (
    <section>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          DE BAJA
        </span>
        <p>Te has dado de baja con éxito de nuestra subscripción de emails informativos.</p>
      </div>
    </section>
  );
};

export default Page;
