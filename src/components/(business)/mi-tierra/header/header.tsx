import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const HeaderMiTierra = () => {
  return (
    <header className="flex justify-between items-center container h-16">
      <img
        width={300}
        height={52}
        src="https://mitierrarestaurante.com/wp-content/uploads/2020/10/logotxt_72f33732-7922-4ba3-9d3a-6bb2ecc5b402.png"
        alt="Mi Tierra Restaurante – Cartago"
      ></img>

      <nav>
        <ul className=" text-[#3d1510] space-x-5">
          <Link href={"Inicio"}>Inicio</Link>
          <Link href={"Quienes Somos"}>Quienes Somos</Link>
          <Link href={"Contactos"}>Contactos</Link>
          <Link href={"Menú"}>Menú</Link>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderMiTierra;
