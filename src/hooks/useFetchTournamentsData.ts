import { useState } from "react";
import { getApi } from "@/lib/api";

import { Tournament } from "@/types/tournament";
import { useFetchData } from "@/lib/useFetchData";
import { useTournamentsStore } from "@/store/sd-admin";

const useFetchTournamentsData = () => {
  const { tournaments, setData, setError } = useTournamentsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!tournaments.length) {
      try {
        const data: Tournament[] = (await getApi("tournament"))?.data || [];

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
