import { TeamTournament } from "@prisma/client";
import { RLeague } from "./league";
import { RTeam } from "./team";

export type RTeamTournament = TeamTournament & {
  League?: RLeague;
  Team?: RTeam;
};
