import { Brand } from "@/types/brand";
import Image from "next/image";

const brandsData: Brand[] = [
  {
    id: "1",
    name: "coca",
    href: "https://uideck.com",
    image: "/brands/coca.jpeg",
  },
  {
    id: "2",
    name: "dos-pino",
    href: "https://tailgrids.com",
    image: "/brands/dos-pinos.png",
  },
  {
    id: "3",
    name: "heineken",
    href: "https://lineicons.com",
    image: "/brands/heineken.png",
  },
  {
    id: "4",
    name: "GrayGrids",
    href: "https://graygrids.com",
    image: "/brands/imperial.webp",
  },
  {
    id: "5",
    name: "TailAdmin",
    href: "https://tailadmin.com",
    image: "/brands/snickers.png",
  },
];

const Brands = () => {
  return (
    <section className="pt-4">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-dark py-8 px-8 dark:bg-primary dark:bg-opacity-5 sm:px-10 md:py-[40px] md:px-[50px] xl:p-[50px] 2xl:py-[60px] 2xl:px-[70px]"
              data-wow-delay=".1s
              "
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

export default Brands;

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
