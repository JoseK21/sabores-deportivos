import BreadCrumb from "@/components/template/breadcrumb";
import { UserClient } from "@/components/template/tables/user-tables/client";
import { users } from "@/constants/data";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
