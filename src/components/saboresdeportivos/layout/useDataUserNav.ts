import { useState } from "react";
import { getApi } from "@/lib/api";
import { Business } from "@/types/business";
import { useFetchData } from "@/hooks/useFetchData";
import { useUserBusinessStore } from "@/store/userBusinessStore";
import { isEmpty } from "lodash";

const useDataUserNav = (isBusiness: string) => {
  const { business, setData, setError } = useUserBusinessStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      if (isEmpty(isBusiness) || isBusiness == "N/A") return;

      const newData = await getApi(`business/${isBusiness}`);
      const userBusiness: Business = newData?.data || ({} as Business);

      setData(userBusiness);
    } catch (error: any) {
      console.error("🚀 >>  useFetchData >>  error:", error);
      setError(error);
    }

    setIsLoaded(true);
  });

  return { business, isLoaded };
};

export default useDataUserNav;
