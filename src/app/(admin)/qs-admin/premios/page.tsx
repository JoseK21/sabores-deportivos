import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { EmployerHeader } from "@/components/admin/qs-admin/empleados/header/header";
import EmployerTable from "@/components/admin/qs-admin/empleados/table/table";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <EmployerHeader idBusiness={idBusiness} />
        <Separator />
        <EmployerTable idBusiness={idBusiness} />
      </div>
    </>
  );
}
