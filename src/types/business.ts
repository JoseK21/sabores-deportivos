import { BusinessTypes } from "@/app/enum";

export type Business = {
  id: string;
  name: string;
  photoUrl: string;
  type: BusinessTypes;
  logoUrl: string;
  description: string;
  coverImageUrl: string;
  country: string;
  province?: string;
  canton?: string;
  district?: string;
  address?: string;
  wazeLink?: string;
  googleMapLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  xLink?: string;
};
