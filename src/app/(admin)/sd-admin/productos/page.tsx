import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProductsHeader } from "@/components/admin/sd-admin/productos/header";
import ProductsTable from "@/components/admin/sd-admin/productos/table";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness;
  return (
    <>
      <ProductsHeader idBusiness={idBusiness} />
      <Separator />
      <ProductsTable idBusiness={idBusiness} />
    </>
  );
}
