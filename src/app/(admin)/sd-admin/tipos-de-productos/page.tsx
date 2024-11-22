import { ProductTypesHeader } from "@/components/admin/sd-admin/tipos-de-productos/header";
import PoductTypesTable from "@/components/admin/sd-admin/tipos-de-productos/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <ProductTypesHeader />
      <Separator />
      <PoductTypesTable />
    </>
  );
}
