import { League } from "./league";
import { TournamentStatus } from "@/app/enum";
import { Event } from "@/types/event";

export type Tournament = {
  id: string;
  name: string;
  abbrName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  leagueId: string;
  enabled: boolean;
  status: TournamentStatus;
  League: League;
  Event: Event[];
};
