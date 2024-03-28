import { AdminsHeader } from "@/components/admin/qs-admin/administradores/header/header";
import AdminsTable from "@/components/admin/qs-admin/administradores/table/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <AdminsHeader />
        <Separator />
        <AdminsTable />
      </div>
    </>
  );
}
