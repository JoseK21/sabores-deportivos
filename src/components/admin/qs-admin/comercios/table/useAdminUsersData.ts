import { useFetchData } from "@/hooks/useFetchData";
import { getApi } from "@/lib/api";
import { useBusinessStore } from "@/store/businessStore";
import { Business } from "@/types/business";
import { useState } from "react";

const useAdminUsersData = () => {
  const { setData, setError } = useBusinessStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const newData = await getApi("api/business");
      const businessesData: Business[] = newData?.data || [];

      setData(businessesData);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useAdminUsersData;
