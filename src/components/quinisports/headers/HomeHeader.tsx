"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquareUserRound, Star } from "lucide-react";
import { UserNav } from "@/components/template/layout/user-nav";

const posts = [
  { id: "events", slug: "/eventos", title: "Eventos" },
  { id: "ranks", slug: "/rankings", title: "Rankings" },
  { id: "affiliated-businesses", slug: "/comercios-afiliados", title: "Comercios afiliados" },
];

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const HomeHeader = ({ children }: Props) => {
  const userPoints = 23;

  const pathname = usePathname();

  console.log("🚀 >>  HomeHeader >>  pathname:", pathname);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg width="112" height="45" viewBox="0 0 112 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="111.977" height="45" fill="white" />
            <path
              d="M58.5671 31.3704L56.9195 35.6686H51.9766L56.0956 38.5341L54.448 42.8322L58.5671 39.9668L62.6862 42.8322L61.0385 38.5341L65.1576 35.6686H60.2147L58.5671 31.3704Z"
              fill="#31973B"
            />
            <path
              d="M4.9834 37.1013H45.0997L57.9942 6.72757L70.6022 37.1013H107.566"
              stroke="black"
              strokeWidth="3.48917"
            />
            <line x1="77.559" y1="5.2267" x2="4.36571" y2="39.1324" stroke="white" strokeWidth="1.74458" />
            <line x1="80.4248" y1="9.23833" x2="12.9289" y2="40.5048" stroke="white" strokeWidth="1.74458" />
          </svg>
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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

          <Button variant="default" className="text-white py-2 px-3 mx-6">
            <Star className="size-4 cursor-pointer mr-2" />
            Puntos:
            <span className="font-black ml-1">{userPoints}</span>
          </Button>
          {/* <SquareUserRound className="size-8 cursor-pointer" /> */}

          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;
