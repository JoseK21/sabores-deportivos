import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import Logo from "@/app/components/svgs/Logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const posts = [
  { id: "events", slug: "/eventos", title: "Eventos" },
  { id: "ranks", slug: "/rankings", title: "Rankings" },
  { id: "info", slug: "/informacion", title: "Información" },
  { id: "affiliated-businesses", slug: "/comercios-afiliados", title: "Comercios afiliados" },
];

const HomeHeader = ({ children }: Props) => {
  const userPoints = 23;

  return (
    // <nav className="flex flex-row justify-between px-10 border-b border-b-slate-300">
    //   <Logo fill="#31973B"></Logo>

    //   <div className="flex flex-row justify-end items-center">
    //     <ul className="flex gap-1">
    //       {posts.map((post) => (
    //         <li key={post.id}>
    //           <Link href={`${post.slug}`} className="hover:bg-primary-400 px-4 py-2 rounded-sm">
    //             {post.title}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>

    //     <Button variant="default" className="text-white py-2 px-3 mx-6">
    //       <FontAwesomeIcon className="size-4 cursor-pointer mr-2" icon={faStar} />
    //       Puntos:
    //       <span className="font-black ml-1">{userPoints}</span>
    //     </Button>

    //     <FontAwesomeIcon className="size-8 cursor-pointer" icon={faCircleUser} />
    //   </div>
    // </nav>

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo fill="#31973B"></Logo>
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">QuiniSports</span> */}
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Abrir menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:flex md:w-auto items-center" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white md:dark:text-primary-500"
                aria-current="page"
              >
                Eventos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Rankings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Información
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Comercios Afiliados
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contacto
              </a>
            </li>
          </ul>

          <Button variant="default" className="text-white py-2 px-3 mx-6">
            <FontAwesomeIcon className="size-4 cursor-pointer mr-2" icon={faStar} />
            Puntos:
            <span className="font-black ml-1">{userPoints}</span>
          </Button>

          <FontAwesomeIcon className="size-8 cursor-pointer" icon={faCircleUser} />
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;
