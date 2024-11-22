import { useState } from "react";
import { getApi } from "@/lib/api";

import { Sport } from "@/types/sport";
import { useSportsStore } from "@/store/sd-admin";
import { useFetchData } from "@/hooks/useFetchData";

const useFetchSportsData = () => {
  const { sports, setData, setError } = useSportsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const data: Sport[] = (await getApi("sport"))?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded, sports };
};

export default useFetchSportsData;
