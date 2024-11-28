import { League, Team } from "@prisma/client";

export type RTeam = Team & {
  League?: League;
};
