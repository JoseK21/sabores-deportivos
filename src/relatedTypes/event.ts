import { Event, Team, Tournament } from "@prisma/client";

export type REvent = Event & {
  Tournament?: Tournament;
  homeTeam?: Team;
  awayTeam?: Team;
};
