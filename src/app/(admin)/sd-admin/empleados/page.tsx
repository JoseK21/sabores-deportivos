import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { EmployerHeader } from "@/components/admin/sd-admin/empleados/header/header";
import EmployerTable from "@/components/admin/sd-admin/empleados/table/table";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness || "";

  return (
    <>
      <EmployerHeader idBusiness={idBusiness} />
      <Separator />
      <EmployerTable idBusiness={idBusiness} />
    </>
  );
}
