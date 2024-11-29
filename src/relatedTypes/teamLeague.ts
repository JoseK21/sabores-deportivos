import { TeamLeague } from "@prisma/client";
import { RLeague } from "./league";
import { RTeam } from "./team";

export type RTeamLeague = TeamLeague & {
  League?: RLeague;
  Team?: RTeam;
};
