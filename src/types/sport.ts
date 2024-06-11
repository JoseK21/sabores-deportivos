import { League } from "./league";

export type Sport = {
  id: string;
  name: string;
  abbrName: string;
  League: League[];
};
