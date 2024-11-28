import { Tournament } from "@prisma/client";
import { RLeague } from "./league";
import { RSport } from "./sport";

export type RTournament = Tournament & {
  Sport: RSport;
  League: RLeague;
};
