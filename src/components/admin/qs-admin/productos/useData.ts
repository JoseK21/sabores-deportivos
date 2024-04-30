import { useState } from "react";
import { getApi } from "@/lib/api";

import { Product } from "@/types/product";
import { useFetchData } from "@/hooks/useFetchData";
import { useProductsStore } from "@/store/qs-admin";

const useData = () => {
  const { setData, setError } = useProductsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const data: Product[] = (await getApi("api/product"))?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useData;
