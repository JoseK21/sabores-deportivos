import { useFetchData } from "@/lib/useFetchData";
import { getApi } from "@/lib/api";
import { useAdminsStore } from "@/store/sd-admin";
import { User } from "@/types/user";
import { useState } from "react";

const useAdminUsersData = () => {
  const { setData, setError } = useAdminsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const newData = await getApi("admin");
      const adminsData: User[] = newData?.data || [];

      setData(adminsData);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useAdminUsersData;
