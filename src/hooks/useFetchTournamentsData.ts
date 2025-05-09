import { useState } from "react";
import { getApi } from "@/lib/api";

import { useFetchData } from "@/lib/useFetchData";
import { useTournamentsStore } from "@/store/sd-admin";
import { RTournament } from "@/relatedTypes/tournament";

const useFetchTournamentsData = () => {
  const { tournaments, setData, setError } = useTournamentsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!tournaments.length) {
      try {
        const data: RTournament[] = (await getApi("tournament"))?.data || [];

        setData(data);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, tournaments };
};

export default useFetchTournamentsData;
