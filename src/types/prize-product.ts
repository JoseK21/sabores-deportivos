import { Product } from "./product";

export type PrizeProduct = {
  id: string;
  idPrize: string;
  idProduct: string;

  product: Product;
};
