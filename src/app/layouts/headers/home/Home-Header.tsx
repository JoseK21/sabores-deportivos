import React, { ReactNode } from "react";
import Logo from "@/app/components/svgs/Logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";

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
  return (
    <nav className="flex flex-row justify-between px-10 border-b border-b-slate-300">
      <Logo fill="#31973B"></Logo>

      <div className="flex flex-row justify-end items-center">
        <ul className="flex gap-1">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`${post.slug}`} className="hover:bg-primary-300 px-4 py-2 rounded-sm">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        <button type="button" className="text-white py-2 px-3 bg-primary-500 mx-6 rounded-md">
          Puntos
        </button>

        <FontAwesomeIcon className="size-8 cursor-pointer" icon={faCircleUser} />
      </div>
    </nav>
  );
};

export default HomeHeader;
