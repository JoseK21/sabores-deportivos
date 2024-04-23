import { ForecastStatus } from "@/app/enum";

export type Forecast = {
  id: string;
  idBusiness: string;
  idClient: string;
  idEvent: string;
  date: Date;
  status: ForecastStatus;
};
