import { Sport } from "./sport";
import { Tournament } from "./tournament";

export type League = {
  id: string;
  name: string;
  abbrName: string;
  sportId: string;
  
  Tournament: Tournament[];
  Sport: Sport;
};
