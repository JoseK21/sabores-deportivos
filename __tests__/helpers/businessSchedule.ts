import { getActualSchedule } from "@/helpers/businessSchedule";
import { Schedule } from "@/types/schedule";

describe("getActualSchedule", () => {
  it("should return open and close times based on keys", () => {
    const schedule = {
      mondayOpening: 480, // 8:00 AM
      mondayClose: 720, // 12:00 PM
    } as Schedule;

    const actualDay = "monday";
    const result = getActualSchedule(schedule, actualDay);

    expect(result.openTime).toBe(480);
    expect(result.closeTime).toBe(720);
  });

  it("should return -1 for missing keys", () => {
    const schedule = {} as Schedule;
    const actualDay = "tuesday";
    const result = getActualSchedule(schedule, actualDay);

    expect(result.openTime).toBe(-1);
    expect(result.closeTime).toBe(-1);
  });
});