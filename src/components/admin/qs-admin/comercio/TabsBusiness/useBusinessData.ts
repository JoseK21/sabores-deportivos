import { useState } from "react";
import { getApi } from "@/lib/api";

import { useFetchData } from "@/hooks/useFetchData";
import { useBusinessStore } from "@/store/qs-admin";

const useBusinessData = (idBusiness: string | undefined) => {
  const { business, setData, setError } = useBusinessStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      if (idBusiness) {
        const newData = await getApi(`business/${idBusiness}`);

        setData(newData.data);
      } else {
        throw new Error("Sin Comercio asociado (id)");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded, business };
};

export default useBusinessData;
