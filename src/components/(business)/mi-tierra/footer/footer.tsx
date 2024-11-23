import { BoxesIcon, LocateIcon, PhoneCall, PhoneOff } from "lucide-react";
import Link from "next/link";

const contacts = [
  {
    icon: LocateIcon,
    title: "Dirección:",
    description: "2 Km Este del puente Bailey, carretera al Volcán Irazú Cartago, Costa Rica",
  },
  {
    icon: PhoneCall,
    title: "Teléfono:",
    description: "2551-7090",
  },
  {
    icon: PhoneOff,
    title: "Móvil:",
    description: "84479363",
  },
  {
    icon: BoxesIcon,
    title: "Correo electrónico::",
    description: "restaurantemitierra@hotmail.com",
  },
];

/* eslint-disable @next/next/no-img-element */
const FooterMiTierra = () => {
  return (
    <footer className="pt-10 bg-gray-100">
      <div className="container grid grid-cols-4 gap-4 items-start">
        <img
          width={300}
          height={52}
          src="https://mitierrarestaurante.com/wp-content/uploads/2020/10/logotxt_72f33732-7922-4ba3-9d3a-6bb2ecc5b402.png"
          alt="Mi Tierra Restaurante – Cartago"
        ></img>

        <div>
          <label className="font-bold pl-2 border-l-4 border-l-sky-500">Menú Navegación</label>
          <ul className="mt-4 text-[#3d1510]">
            <li className="border-b border-gray-300 pb-1 mb-3">
              <Link href={"Inicio"}>Inicio</Link>
            </li>
            <li className="border-b border-gray-300 pb-1 mb-3">
              <Link href={"Quienes Somos"}>Quienes Somos</Link>
            </li>
            <li className="border-b border-gray-300 pb-1 mb-3">
              <Link href={"Contactos"}>Contactos</Link>
            </li>
            <li className="border-b border-gray-300 pb-1 mb-3">
              <Link href={"Menú"}>Menú</Link>
            </li>
          </ul>
        </div>

        <div>
          <label className="font-bold pl-2  border-l-4 border-l-sky-500">Información de contacto</label>
          <div className="mt-4">
            {contacts.map((contact) => (
              <div key={contact.title} className="flex gap-4 gap-y-6 mb-4">
                <div className="border border-[#3d1510] flex items-center justify-center w-fit h-fit p-3">
                  <contact.icon size={16} className="text-red-400" />
                </div>

                <div>
                  <div>{contact.title}</div>
                  <div>{contact.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#3d1510] w-full p-5 flex items-center text-white justify-center text-sm">Restaurante Mi Tierra 2020</div>
    </footer>
  );
};

export default FooterMiTierra;
