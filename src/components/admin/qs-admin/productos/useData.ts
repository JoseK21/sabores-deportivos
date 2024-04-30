import { useState } from "react";
import { getApi } from "@/lib/api";

import { Product } from "@/types/product";
import { useFetchData } from "@/hooks/useFetchData";
import { useProductsStore } from "@/store/qs-admin";

const useData = (idBusiness: string | undefined) => {
  const { products, setData, setError } = useProductsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      if (idBusiness) {
        const data: Product[] = (await getApi(`api/product/byBusiness/${idBusiness}`))?.data || [];

        setData(data);
      } else {
        throw new Error("Sin Comercio asociado (id)");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded, products };
};

export default useData;
