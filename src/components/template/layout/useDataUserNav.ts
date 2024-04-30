import { useState } from "react";
import { getApi } from "@/lib/api";
import { Business } from "@/types/business";
import { useFetchData } from "@/hooks/useFetchData";
import { useUserBusinessStore } from "@/store/userBusinessStore";
import { isEmpty } from "lodash";

const useDataUserNav = (isBusiness: string) => {
  const { setData, setError } = useUserBusinessStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      if (isEmpty(isBusiness) || isBusiness == 'N/A') throw new Error("No business");

      const newData = await getApi(`api/business/${isBusiness}`);
      const userBusiness: Business = newData?.data || ({} as Business);

      setData(userBusiness);
    } catch (error: any) {
      console.log("🚀 >>  useFetchData >>  error:", error);
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useDataUserNav;
