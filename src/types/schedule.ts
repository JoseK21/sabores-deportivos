export type Schedule = {
  id: number;
  idBusiness: number;

  mondayOpening?: number;
  mondayClose?: number;
  tuesdayOpening?: number;
  tuesdayClose?: number;
  wednesdayOpening?: number;
  wednesdayClose?: number;
  thursdayOpening?: number;
  thursdayClose?: number;
  fridayOpening?: number;
  fridayClose?: number;
  saturdayOpening?: number;
  saturdayClose?: number;
  sundayOpening?: number;
  sundayClose?: number;
};
