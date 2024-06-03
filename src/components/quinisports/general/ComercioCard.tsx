import { BUSINESS_TYPES } from "@/app/constants";
import { BusinessTypes } from "@/app/enum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Business } from "@/types/business";
import { generateSlug } from "@/utils/url";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ComercioCard = ({ id, name, coverImageUrl, country, province, canton, district, type }: Business) => {
  return (
    <Link href={`/comercios-afiliados/${generateSlug(name, id)}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div style={{ position: "relative", height: "200px" }}>
          <Image fill alt={name} src={coverImageUrl} className="object-cover" sizes="100vw" />
        </div>

        <div className="p-5">
          <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</span>
          <br />
          <Badge variant="secondary">{BUSINESS_TYPES[type as BusinessTypes]}</Badge>
          <div className="flex flex-row gap-1 items-center mt-1">
            <MapPin size={18} />
            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-4">
              {district}, {canton}, {province}
            </p>
          </div>

          <div className="flex flex-row gap-1 items-center mt-1">
            <Clock size={18} />
            <p className="text-sm text-primary-700 dark:text-gray-400 line-clamp-4">Por abrir</p>
          </div>

          <div className="flex justify-end items-center">
            <Button asChild variant="ghost">
              <span className=" text-primary-700">
                Leer mas <ArrowRight size={20} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ComercioCard;
