export type Advertising = {
  id: string;
  idBusiness: string;
  title: string;
  image: string;
  href?: string;
  priority?: number;
  enabled: boolean;
  startDate: Date;
  endDate: Date;
};
