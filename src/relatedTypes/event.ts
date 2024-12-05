import { Event } from "@prisma/client";
import { RTeam } from "./team";
import { RTournament } from "./tournament";
import { RLeague } from "./league";

export type REvent = Event & {
  Tournament?: RTournament;
  League?: RLeague;
  HomeTeam?: RTeam;
  AwayTeam?: RTeam;
};
