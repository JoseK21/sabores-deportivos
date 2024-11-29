import { useCallback, useEffect, useState } from "react";
import { getApi } from "@/lib/api";

import { RTeam } from "@/relatedTypes/team";
import { useTeamsBySportIdStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";

const useTeamsBySportIdData = (sportId?: string) => {
  const { teamsBySportId, setDataBySportId, setErrorBySportId, errorBySportId } = useTeamsBySportIdStore();
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchTeamsBySportId = useCallback(async () => {
    setIsLoaded(false);

    if (!teamsBySportId.length && sportId) {
      try {
        const data: RTeam[] = (await getApi(`team/bySportId/${sportId}`))?.data || [];

        setDataBySportId(data);
      } catch (error: any) {
        setDataBySportId([]);
        setErrorBySportId(error);
      }
    }

    setIsLoaded(true);
  }, [`${sportId}`, teamsBySportId]);

  useFetchData(fetchTeamsBySportId);

  return { isLoaded, teamsBySportId, errorBySportId };
};

export default useTeamsBySportIdData;
