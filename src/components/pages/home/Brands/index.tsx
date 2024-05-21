"use client";

import { Brand } from "@/types/brand";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brandsData: Brand[] = [
  {
    id: "1",
    name: "Coca Cola",
    href: "https://uideck.com",
    image: "/brands/coca.png",
  },
  {
    id: "2",
    name: "Dos Pinos",
    href: "https://tailgrids.com",
    image: "/brands/dos-pinos.png",
  },
  {
    id: "3",
    name: "Heineken",
    href: "https://lineicons.com",
    image: "/brands/heineken.jpeg",
  },
  {
    id: "4",
    name: "Imperial",
    href: "https://graygrids.com",
    image: "/brands/imperial.webp",
  },
  {
    id: "5",
    name: "Snickers",
    href: "https://tailadmin.com",
    image: "/brands/snickers.png",
  },
];

const BrandsOLD = () => {
  return (
    <section className="pt-4">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-dark py-8 px-8 dark:bg-primary dark:bg-opacity-5 sm:px-10 md:py-[40px] md:px-[50px] xl:p-[50px] 2xl:py-[60px] 2xl:px-[70px]"
              data-wow-delay=".1s"
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="mx-3 flex w-full bg-gray-300 max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image src={image} alt={name} fill />
      </a>
    </div>
  );
};

const Brands = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "0",
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {brandsData.map((sponsor, index) => (
          <a target="_blank" href={sponsor.href} key={index} className="p-0 px-12">
            <div className=" relative w-full h-40 flex items-center justify-center">
              <Image src={sponsor.image} alt={sponsor.name} layout="fill" objectFit="contain" />
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default Brands;
