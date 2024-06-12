"use client";

import { useState } from "react";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-30 bg-black text-white transition duration-300 ease-in-out">
      <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <button
            className="text-white cursor-pointer leading-none px-3 py-1 outline-none focus:outline-none "
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {/* <Logo width={40} fill="#FFF" fillLabel="#235544" fillStar="#FFF" fillLine="#FFF" /> */}
            QuiniSports
          </button>
        </div>
        <div className={"md:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
          <nav className="flex-col flex-grow ">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="/contactos"
                  className="font-medium text-white hover:text-gray-200 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Contactos
                </a>
              </li>
              <li>
                <a
                  href="/sobre-nosotros"
                  className="font-medium text-white hover:text-gray-200 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md md:mt-0 md:ml-4 bg-gray-900"
                  href="/auth/iniciar-sesion"
                >
                  <span className="justify-center">Inicio de Session</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 flex ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
