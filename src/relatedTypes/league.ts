import { League } from "@prisma/client";
import { RSport } from "./sport";

export type RLeague = League & {
  Sport?: RSport;
};
