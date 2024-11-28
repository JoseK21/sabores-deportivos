import { useState } from "react";
import { getApi } from "@/lib/api";

import { RTeam } from "@/relatedTypes/team";
import { useTeamsStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";

const useTeamsData = () => {
  const { teams, setData, setError, error } = useTeamsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    if (!teams.length) {
      try {
        const data: RTeam[] = (await getApi("team"))?.data || [];

        setData(data);
      } catch (error: any) {
        setError(error);
      }
    }

    setIsLoaded(true);
  });

  return { isLoaded, teams, error };
};

export default useTeamsData;
