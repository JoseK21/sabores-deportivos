/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { UserNav } from "@/components/quinisports/layout/user-nav";

const posts = [
  { slug: "/", title: "Inicio" },
  { slug: "/comercios", title: "Comercios" },
  { slug: "/eventos", title: "Eventos Deportivos" },
  { slug: "/sobre-nosotros", title: "Sobre Nosotros" },
  { slug: "/contactos", title: "Contactos" },
  { slug: "/preguntas-frecuentes", title: "FAQ" },
];

interface Props {
  children?: ReactNode;
  session: any;
  // any props that come into the component
}

const HomeHeader = ({ session }: Props) => {
  const userPoints = 23;

  const pathname = usePathname();

  return (
    <header className="fixed w-full z-50">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img className="" width={160} src="/logo-horizontal.png" alt="logo" />
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:flex md:w-auto items-center" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    className="block py-2 px-2 rounded hover:text-primary-400 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
                    href={post.slug}
                  >
                    <span className={pathname === post.slug ? "text-primary-600" : ""}>{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden w-full md:flex md:w-auto items-center" id="navbar-default-b">
            <Button variant="default" className="text-white py-2 px-3 mx-6 flex items-center text-sm font-semibold">
              <Star className="size-4 cursor-pointer mr-2 -mt-1" />
              <span>
                Puntos: <strong>{userPoints}</strong>
              </span>
            </Button>
            {/* <SquareUserRound className="size-8 cursor-pointer" /> */}

            <UserNav session={session} />
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
