/* eslint-disable @next/next/no-img-element */
import Features from "@/components/pages/home/Features";
import Testimonials from "@/components/pages/home/Testimonials";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Store, MonitorPlayIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Descubre los mejores lugares para disfrutar
              <br />
              deportes y buena comida.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Esta plataforma intuitiva y accesible está diseñada para conectar a los amantes del deporte con los
              comercios ideales en su ciudad. Creada con tecnología de vanguardia, ofrecemos información detallada sobre
              menús, horarios, ubicaciones y eventos especiales, ayudando a potenciar la visibilidad de los negocios
              locales y brindando a los usuarios una experiencia inolvidable.
            </p>
            <div className="">
              <Link
                href="/comercios"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
              >
                <Store size={20} />
                <span>Explorar Comercios</span>
              </Link>
              <Link
                href="/eventos-deportivos"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
              >
                <MonitorPlayIcon size={20} />
                <span>Ver Eventos Deportivos</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="./assets/landing.webp" alt="hero image" className="object-contain" />
          </div>
        </div>
      </section>

      <Features />
      <section className="bg-white dark:bg-gray-900">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto grid grid-cols-2 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="mb-8">
            <p className="text-lg font-medium text-primary-600 dark:text-primary-500">Funcionamiento</p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Demostración de Uso
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Descubre cómo nuestra plataforma facilita la interacción con los comercios y mejora la experiencia tanto
              para los usuarios como para los propietarios, todo en un solo lugar.
            </p>
            <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-primary-700">Como buscar un comercio</p>
              <p className="text-primary-700">Leer Menu</p>
              <p className="text-primary-700">Ver Eventos</p>
              <p className="text-primary-700">Participar en Quiniela</p>
            </div>
          </div>
          <div className="w-full">
            {/* <Video /> */}
            <YouTubeEmbed videoid="ogfYd705cRs" style="margin: auto" />
          </div>
        </div>
      </section>
      {/* <!-- End block --> */}
      {/* <!-- Start block --> */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                En Sabores Deportivos, conectamos a los amantes del deporte con los mejores comercios, brindando una
                experiencia única donde la pasión por el deporte y la gastronomía se encuentran. Nuestra plataforma
                impulsa la visibilidad de los comercios, creando un espacio donde cada visita es memorable.
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://avatars.githubusercontent.com/u/26444128?v=4&size=64"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">José Carlos Núñez</div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  CEO at Sabores Deportivos
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      {/* <!-- End block --> */}
      {/* <!-- Start block --> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Testimonios de Comercios
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Conoce las experiencias de nuestros comercios asociados y cómo nuestra plataforma ha ayudado a impulsar su
              visibilidad y aumentar sus visitas
            </p>
          </div>
          <Testimonials />
        </div>
      </section>
    </main>
  );
}
