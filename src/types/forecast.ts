import { ForecastStatus } from "@/app/enum";

export type Forecast = {
  id: number;
  idBusiness: number;
  idClient: number;
  idEvent: number;
  date: Date;
  status: ForecastStatus;
};
