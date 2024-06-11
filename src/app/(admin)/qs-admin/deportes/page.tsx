import SportsHeader from "@/components/admin/qs-admin/deportes/header";
import SportsTable from "@/components/admin/qs-admin/deportes/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <SportsHeader />
      <Separator />
      <SportsTable />
    </>
  );
}
