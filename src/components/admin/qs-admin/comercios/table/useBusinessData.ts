import { useFetchData } from "@/hooks/useFetchData";
import { getApi } from "@/lib/api";
import { useBusinessesStore } from "@/store/qs-admin";
import { Business } from "@/types/business";
import { useState } from "react";

const useBusinessData = () => {
  const { businesses, setData, setError, error } = useBusinessesStore();
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

  return { isLoaded, businesses, error };
};

export default useBusinessData;
