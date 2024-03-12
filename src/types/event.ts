import { Team } from "./team";

export type Event = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  leagueId: number;
  sportId: number;
  team1: Team;
  team2: Team;
};
