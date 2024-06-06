import { useState } from "react";
import { getApi } from "@/lib/api";

import { ProductType } from "@/types/product-type";
import { useFetchData } from "@/hooks/useFetchData";
import { useProductTypesStore } from "@/store/qs-admin";

const useData = () => {
  const { productTypes, setData, setError } = useProductTypesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const data: ProductType[] = (await getApi("product-type"))?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded, productTypes };
};

export default useData;
