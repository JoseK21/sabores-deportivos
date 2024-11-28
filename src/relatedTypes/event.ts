import { Event } from "@prisma/client";
import { RTeam } from "./team";
import { RTournament } from "./tournament";

export type REvent = Event & {
  Tournament?: RTournament;
  homeTeam?: RTeam;
  awayTeam?: RTeam;
};
