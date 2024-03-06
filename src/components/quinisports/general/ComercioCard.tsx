import { Button } from "@/components/ui/button";
import { Buisiness } from "@/types/business";
import { generateSlug } from "@/utils/url";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// TODO add location to Link
const ComercioCard = ({ id, name, photoUrl, description }: Buisiness) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div style={{ position: "relative", height: "200px" }}>
        <Image
          fill
          alt={name}
          src={photoUrl}
          sizes="100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">{description}</p>
        <div className="flex justify-end items-center">
          <Button asChild variant="ghost">
            <Link href={`/comercios-afiliados/${generateSlug(name, id)}`} className=" text-primary-700">
              <span className="mr-4 ">Leer mas</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ComercioCard;
