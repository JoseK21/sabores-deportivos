import { useFetchData } from "@/hooks/useFetchData";
import { getApi } from "@/lib/api";
import { useBusinessesStore } from "@/store/sd-admin";
import { Business } from "@/types/business";
import { useState } from "react";

const useBusinessData = () => {
  const { businesses, setData, setError, error } = useBusinessesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!businesses.length) {
      try {
        const newData = await getApi("business");
        const businessesData: Business[] = newData?.data || [];

        setData(businessesData);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, businesses, error };
};

export default useBusinessData;
