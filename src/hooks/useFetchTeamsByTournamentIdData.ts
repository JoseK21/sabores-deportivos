import { useCallback, useState } from "react";
import { getApi } from "@/lib/api";

import { useTeamsTournamentStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";
import { RTeamTournament } from "@/relatedTypes/teamTournament";

const useFetchTeamsByTournamentIdData = (tournamentId?: string) => {
  const { teamsTournament, setDataTeamsTournament, setErrorTeamsTournament, errorTeamsTournament } =
    useTeamsTournamentStore();

  const [isLoaded, setIsLoaded] = useState(false);

  const fetchTeamsByTournamentId = useCallback(async () => {
    setIsLoaded(false);

    if (!teamsTournament.length && tournamentId) {
      try {
        const data: RTeamTournament[] = (await getApi(`team-tournament/byTournamentId/${tournamentId}`))?.data || [];

        setDataTeamsTournament(data);
      } catch (error: any) {
        setDataTeamsTournament([]);
        setErrorTeamsTournament(error);
      }
    }

    setIsLoaded(true);
  }, [`${tournamentId}`, teamsTournament]);

  useFetchData(fetchTeamsByTournamentId);

  return { isLoaded, teamsTournament, setDataTeamsTournament, errorTeamsTournament };
};

export default useFetchTeamsByTournamentIdData;
