import { BUSINESS_SCHEDULE_STATUS, BUSINESS_TYPES } from "@/app/constants";
import { BusinessTypes } from "@/app/enum";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Business } from "@/types/business";
import { Schedule } from "@/types/schedule";
import { DAYS_MAP } from "@/utils/date";
import { generateSlug } from "@/utils/url";
import { format } from "date-fns";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function convertMinutesToTime(minutes: number) {
  if (minutes < 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = mins.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export const getActualSchedule = (schedule: Schedule, dateKey: string) => {
  const openingKey = `${dateKey}Opening` as keyof Schedule;
  const closing = `${dateKey}Close` as keyof Schedule;

  return {
    openTime: Number(schedule[openingKey]) || -1,
    closeTime: Number(schedule[closing]) || -1,
  };
};

const getNextOpeningDay = (todayNumber: number, schedule?: Schedule): string => {
  if (schedule) {
    const daysOfWeek = Object.keys(DAYS_MAP);

    const lastDay = daysOfWeek.pop();

    daysOfWeek.unshift(`${lastDay}`);

    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (todayNumber + i) % 7;

      const day = daysOfWeek[nextDayIndex] as keyof Schedule;

      const { openTime, closeTime } = getActualSchedule(schedule, day);

      const daySpanish = DAYS_MAP[`${day}`];

      if (openTime >= 0 && closeTime >= 0 && daySpanish) {
        return `Abre el ${daySpanish} a las ${convertMinutesToTime(openTime)}`;
      }
    }
  }

  return "";
};

const INTERVAL_MINUTES = 60;

const getScheduleInfo = (schedule?: Schedule): { class: string; label: string; extraInfo: string } => {
  const today = new Date();
  const dateKey = format(today, "EEEE").toLowerCase();

  if (schedule) {
    const todayMinutes = today.getMinutes() + today.getHours() * 60;
    const { openTime, closeTime } = getActualSchedule(schedule, dateKey);

    if (openTime >= 0 && closeTime >= 0) {
      if (todayMinutes >= openTime - INTERVAL_MINUTES && todayMinutes < openTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.to_open, extraInfo: `A las ${convertMinutesToTime(openTime)}` };
      } else if (todayMinutes >= closeTime - INTERVAL_MINUTES && todayMinutes < closeTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.to_close, extraInfo: `A las ${convertMinutesToTime(closeTime)}` };
      } else if (todayMinutes >= openTime && todayMinutes < closeTime) {
        return { ...BUSINESS_SCHEDULE_STATUS.opened, extraInfo: "" };
      }
    }
  }

  return { ...BUSINESS_SCHEDULE_STATUS.closed, extraInfo: getNextOpeningDay(today.getDay(), schedule) };
};

const ComercioCard = ({
  id,
  name,
  type,
  phone1,
  phone2,
  canton,
  province,
  district,
  coverImageUrl,
  BusinessScheduled,
}: Business) => {
  const scheduleInfo = getScheduleInfo(BusinessScheduled);

  return (
    <Link href={`/comercios-afiliados/${generateSlug(name, id)}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div style={{ position: "relative", height: "200px" }}>
          <Image fill alt={name} src={coverImageUrl} className="object-cover" sizes="100vw" />
          <Badge className=" z-10 absolute right-3 top-3 bg-white text-black">
            {BUSINESS_TYPES[type as BusinessTypes]}
          </Badge>
        </div>

        <div className="p-4">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</p>
          <div className="flex flex-row gap-1 items-center mt-1">
            <MapPin size={18} />
            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-4">
              {district}, {canton}, {province}
            </p>
          </div>

          {(phone1 || phone2) && (
            <div className="flex flex-row gap-1 items-center mt-1">
              <Phone size={18} />
              <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-4">
                {phone1 ?? phone2}
                {phone1 && phone2 ? ` y ${phone2}` : ""}
              </p>
            </div>
          )}

          <div className="flex flex-row gap-1 items-center mt-1">
            <Clock size={18} />
            <span className={cn("text-sm line-clamp-4", scheduleInfo.class)}>
              <span>{scheduleInfo.label}</span>
              {scheduleInfo.extraInfo ? `: ${scheduleInfo.extraInfo}` : ""}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center bg-slate-200">
          <span className=" text-primary-600 mr-1 pt-1">Ver más</span>
          <ArrowRight size={16} color="#3daa47" className="-mt-1" />
        </div>
      </div>
    </Link>
  );
};

export default ComercioCard;
