import { BusinessTypes } from "@/app/enum";
import { Product } from "./product";
import { Prize } from "./prize";

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
  wazeLink?: string;
  googleMapLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  xLink?: string;

  // UI relation DB
  Product?: Product[];
  Prize?: Prize[];

};
