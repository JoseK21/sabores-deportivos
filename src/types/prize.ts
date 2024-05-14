import { PrizeProduct } from "./prize-product";

export type Prize = {
  id: string;
  name: string;
  idBusiness: string;
  points: number;
  enabled: boolean;
  description?: string;

  ProductPrize?: PrizeProduct[];
};
