import { useState } from "react";
import { getApi } from "@/lib/api";

import { useFetchData } from "@/lib/useFetchData";
import { useLeaguesStore } from "@/store/sd-admin";
import { RLeague } from "@/relatedTypes/league";

const useFetchLeaguesData = () => {
  const { leagues, setData, setError } = useLeaguesStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!leagues.length) {
      try {
        const data: RLeague[] = (await getApi("league"))?.data || [];

        setData(data);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, leagues };
};

export default useFetchLeaguesData;
