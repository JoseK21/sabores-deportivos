import { ProductType } from "./product-type";

export type Product = {
  id: string;
  name: string;
  idBusiness: string;
  description: string;
  image: string;
  productTypeId: string;

  productType?: ProductType;
};
