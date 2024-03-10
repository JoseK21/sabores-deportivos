"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gift, LandPlot, Users } from "lucide-react";
import Image from "next/image";

const listUser = [
  {
    name: "Usuarios",
    number: "390",
    icon: <Users size={28} />,
  },
  {
    name: "Comercios Afiliados",
    number: "20",
    icon: <LandPlot size={28} />,
  },
  {
    name: "Premios",
    number: "50",
    icon: <Gift size={28} />,
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <ScrollArea className="h-full">
      <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
        <div>
          <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
            <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                <strong>QuiniSports</strong>.
              </h1>
              <p className="text-black-500 mt-4 mb-6">
                Proporcione una red para todas sus necesidades de forma fácil y divertida utilizando LaslesVPN y
                descubra nuestras funciones interesantes.
              </p>
              <Button onClick={() => router.push(`/eventos`)}>Ver Eventos</Button>
            </div>
            <div className="flex w-full">
              <div className="h-full w-full">
                <Image
                  width={612}
                  height={383}
                  quality={100}
                  src="/home.jpeg"
                  alt="VPN Illustrasi"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full flex">
          <div className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
            {listUser.map((listUsers, index) => (
              <div
                className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key={index}
              >
                <div className="flex mx-auto w-40 sm:w-auto">
                  <div className="flex items-center justify-center bg-primary-100 w-16 h-16 mr-6 rounded-full">
                    {listUsers.icon}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl text-black-600 font-bold">{listUsers.number}+</p>
                    <p className="text-lg text-black-500">{listUsers.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: "blur(114px)" }}
          ></div>
        </div>
      </div>
    </ScrollArea>
  );
}
