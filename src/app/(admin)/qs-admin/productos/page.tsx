import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProductsHeader } from "@/components/admin/qs-admin/productos/header";
import ProductsTable from "@/components/admin/qs-admin/productos/table";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness;
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ProductsHeader idBusiness={idBusiness} />
        <Separator />
        <ProductsTable idBusiness={idBusiness} />
      </div>
    </>
  );
}
