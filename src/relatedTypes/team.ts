import { Team } from "@prisma/client";
import { RSport } from "./sport";

export type RTeam = Team & {
  Sport?: RSport;
};
