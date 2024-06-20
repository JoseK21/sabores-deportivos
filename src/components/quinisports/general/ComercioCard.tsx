import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BusinessTypes } from "@/app/enum";
import { generateSlug } from "@/utils/url";
import { Business } from "@/types/business";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_TYPES } from "@/app/constants";
import { getScheduleInfo } from "@/helpers/businessSchedule";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

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
