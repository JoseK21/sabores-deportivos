"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Estamos listos para ayudar"
          paragraph="Para poder realizar un pronostico, por favor reproducir el siguiente video"
          center
          mb="80px"
        />

        <div className=" bg-gray-200 text-center min-h-96 items-center flex justify-center">Youtuve Video</div>
      </div>
    </section>
  );
};

export default Video;
