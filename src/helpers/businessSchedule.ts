import { BUSINESS_SCHEDULE_STATUS } from "@/app/constants";
import { Schedule } from "@/types/schedule";
import { format } from "date-fns";

const _convertMinutesToTime = (minutes: number) => {
  if (minutes < 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = mins.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const getActualSchedule = (schedule: Schedule, actualDay: string) => {
  const openKey = `${actualDay}Opening` as keyof Schedule;
  const closeKey = `${actualDay}Close` as keyof Schedule;

  return {
    openTime: Number(schedule[openKey]) || -1,
    closeTime: Number(schedule[closeKey]) || -1,
  };
};

export const getScheduleInfo = (schedule?: Schedule): { class: string; label: string; extraInfo: string } => {
  if (schedule) {
    const today = new Date();
    const actualDay = format(today, "EEEE").toLowerCase();
    const todayMinutes = today.getMinutes() + today.getHours() * 60;
    const { openTime, closeTime } = getActualSchedule(schedule, actualDay);

    if (openTime >= 0 && closeTime >= 0) {
      if (todayMinutes >= openTime - 30 && todayMinutes < openTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.to_open, extraInfo: `A las ${_convertMinutesToTime(openTime)}` };
      } else if (todayMinutes >= closeTime - 30 && todayMinutes < closeTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.to_close, extraInfo: `A las ${_convertMinutesToTime(closeTime)}` };
      } else if (todayMinutes >= openTime && todayMinutes < closeTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.opened, extraInfo: "" };
      }
    }
  }
  return { ...BUSINESS_SCHEDULE_STATUS.closed, extraInfo: "" };
};
