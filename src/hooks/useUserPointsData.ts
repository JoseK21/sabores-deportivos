import { useState } from "react";
import { getApi } from "@/lib/api";

import { useUserPointsStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";
import { isEmpty } from "lodash";
import { UserPoint } from "@/types/user-points";

const useUserPointsData = (email?: string) => {
  const { userPoint, setDataUserPoint, setErrorUserPoint } = useUserPointsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (isEmpty(userPoint)) {
      try {
        if (email) {
          const data: UserPoint = (await getApi(`users/getPointsByEmail/${email}`))?.data || [];

          setDataUserPoint(data);
        } else {
          setIsLoaded(true);
        }
      } catch (error: any) {
        console.log("🚀 >>  useFetchData >>  error:", error);
        setErrorUserPoint(error);
      }
    }

    setIsLoaded(true);
  });

  return { userPoint, isLoaded };
};

export default useUserPointsData;
