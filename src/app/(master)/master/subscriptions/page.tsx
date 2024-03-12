import BreadCrumb from "@/components/template/breadcrumb";
import { UserClient } from "@/components/template/tables/user-tables/client";
import { users } from "@/constants/data";
import { columns } from "./columns";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <UserClient
          data={users}
          columns={columns}
          path="/master/subscriptions"
          placeholder="Filtro por nombre..."
          headerTitle={`Subcripsiones (${users.length})`}
          textRowsSelected="subcripsione(s) seleccionados"
          description="Administrar subcripsiones del sistema"
        />
      </div>
    </>
  );
}
