import { useState } from "react";
import { getApi } from "@/lib/api";

import { useSportsStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";
import { RSport } from "@/relatedTypes/sport";

const useFetchSportsData = () => {
  const { sports, setData, setError } = useSportsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!sports.length) {
      try {
        const data: RSport[] = (await getApi("sport"))?.data || [];

        setData(data);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, sports };
};

export default useFetchSportsData;
