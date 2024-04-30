import { useState } from "react";
import { getApi } from "@/lib/api";

import { ProductType } from "@/types/product-type";
import { useFetchData } from "@/hooks/useFetchData";
import { useProductTypesStore } from "@/store/qs-admin";

const useData = () => {
  const { setData, setError } = useProductTypesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const data: ProductType[] = (await getApi("api/product-type"))?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useData;
