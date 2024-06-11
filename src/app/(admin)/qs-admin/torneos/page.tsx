import TournamentsHeader from "@/components/admin/qs-admin/torneos/header";
import TournamentsTable from "@/components/admin/qs-admin/torneos/table";
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
