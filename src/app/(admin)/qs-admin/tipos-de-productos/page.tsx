import { ProductTypesHeader } from "@/components/admin/qs-admin/tipos-de-productos/header";
import PoductTypesTable from "@/components/admin/qs-admin/tipos-de-productos/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ProductTypesHeader />
        <Separator />
        <PoductTypesTable />
      </div>
    </>
  );
}
