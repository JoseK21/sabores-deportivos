export type Advertising = {
  id: number;
  idBusiness: number;
  title: string;
  imageUrl: string;
  href?: string;
  priority?: number;
  enabled: boolean;
  startDate: Date;
  endDate: Date;
};
