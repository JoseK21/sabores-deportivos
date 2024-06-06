import { BusinessPlan, BusinessTypes } from "@/app/enum";
import { Product } from "./product";
import { Prize } from "./prize";
import { Schedule } from "./schedule";

export type Business = {
  id: string;
  name: string;
  photoUrl: string;
  type: BusinessTypes;
  logoUrl: string;
  description: string;
  coverImageUrl: string;
  country: string;
  province: string;
  canton: string;
  district: string;
  address: string;
  // social media
  wazeLink?: string;
  googleMapLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  xLink?: string;
  //contact
  phone1?: string;
  phone2?: string;
  email?: string;

  // config
  plan: BusinessPlan;
  displayProductPrice: boolean;

  // UI relation DB
  Product?: Product[];
  Prize?: Prize[];
  BusinessScheduled?: Schedule;
};
