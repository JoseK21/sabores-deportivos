import TournamentsHeader from "@/components/admin/sd-admin/torneos/header";
import TournamentsTable from "@/components/admin/sd-admin/torneos/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <TournamentsHeader />
      <Separator />
      <TournamentsTable />
    </>
  );
}
