import { useState } from "react";
import { getApi } from "@/lib/api";

import { Prize } from "@/types/prize";
import { useFetchData } from "@/hooks/useFetchData";
import { usePrizesStore } from "@/store/sd-admin";

const useData = (idBusiness: string | undefined) => {
  const { prizes, setData, setError } = usePrizesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const data: Prize[] = (await getApi(`prize/byBusiness/${idBusiness}`))?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded, prizes };
};

export default useData;
