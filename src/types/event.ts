import { EventStatus, Team, Tournament } from "@prisma/client";

export type Event = {
  id: string;
  title?: string;
  tournamentId: string;
  dateTime: Date;
  status: EventStatus;
  homeTeamId: string;
  awayTeamId: string;

  awayTeam: Team;
  homeTeam: Team;
  Tournament: Tournament;
};

