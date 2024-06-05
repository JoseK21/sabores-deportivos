import { ProductType } from "./product-type";

export type Product = {
  id: string;
  name: string;
  idBusiness: string;
  description: string;
  image: string;
  price: number;
  productTypeId: string;

  productType?: ProductType;
};
